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
  const [sortedField, setSortedField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  let visibleGoods = [...goodsFromServer];

  if (sortedField === 'alphabet') {
    visibleGoods = visibleGoods.sort();
  } else if (sortedField === 'length') {
    visibleGoods = visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  const reset = () => {
    setSortedField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info', {
              'is-light': sortedField !== 'alphabet',
            })
          }
          onClick={() => setSortedField('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success', {
              'is-light': sortedField !== 'length',
            })
          }
          onClick={() => setSortedField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-warning', {
              'is-light': !isReversed,
            })
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortedField || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
          : null
        }
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
