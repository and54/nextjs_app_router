import { Dispatch, SetStateAction } from 'react';

export interface IUsersContext {
  users: IUser[];
  setUsers: Dispatch<SetStateAction<IUser[]>>;
  searchUser: (username: string) => IUser | null;
  info: ISearchData;
  setInfo: Dispatch<SetStateAction<ISearchData>>;
}

export interface IUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
  };
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface ISearchData {
  results: number;
  page: number;
  seed?: string;
}

export interface dataResult {
  results: IUser[];
  info: ISearchData;
}

export interface IList {
  getData: (query: ISearchData) => Promise<dataResult>
}