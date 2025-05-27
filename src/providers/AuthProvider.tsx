"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User , getIdToken , onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/libreria/firebase";
import api  from "@/services/api";

//Tipar lo que queremos compartir en el contexto

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    idToken: string | null;
    useruid: string | null;
    role: string | null;

}

// Crear el contexto
const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    idToken: null,
    useruid: null,
    role: null
});

// Crear el provider para envolver la app

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [idToken, setIdToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [useruid, setUserUid] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            

            if (firebaseUser) {
                try {
                    const token = await getIdToken(firebaseUser);
                    setIdToken(token);
                    setUserUid(firebaseUser.uid); // <--- Añadir esta línea
                    // Aquí puedes obtener el rol del usuario desde tu base de datos
                    // Por ejemplo:
                    // const userRole = await getUserRoleFromDatabase(user.uid);
                    //setRole('admin');
                    // si existe una sesion, obtener el rol de algun storage como sessionStorage o localStorage
                } catch (error) {
                    console.error("Error al obtener el token:", error);
                    setIdToken(null);
                    setUserUid(null); // <--- Asegurarse de limpiar en caso de error
                    setRole(null);
                }
            } else {
                setUser(null);
                setIdToken(null);
                setUserUid(null); // <--- Asegurarse de limpiar si no hay usuario
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, idToken, role, useruid }}>
            {children}
        </AuthContext.Provider>
    );
};

// crear un hook para usar el contexto
export const UseAuth = () => useContext(AuthContext);


