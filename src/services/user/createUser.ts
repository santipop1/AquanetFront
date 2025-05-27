import api from '../api';

export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  firstLastName: string;
  secondLastName: string;
  birthday: Date;
  phoneNumber: string;
  curp: string;
  rfc: string;
  profilePictureUrl: string;
  roleId: number;
}

export const createUser = async (payload: CreateUserPayload) => {
  try {
    const res = await api.post('/users', payload);
    return res.data;
  } catch (error) {
    console.error('❌ Error creando usuario:', error);
    throw error;
  }
};
