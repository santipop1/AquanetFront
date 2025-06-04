import { FC } from 'react';
import { FaStar, FaEllipsisV } from 'react-icons/fa';
import { NotificationDetail } from '@/types/NotificationDetail';
import clsx from 'clsx';

type Props = {
  notification: NotificationDetail;
  onClick: () => void;
};

const NotificationCard: FC<Props> = ({ notification, onClick }) => {
  const formattedDate = new Date(notification.lastSentAt).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div
      onClick={onClick}
      className={clsx(
        'rounded-md border p-4 flex justify-between items-center cursor-pointer hover:shadow',
        notification.isRead ? 'bg-gray-100 text-gray-500' : 'bg-white'
      )}
    >
      <div className="flex gap-4">
        <input type="checkbox" />
        <div className="flex flex-col">
          <span className="text-md font-bold text-gray-800">{notification.title}</span>
          <span className="text-sm text-gray-600">{notification.message}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-pink-200 text-pink-700 px-2 py-0.5 rounded-full">
              {notification.isRecurrent ? 'Recurrente' : 'Única'}
            </span>
            <span className="text-xs text-gray-400">mitec</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <span className="text-sm">{formattedDate}</span>
        <FaStar />
        <FaEllipsisV />
      </div>
    </div>
  );
};

export default NotificationCard;
