"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CollegeCard from "@/components/CollegeCard";
import CompareBar from "@/components/CompareBar";

type College = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
  placements: string;
};

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");

  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    async function fetchColleges() {
      try {
        setLoading(true);

        const response = await fetch("/api/colleges");

        if (!response.ok) {
          throw new Error("Failed to fetch colleges");
        }

        const data = await response.json();

        setColleges(data);
      } catch (err) {
        setError("Unable to load colleges.");
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesLocation = location === "" || college.location === location;

    return matchesSearch && matchesLocation;
  });

  const sortedColleges = [...filteredColleges];

  if (sortBy === "rating") {
    sortedColleges.sort((a, b) => b.rating - a.rating);
  }

  if (sortBy === "fees") {
    sortedColleges.sort(
      (a, b) =>
        parseInt(a.fees.replaceAll(",", "")) -
        parseInt(b.fees.replaceAll(",", "")),
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <section className="bg-slate-900 text-white py-14 px-8 text-center">
        <h1 className="text-5xl font-bold mb-5">
          Discover Your Perfect College
        </h1>

        <p className="text-lg max-w-2xl mx-auto">
          Explore top colleges, compare institutions, and make smarter academic
          decisions.
        </p>
      </section>

      <main className="px-8 py-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search colleges..."
            className="w-full p-4 rounded-xl border bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-4 rounded-xl border bg-white"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>

            <option value="Hyderabad">Hyderabad</option>

            <option value="Warangal">Warangal</option>

            <option value="Pilani">Pilani</option>

            <option value="Delhi">Delhi</option>
          </select>

          <select
            className="p-4 rounded-xl border bg-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>

            <option value="rating">Highest Rating</option>

            <option value="fees">Lowest Fees</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>

                <div className="h-4 bg-gray-300 rounded mb-2"></div>

                <div className="h-4 bg-gray-300 rounded mb-2"></div>

                <div className="h-4 bg-gray-300 rounded mb-6"></div>

                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-6 rounded-xl">{error}</div>
        ) : sortedColleges.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <h2 className="text-3xl font-bold mb-4">No Results Found</h2>

            <p className="text-gray-600 text-lg">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedColleges.map((college) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                location={college.location}
                fees={college.fees}
                rating={college.rating}
                placements={college.placements}
              />
            ))}
          </div>
        )}
      </main>

      <CompareBar />
    </div>
  );
}
