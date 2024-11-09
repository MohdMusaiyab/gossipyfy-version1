import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #090919, #161837)",
      }}
    >
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-6 text-purple-200">
        Sorry, we couldn't find the page you're looking for.
      </p>

      <Link href="/">
        <button className="px-6 py-3 rounded-md border border-purple-400 text-purple-400 hover:bg-purple-500/20 transition">
          Go back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
