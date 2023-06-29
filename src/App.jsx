/* eslint-disable no-console */
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

const SORT_BY_ABC = 'alphabetically';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortGoods, setSortGoods] = useState('');
  const [reverse, setReverse] = useState(false);
  const [actualGoods, setActualGoods] = useState(goodsFromServer);

  function changeActualGoods(actual, { sort, isReverse, reset }) {
    const preparedGoods = [...actual];

    if (reset === true) {
      setActualGoods(actual);
      setSortGoods('');
      setReverse(false);

      return actual;
    }

    if (sort) {
      preparedGoods.sort((good1, good2) => {
        switch (sort) {
          case SORT_BY_ABC:
            setSortGoods(SORT_BY_ABC);

            return good1.localeCompare(good2);

          case SORT_BY_LENGTH:
            setSortGoods(SORT_BY_LENGTH);

            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (isReverse) {
      preparedGoods.reverse();
    }

    setActualGoods(preparedGoods);

    return preparedGoods;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info', { 'is-light': sortGoods !== SORT_BY_ABC })
          }
          onClick={() => changeActualGoods(
            goodsFromServer,
            { sort: SORT_BY_ABC, isReverse: reverse },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success', {
              'is-light': sortGoods !== SORT_BY_LENGTH,
            })
          }
          onClick={() => changeActualGoods(
            goodsFromServer,
            { sort: SORT_BY_LENGTH, isReverse: reverse },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning', { 'is-light': reverse === false })
          }
          onClick={() => {
            if (reverse === false) {
              setReverse(true);
            } else {
              setReverse(false);
            }

            changeActualGoods(
              goodsFromServer,
              { sort: sortGoods, isReverse: !reverse },
            );
          }}
        >
          Reverse
        </button>

        {JSON.stringify(actualGoods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setActualGoods(
                changeActualGoods(goodsFromServer, { reset: true }),
              );
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {actualGoods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
