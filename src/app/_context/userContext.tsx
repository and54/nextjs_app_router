'use client';

import { ReactNode, createContext, useState } from "react";
import { ISearchData, IUser, IUsersContext } from "../interfaces/interfaces";

export const UsersContext = createContext<IUsersContext>({
  users: [],
  setUsers: () => { },
  searchUser: () => null,
  info: { results: 10, page: 1 },
  setInfo: () => null
});

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [info, setInfo] = useState<ISearchData>({ results: 10, page: 1 });

  const searchUser = (username: string) =>
    users.find(({ login }) => login.username === username) || null;

  return (
    <UsersContext.Provider value={{ users, setUsers, searchUser, info, setInfo }}>
      {children}
    </UsersContext.Provider>
  );
}