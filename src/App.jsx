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

const ABC = '1';
const L = '2';

function Sort(arr, reverse, sort) {
  let tempArr = [...arr];

  switch (sort) {
    case ABC:
      tempArr = tempArr.sort((a, b) => a.localeCompare(b));
      break;
    case L:
      tempArr = tempArr.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    tempArr.reverse();
  }

  return tempArr;
}

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sort, setSort] = useState('');

  const visibleGoods = Sort(goodsFromServer, isReverse, sort);

  function Reset() {
    setIsReverse(false);
    setSort('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-danger ${sort === ABC ? null : 'is-light'}`}
          onClick={() => setSort(ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-danger ${sort === L ? null : 'is-light'}`}
          onClick={() => setSort(L)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-danger ${isReverse ? null : 'is-light'}`}
          onClick={() =>
            !isReverse ? setIsReverse(true) : setIsReverse(false)
          }
        >
          Reverse
        </button>

        {isReverse || sort ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => Reset()}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(goods => (
          <li data-cy="Good">{goods}</li>
        ))}
      </ul>
    </div>
  );
};
