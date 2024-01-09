import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const SORT_FIELD_ABC = 'alphabetical';
const SORT_FIELD_LGTH = 'length';

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

function sortingGoods(goods, sortField, currStage) {
  const copyGoods = [...goods];

  copyGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ABC:
        return good1.localeCompare(good2);

      case SORT_FIELD_LGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  return copyGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = sortingGoods(goodsFromServer, sortField);
  const [isReversed, setReversed] = useState(false);
  const [isReseted, setIsReseted] = useState(true);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ABC);
            setIsReseted(false);
          }}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ABC && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_LGTH);
            setIsReseted(false);
          }}
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={isReversed
            ? () => {
              setReversed(false);
              (sortField === ''
                ? setIsReseted(true)
                : setIsReseted(false))
            }
            : () => {
              setReversed(true);
              setIsReseted(false);
            }
          }
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {!isReseted
          && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
              setIsReseted(true);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
          )
        }

      </div>

      <ul>
        { isReversed
          ? visibleGoods.reverse().map((good, index) => (
            <li key={good} data-cy="Good">{good}</li>
          ))
          : visibleGoods.map((good, index) => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
      </ul>
    </div>
  );
};
