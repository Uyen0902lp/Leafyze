import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../shared/sendResponse';
import catchAsync from '../../shared/createAsync';
import { DetectService } from './detect.service';
import ApiError from '../../../errors/ApiError';

const detectAndSaveController = catchAsync(async (req: Request, res: Response) => {
    const imageFile = req.file;
    const userId = req.user?.id || req.body.user_id;

    if (!userId) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication required');
    }
    if (!imageFile) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Image file is required');
    }

    const result = await DetectService.detectAndSaveDiseaseService(imageFile, userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Detection completed, disease info fetched, and history saved successfully!',
        data: result,
    });
});

const detectDiseaseController = catchAsync(async (req: Request, res: Response) => {
    const imageFile = req.file;
    if (!imageFile) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Image file is required');
    }

    const { disease_name, accuracy } = await DetectService.detectDiseaseViaAPIService(imageFile);
    const diseaseId = await DetectService.getDiseaseIdService(disease_name);
    const diseaseInfo = await DetectService.getDiseaseInfoService(diseaseId);
    const suggestedProducts = await DetectService.getSuggestedProductsService(diseaseId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Disease detected successfully!',
        data: { diseaseInfo, accuracy, suggestedProducts },
    });
});

const getDiseaseInfoController = catchAsync(async (req: Request, res: Response) => {
    const { disease_id } = req.params;
    if (!disease_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Disease ID is required');
    }

    const diseaseInfo = await DetectService.getDiseaseInfoService(Number(disease_id));

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Disease information fetched successfully!',
        data: diseaseInfo,
    });
});

const getAllPredictionsController = catchAsync(async (req: Request, res: Response) => {
    const predictions = await DetectService.getAllPredictionsService();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All predictions fetched successfully!',
        data: predictions,
    });
});

const getUserPredictionHistoryController = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const history = await DetectService.getUserPredictionHistoryService(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User prediction history fetched successfully!',
        data: history,
    });
});

const getDiseaseListController = catchAsync(async (req: Request, res: Response) => {
    const diseases = await DetectService.getAllDiseasesService();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Diseases list fetched successfully!',
        data: diseases,
    });
});

const updateDiseaseController = catchAsync(async (req: Request, res: Response) => {
    const { disease_id } = req.params;
    const updatedData = req.body;
    console.log("Received ID from params:", req.params.id);


    if (!disease_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Disease ID is required");
    }

    const result = await DetectService.updateDiseaseService(Number(disease_id), updatedData);

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Disease not found or update failed");
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Disease updated successfully!",
        data: result,
    });
});

export const DetectController = {
    detectAndSave: detectAndSaveController,
    detectDisease: detectDiseaseController,
    getDiseaseInfo: getDiseaseInfoController,
    getAllPredictions: getAllPredictionsController,
    getUserPredictionHistory: getUserPredictionHistoryController,
    getDiseaseList: getDiseaseListController,
    updateDisease: updateDiseaseController,
};
