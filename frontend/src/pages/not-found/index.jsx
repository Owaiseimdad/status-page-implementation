import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
        404
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/auth/sign-in"
        className="text-white bg-black px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
      >
        Go to Sign In
      </Link>
    </div>
  );
};

export default NotFound;
