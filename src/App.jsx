import 'bulma/css/bulma.css';
import cn from 'classnames';
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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortGoods = (field, reverse = false) => {
    const sortedGoods = [...goodsFromServer];

    switch (field) {
      case 'alphabet':
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const visibleGoods = sortGoods(sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
          onClick={() => setSortField('alphabet')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevValue => !prevValue)}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
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
        )}
      </div>
      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// export const App = () => (
//   <div className="section content">
//     <div className="buttons">
//       <button type="button" className="button is-info is-light">
//         Sort alphabetically
//       </button>

//       <button type="button" className="button is-success is-light">
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
