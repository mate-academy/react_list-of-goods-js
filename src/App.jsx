import { useState } from 'react';
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

const SortTypes = {
  ALPHABET: 'ALPHABET',
  LENGTH: 'LENGTH',
};

export const App = () => {
  const [listOfGoods, setListOfGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const isResetDisplayed = listOfGoods !== goodsFromServer
    || sortType !== null
    || isReversed;

  const handleSortAlphabetically = () => {
    setSortType(SortTypes.ALPHABET);

    setListOfGoods(
      (prev) => {
        const next = [...prev];

        next.sort(
          (a, b) => a.localeCompare(b),
        );

        return next;
      },
    );
  };

  const handleSortByLength = () => {
    setSortType(SortTypes.LENGTH);

    setListOfGoods(
      (prev) => {
        const next = [...prev];

        next.sort(
          (a, b) => a.length - b.length,
        );

        return next;
      },
    );
  };

  const handleReverse = () => {
    if (isReversed && sortType === null) {
      handleReset();

      return;
    }

    setIsReversed(prev => !prev);

    setListOfGoods(
      (prev) => {
        const next = [...prev];

        next.reverse();

        return next;
      },
    );
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
    setListOfGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortTypes.ALPHABET ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType === SortTypes.LENGTH ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {isResetDisplayed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listOfGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
