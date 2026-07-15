import 'bulma/css/bulma.css';
import './App.scss';
import { useMemo, useState } from 'react';

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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    switch (sortType) {
      case 'alphabet':
        goods.sort((a, b) => a.localeCompare(b));
        break;

      case 'length':
        goods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }, [sortType, isReversed]);

  const isResetVisible = sortType !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType !== 'alphabet' ? 'is-light' : ''
          }`}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType !== 'length' ? 'is-light' : ''
          }`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
