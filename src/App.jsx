import { useState } from 'react';
import cn from 'classnames';
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

// export const App = () => (
//   <div className="section content">
//     <div className="buttons">
//       <button
//         type="button"
//         className="button is-info is-light"
//       >
//         Sort alphabetically
//       </button>

//       <button
//         type="button"
//         className="button is-success is-light"
//       >
//         Sort by length
//       </button>

//       <button
//         type="button"
//         className="button is-warning is-light"
//       >
//         Reverse
//       </button>

//       <button
//         type="button"
//         className="button is-danger is-light"
//       >
//         Reset
//       </button>
//     </div>

//     <ul>
//       <li data-cy="Good">Dumplings</li>
//       <li data-cy="Good">Carrot</li>
//       <li data-cy="Good">Eggs</li>
//       <li data-cy="Good">Ice cream</li>
//       <li data-cy="Good">Apple</li>
//       <li data-cy="Good">...</li>
//     </ul>
//   </div>
// );

const SORT_FILED_ALPHABET = 'alphabet';
const SORT_FILED_LENGTH = 'length';

function getPreparedGoods(goods, { sortFielde, isReverse }) {
  const preparedGoods = [...goods];

  if (sortFielde) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFielde) {
        case SORT_FILED_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FILED_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortFielde, setSortFielde] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortFielde, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortFielde !== SORT_FILED_ALPHABET,
            },
          )}
          onClick={() => setSortFielde(SORT_FILED_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            {
              'is-light': sortFielde !== SORT_FILED_LENGTH,
            },
          )}
          onClick={() => setSortFielde(SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            {
              'is-light': isReverse !== true,
            },
          )}
          onClick={() => (setIsReverse(!isReverse))}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortFielde('');
            setIsReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))
        }
      </ul>
    </div>
  );
};
