import { IProduct } from './product-d-t';

export interface IDisease {
  diseaseName: string;
  accuracy: number | null;
  pathogen: string;
  symptoms: string;
  conditions: string;
  prevention: string;
  suggestedProducts: IProduct[];
}

export interface IDiseaseInfo {
  id: number;
  name: string;
  pathogen: string;
  symptoms: string;
  conditions: string;
  prevention: string;
  is_healthy: boolean;
}

export interface IApiResponse {
  data: {
    accuracy: string;
    diseaseInfo: IDiseaseInfo;
    suggestedProducts: IProduct[];
  };
  message: string;
  statusCode: number;
  success: boolean;
}
