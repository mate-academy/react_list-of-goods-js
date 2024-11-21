import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

const SORTED_ALPHABETIALLY = 'alphabet';
const SORTED_LENGHT = 'lenght';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');

  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORTED_LENGHT:
        return good1.length - good2.length;
      case SORTED_ALPHABETIALLY:
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });

  if (reverseField) {
    visibleGoods.reverse();
  }

  const reset = () => {
    setSortField('');
    setReverseField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORTED_ALPHABETIALLY && 'is-light'}`}
          onClick={() => setSortField(SORTED_ALPHABETIALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORTED_LENGHT && 'is-light'}`}
          onClick={() => {
            setSortField(SORTED_LENGHT);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseField || 'is-light'}`}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>
        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
