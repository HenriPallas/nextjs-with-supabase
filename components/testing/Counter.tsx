"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Import from shadcn

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold">Counter: {count}</h1>

      <div className="flex gap-4">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement} disabled={count <= 0}>Decrement</Button>
      </div>
    </div>
  );
}