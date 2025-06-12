import React from 'react';
import { useTopRacers } from './useTopRacers';

interface Racer {
  id: string;
  name: string;
  country: string;
  points: number;
}

export function TopRacers() {
  const { data, isLoading } = useTopRacers() as { data: Racer[]; isLoading: boolean };

  if (isLoading) return <p>Loading...</p>;

    const [bookmarked, setBookmarked] = React.useState<string[]>([]);

    function toggleBookmark(id: string): void {
        setBookmarked((prev) =>
            prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
        );
    }

    function isBookmarked(id: string): boolean {
        return bookmarked.includes(id);
    }
  return (
    <section aria-label="Top 5 Racers" className="p-4">
      <h2 className="text-xl font-bold">🏁 Top 5 Racers</h2>
      <ul className="grid gap-4 mt-4">
        {data.map((racer) => (
          <li key={racer.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{racer.name}</p>
                <p className="text-sm text-gray-600">{racer.country}</p>
              </div>
              <span className="text-lg font-bold">{racer.points} pts</span>
            </div>
            <button
              onClick={() => toggleBookmark(racer.id)}
              aria-label="Bookmark Racer"
              className="mt-2 text-sm text-blue-600 underline"
            >
              {isBookmarked(racer.id) ? 'Remove Bookmark' : 'Bookmark'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}