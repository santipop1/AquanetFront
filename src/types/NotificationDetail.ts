export type NotificationDetail = {
  id: number;
  title: string;
  message: string;
  type: 'alert' | 'notification' | 'message';
  isRead: boolean;
  isEmail: boolean;
  isPushNotification: boolean;
  isRecurrent: boolean;
  recurrenceIntervalValue: number;
  recurrenceEndType: string;
  recurrenceCount: number;
  createdAt: string | null;
  updatedAt: string | null;
  sentAt: string | null;
  lastSentAt: string;
  nextScheduledAt: string | null;
  recurrenceEndDate: string;
  senderUser: {
    id: number;
    firebaseId: string;
  };
  receiverUser: {
    id: number;
    firebaseId: string;
  };
};
