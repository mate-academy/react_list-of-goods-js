import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

function createSort(sortField, isReversed) {
  const goods = [...goodsFromServer];

  if (sortField) {
    goods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  return isReversed ? goods.reverse() : goods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goods = createSort(sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortField !== SORT_BY_ALPHABET })}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortField !== '' || isReversed)
        && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setIsReversed(false);
            setSortField('');
          }}
        >
          Reset
        </button>
        )
        }
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
