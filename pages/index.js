import { useRef } from 'react';
import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

const useRepo = () =>
  useSWR('https://api.github.com/repos/vercel/swr', fetcher);

const Updater = () => {
  const renderCountRef = useRef(0);
  const { mutate } = useRepo();

  renderCountRef.current = renderCountRef.current + 1;
  console.log('updater', renderCountRef.current);

  return <button onClick={mutate}>update</button>;
};

const Viewer = () => {
  const renderCountRef = useRef(0);
  const { data, error } = useRepo();

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';

  renderCountRef.current = renderCountRef.current + 1;
  console.log('viewer', renderCountRef.current);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};

export default function App() {
  return (
    <>
      <Updater />
      <Viewer />
    </>
  );
}
