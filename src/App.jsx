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

const SORT_FIELD_ALPHABETIC = 'alphabet';
const SORT_FIELD_LENGTH = 'by length';

function getPreparedGoods(goods, reverse, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETIC:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, isReversed, { sortField });
  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETIC,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      {goods.map(good => (
        <ul>
          <li data-cy="Good">{good}</li>
        </ul>
      ))}
    </div>
  );
};

// export const App = () => (

//   const sortByAlphabet = () => {
//     goodsFromServer.sort((good1, good2) => good1.localeCompare(good2))
//   };

//   <div className="section content">
//     <div className="buttons">
//       <button
//       type="button"
//       className="button is-info is-light"
//       onClick={sortByAlphabet}
//       >
//         Sort alphabetically
//       </button>

//       <button
//       type="button"
//       className="button is-success is-light"
//       onClick={}
//       >
//         Sort by length
//       </button>

//       <button type="button" className="button is-warning is-light">
//         Reverse
//       </button>

//       <button type="button" className="button is-danger is-light">
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
