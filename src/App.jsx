import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';
const REVERSE = 'reverse';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORT_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseField !== '') {
    visibleGoods.reverse();
  }

  const handleReset = () => {
    setSortField('');
    setReverseField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_ALPHABET)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => setSortField(SORT_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseField(reverseField === '' ? REVERSE : '')}
          className={cn('button', 'is-warning', {
            'is-light': reverseField !== REVERSE,
          })}
        >
          Reverse
        </button>

        {(reverseField || sortField) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      {}
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
