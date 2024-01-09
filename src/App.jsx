import cn from 'classnames';
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

const SORT_FORMAT_ALPHABETICALLY = 'alphabet';
const SORT_FORMAT_BY_LENGTH = 'sortByLength';
const REVERSE = 'reverse';

function getPreparedGoods(groceries, sortFormat, doReverse) {
  const preparedGoods = [...groceries];

  if (sortFormat) {
    preparedGoods.sort(
      (good1, good2) => {
        switch (sortFormat) {
          case SORT_FORMAT_ALPHABETICALLY:
            return good1.localeCompare(good2);

          case SORT_FORMAT_BY_LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      },
    );
  }

  return doReverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortFormat, setSortFormat] = useState('');
  const [doReverse, setDoReverse] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortFormat, doReverse);
  const HAS_ACTIVE_SORTING = sortFormat || doReverse !== '';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortFormat !== SORT_FORMAT_ALPHABETICALLY })}`}
          onClick={() => setSortFormat(SORT_FORMAT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortFormat !== SORT_FORMAT_BY_LENGTH })}`}
          onClick={() => setSortFormat(SORT_FORMAT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': doReverse !== REVERSE })}`}
          onClick={() => (doReverse !== ''
            ? setDoReverse('')
            : setDoReverse(REVERSE))}
        >
          Reverse
        </button>

        {(HAS_ACTIVE_SORTING)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortFormat('');
                setDoReverse('');
              }}
            >
              Reset
            </button>
          )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
