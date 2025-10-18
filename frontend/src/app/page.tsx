import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-3xl text-center p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-100">

          <h1 className="text-6xl font-extrabold text-blue-600 mb-4 tracking-tight sm:text-7xl">
            gemma<span className="text-gray-800">3</span>
          </h1>

          <p className="text-xl text-gray-700 mb-8 font-medium">
            Your smart and helpful AI assitant.
            It can solve any question - programming, scheduling, and etc.
          </p>

          <p className="text-lg text-gray-500 mb-10 italic">
            "Ask me any question. I am ready to study!"
          </p>

          <Link
            href="/chat"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Start
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default Page;