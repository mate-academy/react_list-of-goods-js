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

const sortByAbc = 'abc';
const sortByLength = 'length';

function sortList(list, sortFunction) {
  const sortedList = [...list];

  sortedList.sort((list1, list2) => {
    switch (sortFunction) {
      case sortByAbc:
        return list1.localeCompare(list2);

      case sortByLength:
        if (list2.length === list1.length) {
          return list1.localeCompare(list2);
        }

        return list1.length - list2.length;

      default:
        return 0;
    }
  });

  return sortedList;
}

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  let visibleGoods = goods;

  if (isReverse) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === sortByAbc ? '' : 'is-light'
          }`}
          onClick={() => {
            const sorted = sortList(goods, sortByAbc);

            setGoods(sorted);
            setSortType(sortByAbc);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === sortByLength ? '' : 'is-light'}`}
          onClick={() => {
            const sorted = sortList(goods, sortByLength);

            setGoods(sorted);
            setSortType(sortByLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'}`}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(goods.join('-') !== goodsFromServer.join('-') || isReverse) && (
          <button
            type="button"
            className="button is-warning is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSortType('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
