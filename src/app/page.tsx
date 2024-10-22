import { List } from './_components';
import { ISearchData } from './interfaces/interfaces';

const Home = () => {

  const getData = async ({ results, seed, page }: ISearchData) => {
    'use server';

    const url = new URL('https://randomuser.me/api/');
    const params: { [key: string]: any } = { seed, results, page, rn: Math.random() };
    Object.keys(params).forEach(key => !params[key] && delete params[key]);
    url.search = new URLSearchParams(params).toString();

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
  }

  return <List getData={getData} />;
}

export default Home;