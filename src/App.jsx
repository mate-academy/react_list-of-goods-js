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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGHT = 'lenght';

const preparedGoods = (sortMethod, isReverse) => {
  const gooods = [...goodsFromServer];

  gooods.sort((a, b) => {
    switch (sortMethod) {
      case SORT_ALPHABET:
        return a.localeCompare(b);
      case SORT_LENGHT:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    gooods.reverse();
  }

  return gooods;
};

export const App = () => {
  const [isGoodSort, setGoodSort] = useState('');
  const [isSortReverse, setSortIsReverse] = useState(false);

  const reset = () => {
    setGoodSort('');
    setSortIsReverse(false);
  };

  const sorts = preparedGoods(isGoodSort, isSortReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setGoodSort(SORT_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': isGoodSort !== SORT_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setGoodSort(SORT_LENGHT)}
          type="button"
          className={cn('button is-success', {
            'is-light': isGoodSort !== SORT_LENGHT,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setSortIsReverse(!isSortReverse)}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !isSortReverse,
          })}
        >
          Reverse
        </button>
        {(isGoodSort || isSortReverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sorts.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
