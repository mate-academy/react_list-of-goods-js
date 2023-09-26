import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlphabeticallyClick = () => {
    if (isSortedAlphabetically) {
      return;
    }

    const preparedGoods = [...goodsFromServer];

    if (!isSortedAlphabetically) {
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    setIsSortedByLength(false);
    setIsSortedAlphabetically(true);
    setSortedList(preparedGoods);
  }

  const handleSortByLength = () => {
    if (isSortedByLength) {
      return;
    }

    const preparedGoods = [...goodsFromServer];

    if (!isSortedByLength) {
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    setIsSortedAlphabetically(false);
    setIsSortedByLength(true);
    setSortedList(preparedGoods);
  }

  const handleReverse = () => {
    const preparedGoods = [...sortedList];

    preparedGoods.reverse();
    setIsReversed(!isReversed);
    setSortedList(preparedGoods);
  }

  const handleReset = () => {
    setSortedList([...goodsFromServer]);

    setIsSortedAlphabetically(false);
    setIsSortedByLength(false);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabeticallyClick}
          type="button"
          className={`button is-info ${!isSortedAlphabetically && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={`button is-success ${!isSortedByLength && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        { isSortedAlphabetically || isSortedByLength || isReversed
          ?
          (
            <button
              onClick={handleReset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
          : null
        }
      </div>

      <ul>
        {sortedList.map(good => (<li data-cy="Good">{good}</li>))}
      </ul>
    </div>
  )};
