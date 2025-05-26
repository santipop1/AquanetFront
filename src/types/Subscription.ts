import { User } from "./User";
import { SubscriptionType } from "./SubscriptionType";

export interface Subscription {
    id: number;
    user: User;
    subscriptionType: SubscriptionType;
    lastPayment: Date;
    nextPayment: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
