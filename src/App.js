// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [output, setOutput] = useState('');
  const [fromCurr, setFromCurr] = useState('EUR');
  const [toCurr, setToCurr] = useState('USD');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setOutput(data.rates[toCurr]);

        setIsLoading(false);
      }
      if (fromCurr === toCurr) return setOutput(amount);

      convert();
    },
    [amount, fromCurr, toCurr]
  );

  return (
    <div>
      <input
        type='text'
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurr}
        onChange={e => setFromCurr(e.target.value)}
        disabled={isLoading}
      >
        <option value='USD'>USD</option>
        <option value='EUR' selected>
          EUR
        </option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select
        value={toCurr}
        onChange={e => setToCurr(e.target.value)}
        disabled={isLoading}
      >
        <option value='USD' selected>
          USD
        </option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>
        {output} {toCurr}
      </p>
    </div>
  );
}
