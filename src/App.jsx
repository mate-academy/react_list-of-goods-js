import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { Goods } from './components/Goods';

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
const RESET_VALUE = '';
const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';
const REVERSE = false;

function sortGoods(goods, criteria) {
  let sortedGoods;

  switch (true) {
    case criteria === SORT_BY_NAME:
      sortedGoods = goods.toSorted((a, b) => a.localeCompare(b));
      break;
    case criteria === SORT_BY_LENGTH:
      sortedGoods = goods.toSorted((a, b) => a.length - b.length);
      break;

    default:
      sortedGoods = [...goods];
  }

  return sortedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(RESET_VALUE);
  const [reverse, setReversed] = useState(REVERSE);

  let sortedGoods = sortGoods(goodsFromServer, sortBy, reverse);

  if (reverse) {
    sortedGoods = sortedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': SORT_BY_NAME !== sortBy,
          })}
          onClick={() => setSortBy(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': SORT_BY_LENGTH !== sortBy,
          })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReversed(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortBy || reverse) && (
          <button
            type="button"
            className="button is-info"
            onClick={() => {
              setSortBy(RESET_VALUE);
              setReversed(REVERSE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={sortedGoods} />
    </div>
  );
};
