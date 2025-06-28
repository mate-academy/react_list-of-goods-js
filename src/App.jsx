import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [isDoubleReversed, setIsDoubleReversed] = useState(false); // New state to track double reverse
  const [sortOrder, setSortOrder] = useState(''); // Tracks sort order: '' | 'alphabetical' | 'length'

  // Sort alphabetically (descrescător dacă lista este inversată)
  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    if (isReversed) {
      // Sortare descrescătoare dacă ordinea este deja inversată
      setGoods(sortedGoods.reverse());
    } else {
      // Sortare crescătoare
      setGoods(sortedGoods);
    }

    setSortOrder('alphabetical');
  };

  // Sort by length (descrescător dacă ordinea este inversată)
  const handleSortByLength = () => {
    const sortedByLength = [...goods].sort((a, b) => {
      // Sortare crescătoare după lungime, iar pentru lungimile egale, sortare alfabetică crescătoare
      if (a.length === b.length) {
        return a.localeCompare(b); // Alfabetic crescător
      }

      return a.length - b.length; // După lungime crescător
    });

    if (isReversed) {
      // Sortare descrescătoare după lungime și alfabet dacă ordinea este deja inversată
      setGoods(sortedByLength.reverse());
    } else {
      setGoods(sortedByLength);
    }

    setSortOrder('length');
  };

  // Reverse the order of the list
  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed); // Toggle the reverse state

    // Check if it's the second time pressing reverse
    if (isReversed) {
      setIsDoubleReversed(true); // After double reverse, disable other buttons
    }
  };

  // Reset to initial order
  const handleReset = () => {
    setGoods(goodsFromServer);
    setIsReversed(false); // Reset reverse state
    setIsDoubleReversed(false); // Reset double reverse state
    setSortOrder(''); // Reset sort state
  };

  // Verifică dacă ordinea este deja inițială
  const isResetVisible =
    JSON.stringify(goods) !== JSON.stringify(goodsFromServer) || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetical' ? '' : 'is-light'} ${isDoubleReversed ? 'is-light' : ''}`}
          onClick={handleSortAlphabetically}
          disabled={isDoubleReversed} // Disable button after double reverse
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' ? '' : 'is-light'} ${isDoubleReversed ? 'is-light' : ''}`}
          onClick={handleSortByLength}
          disabled={isDoubleReversed} // Disable button after double reverse
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'} ${isDoubleReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {/* Afișează butonul Reset doar când ordinea nu este inițială */}
        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
