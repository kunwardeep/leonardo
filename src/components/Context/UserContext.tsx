"use client";

import { getSession, logout as severLogout } from "@/app/actions/serverActions";
import { PATHS } from "@/consts";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  jobTitle: string;
}

interface UserContextType {
  user: User | null;
  logout: () => Promise<void>;
  userLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      const storedUser = await getSession();
      setUserLoading(false);
      const user: User = {
        username: storedUser?.username,
        jobTitle: storedUser?.jobTitle,
      };

      setUser(user);
    };

    fn();
  }, []);

  const logout = async () => {
    const loggedOut = await severLogout();
    console.log("loggedOut", loggedOut);
    setUser(null);
    redirect(PATHS.LOGIN);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        userLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
