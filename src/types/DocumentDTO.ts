export interface DocumentDTO {
    id: number;
    documentTypeId: number;
    documentUrl: string;
    waterPlantId: number;
    status: string;
    acceptedDate: Date;
    comments: string;
    createdAt: Date;
    updatedAt: Date;
}