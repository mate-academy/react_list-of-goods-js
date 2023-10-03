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

export const App = () => {
  const [sortedList, setSortedList] = useState(goodsFromServer);
  const [sortMethod, setSortMethod] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = (method) => {
    const preparedGoods = [...goodsFromServer];

    switch (method) {
      case 'byAlphabetical':
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        setSortMethod(method);
        break;

      case 'byLength':
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        setSortMethod(method);
        break;

      default:
        setSortMethod('none');
        break;
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    setSortedList(preparedGoods);
  };

  const handleReverse = () => {
    const preparedGoods = [...sortedList];

    preparedGoods.reverse();
    setIsReversed(!isReversed);
    setSortedList(preparedGoods);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortedList(goodsFromServer);
    setSortMethod('none');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort('byAlphabetical')}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortMethod !== 'byAlphabetical',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort('byLength')}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortMethod !== 'byLength',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {sortMethod !== 'none' || isReversed ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedList.map(good => (<li data-cy="Good">{good}</li>))}
      </ul>
    </div>
  );
};
