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
  const isLight = 'is-light';
  const [activeButton, setActiveButton] = useState('');
  const [goods, setGoods] = useState(goodsFromServer);
  const [resetVisible, setResetVisible] = useState(false);
  const [isReverse, setIsReverse] = useState(false);

  const handleSort = field => {
    let sortedGoods = [...goods];

    if (field === 'Reverse') {
      setIsReverse(!isReverse);
    }

    switch (field) {
      case 'Sort by length':
        if (!isReverse) {
          sortedGoods.sort((a, b) => a.length - b.length);
        } else {
          sortedGoods.sort((a, b) => b.length - a.length);
        }

        break;
      case 'Sort alphabetically':
        if (!isReverse) {
          sortedGoods.sort((a, b) => a.localeCompare(b));
        } else {
          sortedGoods.sort((a, b) => b.localeCompare(a));
        }

        break;
      case 'Reverse':
        sortedGoods.reverse();
        setResetVisible(!isReverse);
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    setGoods(sortedGoods);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[
          ['Sort alphabetically', 'is-info'],
          ['Sort by length', 'is-success'],
        ].map(([label, style]) => (
          <button
            key={label}
            type="button"
            className={`button ${style} ${activeButton !== label ? isLight : ''}`}
            onClick={() => {
              setActiveButton(label);
              handleSort(label);
              setResetVisible(true);
            }}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          className={`button is-warning ${!isReverse ? isLight : ''}`}
          onClick={() => {
            handleSort('Reverse');
          }}
        >
          Reverse
        </button>

        {resetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              handleSort('Reset');
              setResetVisible(false);
              setActiveButton('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
