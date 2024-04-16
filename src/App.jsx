import 'bulma/css/bulma.css';
import './App.scss';
// import { useState } from 'react';

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

// let SORT_ALPHA;
// let SORT_LENGTH;

// function getPreparedGoods(goods, sortField) {
//   const preparedGoods = [...goodsFromServer];
//
//   if (sortField) {
//     preparedGoods.sort((good1, good2) => {
//       switch (sortField) {
//         case SORT_ALPHA:
//           return good1[sortField].localeCompare(good2[sortField]);
//         case SORT_LENGTH:
//           return good1[sortField] - good2[sortField];
//
//         default:
//           return 0;
//       }
//     });
//   }
//
//   return preparedGoods;
// }

export const App = () => {
  // const [sortField, setSortField] = useState('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            // setSortField(SORT_ALPHA);
          }}
          type="button"
          className="button is-info is-light"
        >
          Sort alphabetically
        </button>

        <button type="button" className="button is-success is-light">
          Sort by length
        </button>

        <button type="button" className="button is-warning is-light">
          Reverse
        </button>

        <button type="button" className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
        {goodsFromServer.map(good => {
          return <li data-cy="Good">{good}</li>;
        })}
      </ul>
    </div>
  );
};
