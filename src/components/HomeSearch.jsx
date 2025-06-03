"use client";

import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

export default function HomeSearch() {
  const [input, setInput] = useState('');
  const [randomSearchLoading, setRandomSearchLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/search/web?searchTerm=${input}`);
  };

  const randomSearch = async () => {
    setRandomSearchLoading(true);
    try {
      // ✅ Updated API endpoint
      const res = await fetch('https://random-word-api.vercel.app/api?words=1');
      const data = await res.json();
      const word = data[0];

      if (!word) throw new Error("No word returned from API");
      router.push(`/search/web?searchTerm=${word}`);
    } catch (err) {
      console.error("Random search failed:", err.message);
      // Optional fallback
      router.push(`/search/web?searchTerm=example`);
    } finally {
      setRandomSearchLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full mt-5 mx-auto max-w-[90%] border
        border-gray-200 px-5 py-5 rounded-full hover:shadow-md
        focus-within:shadow-md transition-shadow sm:max-w-xl lg:max-w-2xl"
      >
        <AiOutlineSearch className="text-xl text-gray-500 mr-3" />
        <input
          type="text"
          className="flex-grow focus:outline-none"
          onChange={(e) => setInput(e.target.value)}
        />
        <BsFillMicFill className="text-lg" />
      </form>

      <div className="flex flex-col space-y-2 sm:space-y-0 justify-center sm:flex-row mt-8 sm:space-x-4">
        <button
          className="bg-[#f8f9fa] text-sm text-gray-800 hover:ring-gray-200 focus:outline-none 
          active:ring-gray-300 hover:shadow-md w-36 h-10 transition-shadow"
          onClick={handleSubmit}
        >
          Google Search
        </button>
        <button
          disabled={randomSearchLoading}
          className="bg-[#f8f9fa] text-sm text-gray-800 hover:ring-gray-200 focus:outline-none 
          active:ring-gray-300 hover:shadow-md w-36 h-10 transition-shadow
          disabled:opacity-80 disabled:shadow-sm"
          onClick={randomSearch}
        >
          {randomSearchLoading ? 'Loading...' : 'I am feeling lucky'}
        </button>
      </div>
    </>
  );
}
