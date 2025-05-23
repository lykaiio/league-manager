import { useState } from "react";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const accounts = [
    {
      imageSrc: "Silver.webp",
      riotId: "ShadowAssassin#NA1",
      login: "shadow_main_2019",
      password: "securepass123",
      rank: "Silver III",
      lp: "47 LP",
      winRate: "64%",
    },
    {
      imageSrc: "Gold.webp",
      riotId: "DragonSlayer#EUW",
      login: "dragonkiller99",
      password: "dragonsrule!",
      rank: "Gold II",
      lp: "73 LP",
      winRate: "58%",
    },
    {
      imageSrc: "Platinum.webp",
      riotId: "MidLaneGod#KR",
      login: "yasuo_main_kr",
      password: "slicewind2024",
      rank: "Platinum IV",
      lp: "12 LP",
      winRate: "71%",
    },
  ];

  const ThemedInput = ({ placeholder, type = "text" }) => (
    <input
      type={type}
      placeholder={placeholder}
      className={`smooth-transition font-sans p-2 border-2 flex-grow shadow rounded ${
        isDarkMode
          ? "bg-dark-secondary text-dark-text border-dark-light"
          : "bg-light-secondary text-light-text border-light-black"
      }`}
    />
  );

  const ThemedSelect = ({ options = [] }) => (
    <div className="relative">
      <select
        className={`appearance-none w-full font-sans p-2 border-2 shadow rounded smooth-transition pr-8 ${
          isDarkMode
            ? "bg-dark-secondary text-dark-text border-dark-light"
            : "bg-light-secondary text-light-text border-light-black"
        }`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
        ▼
      </div>
    </div>
  );

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const CopyButton = ({ label, value }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleCopy(value)}
        className={`text-sm px-3 py-1 border rounded font-medium smooth-transition ${
          isDarkMode
            ? "bg-dark-secondary text-dark-text border-dark-light hover:bg-dark-light"
            : "bg-light-light text-light-text border-light-black hover:bg-light-darkest"
        }`}
      >
        {label}
      </button>
    </div>
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
      <div className="rounded-2xl text-white flex flex-col md:flex-row gap-4 h-full mb-4 p-4 bg-opacity-60 backdrop-blur-lg border border-gray-700">
        <div className="w-full md:w-auto md:max-w-[200px] max-h-48 overflow-hidden rounded-2xl">
          <img
            src={imageSrc}
            alt="rank"
            className="object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div
          className={`flex-1 overflow-y-auto smooth-transition space-y-2 ${
            isDarkMode ? "text-dark-text" : "text-light-text"
          }`}
        >
          <div className="space-y-1">
            <p className="text-lg font-bold">{riotId}</p>
            <CopyButton label="Copy Login" value={login} />
            <CopyButton label="Copy Password" value={password} />
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

  const ThemedButton = ({ text, onClick }) => (
    <button
      onClick={onClick}
      className={`smooth-transition px-8 py-2 font-bold border-2 shadow flex-shrink-0 rounded ${
        isDarkMode
          ? "bg-dark-secondary border-dark-light text-dark-text hover:bg-gradient-to-t hover:from-cyan-400/50 hover:via-blue-500/10 hover:to-transparent hover:backdrop-blur-lg hover:shadow-2xl hover:shadow-cyan-500/5"
          : "bg-light-light border-light-black text-light-text"
      }`}
    >
      {text}
    </button>
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

      <div className="relative z-20 flex justify-end mb-4 space-x-4">
        <ThemedButton
          text={isDarkMode ? "🌑 Dark" : "🌕 Light"}
          onClick={toggleTheme}
        />
        <ThemedButton text="⟳" />
      </div>

      <div className="pl-4 flex flex-row items-center space-x-4 mb-2">
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
        <div className="flex flex-wrap gap-2 w-full">
          <ThemedInput placeholder="Username Login" />
          <ThemedInput placeholder="Riot ID" />
          <ThemedInput placeholder="#Tag" />
          <ThemedSelect
            options={[
              "NA",
              "EUW",
              "EUNE",
              "KR",
              "OCE",
              "LAN",
              "BR",
              "TR",
              "RU",
              "JP",
            ]}
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full">
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
