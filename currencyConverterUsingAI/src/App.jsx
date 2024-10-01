import CurrencyConverter from './components/CurrencyConverter'

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-md w-full">
        <CurrencyConverter />
      </div>
      <footer className="mt-8 text-white text-sm">
        Made by Alqama
      </footer>
    </div>
  )
}

export default App
