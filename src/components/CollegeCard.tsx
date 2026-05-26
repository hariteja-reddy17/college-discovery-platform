"use client";

import Link from "next/link";
import { useCompareStore } from "@/store/compareStore";

type Props = {
  id: number;
  name: string;
  location: string;
  fees: string;
  rating: number;
  placements: string;
};

export default function CollegeCard({
  id,
  name,
  location,
  fees,
  rating,
  placements,
}: Props) {
  const comparedColleges = useCompareStore((state) => state.comparedColleges);

  const addCollege = useCompareStore((state) => state.addCollege);

  const removeCollege = useCompareStore((state) => state.removeCollege);

  const isSelected = comparedColleges.some((college) => college.id === id);

  const handleCompare = () => {
    if (isSelected) {
      removeCollege(id);
    } else {
      addCollege({
        id,
        name,
        location,
        fees,
        rating,
        placements,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">{name}</h2>

        <span className="bg-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
          ⭐ {rating}
        </span>
      </div>

      <p className="text-gray-600 mb-2">📍 {location}</p>

      <p className="mb-1">
        <span className="font-semibold">Fees:</span> ₹{fees}
      </p>

      <p className="mb-4">
        <span className="font-semibold">Placements:</span> {placements}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" checked={isSelected} onChange={handleCompare} />

        <label>Compare</label>
      </div>

      <div className="flex gap-3">
        <Link href={`/college/${id}`}>
          <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
