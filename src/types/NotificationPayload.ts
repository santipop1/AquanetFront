
export interface NotificationPayload {
  title: string;
  message: string;
  type: 'alert' | 'notification' | 'message';
  isRead?: boolean;
  nextScheduledAt?: Date | null;
  isPushNotification?: boolean;
  isEmail?: boolean;
  isRecurrent?: boolean;
  senderUserId: number;
  receiverUserId: number;
  recurrenceIntervalValue?: number;
  recurrenceEndType?: string;
  recurrenceCount?: number;
  recurrenceEndDate?: Date | string;
}
