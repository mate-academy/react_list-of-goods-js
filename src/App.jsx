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
const ALPHABETICAL = 'Alphabetical';
const BY_LENGTH = 'ByLength';

const sortGoodsByType = (goods, sortType, isReversed) => {
  let sortedGoods = [...goods];

  switch (sortType) {
    case ALPHABETICAL:
      sortedGoods.sort((good1, good2) => (
        good1.localeCompare(good2)
      ));
      break;

    case BY_LENGTH:
      sortedGoods.sort((good1, good2) => (
        good1.length - good2.length
      ));
      break;

    default:
      break;
  }

  if (isReversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const resetGoods = () => {
    setIsReversed(false);
    setSortType(null);
  };

  const preparedGoods = sortGoodsByType(goodsFromServer, sortType, isReversed);

  const isSomeButtonsActive = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== ALPHABETICAL },
          )}
          onClick={() => {
            setSortType(ALPHABETICAL);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== BY_LENGTH },
          )}
          onClick={() => {
            setSortType(BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {isSomeButtonsActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>
      {preparedGoods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </div>
  );
};
