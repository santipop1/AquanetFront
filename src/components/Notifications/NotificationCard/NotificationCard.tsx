import { FC } from "react";
import { NotificationDetail } from "@/types/NotificationDetail";
import clsx from "clsx";

type Props = {
  notification: NotificationDetail;
  onClick: () => void;
};

const NotificationCard: FC<Props> = ({ notification, onClick }) => {
  const formattedDate = new Date(notification.lastSentAt).toLocaleDateString(
    "es-MX",
    {
      day: "2-digit",
      month: "short",
    }
  );

  return (
    <div
      onClick={onClick}
      className={clsx(
        "rounded-md border p-4 flex justify-between items-center cursor-pointer hover:shadow",
        notification.isRead ? "bg-gray-100 text-gray-500" : "bg-white"
      )}
    >
      <div className="flex gap-4">
        <div className="flex flex-col">
          <span className="text-md font-bold text-gray-800">
            {notification.title}
          </span>
          <span className="text-sm text-gray-600">{notification.message}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-black-700 px-2 py-0.5 ">
              {notification.isRecurrent
                ? "Notificación Recurrente"
                : "Notificación Única"}
            </span>
            <span
              className={clsx(
                "text-xs px-2 py-0.5 rounded-full font-semibold",
                notification.type === "notification" &&
                  "bg-green-100 text-green-700",
                notification.type === "alert" && "bg-red-100 text-red-700",
                notification.type === "message" && "bg-blue-100 text-blue-700",
                !["notification", "alert", "message"].includes(
                  notification.type || ""
                ) && "bg-gray-100 text-gray-500"
              )}
            >
              {notification.type}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <span className="text-sm">{formattedDate}</span>
      </div>
    </div>
  );
};

export default NotificationCard;
