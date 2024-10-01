import { useState, useEffect } from 'react'
import CurrencyInput from './CurrencyInput'

function CurrencyConverter() {
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(0)
  const [currency1, setCurrency1] = useState('usd')
  const [currency2, setCurrency2] = useState('pkr')
  const [rates, setRates] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchRates(currency1)
  }, [currency1])

  async function fetchRates(currency) {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)
      const data = await response.json()
      setRates(data[currency.toLowerCase()])
    } catch (error) {
      console.error('Error fetching rates:', error)
    }
  }

  function handleAmount1Change(amount1) {
    setAmount1(amount1)
  }

  function handleCurrency1Change(currency1) {
    setCurrency1(currency1)
  }

  function handleCurrency2Change(currency2) {
    setCurrency2(currency2)
  }

  function convert() {
    setIsLoading(true)
    setTimeout(() => {
      setAmount2((amount1 * rates[currency2.toLowerCase()]).toFixed(2))
      setIsLoading(false)
    }, 500) // Simulating a delay for the animation
  }

  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full transform hover:scale-105 transition-all duration-300">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Currency Converter</h1>
      <CurrencyInput
        label="From"
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <div className="text-center my-6">
        <button 
          onClick={convert}
          className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 ${isLoading ? 'animate-pulse' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Converting...' : 'Convert'}
        </button>
      </div>
      <CurrencyInput
        label="To"
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
        readonly={true}
      />
    </div>
  )
}

export default CurrencyConverter