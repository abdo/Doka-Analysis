import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-doka-yellow to-amber-400 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Doka Logo */}
              <svg
                id="Ebene_1"
                data-name="Ebene 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 277.8 82.66"
                className="h-10 w-auto drop-shadow-md transition-transform hover:scale-105 duration-300"
              >
                <defs>
                  <style>{`
                    .logo_cls-1 { fill: #fd0; }
                    .logo_cls-1, .logo_cls-2 { stroke-width: 0px; }
                    .logo_cls-2 { fill: #004588; }
                  `}</style>
                </defs>
                <rect
                  className="logo_cls-1"
                  width="277.8"
                  height="82.66"
                ></rect>
                <g>
                  <path
                    className="logo_cls-2"
                    d="m114.13,43.46l-2.08,10.24s-24.23,0-25.47,0c.93-4.59,2.05-10.11,2.08-10.24h25.47Zm8.08,10.73l7.09-34.89h-10.21l-2.89,14.22h-26.35c-4.96,0-9.91,4.58-11.05,10.23l-1.93,9.46c-1.14,5.66,1.95,10.24,6.91,10.24h25.56s12.87-9.26,12.87-9.26Zm40.14-10.73l-2.08,10.24c-2.33,0-25.45,0-25.45,0,.59-2.92,1.55-7.56,2.08-10.24h25.45Zm9.94.29c1.16-5.66-1.97-10.24-6.99-10.24h-27.16c-5.02,0-10.03,4.58-11.19,10.24l-1.95,9.46c-1.16,5.66,1.97,10.24,6.99,10.24h25.25l12.85-9.25c.1-.32.18-.66.25-.99l1.95-9.46Zm41.66-9.77l.1-.47h-15.07l-13.42,9.66h-.35s4.85-23.87,4.85-23.87h-10.21l-8.97,44.15h10.21l2.27-11.2h.38l12.88,11.2h15.01l.1-.47-17.24-14.99,19.46-13.99Zm38.19-.47h-27.81c-5.02,0-10.03,4.58-11.19,10.24l-1.9,9.46c-1.16,5.66,1.92,10.24,6.94,10.24h13.03s11.86-9.27,11.86-9.27l.09-.47h-21.92c.44-2.17,1.44-7.12,2.07-10.24h25.4l-4.06,19.98h10.47l4.11-20.26c.84-5.39-2.24-9.67-7.1-9.67"
                  ></path>
                  <g>
                    <polygon
                      className="logo_cls-2"
                      points="37.44 24.75 25.58 34.05 25.58 39.99 37.44 33.07 56.53 42.02 56.53 37.62 37.44 24.75"
                    ></polygon>
                    <polygon
                      className="logo_cls-2"
                      points="63.16 52.9 37.44 47.96 25.58 50.8 25.58 56.81 63.16 56.81 63.16 52.9"
                    ></polygon>
                    <polygon
                      className="logo_cls-2"
                      points="63.16 46.81 37.44 36.26 25.58 42.31 25.58 48.88 37.44 44.97 63.16 51.45 63.16 46.81"
                    ></polygon>
                    <polygon
                      className="logo_cls-2"
                      points="18.95 63.44 18.95 19.22 63.16 19.22 63.16 42.02 59.97 42.02 59.97 22.41 22.13 22.41 22.13 60.26 63.16 60.26 63.16 63.44 18.95 63.44"
                    ></polygon>
                  </g>
                </g>
              </svg>
              <h1 className="text-2xl font-bold text-doka-blue tracking-tight">
                Analysis
              </h1>
            </div>
            <nav className="hidden md:block">
              <ul className="flex gap-6 font-medium text-doka-blue">
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-700 transition-colors duration-200"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-700 transition-colors duration-200"
                  >
                    Reports
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-700 transition-colors duration-200"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-16 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center mb-8 relative">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-doka-yellow/20 blur-3xl rounded-full animate-pulse"></div>

              {/* Construction Icon */}
              <div className="relative bg-gradient-to-br from-doka-blue to-blue-700 p-8 rounded-2xl shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-20 h-20 text-doka-yellow"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-doka-blue mb-4 tracking-tight">
              Building the Future
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-doka-yellow to-amber-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              We're crafting something extraordinary. The{" "}
              <span className="font-semibold text-doka-blue">
                Doka Analysis
              </span>{" "}
              platform is currently under construction.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-doka-yellow hover:-translate-y-1">
              <div className="text-doka-blue mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-doka-blue mb-2">
                Powerful Insights
              </h3>
              <p className="text-gray-600 text-sm">
                Advanced analytics for your construction projects
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-doka-blue hover:-translate-y-1">
              <div className="text-doka-yellow mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-doka-blue mb-2">
                Real-Time Data
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor your projects with live updates
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-doka-yellow hover:-translate-y-1">
              <div className="text-doka-blue mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-doka-blue mb-2">
                Customizable
              </h3>
              <p className="text-gray-600 text-sm">
                Tailored solutions for your unique needs
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-doka-blue to-blue-700 p-10 rounded-2xl shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Launching Soon
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Stay tuned for the official release
            </p>
            <button className="group bg-doka-yellow hover:bg-amber-400 text-doka-blue font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 inline-flex items-center gap-2">
              <span>Learn More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-doka-blue text-white py-8 mt-auto">
        <div className="container mx-auto px-6 text-center">
          <p className="text-blue-200">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold">Doka Analysis</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
