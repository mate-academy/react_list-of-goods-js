import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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
  const [isAlphabeticaly, setIsAlphabeticaly] = useState(false);
  const [isLength, setIsLength] = useState(false);
  const [isReverse, setReverse] = useState(false);
  const [sortedType, setSortedType] = useState(null);

  const sortGoods = (sortType) => {
    let newGoods = [...goodsFromServer];

    switch (sortType) {
      case 'isAlphabeticaly':
        newGoods = newGoods.sort((good1, good2) => good1.localeCompare(good2));

        break;

      case 'isLength':
        newGoods = newGoods.sort((good1, good2) => good1.length - good2.length);

        break;

      default:
        newGoods = [...newGoods];
    }

    if (isReverse) {
      newGoods = newGoods.reverse();
    }

    return newGoods;
  };

  const sortByAlphabetically = () => {
    setIsAlphabeticaly(true);
    setIsLength(false);
    setSortedType('isAlphabeticaly');
  };

  const sortByLength = () => {
    setIsAlphabeticaly(false);
    setIsLength(true);
    setSortedType('isLength');
  };

  const reverseGoods = () => {
    setReverse(!isReverse);
  };

  const reset = () => {
    setIsAlphabeticaly(false);
    setIsLength(false);
    setReverse(false);
    setSortedType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !isAlphabeticaly,
          })}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': !isLength,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(isAlphabeticaly || isLength || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods(sortedType).map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
