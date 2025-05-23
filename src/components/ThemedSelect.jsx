const ThemedSelect = ({ options = [], value, onChange, isDarkMode }) => (
  <div className="relative w-32">
    <select
      value={value}
      onChange={onChange}
      className={`appearance-none w-full font-sans p-2 border-2 shadow rounded smooth-transition pr-8 lowercase ${
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

export default ThemedSelect;
