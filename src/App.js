// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState(null);
  const [output, setOutput] = useState(null);
  useEffect(
    function () {
      async function fetchConversion() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=EUR&to=USD`
        );
        const data = await res.json();
        setOutput(data.rates.USD);
      }
      fetchConversion();
    },
    [amount]
  );

  const handleChange = function (e) {
    setAmount(e.target.value);
  };

  return (
    <div>
      <input type='text' onChange={handleChange} />
      <select>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>OUTPUT: {output}</p>
    </div>
  );
}
