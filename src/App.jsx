// ==============================================================================
// IMPORTS - External libraries and internal components
// ==============================================================================

// Axios - HTTP client library for making API requests to our backend server
import axios from "axios";

// Custom utility function for decrypting passwords stored in the database
import { decrypt } from "./utils/cryptoUtils.js";

// React hooks - built-in functions for managing component state and lifecycle
import { useState, useEffect } from "react";

// Custom UI components - reusable styled components for consistent design
import AccountCard from "./components/AccountCard";
import ThemedInput from "./components/ThemedInput";
import ThemedSelect from "./components/ThemedSelect";
import ThemedButton from "./components/ThemedButton";

// ==============================================================================
// MAIN APP COMPONENT
// ==============================================================================

const App = () => {
  // ============================================================================
  // STATE MANAGEMENT - Using React's useState hook to manage component data
  // ============================================================================

  // Theme state - controls dark/light mode appearance
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Helper function to toggle between dark and light themes
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Form states for adding new League of Legends accounts
  const [newLogin, setNewLogin] = useState(""); // Account username/email
  const [newRiotId, setNewRiotId] = useState(""); // Riot ID (part before #)
  const [newTag, setNewTag] = useState(""); // Tag/tagline (part after #)
  const [newRegion, setNewRegion] = useState("NA"); // Server region
  const [newPassword, setNewPassword] = useState(""); // Account password
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  // State to store all user accounts fetched from the backend database
  const [accounts, setAccounts] = useState([]);

  // Loading states for better user experience (UX)
  const [isLoading, setIsLoading] = useState(false); // General loading state
  const [isRefreshing, setIsRefreshing] = useState(false); // Specific to refresh operation

  // ============================================================================
  // LIFECYCLE EFFECTS - Using React's useEffect hook for side effects
  // ============================================================================

  /**
   * Load all accounts from the backend when the app starts
   * useEffect with empty dependency array [] runs once when component mounts
   * Similar to componentDidMount in class components
   */
  useEffect(() => {
    loadAccounts();
  }, []); // Empty dependency array means this runs only once

  // ============================================================================
  // API FUNCTIONS - Functions that communicate with our backend server
  // ============================================================================

  /**
   * Fetch all accounts from the backend API
   * Uses async/await for handling asynchronous operations
   */
  const loadAccounts = async () => {
    setIsLoading(true); // Show loading state to user

    try {
      // Make GET request to our Express.js backend server
      const response = await axios.get("http://localhost:4000/api/accounts");

      console.log("✅ Successfully loaded accounts:", response.data);

      // Update React state with fetched data, triggers re-render
      setAccounts(response.data);
    } catch (error) {
      // Handle network errors, server errors, etc.
      console.error("❌ Failed to load accounts:", error);

      // Show user-friendly error message
      alert("❌ Failed to load accounts. Please check your server connection.");
    } finally {
      // Always runs regardless of success/failure
      setIsLoading(false); // Hide loading state
    }
  };

  /**
   * Add a new League of Legends account to the system
   * Validates input, sends to backend, and updates the UI
   */
  const addAccount = async () => {
    // ========================================================================
    // INPUT VALIDATION - Check if all required fields are filled
    // ========================================================================

    if (!newLogin || !newRiotId || !newTag || !newPassword) {
      alert("⚠️ Please fill in all fields before adding an account.");
      return; // Exit function early if validation fails
    }

    // Validate Riot ID format (basic length check)
    if (newRiotId.length < 3 || newTag.length < 3) {
      alert("⚠️ Riot ID and Tag must be at least 3 characters long.");
      return;
    }

    setIsLoading(true); // Show loading state during API call

    // Create account object to send to backend
    const newAccount = {
      login: newLogin,
      riotId: `${newRiotId}#${newTag}`, // Combine ID and tag with #
      region: newRegion,
      password: newPassword, // Backend will encrypt this for security
      // Default values for new accounts (will be updated by Riot API)
      rank: "Unranked",
      lp: "0 LP",
      winRate: "0%",
      imageSrc: "Unranked.webp",
    };

    try {
      // Make POST request to create new account in database
      const response = await axios.post(
        "http://localhost:4000/api/accounts",
        newAccount
      );

      console.log("✅ Successfully added account:", response.data);

      // Add the new account to our local React state using spread operator
      // This updates the UI without needing to reload all accounts
      setAccounts([...accounts, response.data]);

      // Reset form fields after successful addition
      setNewLogin("");
      setNewRiotId("");
      setNewTag("");
      setNewRegion("NA");
      setNewPassword("");

      alert("✅ Account added successfully!");
    } catch (error) {
      console.error("❌ Failed to add account:", error);

      // Handle specific HTTP error codes for better user experience
      if (error.response?.status === 400) {
        alert(
          "❌ Invalid account information. Please check your Riot ID, tag, and region spelling."
        );
      } else if (error.response?.status === 500) {
        alert(
          "❌ Server error. Please check your Riot ID and tag spelling, and make sure the region is correct."
        );
      } else {
        alert(
          "❌ Failed to add account. Please check your internet connection and try again."
        );
      }
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  // ============================================================================
  // UTILITY FUNCTIONS - Helper functions for various operations
  // ============================================================================

  /**
   * Copy account information to user's clipboard
   * Handles both regular text and encrypted passwords
   *
   * @param {string} value - The value to copy (login or encrypted password)
   * @param {boolean} isPassword - Whether the value is a password that needs decryption
   */
  const handleCopy = async (value, isPassword = false) => {
    console.log(`🔄 Copying ${isPassword ? "password" : "login"}...`);

    try {
      let textToCopy;

      if (isPassword) {
        // Decrypt the encrypted password before copying to clipboard
        console.log("🔓 Decrypting password...");
        textToCopy = decrypt(value);

        if (!textToCopy) {
          throw new Error("Failed to decrypt password");
        }
        console.log("✅ Password decrypted successfully");
      } else {
        // For non-password values, copy as-is
        textToCopy = value;
      }

      // Use modern Clipboard API (requires HTTPS in production)
      await navigator.clipboard.writeText(textToCopy);
      alert(`📋 ${isPassword ? "Password" : "Login"} copied to clipboard!`);
    } catch (error) {
      console.error("❌ Failed to copy:", error);
      alert("❌ Failed to copy to clipboard. Please try again.");
    }
  };

  /**
   * Delete an account from the system
   * Shows confirmation dialog before deletion for safety
   *
   * @param {string} id - The unique ID of the account to delete
   */
  const handleDelete = async (id) => {
    // Show browser confirmation dialog to prevent accidental deletions
    if (
      !window.confirm(
        "⚠️ Are you sure you want to delete this account? This action cannot be undone."
      )
    ) {
      return; // User cancelled, exit function
    }

    try {
      // Make DELETE request to backend API
      await axios.delete(`http://localhost:4000/api/accounts/${id}`);
      console.log(`✅ Successfully deleted account with ID: ${id}`);

      // Update local state by filtering out the deleted account
      // This immediately updates the UI without needing to reload
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== id)
      );

      alert("✅ Account deleted successfully!");
    } catch (error) {
      console.error("❌ Failed to delete account:", error);
      alert("❌ Failed to delete account. Please try again.");
    }
  };

  /**
   * Refresh account data from Riot Games API
   * Updates rank, LP (League Points), and win rate information
   * This calls our backend which then calls Riot's API
   */
  const refreshAccounts = async () => {
    setIsRefreshing(true); // Separate loading state for refresh operation

    try {
      console.log("🔄 Refreshing account data from Riot Games...");

      // Call our backend endpoint that fetches fresh data from Riot API
      const response = await axios.get(
        "http://localhost:4000/api/accounts/refresh"
      );

      // Update local state with fresh data from Riot Games
      setAccounts(response.data);

      console.log("✅ Successfully refreshed all accounts");
      alert(
        "✅ Account data refreshed! Rank, LP, and win rates have been updated."
      );
    } catch (error) {
      console.error("❌ Failed to refresh accounts:", error);
      alert(
        "❌ Failed to refresh account data. Please check your internet connection and try again."
      );
    } finally {
      setIsRefreshing(false); // Hide refresh loading state
    }
  };

  // ============================================================================
  // RENDER FUNCTION - JSX that defines the component's visual structure
  // ============================================================================

  return (
    <div
      className={`relative smooth-transition p-4 h-screen w-full flex flex-col justify-between overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-t from-dark-darkest to-dark-black"
          : "bg-gradient-to-t from-light-secondary to-light-darkest"
      }`}
    >
      {/* ======================================================================
          ANIMATED BACKGROUND EFFECTS - Tailwind CSS styling for visual appeal
          ====================================================================== */}
      {isDarkMode && (
        <>
          {/* Left side animated blur bar */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cyan-400/25 via-blue-500/10 to-transparent backdrop-blur-lg z-10 pointer-events-none animate-pulse shadow-2xl shadow-cyan-500/5" />

          {/* Right side animated blur bar */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cyan-400/25 via-blue-500/10 to-transparent backdrop-blur-lg z-10 pointer-events-none animate-pulse shadow-2xl shadow-cyan-500/5" />
        </>
      )}

      {/* Subtle border around the entire app using Tailwind CSS */}
      <div className="absolute inset-0 ring-inset ring-2 ring-black/20 pointer-events-none z-10" />

      {/* ======================================================================
          HEADER SECTION - App title and control buttons
          ====================================================================== */}
      <header className="relative px-4 z-20 flex justify-between items-center mb-4">
        {/* App title */}
        <h1
          className={`smooth-transition text-3xl font-sans font-bold ${
            isDarkMode ? "text-dark-text" : "text-light-text"
          }`}
        >
          Distort
        </h1>

        {/* Header control buttons */}
        <div className="flex space-x-4">
          {/* Theme toggle button */}
          <ThemedButton
            text={isDarkMode ? "🌑 Dark" : "🌕 Light"}
            onClick={toggleTheme}
            isDarkMode={isDarkMode}
            disabled={isLoading || isRefreshing}
          />

          {/* Refresh accounts button */}
          <ThemedButton
            text={isRefreshing ? "⟳ Refreshing..." : "⟳ Refresh"}
            onClick={refreshAccounts}
            isDarkMode={isDarkMode}
            disabled={isLoading || isRefreshing || accounts.length === 0}
          />
        </div>
      </header>

      {/* ======================================================================
          ADD ACCOUNT FORM SECTION - Input fields for creating new accounts
          ====================================================================== */}
      <section className="relative z-20 px-4 flex flex-col justify-start items-start space-y-4 flex-shrink-0">
        <h2
          className={`text-xl font-semibold ${
            isDarkMode ? "text-dark-text" : "text-light-text"
          }`}
        >
          Add New Account
        </h2>

        {/* Form inputs container - uses Flexbox for responsive layout */}
        <div className="flex flex-wrap gap-2 w-full">
          {/* Username/Login input field */}
          <ThemedInput
            placeholder="Username/Login"
            value={newLogin}
            onChange={(e) => setNewLogin(e.target.value)}
            isDarkMode={isDarkMode}
            disabled={isLoading}
          />

          {/* Riot ID input field (part before the #) */}
          <ThemedInput
            placeholder="Riot ID"
            value={newRiotId}
            onChange={(e) => setNewRiotId(e.target.value)}
            isDarkMode={isDarkMode}
            disabled={isLoading}
          />

          {/* Tag input field (part after the #) - automatically removes # symbol */}
          <ThemedInput
            placeholder="#Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value.replace("#", ""))}
            onKeyDown={(e) => e.key === "#" && e.preventDefault()}
            isDarkMode={isDarkMode}
            disabled={isLoading}
          />

          {/* Region selector dropdown */}
          <ThemedSelect
            options={[
              "NA", // North America
              "EUW", // Europe West
              "EUNE", // Europe Nordic & East
              "KR", // Korea
              "OCE", // Oceania
              "LAN", // Latin America North
              "BR", // Brazil
              "TR", // Turkey
              "RU", // Russia
              "JP", // Japan
            ]}
            value={newRegion}
            onChange={(e) => setNewRegion(e.target.value)}
            isDarkMode={isDarkMode}
            disabled={isLoading}
          />

          {/* Password input with show/hide toggle */}
          <div className="relative flex flex-grow w-full sm:w-auto">
            <ThemedInput
              placeholder="Account Password"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              isDarkMode={isDarkMode}
              disabled={isLoading}
            />

            {/* Toggle button for password visibility */}
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-sm hover:opacity-80 transition-opacity ${
                isDarkMode ? "text-gray-400" : "text-gray-700"
              }`}
              title="Toggle Password Visibility"
              disabled={isLoading}
              type="button"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit button for adding new account */}
          <ThemedButton
            text={isLoading ? "Adding..." : "Add Account"}
            onClick={addAccount}
            isDarkMode={isDarkMode}
            disabled={isLoading || isRefreshing}
          />
        </div>
      </section>

      {/* ======================================================================
          ACCOUNT CARDS DISPLAY SECTION - Shows all user accounts in a grid
          ====================================================================== */}
      <main className="relative z-20 px-4 pt-4 flex-grow overflow-hidden">
        <div
          className={`p-4 rounded-2xl shadow-lg h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 ${
            isDarkMode ? "bg-dark-black" : "bg-light-secondary"
          }`}
        >
          {/* CSS Grid container for responsive account cards layout */}
          <div className="grid grid-cols-1 gap-4 min-h-[16rem]">
            {/* Conditional rendering based on loading state and data */}
            {isLoading && accounts.length === 0 ? (
              /* Loading state for initial app load */
              <div className="flex justify-center items-center h-full py-8">
                <p
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-dark-text" : "text-light-text"
                  }`}
                >
                  🔄 Loading accounts...
                </p>
              </div>
            ) : accounts.length > 0 ? (
              /* Display all accounts using map function */
              accounts.map((account) => (
                <AccountCard
                  key={account.id} // React key for efficient re-rendering
                  imageSrc={account.imageSrc}
                  riotId={account.riotId}
                  login={account.login}
                  password={account.password}
                  rank={account.rank}
                  lp={account.lp}
                  winRate={account.winRate}
                  handleDelete={() => handleDelete(account.id)}
                  handleCopy={handleCopy}
                  isDarkMode={isDarkMode}
                />
              ))
            ) : (
              /* Empty state when no accounts exist */
              <div className="flex justify-center items-center h-full py-8">
                <div className="text-center">
                  <p
                    className={`text-xl font-semibold mb-2 ${
                      isDarkMode ? "text-dark-text" : "text-light-text"
                    }`}
                  >
                    🎮 No accounts yet!
                  </p>
                  <p
                    className={`text-sm opacity-75 ${
                      isDarkMode ? "text-dark-text" : "text-light-text"
                    }`}
                  >
                    Add your first League of Legends account above to get
                    started.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ======================================================================
          FOOTER SECTION - Legal disclaimer and privacy information
          ====================================================================== */}
      <footer className="relative z-20 px-4 mt-4 flex justify-between items-end w-full flex-shrink-0">
        {/* Legal disclaimer */}
        <p
          className={`text-xs font-bold ${
            isDarkMode ? "text-green-500" : "text-black"
          }`}
        >
          ⚠️ Not affiliated with Riot Games.
        </p>

        {/* Privacy information button */}
        <button
          className={`text-xs hover:underline font-bold transition-colors ${
            isDarkMode
              ? "text-green-500 hover:text-green-400"
              : "text-black hover:text-gray-700"
          }`}
          onClick={() =>
            alert(
              "🔒 Privacy Information:\n\n" +
                "• All account data is stored locally in your database\n" +
                "• Passwords are encrypted before storage\n" +
                "• Only rank and win rate data are fetched from Riot Games\n" +
                "• Your login credentials are never sent to external servers\n" +
                "• This app is not affiliated with or endorsed by Riot Games"
            )
          }
          type="button"
        >
          ℹ️ Privacy Info
        </button>
      </footer>
    </div>
  );
};

// Export the component as default export for use in other files
export default App;
