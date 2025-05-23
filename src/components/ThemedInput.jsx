const ThemedInput = ({
  placeholder,
  type = "text",
  value,
  onChange,
  onKeyDown,
  isDarkMode,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    autoCapitalize="off"
    autoCorrect="off"
    spellCheck={false}
    className={`smooth-transition font-garamond font-bold p-2 border-2 flex-grow shadow rounded ${
      isDarkMode
        ? "bg-dark-secondary text-dark-text border-dark-light"
        : "bg-light-secondary text-light-text border-light-black"
    }`}
  />
);

export default ThemedInput;
