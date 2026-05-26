"use client";

import Link from "next/link";
import { useCompareStore } from "@/store/compareStore";

export default function CompareBar() {
  const comparedColleges = useCompareStore((state) => state.comparedColleges);

  if (comparedColleges.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 text-white p-4 shadow-lg flex justify-between items-center z-50">
      <div>
        <p className="font-semibold">
          {comparedColleges.length} college(s) selected
        </p>

        <div className="flex gap-2 mt-1">
          {comparedColleges.map((college) => (
            <span
              key={college.id}
              className="bg-white text-black px-2 py-1 rounded"
            >
              {college.name}
            </span>
          ))}
        </div>
      </div>

      <Link href="/compare">
        <button className="bg-slate-900 text-white px-5 py-2 rounded-lg font-semibold">
          Compare Now
        </button>
      </Link>
    </div>
  );
}
