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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'sortByLength';

function getPreparedGroceries(groceries, sortField, reverseMethod) {
  const preparedGroceries = [...groceries];

  if (sortField) {
    preparedGroceries.sort(
      (groceries1, groceries2) => {
        switch (sortField) {
          case SORT_BY_ALPHABET:
            return groceries1.localeCompare(groceries2);

          case SORT_BY_LENGTH:
            return groceries1.length - groceries2.length;

          default:
            return 0;
        }
      },
    );
  }

  return reverseMethod ? preparedGroceries.reverse() : preparedGroceries;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseMethod, setReverseMethod] = useState(false);
  const visibleGroceries = getPreparedGroceries(
    goodsFromServer, sortField, reverseMethod,
  );
  const isResetButtonVisible = sortField || reverseMethod;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SORT_BY_ALPHABET })}`}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_BY_LENGTH })}`}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': reverseMethod !== true })}`}
          onClick={
            () => setReverseMethod(prevReverseMethod => !prevReverseMethod)
          }
        >
          Reverse
        </button>

        {(isResetButtonVisible)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setReverseMethod('');
              }}
            >
              Reset
            </button>
          )}
      </div>
      <ul>
        {visibleGroceries.map(grocery => (
          <li data-cy="Good" key={grocery}>{grocery}</li>
        ))}
      </ul>
    </div>
  );
};
