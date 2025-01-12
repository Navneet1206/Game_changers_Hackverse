import Hero3D from '../components/Hero3D';
import Features from '../components/Features';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-700 to-blue-500 text-white p-14">
      <div className="relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pt-24 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block text-teal-100 drop-shadow-lg">Your Health Journey</span>
                  <span className="block text-cyan-300 drop-shadow-lg">Made Simple</span>
                </h1>
                <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Access medical services, manage documents, and book appointments - all in one place.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <a
                      href="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <a
                      href="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-teal-100 hover:bg-teal-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <div className="mt-3 sm:mt-0 sm:ml-3 rounded-md shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <a
                      href="http://127.0.0.1:5000/"
                      className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-blue-600 hover:to-teal-700 transform transition-transform duration-300 ease-in-out hover:scale-110 md:py-4 md:text-lg md:px-10"
                      target="_blank"
                    >
                      Exercise Monitor
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 animate-floating">
          <Hero3D />
        </div>
      </div>
      <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-2xl mx-auto max-w-4xl mt-12 transform hover:scale-105 transition-transform duration-300">
        <Features />
      </div>
    </div>
  );
}

export default Home;
