import React from 'react';

interface UserInfoProps {
  user: {
    id: number;
    firstName: string;
    middleName?: string | null;
    firstLastName: string;
    secondLastName?: string | null;
    firebaseId: string;
    birthday?: string | null;
    phoneNumber?: string | null;
    curp?: string | null;
    rfc?: string | null;
    profilePictureUrl?: string | null;
  };
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="user-info-admin" style={{ marginBottom: 8, fontSize: 14 }}>
      <div><b>Usuario:</b> {user.firstName} {user.middleName || ''} {user.firstLastName} {user.secondLastName || ''}</div>
      <div><b>Tel:</b> {user.phoneNumber || 'Sin teléfono'}</div>
      <div><b>Correo Firebase:</b> {user.firebaseId}</div>
      {user.birthday && <div><b>Nacimiento:</b> {user.birthday}</div>}
    </div>
  );
};

export default UserInfo;
