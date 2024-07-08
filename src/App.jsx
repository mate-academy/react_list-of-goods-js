import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_RESET = 'reset';

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

function getPrepearedGoods(goods, { sortField, isReversed }) {
  const prepearedSortGoods = [...goods];

  if (sortField) {
    prepearedSortGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed === true) {
    prepearedSortGoods.reverse();
  }

  return prepearedSortGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const isOriginalOrder =
    JSON.stringify(sortGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': sortField !== SORT_FIELD_RESET,
            })}
            onClick={() => {
              setSortField(SORT_FIELD_RESET);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );

  // <div className="section content">
  //   <div className="buttons">
  //     <button type="button" className="button is-info is-light">
  //       Sort alphabetically
  //     </button>

  //     <button type="button" className="button is-success is-light">
  //       Sort by length
  //     </button>

  //     <button type="button" className="button is-warning is-light">
  //       Reverse
  //     </button>

  //     <button type="button" className="button is-danger is-light">
  //       Reset
  //     </button>
  //   </div>

  //   <ul>
  //     <li data-cy="Good">Dumplings</li>
  //     <li data-cy="Good">Carrot</li>
  //     <li data-cy="Good">Eggs</li>
  //     <li data-cy="Good">Ice cream</li>
  //     <li data-cy="Good">Apple</li>
  //     <li data-cy="Good">...</li>
  //   </ul>
  // </div>
};
