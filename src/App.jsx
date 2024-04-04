/* eslint-disable camelcase */
import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_BY_AlPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH_WORDS = 'Sort by length';

function getPreparedGoods(goods, sort, reverseGoods) {
  const sortGoodsFromServer = [...goods];

  if (sort) {
    sortGoodsFromServer.sort((el1, el2) => {
      switch (sort) {
        case SORT_BY_AlPHABETICALLY:
          return el1.localeCompare(el2);

        case SORT_BY_LENGTH_WORDS:
          return el1.length - el2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseGoods) {
    return sortGoodsFromServer.reverse();
  }

  return sortGoodsFromServer;
}

export const App = () => {
  const [sort, setSort] = useState('');
  const [reverse, setReverse] = useState(false);

  const goodslist = getPreparedGoods(goodsFromServer, sort, reverse);

  const actionBtnReset = () => {
    setSort('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSort(SORT_BY_AlPHABETICALLY)}
          className={classNames('button is-info', {
            'is-light': sort !== `${SORT_BY_AlPHABETICALLY}`,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSort(SORT_BY_LENGTH_WORDS)}
          className={classNames('button is-success', {
            'is-light': sort !== `${SORT_BY_LENGTH_WORDS}`,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverse(!reverse)}
          className={classNames('button is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sort || reverse) && (
          <button
            type="button"
            onClick={actionBtnReset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodslist.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
