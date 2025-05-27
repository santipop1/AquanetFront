"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { User as FirebaseUser , getIdToken , onAuthStateChanged } from "firebase/auth";
import { User } from "@/types/User";
import { auth } from "@/app/libreria/firebase";
import getUserByFirebaseId from "@/services/user/getUserByFirebaseId";
import { Role } from "@/types/Role";
import { Subscription } from "@/types/Subscription";
import getSubscriptionByUserId from "@/services/subscription/getSubscriptionByUserId";

interface AuthContextProps {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  idToken: string | null;
  role: Role | null;
  subscription: Subscription | null;
  setUserContext: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  firebaseUser: null,
  loading: true,
  idToken: null,
  role: null,
  subscription: null,
  setUserContext: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

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
            setRole(userData.role);
            setSubscription(subscriptionData);
          }
        } catch (error) {
          console.error("Error al obtener el token:", error);
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
    <AuthContext.Provider value={{ user, firebaseUser, loading, idToken, role, subscription, setUserContext: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
