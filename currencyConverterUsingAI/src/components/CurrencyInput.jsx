import PropTypes from 'prop-types'

function CurrencyInput(props) {
  return (
    <div className="flex flex-col mb-6">
      <label className="mb-2 font-semibold text-white">{props.label}</label>
      <div className="flex">
        <input
          type="number"
          value={props.amount}
          onChange={(ev) => props.onAmountChange && props.onAmountChange(ev.target.value)}
          className="w-2/3 px-4 py-3 text-gray-800 bg-white bg-opacity-50 border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          readOnly={props.readonly}
        />
        <select
          value={props.currency}
          onChange={(ev) => props.onCurrencyChange && props.onCurrencyChange(ev.target.value)}
          className="w-1/3 px-4 py-3 text-gray-800 bg-white bg-opacity-50 border-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {props.currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

CurrencyInput.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  readonly: PropTypes.bool,
}

export default CurrencyInput