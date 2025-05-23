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

export const App = () => {
  const copy = [...goodsFromServer];

  const [sortgoods, setSortgoods] = useState('reset');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = (() => {
    let sortedArray;

    switch (sortgoods) {
      case 'alphabetically':
        sortedArray = copy.slice().sort((a, b) => a.localeCompare(b));
        break;
      case 'length':
        sortedArray = copy.slice().sort((a, b) => a.length - b.length);
        break;
      case 'reset':
      default:
        sortedArray = [...goodsFromServer];
        break;
    }

    if (isReversed) {
      sortedArray.reverse();
    }

    return sortedArray;
  })();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortgoods('alphabetically')}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortgoods !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortgoods('length')}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortgoods !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortgoods && sortgoods !== 'reset') || isReversed ? (
          <button
            onClick={() => {
              setSortgoods('reset');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(x => (
          <li data-cy="Good" key={x}>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
};
