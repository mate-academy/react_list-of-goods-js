import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
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

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = (field, reverse = false) => {
    const sortedGood = [...goodsFromServer];

    switch (field) {
      case 'alphabet':
        sortedGood.sort((item1, item2) => item1.localeCompare(item2));
        break;
      case 'length':
        sortedGood.sort((item1, item2) => item1.length - item2.length);
        break;
      default:
    }

    if (reverse) {
      sortedGood.reverse();
    }

    return sortedGood;
  };

  const visibleGoods = sortedGoods(sortGoods, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortGoods !== 'alphabet',
          })}
          onClick={() => setSortGoods('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortGoods !== 'length',
          })}
          onClick={() => setSortGoods('length')}
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
        {(sortGoods || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortGoods('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good">{item}</li>
        ))}
      </ul>
    </div>
  );
};
