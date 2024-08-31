import { useState } from 'react';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [myRating, setMyRating] = useState(0);
  const [friendRating, setFriendRating] = useState(0);

  const tip = bill * ((0.5 * (myRating + friendRating)) / 100);

  function handleReset() {
    setBill('');
    setMyRating(0);
    setFriendRating(0);
  }

  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <Service rating={myRating} setRating={setMyRating}>
        How did you like the service?
      </Service>
      <Service rating={friendRating} setRating={setFriendRating}>
        How did your friend like the service?
      </Service>
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset handleReset={handleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill amount"
        value={bill}
        onChange={e => setBill(+e.target.value)}
      />
    </div>
  );
}

function Service({ rating, setRating, children }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={rating}
        onChange={e => {
          setRating(+e.target.value);
        }}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${(bill + tip).toFixed(2)} (${bill} plus ${tip.toFixed(2)} tip)
    </h3>
  );
}

function Reset({ handleReset }) {
  return <button onClick={handleReset}>Reset</button>;
}
