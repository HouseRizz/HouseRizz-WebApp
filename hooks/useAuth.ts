// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { User, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { auth } from "@/config/firebase.config";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    const unsubscribeIdToken = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser(user);
      }
    });

    return () => {
      unsubscribeAuthState();
      unsubscribeIdToken();
    };
  }, []);

  return { user, loading };
};
