import { User } from '@/types/User';
import React from 'react';
interface UserInfoProps {
  user: User;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="user-info-admin" style={{ marginBottom: 8, fontSize: 14 }}>
      <div><b>Usuario:</b> {user.firstName} {user.middleName || ''} {user.firstLastName} {user.secondLastName || ''}</div>
      <div><b>Tel:</b> {user.phoneNumber || 'Sin teléfono'}</div>
      <div><b>Correo Firebase:</b> {user.firebaseId}</div>
      {user.birthday && (
        <div><b>Nacimiento:</b> {new Date(user.birthday).toLocaleDateString()}</div>
      )}
    </div>
  );
};

export default UserInfo;
