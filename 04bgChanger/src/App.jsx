import { useState } from "react"; // Import the useState hook from React

function App() {
  // Define a state variable 'color' and a function 'setColor' to update it.
  // The initial color is set to "darkGreen".
  const [color, setColor] = useState("#023020");

  return (
    // Main container div that fills the full width and height of the screen
    // The background color of this div is dynamically set to the 'color' state value
    <div
      className="w-full h-screen duration-200" // Full width, full height, with a smooth transition effect
      style={{ backgroundColor: color }} // Inline style to apply the background color from state
    >
      {/* Container for the buttons, fixed at the bottom center of the screen */}
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        {/* Inner div to wrap the buttons, centered, with a shadow, rounded corners, and a white background */}
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          {/* Button to change the background color to Red */}
          <button
            onClick={() => setColor("red")} // Set color to "red" on click
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg" // Styling for rounded, shadowed button
            style={{ backgroundColor: "red" }} // Inline style for the button's background color
          >
            Red
          </button>

          {/* Button to change the background color to Green */}
          <button
            onClick={() => setColor("green")} // Set color to "green" on click
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "green" }}
          >
            Green
          </button>

          {/* Button to change the background color to Blue */}
          <button
            onClick={() => setColor("blue")} // Set color to "blue" on click
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "blue" }}
          >
            Blue
          </button>

          {/* Button to change the background color to Violet */}
          <button
            onClick={() => setColor(" rgb(139 92 246)")} // Set color to "violet" on click
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: " rgb(139 92 246)" }}
          >
            violet
          </button>

          {/* Button to change the background color to Pink */}
          <button
            onClick={() => setColor("rgb(236 72 153)")} // Set color to "pink" on click
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "rgb(236 72 153)" }}
          >
            pink
          </button>

          {/* Button to change the background color to Sky */}
          <button
            onClick={() => setColor("rgb(56 189 248)")} // Set color to "sky blue" on click
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            style={{ backgroundColor: "rgb(56 189 248)" }}
          >
            Sky
          </button>
        </div>
      </div>
    </div>
  );
}

export default App; // Export the App component as the default export
