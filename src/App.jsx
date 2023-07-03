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

function getPreparedGoods(goods, toChangeDirection, theWayToSort) {
  const preparedGoods = [...goods];

  if (theWayToSort) {
    preparedGoods.sort((a, b) => {
      switch (theWayToSort) {
        case SORT_ALPHABETICALLY:
          return a.localeCompare(b);

        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (toChangeDirection) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [theWayToSort, setTheWayToSort] = useState('');
  const [reverseList, setReverseList] = useState(false);
  const sortedList = getPreparedGoods(
    goodsFromServer,
    reverseList,
    theWayToSort,
  );

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
            setReverseList(!reverseList);
          }}
          type="button"
          className={`button is-warning ${!reverseList && ('is-light')}`}
        >
          Reverse
        </button>

        {(sortedList.toString() !== goodsFromServer.toString()
          || reverseList) && (
          <button
            onClick={() => {
              setTheWayToSort('');
              setReverseList(false);
            }}
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
