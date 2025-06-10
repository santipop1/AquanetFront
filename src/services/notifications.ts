import api from '../services/api';
import { NotificationDetail } from '../types/NotificationDetail';
import { NotificationPayload } from '../types/NotificationPayload';

export const createNotification = async (payload: NotificationPayload) => {
  try {
    const res = await api.post('/notifications', payload);
    return res.data;
  } catch (error) {
    console.error(' Error creando notificación:', error);
    throw error;
  }
};

export const getNotifications = async (useruid: string): Promise<NotificationDetail[]> => {
  try {
    const { data } = await api.post('/notifications/list', useruid, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    console.log('Notificaciones obtenidas:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    throw error;
  }
};

export const markAsReadNotification = async (id: number) => {
  try {
    await api.patch('/notifications/read', id, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error(`Error al marcar como leída la notificación ${id}`, error);
  }
};

