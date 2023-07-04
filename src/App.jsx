import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList';

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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, isReversed, sortType) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((a, b) => {
      switch (sortType) {
        case SORT_ALPHABETICALLY:
          return a.localeCompare(b);

        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [theWayToSort, setTheWayToSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedList = getPreparedGoods(
    goodsFromServer,
    isReversed,
    theWayToSort,
  );
  const resetChanges = () => {
    setTheWayToSort('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setTheWayToSort(SORT_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${theWayToSort !== SORT_ALPHABETICALLY && ('is-light')}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setTheWayToSort(SORT_BY_LENGTH)}
          type="button"
          className={`button is-success ${theWayToSort !== SORT_BY_LENGTH && ('is-light')}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={`button is-warning ${!isReversed && ('is-light')}`}
        >
          Reverse
        </button>

        {(sortedList.toString() !== goodsFromServer.toString()
          || isReversed) && (
          <button
            onClick={resetChanges}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedList} />
    </div>
  );
};
