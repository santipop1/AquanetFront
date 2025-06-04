
import api from '../services/api';
import { NotificationDetail } from '../types/NotificationDetail';

export const createNotification = async (payload: any) => {
  try {
    const res = await api.post('/notifications', payload);
    return res.data;
  } catch (error) {
    console.error(' Error creando notificación:', error);
    throw error;
  }
};

export const getNotifications = async (): Promise<NotificationDetail[]> => {
  const { data } = await api.get('/notifications');
  return data;
};

export const markAsReadNotification = async (id: number) => {
  try {
    await api.patch('/notifications/read', id, {
    });
  } catch (error) {
    console.error(`Error al marcar como leída la notificación ${id}`, error);
  }
};

