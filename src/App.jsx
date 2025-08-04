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
  const [sortedNow, setSortedNow] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedBy = () => {
    const preparedGoods = [...goodsFromServer];

    if (sortedNow === 'alphabetic') {
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
    } else if (sortedNow === 'length') {
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const goods = getSortedBy();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedNow === 'alphabetic' ? '' : 'is-light'}`}
          onClick={() => {
            setSortedNow('alphabetic');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success  ${sortedNow === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            setSortedNow('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning  ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortedNow || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedNow('');
              setIsReversed(false);
            }}
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

// create some code for another commit
