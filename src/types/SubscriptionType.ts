export interface SubscriptionType {
    id: number;
    planName: string;
    paymentFrequencyMonths: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
