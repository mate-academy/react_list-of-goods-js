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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortList, isReversed) {
  const preparedGoods = [...goods];

  if (sortList) {
    preparedGoods.sort((good1, good2) => {
      switch (sortList) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
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
          className={`button is-info ${cn({ 'is-light': sortList !== SORT_FIELD_ALPHABET })}`}
          onClick={makeSetSortList(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortList !== SORT_FIELD_LENGTH })}`}
          onClick={makeSetSortList(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !isReversed })}`}
          onClick={() => setIsReversed(prevState => !prevState)}
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
