import axios from 'axios';
import FormData from 'form-data';
import config from '../../../config/secret';
import pool from '../../../db';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ResultSetHeader } from 'mysql2';
import { Disease, SuggestedProduct, PredictionHistory, FastAPIResponse } from './detect.interface';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const detectDiseaseViaAPIService = async (imageFile: Express.Multer.File): Promise<{ disease_name: string; accuracy: number }> => {
    const formData = new FormData();
    formData.append('file', imageFile.buffer, imageFile.originalname);

    const response = await axios.post<FastAPIResponse>(
        `${config.FASTAPI_URL}/api/v1/predict`,
        formData,
        { headers: { ...formData.getHeaders() } }
    );

    return {
        disease_name: response.data.class,
        accuracy: response.data.confidence,
    };
};

const getDiseaseIdService = async (disease_name: string): Promise<number> => {
    const sqlGetDiseaseId = `SELECT id FROM diseases WHERE name = ?`;
    const [diseaseRows] = await pool.execute<Disease[]>(sqlGetDiseaseId, [disease_name]);

    if (diseaseRows.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, `Disease "${disease_name}" not found`);
    }

    return diseaseRows[0].id;
};

const getDiseaseInfoService = async (diseaseId: number): Promise<Disease> => {
    const sqlDiseaseInfo = `
        SELECT 
            id, 
            name, 
            pathogen, 
            symptoms, 
            conditions, 
            prevention, 
            is_healthy 
        FROM 
            diseases 
        WHERE 
            id = ?
    `;
    const [diseaseInfoRows] = await pool.execute<Disease[]>(sqlDiseaseInfo, [diseaseId]);
    return diseaseInfoRows[0];
};

const getSuggestedProductsService = async (diseaseId: number): Promise<SuggestedProduct[]> => {
    const sqlSuggestedProducts = `
        SELECT 
            product.id AS id,
            product.title,
            product.description,
            product.price,
            product.stock,
            product.image,
            product.discount,
            product.final_price,
            product.category_id,
            product.brand_id,
            product.sku,
            product.slug
        FROM 
            disease_products 
        INNER JOIN 
            product ON disease_products.product_id = product.id 
        WHERE 
            disease_products.disease_id = ?
        ORDER BY 
            RAND() 
        LIMIT 3
    `;
    const [suggestedProductRows] = await pool.execute<SuggestedProduct[]>(sqlSuggestedProducts, [diseaseId]);
    return suggestedProductRows;
};

const saveImageFileService = (imageFile: Express.Multer.File): string => {
    const fileExtension = path.extname(imageFile.originalname);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const uploadDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const uploadPath = path.join(uploadDir, uniqueFilename);
    fs.writeFileSync(uploadPath, imageFile.buffer);
    return `${config.BASE_URL}/uploads/${uniqueFilename}`;
};

const savePredictionHistoryService = async (
    userId: number,
    diseaseId: number,
    accuracy: number,
    imageUrl: string,
    suggestedProducts: SuggestedProduct[]
): Promise<number> => {
    const sqlInsertHistory = `
        INSERT INTO prediction_history (user_id, disease_id, accuracy, image_url, predicted_time, suggested_products) 
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?)
    `;
    const [historyResult] = await pool.execute<ResultSetHeader>(sqlInsertHistory, [
        userId,
        diseaseId,
        accuracy,
        imageUrl,
        JSON.stringify(suggestedProducts),
    ]);

    return historyResult.insertId;
};

const detectAndSaveDiseaseService = async (imageFile: Express.Multer.File, userId: number) => {
    try {
        const { disease_name, accuracy } = await detectDiseaseViaAPIService(imageFile);
        const percentageAccuracy = (accuracy * 100).toFixed(5);
        const diseaseId = await getDiseaseIdService(disease_name);
        const diseaseInfo = await getDiseaseInfoService(diseaseId);
        const suggestedProducts = await getSuggestedProductsService(diseaseId);
        const imageUrl = saveImageFileService(imageFile);
        const historyId = await savePredictionHistoryService(userId, diseaseId, accuracy, imageUrl, suggestedProducts);

        return {
            historyId,
            diseaseInfo,
            accuracy: percentageAccuracy,
            imageUrl,
            suggestedProducts,
        };
    } catch (error) {
        console.error('Error in detectAndSaveDisease:', error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to detect and save disease information');
    }
};

const getAllPredictionsService = async (): Promise<PredictionHistory[]> => {
    const sql = `
        SELECT 
            ph.id, 
            ph.user_id, 
            ph.disease_id, 
            d.name AS disease_name, 
            ph.accuracy, 
            ph.image_url, 
            ph.predicted_time, 
            ph.suggested_products 
        FROM 
            prediction_history ph 
        INNER JOIN 
            diseases d ON ph.disease_id = d.id
    `;
    const [rows] = await pool.execute<PredictionHistory[]>(sql);
    return rows;
};

const getUserPredictionHistoryService = async (userId: string): Promise<PredictionHistory[]> => {
    const sql = `
        SELECT 
            ph.id, 
            ph.user_id, 
            ph.disease_id, 
            d.name AS disease_name, 
            ph.accuracy, 
            ph.image_url, 
            ph.predicted_time, 
            ph.suggested_products 
        FROM 
            prediction_history ph 
        INNER JOIN 
            diseases d ON ph.disease_id = d.id 
        WHERE 
            ph.user_id = ?
    `;
    const [rows] = await pool.execute<PredictionHistory[]>(sql, [userId]);
    return rows;
};

const getAllDiseasesService = async (): Promise<Disease[]> => {
    const sql = `
        SELECT id, name, pathogen, symptoms, conditions, prevention, is_healthy 
        FROM diseases
    `;
    const [rows] = await pool.execute<Disease[]>(sql);
    return rows;
};

const updateDiseaseService = async (id: number, updatedData: Partial<Disease>) => {
    const fields = Object.keys(updatedData).map((key) => `${key} = ?`).join(", ");
    const values = Object.values(updatedData);

    if (!fields) {
        throw new ApiError(httpStatus.BAD_REQUEST, "No fields provided for update");
    }

    const sql = `UPDATE diseases SET ${fields} WHERE id = ?`;
    const [result] = await pool.execute(sql, [...values, id]);

    if ((result as any).affectedRows === 0) {
        return null;
    }

    const updatedDisease = await getSingleDiseaseById(id);
    return updatedDisease;
};

const getSingleDiseaseById = async (id: number): Promise<Disease | null> => {
    const sql = `
      SELECT 
        id, name, pathogen, symptoms, conditions, prevention, is_healthy
      FROM diseases
      WHERE id = ?`;
    const [rows] = await pool.execute<Disease[]>(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
};

export const DetectService = {
    detectAndSaveDiseaseService,
    detectDiseaseViaAPIService,
    getDiseaseIdService,
    getDiseaseInfoService,
    getSuggestedProductsService,
    saveImageFileService,
    savePredictionHistoryService,
    getAllPredictionsService,
    getUserPredictionHistoryService,
    getAllDiseasesService,
    updateDiseaseService,
};
