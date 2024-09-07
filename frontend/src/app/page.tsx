import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/path/to/your/background-image.jpg')] bg-cover bg-center"></div>
      <div className="relative z-10 p-6 bg-white shadow-lg rounded-lg text-center max-w-lg mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to To-Do List App
        </h1>
        <p className="text-lg text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Organize your tasks efficiently with our easy-to-use app.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/login"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
