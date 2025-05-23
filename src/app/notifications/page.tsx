'use client';

import { useEffect, useState } from 'react';
import NotificationCard from '@/components/Notifications/NotificationCard/NotificationCard';
import NotificationModal from '@/components/Notifications/NotificationModal/NotificationModal';
import { NotificationDetail } from '@/types/NotificationDetail';
import { getNotifications } from '@/services/notifications';
import { markAsReadNotification } from '@/services/notifications';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationDetail[]>([]);
  const [selected, setSelected] = useState<NotificationDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error('Error fetching notifications', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Notificaciones{' '}
        <span className="bg-pink-500 text-white rounded-full px-3 py-1 text-sm">
          {notifications.length}
        </span>
      </h2>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <NotificationCard
            key={notif.id}
            notification={notif}
            onClick={async () => {
              await markAsReadNotification(notif.id);   //  llamada al endpoint
              setSelected(notif);
              // opcional: actualizar el estado local para reflejar el cambio
              setNotifications((prev) =>
                prev.map((n) => n.id === notif.id ? { ...n, isRead: true } : n)
              );
            }}
          />
        ))}
      </div>

      {selected && (
        <NotificationModal
          notification={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
