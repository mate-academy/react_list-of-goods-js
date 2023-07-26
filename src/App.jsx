import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const IS_ALPHABETICALLY = 'ab...';
const IS_LENGTH = 'length';
const INITIAL = 'initial';
const OFF_REVERSE = 'reverseOff';
const ON_REVERSE = 'reverseOn';

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

const sortGoodsByQuery = (goods, query) => {
  let result = [...goods];

  if (query === IS_ALPHABETICALLY) {
    result = result.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (query === IS_LENGTH) {
    result = result.sort((good1, good2) => good1[query] - good2[query]);
  }

  if (query === INITIAL) {
    return goods;
  }

  return result;
};

export const Good = ({ good }) => (
  <li data-cy="Good">{good}</li>
);

export const App = () => {
  const [query, setQuery] = useState(INITIAL);
  const [reverse, setReverse] = useState(OFF_REVERSE);

  let copyGoods = [...goodsFromServer];

  if (query === IS_ALPHABETICALLY) {
    copyGoods = sortGoodsByQuery(copyGoods, query);
  }

  if (query === IS_LENGTH) {
    copyGoods = sortGoodsByQuery(copyGoods, query);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setQuery(IS_ALPHABETICALLY)}
          type="button"
          className={query === IS_ALPHABETICALLY ? (
            'button is-info') : ('button is-info is-light')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setQuery(IS_LENGTH)}
          type="button"
          className={query === IS_LENGTH ? (
            'button is-success') : ('button is-success is-light')}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (reverse === OFF_REVERSE) {
              setReverse(ON_REVERSE);
            }

            if (reverse === ON_REVERSE) {
              setReverse(OFF_REVERSE);
            }
          }}
          type="button"
          className={reverse === ON_REVERSE ? (
            'button is-warning') : ('button is-warning is-light')}
        >
          Reverse
        </button>

        {(query !== INITIAL || reverse === ON_REVERSE) && (
          <button
            onClick={() => {
              setQuery(INITIAL);
              setReverse(OFF_REVERSE);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {reverse === ON_REVERSE ? (
          copyGoods.reverse().map(good => (
            <Good good={good} key={good} />
          ))
        ) : (
          copyGoods.map(good => (
            <Good good={good} key={good} />
          ))
        )}
      </ul>
    </div>
  );
};
