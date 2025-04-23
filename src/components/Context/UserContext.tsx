"use client";

import {
  getSession,
  logout as serverLogout,
  updateUser,
} from "@/app/actions/serverActions";
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
  updateUsername: (username: string) => Promise<boolean>;
  updateJobTitle: (jobTitle: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fn = async () => {
      setUserLoading(true);
      const storedUser = await getSession();
      setUserLoading(false);

      const user: User | null = storedUser
        ? {
            username: storedUser.username,
            jobTitle: storedUser.jobTitle,
          }
        : null;

      setUser(user);
    };

    fn();
  }, []);

  const logout = async () => {
    await serverLogout();
    setUser(null);
    redirect(PATHS.LOGIN);
  };

  const updateUsername = async (username: string) => {
    if (!user) {
      return Promise.reject(false);
    }
    const userObj = { username, jobTitle: user.jobTitle };
    const userUpdated = await updateUser(userObj);
    if (userUpdated) {
      setUser(userObj);
    }

    return true;
  };

  const updateJobTitle = async (jobTitle: string) => {
    if (!user) {
      return Promise.reject(false);
    }
    const userObj = { username: user.username, jobTitle };
    const userUpdated = await updateUser(userObj);
    if (userUpdated) {
      setUser(userObj);
    }

    return true;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        userLoading,
        updateUsername,
        updateJobTitle,
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
