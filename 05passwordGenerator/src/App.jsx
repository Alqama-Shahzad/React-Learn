import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  // State to manage password length
  const [length, setLength] = useState(8);
  // State to manage whether numbers are included in the password
  const [numberAllowed, setNumberAllowed] = useState(false);
  // State to manage whether special characters are included in the password
  const [charAllowed, setCharAllowed] = useState(false);
  // State to store the generated password
  const [password, setPassword] = useState("");

  // Function to generate a new password based on the current settings
  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // Add numbers to the character set if numberAllowed is true
    if (numberAllowed) {
      str += "0123456789";
    }
    // Add special characters to the character set if charAllowed is true
    if (charAllowed) {
      str += "!#$%&()*,/@{}~";
    }
    // Generate the password by picking random characters from the set
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }
    // Update the state with the generated password
    setPassword(password);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // Ref to access the password input element for copying text
  const passwordRef = useRef(null);

  // useEffect hook to regenerate the password whenever dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Function to copy the generated password to the clipboard
  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select(); // Select the text in the input
      navigator.clipboard.writeText(password); // Copy the text to the clipboard
    }
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-4 px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-2xl font-bold text-lime-500 text-center mb-4">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password} // Display the generated password
          className="rounded-s-lg outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef} // Reference to access the input element
        />
        <button onClick={copyPasswordToClipboard} className="bg-blue-700 outline-none px-3 text-white py-0.5 shrink-0">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length} // Adjusts password length
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev); // Toggle number inclusion
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev); // Toggle special character inclusion
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
