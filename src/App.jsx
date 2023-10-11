import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET ';
const SORT_BY_LENGTH = 'SORT_BY_LENGTH';

function getPreparedGoods(
  goods,
  sortField,
  reverse,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [isSorting, setIsSorting] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goodsList = getPreparedGoods(
    goodsFromServer,
    isSorting,
    isReversed,
  );
  const showResetBtn = (isSorting !== '') || isReversed;

  const handleClickReset = () => {
    setIsSorting('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSorting !== SORT_BY_ALPHABET && 'is-light'} `}
          onClick={() => setIsSorting(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSorting !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={() => setIsSorting(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showResetBtn && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClickReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map((good) => {
          const idUuid = uuidv4();

          return (
            <li key={idUuid} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
