import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

const SORT__ALPHABETICALLY = 'alphabet';
const SORT__BY__LENGTH = 'length';
const getPreparedGoods = (goods, sortType, isReversed) => {
  const copyGoods = [...goods];

  if (sortType) {
    switch (sortType) {
      case SORT__ALPHABETICALLY:
        copyGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SORT__BY__LENGTH:
        copyGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default: return 0;
    }
  }

  return isReversed ? copyGoods.reverse() : copyGoods;
};

export const App = () => {
  const [sortType, setsortType] = useState(null);
  const [isReversed, setIsReversed] = useState('');
  const preparedGoods = getPreparedGoods(
    goodsFromServer, sortType, isReversed,
  );

  const handleReset = () => {
    setsortType(null);
    setIsReversed('');
  };

  const resetCondition = (sortType !== null || isReversed === 'reverse');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SORT__ALPHABETICALLY },
          )
          }
          onClick={() => setsortType(SORT__ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SORT__BY__LENGTH },
          )}
          onClick={() => setsortType(SORT__BY__LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => (
            setIsReversed(!isReversed ? 'reverse' : '')
          )}
        >
          Reverse
        </button>

        {resetCondition && (
          <button
            type="button"
            className={cn(
              'button',
              { 'is-danger is-light': sortType || isReversed },
            )}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li
            key={uuidv4()}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
