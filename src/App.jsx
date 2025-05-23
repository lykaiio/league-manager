import { useEffect, useState } from "react";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`relative smooth-transition p-4 min-h-screen w-full ${
        isDarkMode
          ? "bg-linear-to-t from-dark-black to-dark-darkest"
          : "bg-linear-to-t from-light-secondary to-light-darkest"
      }`}
    >
      {/* Mirror edges*/}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cyan-400/15 via-blue-500/10 to-transparent backdrop-blur-lg z-10 pointer-events-none animate-pulse shadow-2xl shadow-cyan-500/5" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cyan-400/15 via-blue-500/10 to-transparent backdrop-blur-lg z-10 pointer-events-none animate-pulse shadow-2xl shadow-cyan-500/5" />
      {/* Vignette ring */}
      <div className="absolute inset-0 ring-inset ring-2 ring-black/20 pointer-events-none z-10" />

      <div className="relative z-20 flex flex-1 justify-end">
        {" "}
        <button
          onClick={toggleTheme}
          className={`smooth-transition p-2 text-4xl rounded-4xl shadow ${
            isDarkMode
              ? "bg-radial-[at_25%_25%] from-dark-light to-dark-lighter"
              : "bg-light-light"
          }`}
        >
          {isDarkMode ? "🌑" : "🌕"}
        </button>
      </div>
      <div className="relative z-20 pl-4 flex flex-1 flex-col justify-start items-start space-y-2">
        <p
          className={`smooth-transition pb-2 text-2xl font-sans font-bold ${
            isDarkMode ? "text-dark-text" : "text-light-text"
          }`}
        >
          Add Account
        </p>
        <input
          className={`smooth-transition font-sans border-2 p-2 w-9/10 shadow ${
            isDarkMode
              ? "bg-dark-secondary text-dark-text border-dark-light"
              : "bg-light-secondary text-light-text"
          }`}
          placeholder="Username"
        />
        <div className="flex flex-1 w-9/10 flex-row space-x-2">
          <input
            className={`smooth-transition font-sans p-2 border-2 flex-grow shadow ${
              isDarkMode
                ? "bg-dark-secondary text-dark-text border-dark-light"
                : "bg-light-secondary text-light-text"
            }`}
            placeholder="Password"
          />
          <button
            className={`smooth-transition px-8 font-bold border-2 shadow flex-shrink-0
            ${
              isDarkMode
                ? "bg-dark-secondary border-dark-light text-dark-text"
                : "bg-light-light text-light_text"
            }
            hover:bg-gradient-to-t hover:from-cyan-400/35 hover:via-blue-500/10 hover:to-transparent
            hover:backdrop-blur-lg hover:shadow-2xl hover:shadow-cyan-500/5
          `}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
