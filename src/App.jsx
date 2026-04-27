import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const FILTER_ALPHABETICALLY = 'abc';
const FILTER_LENGTH = 'length';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [reverseGoods, setReverseGoods] = useState(false);

  function getSortedGoods(goods) {
    const sortedGoods = [...goods];

    sortedGoods.sort((a, b) => {
      switch (filter) {
        case FILTER_ALPHABETICALLY:
          return a.localeCompare(b);
        case FILTER_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    return reverseGoods ? sortedGoods.reverse() : sortedGoods;
  }

  const sortedGoodsArr = getSortedGoods(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': filter !== FILTER_ALPHABETICALLY,
          })}
          onClick={() => {
            setFilter(FILTER_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': filter !== FILTER_LENGTH,
          })}
          onClick={() => {
            setFilter(FILTER_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reverseGoods,
          })}
          onClick={() => {
            setReverseGoods(!reverseGoods);
          }}
        >
          Reverse
        </button>

        {(filter !== '' || reverseGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setFilter('');
              setReverseGoods(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoodsArr.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
