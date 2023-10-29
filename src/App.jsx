import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const SORT_BY_LETTER = 'name';
const SORT_BY_LENGTHS = 'length';

function getGoods(goods, { sortField, reverseField }) {
  const prepGoods = [...goods];

  if (sortField) {
    prepGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_LENGTHS:
          return good1.length - good2.length;
        case SORT_BY_LETTER:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    prepGoods.reverse();
  }

  return prepGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getGoods(goodsFromServer, { sortField, reverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            {
              'button is-info': sortField === SORT_BY_LETTER,
              'button is-info is-light': sortField !== SORT_BY_LETTER,
            },
          )}
          onClick={() => {
            setSortField(SORT_BY_LETTER);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            {
              'button is-success': sortField === SORT_BY_LENGTHS,
              'button is-success is-light': sortField !== SORT_BY_LENGTHS,
            },
          )}
          onClick={() => {
            setSortField(SORT_BY_LENGTHS);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            {
              'button is-warning': reverseField === true,
              'button is-warning is-light': reverseField === false,
            },
          )}
          onClick={() => {
            setReverseField(!reverseField);
          }}
        >
          Reverse
        </button>
        {reverseField || sortField
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setReverseField(false);
                setSortField('');
              }}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
