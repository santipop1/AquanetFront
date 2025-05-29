'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser, getIdToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/libreria/firebase";
import { User } from "@/types/User";
import { Role } from "@/types/Role";
import { Subscription } from "@/types/Subscription";
import getUserByFirebaseId from "@/services/user/getUserByFirebaseId";
import getSubscriptionByUserId from "@/services/subscription/getSubscriptionByUserId";

// Tipado del contexto
interface AuthContextProps {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  idToken: string | null;
  role: Role | null;
  subscription: Subscription | null;
  setUserContext: (user: User | null) => void;
}

// Contexto con valores seguros por defecto
const AuthContext = createContext<AuthContextProps>({
  user: null,
  firebaseUser: null,
  loading: true,
  idToken: null,
  role: null,
  subscription: null,
  setUserContext: () => {},
});

// Provider global
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Función para actualizar el contexto desde otros componentes
  const setUserContext = (userData: User | null) => {
    setUser(userData);
    setRole(userData?.role || null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await getIdToken(firebaseUser);
          const userData = await getUserByFirebaseId(firebaseUser.uid);

          setFirebaseUser(firebaseUser);
          setIdToken(token);
          setUser(userData);

          if (userData) {
            const subscriptionData = await getSubscriptionByUserId(userData.id);
            setRole(userData.role || null);
            setSubscription(subscriptionData);
          } else {
            setRole(null);
            setSubscription(null);
          }
        } catch (error) {
          console.error("❌ Error al obtener token o usuario:", error);
          setFirebaseUser(null);
          setIdToken(null);
          setUser(null);
          setRole(null);
          setSubscription(null);
        }
      } else {
        setFirebaseUser(null);
        setIdToken(null);
        setUser(null);
        setRole(null);
        setSubscription(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, firebaseUser, loading, idToken, role, subscription, setUserContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto
export const UseAuth = () => useContext(AuthContext);
