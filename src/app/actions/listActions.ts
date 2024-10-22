'use server';

import { ISearchData } from '../interfaces/interfaces';

export const getData = async ({ results, seed, page }: ISearchData) => {
  const url = new URL('https://randomuser.me/api/');

  const params: { [key: string]: any } = { seed, results, page, rn: Math.random() };
  Object.keys(params).forEach(key => !params[key] && delete params[key]);

  url.search = new URLSearchParams(params).toString();

  const res = await fetch(url);
  if (!res.ok) return { error: 'Failed to fetch data' };

  return res.json();
}