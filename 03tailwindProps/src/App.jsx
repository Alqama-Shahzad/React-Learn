import "./App.css";
import Card from "./components/card";

function App() {
  
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="bg-orange-400 py-2 px-6 rounded-xl mb-2 ">
          Tailwind Test
        </h1>
        <Card username="Supraman" btn="view profile"/>
        <Card username="Spoidermon" btn="view card"/>
      </div>
    </>
  );
}

export default App;
