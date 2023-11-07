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

function sortList(goods, { sortFilter, isReverse }) {
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

  if (isReverse) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App = () => {
  const [sortFilter, setSortFilter] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const sortGoods = sortList(goodsFromServer, { sortFilter, isReverse });

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
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-info', {
              'is-light': !isReverse,
            })}
            onClick={() => {
              setIsReverse(!isReverse);
            }}
          >
            Reverse
          </button>

          {sortFilter || isReverse ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortFilter('');
                setIsReverse(false);
              }}
            >
              Reset
            </button>
          ) : null}
        </div>

        <ul>
          {sortGoods.map(good => (
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
