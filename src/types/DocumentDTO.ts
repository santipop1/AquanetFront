export interface DocumentDTO {
    id: number;
    documentTypeId: number;
    documentUrl: string;
    skeletonUrl?: string;
    waterPlantId: number;
    status: string;
    acceptedDate: Date;
    comments: string;
    createdAt: Date;
    updatedAt: Date;
}