const ThemedButton = ({ text, onClick, isDarkMode }) => (
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

export default ThemedButton;
