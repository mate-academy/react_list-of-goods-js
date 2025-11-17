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
  const [sortField, setSortField] = useState('');
  const [isReversed, setReversed] = useState(false);
  const sortFields = {
    ALPHABETICAL: 'alphabetical',
    LENGTH: 'length',
  };

  let visibleGoods = goodsFromServer;

  if (sortField) {
    visibleGoods = visibleGoods.toSorted((good1, good2) => {
      switch (sortField) {
        case sortFields.ALPHABETICAL:
          return good1.localeCompare(good2);
        case sortFields.LENGTH:
          return good1.length - good2.length;
        case '':
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  function resetGoods() {
    setSortField('');
    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === sortFields.ALPHABETICAL ? '' : 'is-light'}`}
          onClick={() => setSortField(sortFields.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === sortFields.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(sortFields.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              resetGoods();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
