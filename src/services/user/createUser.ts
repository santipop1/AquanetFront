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
  firebaseId: string;
  
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

export const ListUsersWithEmail = async () => {
  try {
      const { data } = await api.get('/users/listwithmail');
      console.log('Usuarios obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
};
