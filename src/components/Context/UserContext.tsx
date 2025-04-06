"use client";

import { createContext, useContext, useEffect, useState } from "react";
const LOCAL_STORAGE_KEY = "leonardo_user";

const getUser = (): User | null => {
  console.log("getUser");
  try {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error when getting User", error);
    return null;
  }
};
const storeUser = (user: User): boolean => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error("Error when storing User", error);
    return false;
  }
};

const removeUser = (): boolean => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error when removing User", error);
    return false;
  }
};

interface User {
  username: string;
  jobTitle: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => boolean;
  removeUser: () => boolean;
  fetchUser: () => User | null;
  userLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setUserLoading(false);
  }, []);

  const saveUser = (user: User) => {
    setUser(user);
    return storeUser(user);
  };

  const deleteUser = () => {
    const userRemoved = removeUser();
    if (userRemoved) {
      setUser(null);
    }
    return userRemoved;
  };

  const fetchUser = () => {
    return getUser();
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: saveUser,
        removeUser: deleteUser,
        userLoading: userLoading,
        fetchUser: fetchUser,
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
