import 'bulma/css/bulma.css';
import './App.scss';
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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleAction = type => {
    switch (type) {
      case 'alphabet':
      case 'length': {
        // const sorted = [...goods].sort(
        //   type === 'alphabet'
        //     ? (a, b) => a.localeCompare(b)
        //     : (a, b) => a.length - b.length,
        // );

        const sorted = [...goodsFromServer].sort(
          type === 'alphabet'
            ? (a, b) => a.localeCompare(b)
            : (a, b) => a.length - b.length,
        );

        setGoods(isReversed ? sorted.reverse() : sorted);
        setActiveSort(type);
        break;
      }

      case 'reverse':
        setGoods(good => [...good].reverse());
        setIsReversed(r => !r);
        break;

      case 'reset':
        setGoods(goodsFromServer);
        setActiveSort('');
        setIsReversed(false);
        break;

      default:
        break;
    }
  };

  const isChanged = goods.join() !== goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => handleAction('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === 'length' ? '' : 'is-light'}`}
          onClick={() => handleAction('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => handleAction('reverse')}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => handleAction('reset')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

// export const App = () => {
//   const [goods, setGoods] = useState(goodsFromServer);
//   const [activeSort, setActiveSort] = useState('');
//   const [isReversed, setIsReversed] = useState(false);

//   const sortAlphabetically = () => {
//     const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

//     setGoods(isReversed ? sorted.reverse() : sorted);
//     setActiveSort('alphabet');
//   };

//   const sortByLength = () => {
//     const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

//     setGoods(isReversed ? sorted.reverse() : sorted);
//     setActiveSort('length');
//   };

//   const reverseGoods = () => {
//     setGoods(prevGoods => [...prevGoods].reverse());
//     setIsReversed(prev => !prev);
//     // НЕ меняем activeSort
//   };

//   const resetGoods = () => {
//     setGoods(goodsFromServer);
//     setActiveSort('');
//     setIsReversed(false);
//   };

//   const isChanged = goods.join(',') !== goodsFromServer.join(',');

//   return (
//     <div className="section content">
//       <div className="buttons">
//         <button
//           type="button"
//           className={`button is-info ${
//             activeSort === 'alphabet' ? '' : 'is-light'
//           }`}
//           onClick={sortAlphabetically}
//         >
//           Sort alphabetically
//         </button>

//         <button
//           type="button"
//           className={`button is-success ${
//             activeSort === 'length' ? '' : 'is-light'
//           }`}
//           onClick={sortByLength}
//         >
//           Sort by length
//         </button>

//         <button
//           type="button"
//           className={`button is-warning ${isReversed ? '' : 'is-light'}`}
//           onClick={reverseGoods}
//         >
//           Reverse
//         </button>

//         {isChanged && (
//           <button
//             type="button"
//             className="button is-danger"
//             onClick={resetGoods}
//           >
//             Reset
//           </button>
//         )}
//       </div>

//       <ul>
//         {goods.map(good => (
//           <li key={good} data-cy="Good">
//             {good}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
