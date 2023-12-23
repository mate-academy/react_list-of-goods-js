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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPH = 'alphabetically';

let preparedGoods = [...goodsFromServer];

function getPreparedGoods(goods, sortType) {
  const preparedArray = [...goods];

  if (sortType === SORT_BY_ALPH) {
    preparedArray.sort();
  }

  if (sortType === SORT_BY_LENGTH) {
    return (
      preparedArray.sort((good1, good2) => (
        good1.length - good2.length
      ))
    );
  }

  return preparedArray;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseMode, setReverseMode] = useState('off');

  let visibleGoods = getPreparedGoods(preparedGoods, sortField);

  if (reverseMode === 'on') {
    visibleGoods.reverse();
  }

  if (reverseMode === 'off') {
    visibleGoods.reverse();
    visibleGoods = getPreparedGoods(preparedGoods, sortField);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === SORT_BY_ALPH
            ? 'button is-info'
            : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SORT_BY_ALPH);
            getPreparedGoods(preparedGoods, SORT_BY_ALPH);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortField === SORT_BY_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'
          }
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
            getPreparedGoods(preparedGoods, SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseMode === 'on'
            ? 'button is-warning'
            : 'button is-warning is-light'
          }
          onClick={() => {
            if (reverseMode === 'off') {
              setReverseMode('on');
            }

            if (reverseMode === 'on') {
              setReverseMode('off');
            }
          }}
        >
          Reverse
        </button>

        {(sortField || reverseMode === 'on')
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setReverseMode('');
                preparedGoods = [...goodsFromServer];
              }}
            >
              Reset
            </button>
          )
          : null
        }

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
