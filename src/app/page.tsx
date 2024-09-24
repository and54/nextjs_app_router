import { List } from './_components';
import { ISearchData } from './interfaces/interfaces';

const getData = async ({ results, seed, page }: ISearchData) => {
  const queryParams = (seed ? `seed=${seed}` : '') +
    (seed ? '&' : '') + `results=${results || 10}` +
    `&page=${page || 1}`;

  const res = await fetch(`https://randomuser.me/api/?${queryParams}&rn=${Math.random()}`)
  if (!res.ok) throw new Error('Failed to fetch data');

  return res.json();
}

const Home = async ({ searchParams }: { searchParams: ISearchData; }) => {
  const data = await getData(searchParams || {});

  return <List {...data} />;
}

export default Home