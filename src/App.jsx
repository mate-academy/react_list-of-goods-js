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

const buttonMappings = [
  {
    key: 'alphabetical',
    label: 'Sort alphabetically',
    theme: 'is-info',
  },
  {
    key: 'length',
    label: 'Sort by length',
    theme: 'is-success',
  },
  {
    key: 'reverse',
    label: 'Reverse',
    theme: 'is-warning',
  },
];

const sortGoods = (goods, reversed, criteria) => {
  const sortFunc =
    criteria === 'alphabetical'
      ? (a, b) => a.localeCompare(b)
      : (a, b) => a.length - b.length;

  return goods.toSorted((a, b) => (reversed ? sortFunc(b, a) : sortFunc(a, b)));
};

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortKey, setSortKey] = useState('');
  const [reversed, setReversed] = useState(false);

  const handleSort = key => {
    switch (key) {
      case 'alphabetical':
      case 'length':
        setSortKey(key);
        setGoods(sortGoods(goods, reversed, key));
        break;
      case 'reverse':
        setReversed(!reversed);
        setGoods(goods.toReversed());
        break;
      default:
        setSortKey('');
        setReversed(false);
        setGoods([...goodsFromServer]);
        break;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        {buttonMappings.map(({ key, label, theme }) => {
          const isLight =
            (key === 'reverse' && reversed) || key === sortKey
              ? ''
              : 'is-light';

          return (
            <button
              type="button"
              key={key}
              className={`button ${theme} ${isLight}`}
              onClick={() => handleSort(key)}
            >
              {label}
            </button>
          );
        })}

        {(sortKey || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleSort('')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
