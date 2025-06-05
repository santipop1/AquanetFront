'use client';

import { useEffect, useState } from 'react';
import { FiBell } from 'react-icons/fi';
import { NotificationDetail } from '@/types/NotificationDetail';
import { getNotifications } from '@/services/notifications';
import { useRouter } from 'next/navigation';
import { UseAuth } from '@/providers/AuthProvider'; // ajusta la ruta si es distinta


export const NotificationDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState<NotificationDetail[]>([]);
  const { firebaseUser, loading } = UseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firebaseUser || loading) return;

    const fetchData = async () => {
      try {
        const data = await getNotifications(firebaseUser.uid);
        setNotifications(data);
      } catch (err) {
        console.error('Error loading notifications', err);
      }
    };
    
    fetchData();
  }, [firebaseUser, loading]);

  const formatDateDiff = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffInMs = now.getTime() - then.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return `${diffInDays}d`;
  };

  const handleBellClick = () => {
    router.push('/notifications');
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="relative cursor-pointer" onClick={handleBellClick}>
        <div className='min-w-40 max-w-40 border-2 rounded-2xl justify-center text-md flex flex-row items-center py-0.5 text-gray-700 hover:text-blue-500'>
          <FiBell className="text-2xl pr-1" />
          Notificaciones
        </div>
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
            {notifications.length}
          </span>
        )}
      </div>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-[320px] bg-white border border-gray-200 rounded shadow-lg z-50">
          <div style={{ background: '#8cc2c0' }} className="text-white px-4 py-2 font-semibold rounded-t">

            Notificaciones
          </div>
          <ul className="max-h-96 overflow-y-auto">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800">
                      {n.title}
                    </span>
                    <span className="text-sm text-gray-600">
                      {n.message}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      Tecnológico de Monterrey | mITec
                    </span>
                  </div>
                  <div className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 h-fit">
                    {formatDateDiff(n.lastSentAt)}
                  </div>
                </div>
              </li>
            ))}

            {notifications.length === 0 && (
              <li className="p-4 text-sm text-gray-500 text-center">
                No hay notificaciones
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
