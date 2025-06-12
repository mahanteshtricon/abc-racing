import { useQuery } from 'react-query';

export function useTopRacers() {
  return useQuery('topRacers', async () => {
    const response = await fetch('/api/top-racers');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  });
}