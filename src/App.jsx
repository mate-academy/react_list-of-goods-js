/* eslint-disable react/no-array-index-key */
import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
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
const SORT_BY_LENGTH = 'length';

function sortList(goods, { sortFilter, doReverse }) {
  const copyOfGoods = [...goods];

  if (sortFilter) {
    copyOfGoods.sort((good1, good2) => {
      switch (sortFilter) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return null;
      }
    });
  }

  if (doReverse) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App = () => {
  const [sortFilter, setSortFilter] = useState('');
  const [doReverse, setDoReverse] = useState(false);
  const [reset, setReset] = useState(false);
  const [resetOffByReverse, setResetOffByReverse] = useState(false);

  const sortGoods = sortList(goodsFromServer, { sortFilter, doReverse });

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn('button is-info', {
              'is-light': sortFilter !== SORT_BY_ALPHABET,
            })}
            onClick={() => {
              setSortFilter(SORT_BY_ALPHABET);
              setReset(true);
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success', {
              'is-light': sortFilter !== SORT_BY_LENGTH,
            })}
            onClick={() => {
              setSortFilter(SORT_BY_LENGTH);
              setReset(true);
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-info', {
              'is-light': !doReverse,
            })}
            onClick={() => {
              setDoReverse(!doReverse);
              setResetOffByReverse(true);

              if (resetOffByReverse) {
                setResetOffByReverse(false);
              }
            }}
          >
            Reverse
          </button>

          {reset || resetOffByReverse ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortFilter('');
                setReset(false);
                setDoReverse(false);
                setResetOffByReverse(false);
              }}
            >
              Reset
            </button>
          ) : null}
        </div>

        <ul>
          {sortGoods.map((good, index) => (
            <li
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
