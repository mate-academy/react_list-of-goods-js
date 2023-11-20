import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

// import 'bulma/css/bulma.css';
// import './App.scss';
// import cn from 'classnames';
// import { useState } from 'react';

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

// const SORT_BY_LENGTH = 'sortByLength';
// const SORT_ALPHABET = 'SortAlphabetically';

// function sortBy(goods, sortField, rev) {
//   const prepearedGoods = [...goods];

//   if (sortField === 'sortByLength' && rev % 2 !== 0) {
//     prepearedGoods.sort((curent, next) => curent.length - next.length);
//   }

//   if (sortField === 'sortByLength' && rev % 2 === 0) {
//     prepearedGoods.sort((curent, next) => next.length - curent.length);
//   }

//   if (sortField === 'SortAlphabetically' && rev % 2 !== 0) {
//     prepearedGoods.sort((curent, next) => curent.localeCompare(next));
//   }

//   if (sortField === 'SortAlphabetically' && rev % 2 === 0) {
//     prepearedGoods.sort((curent, next) => next.localeCompare(curent));
//   }

//   if (sortField === '' && rev % 2 === 0) {
//     prepearedGoods.reverse();
//   }

//   return prepearedGoods;
// }

// export const App = () => {
//   const [sortField, setSortField] = useState('');
//   const [rev, checkRev] = useState(1);
//   const sortedGoods = sortBy(goodsFromServer, sortField, rev);

//   return (
//     <div className="section content">
//       <div className="buttons">
//         <button
//           type="button"
//           className={cn(
//             'button', 'is-info', { 'is-light': sortField !== SORT_ALPHABET },
//           )}
//           onClick={() => setSortField(SORT_ALPHABET)}
//         >
//           Sort alphabetically
//         </button>

//         <button
//           type="button"
//           className={cn(
//             'button',
//             'is-success',
//             { 'is-light': sortField !== SORT_BY_LENGTH },
//           )}
//           onClick={() => setSortField(SORT_BY_LENGTH)}
//         >
//           Sort by length
//         </button>

//         <button
//           type="button"
//           className={cn(
//             'button', 'is-warning', { 'is-light': rev % 2 !== 0 },
//           )}
//           onClick={() => checkRev(rev + 1)}
//         >
//           Reverse
//         </button>
//         {sortField || rev % 2 === 0
//           ? (
//             <button
//               type="button"
//               className="button is-danger is-light"
//               onClick={() => {
//                 setSortField('');
//                 checkRev(1);
//               }}
//             >
//               Reset
//             </button>

//           )
//           : ''
//         }
//       </div>
//       <ul>
//         {sortedGoods.map(good => (
//           <li
//             data-cy="Good"
//             key={good}
//           >
//             {good}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
