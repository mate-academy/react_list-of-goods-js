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
  const sortedGoods = [...goods];

  if (ALPHABETICAL === sortType) {
    return sortedGoods.sort((good1, good2) => (
      good1.localeCompare(good2)
    ));
  }

  if (BY_LENGTH === sortType) {
    return sortedGoods.sort((good1, good2) => (
      good1.length - good2.length
    ));
  }

  // if (isReversed) {
  //   return sortedGoods.reverse();
  // }

  return sortedGoods;
};

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reverseGoods = () => {
    const reversedGoods = isReversed
      ? [...goods].reverse()
      : sortGoodsByType(goods, sortType);

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setSortType(null);
  };

  const preparedGoods = sortGoodsByType(goodsFromServer, sortType);

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
            setIsReversed(false);
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
            setIsReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
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

// const sortedByAlphabetically = [...goods].sort((good1, good2) => (
  //   good1.localeCompare(good2)
  // ));

  // const handleSortGoods = () => {
  //   setIsSortedByLength(false);
  //   setIsSortedByAlphabetic(true);
  //   setGoods(sortedByAlphabetically);
  // };

  // const sortedByLength = [...goods].sort((good1, good2) => (
  //   good1.length - good2.length
  // ));

  // const handleSortByLength = () => {
  //   setIsSortedByLength(true);
  //   setIsSortedByAlphabetic(false);
  //   setGoods(sortedByLength);
  // };


  // const [isSortedByAlphabetic, setIsSortedByAlphabetic] = useState(false);
  // const [isSortedByLength, setIsSortedByLength] = useState(false);

  