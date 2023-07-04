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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedList = getPreparedGoods(
    goodsFromServer,
    isReversed,
    sortType,
  );

  const resetChanges = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortType(SORT_ALPHABETICALLY);
          }}
          type="button"
          className={`button is-info ${sortType !== SORT_ALPHABETICALLY && ('is-light')}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortType(SORT_BY_LENGTH);
          }}
          type="button"
          className={`button is-success ${sortType !== SORT_BY_LENGTH && ('is-light')}`}
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

        {(sortType || isReversed) && (
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
