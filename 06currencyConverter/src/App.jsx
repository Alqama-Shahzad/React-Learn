import { useState } from 'react'
import { InputBox } from './Components/'
import useCurrencyInfo from './Hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState("usd")
  const [toCurrency, setToCurrency] = useState("pkr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [isConverted, setIsConverted] = useState(false)
  
  const currencyInfo = useCurrencyInfo(fromCurrency)
  const options = Object.keys(currencyInfo)

  const swapCurrency = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
    setIsConverted(false)
  }

  const convert = (e) => {
    e.preventDefault()
    const rate = currencyInfo[toCurrency]
    if (rate) {
      setConvertedAmount((amount * rate).toFixed(2))
      setIsConverted(true)
    } else {
      console.error(`Exchange rate not available for ${toCurrency}`)
      setConvertedAmount(0)
    }
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form onSubmit={convert}>
          <InputBox
            label="From"
            Amount={amount}
            currencyOptions={options}
            onCurrencyChange={setFromCurrency}
            selectCurrency={fromCurrency}
            onAmountChange={(value) => {
              setAmount(value)
              setIsConverted(false)
            }}
          />
          <div className="relative w-full h-0.5 my-1">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swapCurrency}
            >
              swap
            </button>
          </div>
          <InputBox
            label="To"
            Amount={isConverted ? convertedAmount : ''}
            currencyOptions={options}
            onCurrencyChange={setToCurrency}
            selectCurrency={toCurrency}
            amountDisable
          />
          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4">
            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App