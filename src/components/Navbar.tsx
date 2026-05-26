import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-5 flex justify-between items-center shadow-md">
      <Link href="/">
        <h1 className="text-3xl font-bold cursor-pointer">College Finder</h1>
      </Link>

      <div className="flex gap-6 text-lg">
        <Link href="/" className="hover:text-gray-200">
          Home
        </Link>

        <Link href="/compare" className="hover:text-gray-200">
          Compare
        </Link>
      </div>
    </nav>
  );
}
