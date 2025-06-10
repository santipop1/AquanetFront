'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createNotification } from '@/services/notifications';
import { ListUsersWithEmail } from '@/services/user/createUser';
import { UseAuth } from '@/providers/AuthProvider';
import { NotificationPayload } from '@/types/NotificationPayload';
import { User } from '@/types/userListDTO';
import './NewNotification.css';

const NotificationForm = () => {
  const [form, setForm] = useState({
    title: '',
    message: '',
    type: 'alert',
    receiverUserId: '',
    sendDateTime: '',
    isEmail: false,
    isRecurrent: false,
    recurrenceIntervalValue: 0,
    recurrenceUnit: 'día',
    durationType: 'siempre',
    recurrenceEndDate: '',
    recurrenceCount: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const { user } = UseAuth();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await ListUsersWithEmail();
        setUsers(data);
      } catch {
        setUsers([]);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    let newValue: string | boolean | number = value;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      newValue = target.checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: NotificationPayload = {
      title: form.title,
      message: form.message,
      type: form.type as 'alert' | 'notification' | 'message',
      isRead: false,
      nextScheduledAt: form.sendDateTime ? new Date(form.sendDateTime) : undefined,
      isPushNotification: true,
      isEmail: form.isEmail,
      isRecurrent: form.isRecurrent,
      senderUserId: user?.id ?? 0,
      receiverUserId: parseInt(form.receiverUserId),
    };
    if (form.isRecurrent) {
      payload.recurrenceIntervalValue = Number(form.recurrenceIntervalValue);
      payload.recurrenceEndType = form.durationType;
      if (form.durationType === 'numero') {
        payload.recurrenceCount = Number(form.recurrenceCount);
      }
      if (form.durationType === 'hasta' && form.recurrenceEndDate) {
        payload.recurrenceEndDate = new Date(form.recurrenceEndDate);
      }
    }
    try {
      const result = await createNotification(payload);
      alert('Notificación enviada correctamente');
      console.log('Resultado:', result);
    } catch {
      alert('Error al enviar notificación');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
      <div className="New-Notification-header">
        <Image src="/logo.png" alt="logo aquanet" width={220} height={80} />
      </div>
      <h2 className="New-Notification-title">Crear Notificación</h2>

      <div>
        <label className="block font-medium">Título</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Mensaje</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Tipo</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="alert">Alerta</option>
          <option value="notification">Notificación</option>
          <option value="message">Mensaje</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Destinatario</label>
        <select
          name="receiverUserId"
          value={form.receiverUserId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecciona un usuario</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} {u.email ? `(${u.email})` : ''}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Fecha y Hora de Envío</label>
        <input
          type="datetime-local"
          name="sendDateTime"
          value={form.sendDateTime}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="email"
          name="isEmail"
          checked={form.isEmail}
          onChange={handleChange}
        />
        <label htmlFor="email">¿Enviar por email?</label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="recurrent"
          name="isRecurrent"
          checked={form.isRecurrent}
          onChange={handleChange}
        />
        <label htmlFor="recurrent">¿Es recurrente?</label>
      </div>

      {form.isRecurrent && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="font-medium">Frecuencia:</label>
            <input
              type="number"
              name="recurrenceIntervalValue"
              value={form.recurrenceIntervalValue}
              onChange={handleChange}
              min={1}
              className="w-20 border p-1 rounded"
            />
            <select
              name="recurrenceUnit"
              value={form.recurrenceUnit}
              onChange={handleChange}
              className="border p-1 rounded"
            >
              <option value="minuto">minuto(s)</option>
              <option value="hora">hora(s)</option>
              <option value="día">día(s)</option>
              <option value="semana">semana(s)</option>
              <option value="mes">mes(es)</option>
              <option value="año">año(s)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Duración</label>
            <select
              name="durationType"
              value={form.durationType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="siempre">Siempre</option>
              <option value="numero">Número específico de veces</option>
              <option value="hasta">Hasta una fecha</option>
            </select>
          </div>

          {form.durationType === 'numero' && (
            <div>
              <input
                type="number"
                name="recurrenceCount"
                value={form.recurrenceCount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Número de repeticiones"
              />
            </div>
          )}

          {form.durationType === 'hasta' && (
            <div>
              <input
                type="date"
                name="recurrenceEndDate"
                value={form.recurrenceEndDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          )}
        </div>
      )}
      <button type="submit" className="New-Notification-boton" > Crear Notificación </button>
    </form>
  );
};

export default NotificationForm;
