import React from "react";
import CopyButton from "./CopyButton";

const AccountCard = ({
  imageSrc,
  riotId,
  login,
  password,
  rank,
  lp,
  winRate,
  index,
  handleDelete,
  handleCopy,
  isDarkMode,
}) => (
  <div className="relative rounded-2xl flex flex-col md:flex-row gap-4 h-full mb-4 p-4 bg-opacity-60 backdrop-blur-lg border border-gray-700">
    <button
      onClick={() => handleDelete(index)}
      className="absolute top-2 right-2 text-xl font-bold hover:text-red-400 transition"
      title="Delete"
    >
      ❌
    </button>
    <div className="w-full md:w-auto md:max-w-[200px] max-h-48 overflow-hidden rounded-2xl">
      <img
        src={`${imageSrc}`}
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
        <p className="text-2xl font-bold font-garamond">{riotId}</p>
        <CopyButton
          label="Copy Login"
          value={login}
          isDarkMode={isDarkMode}
          handleCopy={handleCopy}
        />
        <CopyButton
          label="Copy Password"
          value={password}
          isDarkMode={isDarkMode}
          isPassword={true}
          handleCopy={handleCopy}
        />
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

export default React.memo(AccountCard);
