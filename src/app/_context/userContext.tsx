'use client';

import { ReactNode, createContext, useState } from "react";
import { IUser, IUsersContext } from "../interfaces/interfaces";

export const UsersContext = createContext<IUsersContext>({
  users: [],
  setUsers: () => { },
  searchUser: () => null,
});

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<IUser[]>([]);

  const searchUser = (username: string) =>
    users.find(({ login }) => login.username === username) || null;

  return (
    <UsersContext.Provider value={{ users, setUsers, searchUser }}>
      {children}
    </UsersContext.Provider>
  );
}