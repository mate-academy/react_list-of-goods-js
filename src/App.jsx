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

const SORT_BY_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { typeOfSort, isReversed }) {
  let preparedGoods = [...goodsFromServer];

  if (typeOfSort) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (typeOfSort) {
        case SORT_BY_ALPHABETICALLY:
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
  const [typeOfSort, setTypeOfSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleEffects = getPreparedGoods(
    goodsFromServer, { typeOfSort, isReversed },
  );

  const handleSort = (sortType) => {
    setTypeOfSort(sortType);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${SORT_BY_ALPHABETICALLY === typeOfSort ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${SORT_BY_LENGTH === typeOfSort ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(typeOfSort || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setTypeOfSort('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleEffects.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
