import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

export const initialGoods = [
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
  const [selectedGood, setSelectedGood] = useState('');
  const [goods, setGoods] = useState(initialGoods);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleReset = () => {
    setGoods(initialGoods);
    setSortType('');
    setIsReversed(false);
  };

  const handleSortAlpha = () => {
    const sorted = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sorted);
    setSortType('alpha');
    setIsReversed(false);
  };

  const handleSortLength = () => {
    const sorted = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sorted);
    setSortType('length');
    setIsReversed(false);
  };

  const handleReverse = () => {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setIsReversed(!isReversed);
  };

  const isInitialOrder = goods.every((g, i) => g === initialGoods[i]);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">
          {selectedGood ? `${selectedGood} is selected` : 'No goods selected'}
        </h1>

        <div className="buttons mb-4">
          <button
            type="button"
            className={`button ${sortType === 'alpha' ? '' : 'is-light'}`}
            onClick={handleSortAlpha}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button ${sortType === 'length' ? '' : 'is-light'}`}
            onClick={handleSortLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button ${isReversed ? '' : 'is-light'}`}
            onClick={handleReverse}
          >
            Reverse
          </button>

          {!isInitialOrder && (
            <button
              type="button"
              className="button is-warning"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>

        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th>Good</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {goods.map(good => (
              <tr
                key={good}
                className={
                  selectedGood === good ? 'has-background-success-light' : ''
                }
              >
                <td>{good}</td>
                <td>
                  {selectedGood === good ? (
                    <button
                      type="button"
                      className="button is-danger"
                      onClick={() => setSelectedGood('')}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button is-primary"
                      onClick={() => setSelectedGood(good)}
                    >
                      Add
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedGood && (
          <button
            type="button"
            className="button is-link mt-4"
            onClick={() => setSelectedGood('')}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
