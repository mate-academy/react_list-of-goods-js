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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const SORT_DIRECTION_REVERSED = 'reversed';
let CHANGED_DIRECTION = false;
let CHANGED_SORTING = false;

function getPreparedGoods(goods, { sortField, direction }) {
  const preparedGoods = [...goods];

  if (sortField) {
    CHANGED_SORTING = true;

    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (direction === SORT_DIRECTION_REVERSED) {
    CHANGED_SORTING = true;
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [direction, setDirection] = useState('');
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, direction },
  );

  function setReverseButtonAction(directionChanges) {
    if (directionChanges) {
      CHANGED_DIRECTION = false;

      return setDirection('');
    }

    CHANGED_DIRECTION = true;

    return setDirection(SORT_DIRECTION_REVERSED);
  }

  function resetSorting() {
    setSortField('');
    setDirection('');
  }

  function displayResetButton(sorting) {
    if (sorting) {
      CHANGED_SORTING = false;

      return true;
    }

    return false;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_NAME)}
          className={`button is-info ${cn({ 'is-light': sortField !== SORT_FIELD_NAME })}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_FIELD_LENGTH })}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseButtonAction(CHANGED_DIRECTION)}
          className={`button is-warning ${cn({ 'is-light': direction !== SORT_DIRECTION_REVERSED })}`}
        >
          Reverse
        </button>

        {displayResetButton(CHANGED_SORTING)
        && (
          <button
            type="button"
            onClick={() => resetSorting()}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
