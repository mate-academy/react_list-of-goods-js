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

export const goodsObject = goodsFromServer
  .map((good, index) => ({ name: good, id: index }));

const SORT_TYPE_NAME = 'name';
const SORT_TYPE_LENGTH = 'length';

function getSortedGoods(goods, sortType, toReverse) {
  const sortedGoods = [...goodsObject];

  if (sortType) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE_NAME:
          return good1.name.localeCompare(good2.name);

        case SORT_TYPE_LENGTH:
          return good1.name.length - good2.name.length;

        default:
          return 0;
      }
    });
  }

  return toReverse ? sortedGoods.reverse() : sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let resetButton = null;

  const visibleGoods = getSortedGoods(goodsObject, sortType, isReversed);

  const handleReverseButton = () => {
    setIsReversed(!isReversed);
  };

  if (sortType || isReversed) {
    resetButton = (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={() => {
          setSortType('');
          setIsReversed(false);
        }}
      >
        Reset
      </button>
    );
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_TYPE_NAME ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_TYPE_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SORT_TYPE_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverseButton}
        >
          Reverse
        </button>

        {resetButton}
      </div>

      <ul>
        {visibleGoods.map((good) => {
          const {
            name,
            id,
          } = good;

          return (
            <li data-cy="Good" key={id}>{name}</li>
          );
        })}
      </ul>
    </div>
  );
};
