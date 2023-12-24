import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORTING = {
  byAlphabet: 'alphabet',
  byLength: 'length',
  byDefault: '',
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortType) {
      case SORTING.byAlphabet:
        return good1.localeCompare(good2);

      case SORTING.byLength:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SORTING.byAlphabet)}
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SORTING.byAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SORTING.byLength)}
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SORTING.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType !== SORTING.byDefault || isReversed) && (
          <button
            type="button"
            onClick={() => {
              setSortType(SORTING.byDefault);
              setIsReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )
        }
      </div>

      <ul>
        {goods.map(good => <li data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
