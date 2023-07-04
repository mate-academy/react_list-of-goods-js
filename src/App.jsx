// import { useState } from 'react';
// import cn from 'classnames';

// import 'bulma/css/bulma.css';
// import './App.scss';

// export const goodsFromServer = [
//   'Dumplings',
//   'Carrot',
//   'Eggs',
//   'Ice cream',
//   'Apple',
//   'Bread',
//   'Fish',
//   'Honey',
//   'Jam',
//   'Garlic',
// ];

// const SORT_BY_ALFABET = 'alfabet';
// const SORT_BY_ALFABET_REV = 'alfabet for revers';
// const SORT_BY_LENGTH = 'length';
// const SORT_BY_REVERSE_LENGTH = 'reverse length';
// const SORT_BY_REVERSE_ALFABET = 'reverse alfabet';
// const SORT_BY_INDEX_DESC = 'reverse default';

// function getSortGoods(goods, sortField) {
//   const preparedGoods = [...goods];

//   if (sortField) {
//     preparedGoods.sort((good1, good2) => {
//       switch (sortField) {
//         case SORT_BY_ALFABET:
//           return good1.localeCompare(good2);

//         case SORT_BY_LENGTH:
//           return good1.length - good2.length;

//         case SORT_BY_REVERSE_ALFABET:
//           return good2.localeCompare(good1);

//         case SORT_BY_ALFABET_REV:
//           return good1.localeCompare(good2);

//         case SORT_BY_REVERSE_LENGTH:
//           return good2.length - good1.length;

//         case SORT_BY_INDEX_DESC:
//           return preparedGoods.indexOf(good2) - preparedGoods.indexOf(good1);

//         default:
//           return 0;
//       }
//     });
//   }

//   return preparedGoods;
// }

// export const App = () => {
//   const [sortField, setSortField] = useState('');
//   const sortGoods = getSortGoods(goodsFromServer, sortField);

//   return (
//     <div className="section content">
//       <div className="buttons">
//         <button
//           onClick={() => setSortField(SORT_BY_ALFABET)}
//           type="button"
//           className={cn('button is-info', {
//             'is-light': sortField !== SORT_BY_ALFABET,
//           })}
//         >
//           Sort alphabetically
//         </button>

//         <button
//           onClick={() => setSortField(SORT_BY_LENGTH)}
//           type="button"
//           className={cn('button is-success', {
//             'is-light': sortField !== SORT_BY_LENGTH,
//           })}
//         >
//           Sort by length
//         </button>

//         <button
//           onClick={() => {
//             if (sortField === SORT_BY_ALFABET) {
//               setSortField(SORT_BY_REVERSE_ALFABET);
//             }

//             if (sortField === SORT_BY_LENGTH) {
//               setSortField(SORT_BY_REVERSE_LENGTH);
//             }

//             if (sortField === '') {
//               setSortField(SORT_BY_INDEX_DESC);
//             }

//             if (sortField === SORT_BY_REVERSE_ALFABET) {
//               setSortField(SORT_BY_ALFABET_REV);
//             }
//           }}
//           type="button"
//           className={cn('button is-warning', {
//             'is-light': sortField !== SORT_BY_REVERSE_ALFABET
//               && sortField !== SORT_BY_REVERSE_LENGTH
//               && sortField !== SORT_BY_INDEX_DESC,
//           })}
//         >
//           Reverse
//         </button>

//         {sortField && (
//           <button
//             onClick={() => {
//               setSortField('');
//             }}
//             type="button"
//             className="button is-danger is-light"
//           >
//             Reset
//           </button>
//         )}
//       </div>
//       <ul>
//         {sortGoods.map(good => (
//           <li key={good} data-cy="Good">
//             {good}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_BY_INDEX_DESC = 'reverse default';

function getSortGoods(goods, sortField, sortDirection) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return sortDirection === 'asc'
            ? good1.localeCompare(good2)
            : good2.localeCompare(good1);

        case SORT_BY_LENGTH:
          return sortDirection === 'asc'
            ? good1.length - good2.length
            : good2.length - good1.length;

        case SORT_BY_INDEX_DESC:
          return preparedGoods.indexOf(good2) - preparedGoods.indexOf(good1);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const sortGoods = getSortGoods(goodsFromServer, sortField, sortDirection);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
            setSortDirection('asc');
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
            setSortDirection('asc');
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (
              (sortField === SORT_BY_ALPHABET || sortField === SORT_BY_LENGTH)
      && sortDirection === 'asc'
            ) {
              setSortDirection('desc');
            } else {
              setSortDirection('asc');
            }
          }}
          type="button"
          className={cn('button is-warning', {
            'is-light': sortField !== SORT_BY_INDEX_DESC
              && sortDirection === 'asc',
          })}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={() => {
              setSortField('');
              setSortDirection('asc');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
