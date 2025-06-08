import { FC, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { NotificationDetail } from '@/types/NotificationDetail';

type Props = {
  notification: NotificationDetail;
  onClose: () => void;
};

const NotificationModal: FC<Props> = ({ notification, onClose }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const date = new Date(notification.lastSentAt);
    setFormattedDate(
      date.toLocaleString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
      })
    );
  }, [notification.lastSentAt]);

  return (
    <div className="absolute left-1/2 top-20 transform -translate-x-1/2 z-50 bg-[#5a8684] shadow-xl border border-gray-200 rounded-lg w-[90%] max-w-2xl p-6">
      <div className="relative text-white">
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-200"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h3 className="text-xl font-bold mb-2">{notification.title}</h3>
        <div className="text-sm flex gap-4 mb-4">
          <span>{formattedDate}</span>
          <span>mitec</span>
        </div>

        <p className="mb-4">{notification.message}</p>

        {notification.recurrenceEndDate && (
          <p className="text-sm mt-2">
            Finaliza el{' '}
            {new Date(notification.recurrenceEndDate).toLocaleDateString('es-MX')}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
