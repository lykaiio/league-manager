const CopyButton = ({
  label,
  value,
  isDarkMode,
  handleCopy,
  isPassword = false,
}) => (
  <div className="flex items-center space-x-2">
    <button
      onClick={() => handleCopy(value, isPassword)}
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

export default CopyButton;
