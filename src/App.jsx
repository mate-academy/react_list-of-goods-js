import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ABC = 'alphabetically';

function getPreparedGoods(goods, sortType, reverse) {
  let result = [...goods];

  if (sortType) {
    result.sort((good1, good2) => {
      switch (true) {
        case sortType === SORT_FIELD_ABC:
          return good1.localeCompare(good2);

        case sortType === SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    result = result.reverse();
  }

  return result;
}

export const App = () => {
  const [listObserver, setListObserver] = useState({
    sortType: '',
    reverse: false,
  });

  const preparedGoods = getPreparedGoods(
    goodsFromServer,
    listObserver.sortType,
    listObserver.reverse,
  );

  const handleSort = (sortType) => {
    setListObserver(prevState => ({
      ...prevState,
      sortType,
    }));
  };

  const handleReverse = () => {
    setListObserver(prevState => (
      { ...prevState, reverse: !prevState.reverse }
    ));
  };

  const handleReset = () => {
    setListObserver({
      sortType: '',
      reverse: false,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': listObserver.sortType !== SORT_FIELD_ABC },
          )}
          onClick={() => handleSort(SORT_FIELD_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': listObserver.sortType !== SORT_FIELD_LENGTH },
          )}
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !listObserver.reverse },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(listObserver.sortType !== ''
          || listObserver.reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
