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
  const [sort, setSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedBy = () => {
    const preparedGoods = [...goodsFromServer];

    if (sort === 'alphabet') {
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
    } else if (sort === 'length') {
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const goods = getSortedBy();

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSort('');
    setIsReversed(false);
  };

  const isModified = sort !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => {
            setSort('alphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sort === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            setSort('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button type="button" className="button is-danger" onClick={reset}>
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
