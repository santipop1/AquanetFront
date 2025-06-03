import { Role } from "./Role";

export interface User {
    id: number;
    firstName: string;
    middleName: string;
    firstLastName: string;
    secondLastName: string;
    firebaseId: string;
    birthday: Date;
    phoneNumber: string;
    curp: string;
    rfc: string;
    profilePictureUrl: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    
};