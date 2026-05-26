"use client";

import Link from "next/link";
import { useCompareStore } from "@/store/compareStore";

export default function ComparePage() {
  const comparedColleges = useCompareStore((state) => state.comparedColleges);

  const removeCollege = useCompareStore((state) => state.removeCollege);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <Link href="/" className="text-blue-600 underline">
        ← Back
      </Link>

      <h1 className="text-5xl font-bold my-8">Compare Colleges</h1>

      {comparedColleges.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">No Colleges Selected</h2>

          <p className="text-gray-600 text-lg">
            Select colleges from homepage to compare.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-4 text-left">Feature</th>

                {comparedColleges.map((college) => (
                  <th key={college.id} className="p-4 text-left">
                    {college.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-4 font-bold">Location</td>

                {comparedColleges.map((college) => (
                  <td key={college.id} className="p-4">
                    {college.location}
                  </td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="p-4 font-bold">Fees</td>

                {comparedColleges.map((college) => (
                  <td key={college.id} className="p-4">
                    ₹{college.fees}
                  </td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="p-4 font-bold">Rating</td>

                {comparedColleges.map((college) => (
                  <td key={college.id} className="p-4">
                    ⭐ {college.rating}
                  </td>
                ))}
              </tr>

              <tr className="border-b">
                <td className="p-4 font-bold">Placements</td>

                {comparedColleges.map((college) => (
                  <td key={college.id} className="p-4">
                    {college.placements}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-bold">Action</td>

                {comparedColleges.map((college) => (
                  <td key={college.id} className="p-4">
                    <button
                      onClick={() => removeCollege(college.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
