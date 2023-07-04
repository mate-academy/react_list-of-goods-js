import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cN from 'classnames';

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

const SORT_ASC = 'asc';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortList, isReversed) {
  const preparedGoods = [...goods];

  if (sortList) {
    preparedGoods.sort((good1, good2) => {
      switch (sortList) {
        case SORT_ASC:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

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
  const [sortList, setSortList] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortList('');
    setIsReversed(false);
  };

  const makeSetSortList = field => () => setSortList(field);

  const sortGoods = getPreparedGoods(goodsFromServer, sortList, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cN({ 'is-light': sortList !== SORT_ASC })}`}
          onClick={makeSetSortList(SORT_ASC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cN({ 'is-light': sortList !== SORT_BY_LENGTH })}`}
          onClick={makeSetSortList(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cN({ 'is-light': !isReversed })}`}
          onClick={(prevState => !prevState)}
        >
          Reverse
        </button>

        {(sortList || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
