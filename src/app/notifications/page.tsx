"use client";

import "./notifications.css";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import NotificationCard from "@/components/Notifications/NotificationCard/NotificationCard";
import NotificationModal from "@/components/Notifications/NotificationModal/NotificationModal";
import { NotificationDetail } from "@/types/NotificationDetail";
import { getNotifications } from "@/services/notifications";
import { markAsReadNotification } from "@/services/notifications";
import NotificationForm from "@/components/Notifications/NewNotification/NewNotification";
import { UseAuth } from "@/providers/AuthProvider";


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationDetail[]>([]);
  const [selected, setSelected] = useState<NotificationDetail | null>(null);
  const { firebaseUser, loading, user } = UseAuth();
  console.log('user from UseAuth:', user);
  console.log('firebaseUser from UseAuth:', firebaseUser);

  useEffect(() => {
    if (!firebaseUser || loading) return;

    const fetchData = async () => {
      try {
        const data = await getNotifications(firebaseUser.uid);
        setNotifications(data);
      } catch (err) {
        console.error("Error loading notifications", err);
      }
    };

    fetchData();
  }, [firebaseUser, loading]);

  return (
    <>
      <Header />
      <div className="notifications-background">
      <div className="max-w-4xl mx-auto mt-8 px-4 ">
        <h2 className="text-2xl font-bold mb-4">
          Notificaciones{" "}
          <span
            style={{ background: "#FF0000" }}
            className="text-white rounded-full px-3 py-1 text-sm"
          >
            {notifications.length}
          </span>
        </h2>

        {/* Solo mostrar el formulario si el usuario es admin (role.id === 2) */}
        {user?.role?.id === 2 && <NotificationForm />}
        {user?.role?.id === 3 && <NotificationForm />}

        <div className="space-y-3">
          {notifications.map((notif) => (
            <NotificationCard
              key={notif.id}
              notification={notif}
              onClick={async () => {
                await markAsReadNotification(notif.id); //  llamada al endpoint
                setSelected(notif);
                // opcional: actualizar el estado local para reflejar el cambio
                setNotifications((prev) =>
                  prev.map((n) =>
                    n.id === notif.id ? { ...n, isRead: true } : n
                  )
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
      </div>
    </>
  );
}
