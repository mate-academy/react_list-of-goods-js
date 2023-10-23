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

const reset = 'reset';
const alphabeticaly = 'alphabeticaly';
const length = 'byLength';
const reverse = 'reverse';

const handleSort = (goods, { activeSort, isReversed }) => {
  const prepearedGoods = [...goods];

  switch (activeSort) {
    case alphabeticaly:
      prepearedGoods.sort((a, b) => a[0].localeCompare(b[0],
        'en', { sensitivity: 'base' }));
      if (isReversed) {
        prepearedGoods.reverse();
      }

      return prepearedGoods;

    case length:
      prepearedGoods.sort((a, b) => a.length - b.length);
      if (isReversed) {
        prepearedGoods.reverse();
      }

      return prepearedGoods;

    case reverse:
      if (!isReversed) {
        prepearedGoods.reverse();
      }

      return prepearedGoods;

    default:
      return goods;
  }
};

export const App = () => {
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = handleSort(goodsFromServer, { activeSort, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': activeSort !== alphabeticaly,
          })}
          onClick={() => setActiveSort(alphabeticaly)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': activeSort !== length,
          })}
          onClick={() => setActiveSort(length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': activeSort !== reverse && !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
            // setActiveSort(reverse);
          }}
        >
          Reverse
        </button>

        {activeSort ? (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': activeSort !== reset,
            })}
            onClick={() => {
              setActiveSort('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>

    </div>
  );
};
