import axios from "axios";
import { encrypt, decrypt } from "./utils/cryptoUtils.js";
import { useState, useEffect } from "react";
import AccountCard from "./components/AccountCard";
import ThemedInput from "./components/ThemedInput";
import ThemedSelect from "./components/ThemedSelect";
import ThemedButton from "./components/ThemedButton";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const [newLogin, setNewLogin] = useState("");
  const [newRiotId, setNewRiotId] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newRegion, setNewRegion] = useState("NA");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/accounts")
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => {
        console.error("Failed to load accounts:", err);
      });
  }, []);

  const addAccount = () => {
    if (!newLogin || !newRiotId || !newTag || !newPassword) return;

    const newAccount = {
      login: newLogin,
      riotId: `${newRiotId}#${newTag}`,
      region: newRegion,
      password: encrypt(newPassword),
      rank: "Unranked",
      lp: "0 LP",
      winRate: "0%",
      imageSrc: "Unranked.webp",
    };

    axios
      .post("http://localhost:4000/api/accounts", newAccount)
      .then((res) => {
        setAccounts([...accounts, res.data]);
        setNewLogin("");
        setNewRiotId("");
        setNewTag("");
        setNewRegion("NA");
        setNewPassword("");
      })
      .catch((err) => {
        console.error("Failed to add account:", err);
      });
  };

  const handleCopy = (text, isPassword = false) => {
    try {
      const value = isPassword ? decrypt(text) : text;
      if (!value) throw new Error("Nothing to copy");
      navigator.clipboard.writeText(value);
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Failed to copy value");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      axios
        .delete(`http://localhost:4000/api/accounts/${id}`)
        .then(() => {
          setAccounts((prev) => prev.filter((acc) => acc.id !== id));
        })
        .catch((err) => {
          console.error("Failed to delete account:", err);
        });
    }
  };

  const refreshAccounts = () => {
    axios
      .get("http://localhost:4000/api/accounts/refresh")
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((err) => {
        console.error("Failed to refresh accounts:", err);
      });
  };

  return (
    <div
      className={`relative smooth-transition p-4 h-screen w-full flex flex-col justify-between overflow-hidden ${
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

      <div className="relative px-4 z-20 flex justify-between items-center mb-4">
        <p
          className={`smooth-transition text-3xl font-sans font-bold ${
            isDarkMode ? "text-dark-text" : "text-light-text"
          }`}
        >
          Distort
        </p>
        <div className="flex space-x-4">
          <ThemedButton
            text={isDarkMode ? "🌑 Dark" : "🌕 Light"}
            onClick={toggleTheme}
            isDarkMode={isDarkMode}
          />
          <ThemedButton
            text="⟳"
            onClick={refreshAccounts}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <div className="relative z-20 px-4 flex flex-col justify-start items-start space-y-4 flex-shrink-0">
        <p
          className={`text-xl font-semibold ${
            isDarkMode ? "text-dark-text" : "text-light-text"
          }`}
        >
          Add Account
        </p>

        <div className="flex flex-wrap gap-2 w-full">
          <ThemedInput
            placeholder="Username Login"
            value={newLogin}
            onChange={(e) => setNewLogin(e.target.value)}
            isDarkMode={isDarkMode}
          />
          <ThemedInput
            placeholder="Riot ID"
            value={newRiotId}
            onChange={(e) => setNewRiotId(e.target.value)}
            isDarkMode={isDarkMode}
          />
          <ThemedInput
            placeholder="#Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value.replace("#", ""))}
            onKeyDown={(e) => e.key === "#" && e.preventDefault()}
            isDarkMode={isDarkMode}
          />
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
            value={newRegion}
            onChange={(e) => setNewRegion(e.target.value)}
            isDarkMode={isDarkMode}
          />
          <div className="relative flex flex-grow w-full sm:w-auto">
            <ThemedInput
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              isDarkMode={isDarkMode}
            />
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
              title="Toggle Password"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <ThemedButton
            text="Add"
            onClick={addAccount}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <div className="relative z-20 px-4 pt-4 flex-grow overflow-hidden">
        <div
          className={`p-4 rounded-2xl shadow h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 ${
            isDarkMode ? "bg-dark-black" : "bg-light-secondary"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 min-h-[16rem]">
            {accounts.length > 0 ? (
              accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  {...account}
                  handleDelete={() => handleDelete(account.id)}
                  handleCopy={handleCopy}
                  isDarkMode={isDarkMode}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-full py-8">
                <p
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-dark-text" : "text-light-text"
                  }`}
                >
                  Add an account!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-20 px-4 mt-4 flex justify-between items-end w-full flex-shrink-0">
        <p className="text-xs font-bold text-green-500">
          Not affiliated with Riot Games.
        </p>
        <button
          className="text-xs text-green-500 hover:underline"
          onClick={() =>
            alert(
              "All account data is stored locally on your device. Passwords and login information are not sent to any server. Only rank and winrate data are fetched online."
            )
          }
        >
          ℹ️ Info
        </button>
      </div>
    </div>
  );
};

export default App;
