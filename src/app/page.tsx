
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="h-screen md:w-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="mx-4 bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center space-y-6 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-800 inline">Welcome to the Assignment.</h1>
        <p className="text-gray-600 text-center max-w-sm">
          Sign up or log in to get started!
        </p>
        <div className="flex space-x-4">
          <Link href='/signup' className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            Sign Up
          </Link>
          <Link href='/login' className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

