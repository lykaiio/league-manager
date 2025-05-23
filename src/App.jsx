import { useState } from "react";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const accounts = [
    {
      imageSrc: "Silver.webp",
      riotId: "ShadowAssassin#NA1",
      login: "shadow_main_2019",
      password: "••••••••••••",
      rank: "Silver III",
      lp: "47 LP",
      winRate: "64%",
    },
    {
      imageSrc: "Gold.webp",
      riotId: "DragonSlayer#EUW",
      login: "dragonkiller99",
      password: "••••••••••••",
      rank: "Gold II",
      lp: "73 LP",
      winRate: "58%",
    },
    {
      imageSrc: "Platinum.webp",
      riotId: "MidLaneGod#KR",
      login: "yasuo_main_kr",
      password: "••••••••••••",
      rank: "Platinum IV",
      lp: "12 LP",
      winRate: "71%",
    },
  ];

  const ThemedButton = ({ text }) => (
    <button
      className={`smooth-transition px-8 py-2 font-bold border-2 shadow flex-shrink-0 ${
        isDarkMode
          ? "bg-dark-secondary border-dark-light text-dark-text hover:bg-gradient-to-t hover:from-cyan-400/50 hover:via-blue-500/10 hover:to-transparent hover:backdrop-blur-lg hover:shadow-2xl hover:shadow-cyan-500/5"
          : "bg-light-light border-light-black text-light-text"
      }`}
    >
      {text}
    </button>
  );

  const AccountCard = ({
    imageSrc,
    riotId,
    login,
    password,
    rank,
    lp,
    winRate,
  }) => {
    return (
      <div className="rounded-2xl text-white flex flex-col md:flex-row gap-4 h-full mb-4">
        <div className="w-full md:w-auto md:max-w-[200px] max-h-48 overflow-hidden rounded-2xl">
          <img
            src={imageSrc}
            alt="rank"
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div
          className={`flex-1 overflow-y-auto py-2 smooth-transition space-y-2 ${
            isDarkMode ? "text-dark-text" : "text-light-text"
          }`}
        >
          <div className="space-y-1">
            <p className="text-lg font-bold">{riotId}</p>
            <p className="text-sm opacity-75">Login: {login}</p>
            <p className="text-sm opacity-75">Password: {password}</p>
          </div>

          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-md font-semibold">{rank}</p>
                <p className="text-sm opacity-75">{lp}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Win Rate</p>
                <p
                  className={`text-md font-semibold ${
                    parseInt(winRate) >= 60
                      ? "text-green-400"
                      : parseInt(winRate) >= 50
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {winRate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ThemedInput = ({ placeholder, type = "text" }) => (
    <input
      type={type}
      placeholder={placeholder}
      className={`smooth-transition font-sans p-2 border-2 flex-grow shadow ${
        isDarkMode
          ? "bg-dark-secondary text-dark-text border-dark-light"
          : "bg-light-secondary text-light-text border-light-black"
      }`}
    />
  );

  return (
    <div
      className={`relative smooth-transition p-4 min-h-screen w-full ${
        isDarkMode
          ? "bg-gradient-to-t from-dark-darkest to-dark-black"
          : "bg-gradient-to-t from-light-secondary to-light-darkest"
      }`}
    >
      {isDarkMode && (
        <>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cyan-400/25 via-blue-500/10 to-transparent backdrop-blur-lg z-10 pointer-events-none animate-pulse shadow-2xl shadow-cyan-500/5" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cyan-400/25 via-blue-500/10 to-transparent backdrop-blur-lg z-10 pointer-events-none animate-pulse shadow-2xl shadow-cyan-500/5" />
        </>
      )}

      <div className="absolute inset-0 ring-inset ring-2 ring-black/20 pointer-events-none z-10" />

      <div className="relative z-20 flex justify-end mb-4">
        <button
          onClick={toggleTheme}
          className={`smooth-transition px-6 py-2 text-xl font-bold border-2 shadow box-border min-w-[120px] text-center ${
            isDarkMode
              ? "bg-dark-secondary border-dark-light text-dark-text hover:bg-gradient-to-t hover:from-cyan-400/35 hover:via-blue-500/10 hover:to-transparent hover:backdrop-blur-lg hover:shadow-2xl hover:shadow-cyan-500/5"
              : "bg-light-light border-light-black text-light-text"
          }`}
        >
          {isDarkMode ? "🌑 Dark" : "🌕 Light"}
        </button>
      </div>

      <div className="pl-4 flex flex-row items-center space-x-4">
        <p
          className={`smooth-transition text-2xl font-sans font-bold ${
            isDarkMode ? "text-dark-text" : "text-light-text"
          }`}
        >
          Add Account
        </p>
        <span
          className={`text-sm font-sans font-medium smooth-transition ${
            isDarkMode ? "" : "text-light-text"
          }`}
          style={isDarkMode ? { color: "#00FF9C" } : {}}
        >
          *Not affiliated with Riot Games
        </span>
      </div>

      <div className="relative z-20 pl-4 flex flex-col justify-start items-start space-y-2">
        <div className="flex w-9/10 flex-row space-x-2">
          <ThemedInput placeholder="Username Login" />
          <ThemedInput placeholder="Riot ID" />
          <ThemedInput placeholder="#Tag" />
        </div>

        <div className="flex w-9/10 flex-row space-x-2">
          <ThemedInput placeholder="Password" type="password" />
          <ThemedButton text="Add" />
        </div>

        <div className="relative w-full mt-4">
          <div
            className={`p-4 rounded-2xl shadow max-h-96 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 ${
              isDarkMode ? "bg-dark-black" : "bg-light-secondary"
            }`}
            style={{ width: "calc(100% - 1rem)" }}
          >
            <div className="grid grid-cols-1 gap-4">
              {accounts.map((account, index) => (
                <AccountCard
                  key={index}
                  imageSrc={account.imageSrc}
                  riotId={account.riotId}
                  login={account.login}
                  password={account.password}
                  rank={account.rank}
                  lp={account.lp}
                  winRate={account.winRate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
