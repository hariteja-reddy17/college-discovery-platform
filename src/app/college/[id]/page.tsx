import { colleges } from "@/data/colleges";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CollegeDetails({ params }: Props) {
  const { id } = await params;

  const college = colleges.find((college) => college.id === Number(id));

  if (!college) {
    return <div className="p-6">College not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link href="/" className="text-blue-600 underline">
        ← Back
      </Link>

      <div className="bg-white shadow-lg rounded-2xl p-8 mt-4">
        <h1 className="text-4xl font-bold mb-4">{college.name}</h1>

        <p className="text-gray-600 mb-4">📍 {college.location}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-xl">
            <h2 className="font-bold">Fees</h2>

            <p>₹{college.fees}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl">
            <h2 className="font-bold">Placements</h2>

            <p>{college.placements}</p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl">
            <h2 className="font-bold">Rating</h2>

            <p>⭐ {college.rating}</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">Overview</h2>

        <p className="mb-6 text-gray-700">{college.description}</p>

        <h2 className="text-2xl font-bold mb-3">Courses Offered</h2>

        <ul className="list-disc pl-6 mb-8">
          {college.courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>

        <div className="space-y-4 mb-8">
          {college.reviews.map((review) => (
            <div key={review} className="bg-slate-100 p-4 rounded-xl">
              {review}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Gallery</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {college.gallery.map((image) => (
            <img
              key={image}
              src={image}
              alt="College"
              className="rounded-xl h-64 w-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
