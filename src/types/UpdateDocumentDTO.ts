export interface UpdateDocumentDTO {
    id: number;
    status: string;
    comments?: string;
    documentUrl?: string;
    skeletonUrl?: string;
}