import { IProduct } from './product-d-t';

export interface IPredictionHistory {
    id: number;
    user_id: number;
    disease_id: number;
    disease_name: string;
    accuracy: number;
    image_url: string;
    predicted_time: string;
    suggested_products: IProduct[];
}

export interface IPredictionHistoryResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: IPredictionHistory[];
}