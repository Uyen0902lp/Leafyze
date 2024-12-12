import { apiSlice } from './apiSlice';
import { IApiResponse } from '@/types/disease-d-t';
import { IDisease } from '@/types/disease-d-t';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Predict disease from an image
        predictDisease: builder.mutation<IApiResponse, FormData>({
            query: (data) => ({
                url: '/detect',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['prediction'],
        }),
        // Get detailed information about a disease
        getDiseaseInfo: builder.query<IApiResponse, string>({
            query: (diseaseId) => `/detect/disease-info/${diseaseId}`,
            providesTags: ['disease'],
            keepUnusedDataFor: 600,
        }),
        // Get all predictions
        getAllPredictions: builder.query<IApiResponse, void>({
            query: () => '/detect/all-predictions',
            providesTags: ['prediction'],
            keepUnusedDataFor: 600,
        }),
        // Get user prediction history
        getUserPredictionHistory: builder.query<IApiResponse, string>({
            query: (userId) => `/detect/user-history/${userId}`,
            providesTags: ['prediction'],
            keepUnusedDataFor: 600,
        }),
        // Get all diseases list
        getDiseasesList: builder.query<{ data: IDisease[] }, void>({
            query: () => '/detect/disease-list',
            providesTags: ['disease'],
            keepUnusedDataFor: 600,
        }),
         // Update disease information
         updateDisease: builder.mutation<IApiResponse, { id: string; data: Partial<IDisease> }>({
            query: ({ id, data }) => ({
                url: `/detect/update-disease/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['disease'],
        }),
    }),
});

export const {
    usePredictDiseaseMutation,
    useGetDiseaseInfoQuery,
    useGetAllPredictionsQuery,
    useGetUserPredictionHistoryQuery,
    useGetDiseasesListQuery,
    useUpdateDiseaseMutation,
} = authApi;
