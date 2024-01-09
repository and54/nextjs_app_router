import { List } from './_components';

async function getData() {
  const res = await fetch('https://randomuser.me/api/?results=10&seed=ef5a43297aff174b')
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function Home() {
  const { results } = await getData();
  return (
    <List {...{ results }} />
  )
}
