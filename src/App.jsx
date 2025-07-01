import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  function getpreparedGoods(goods, field, reverse) {
    let preparedGoods = [...goods];

    switch (field) {
      case 'Sort alphabetically':
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case 'Sort by length':
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      case 'Reset':
        preparedGoods = [...goodsFromServer];
        break;
      default:
        break;
    }

    if (reverse) {
      preparedGoods = preparedGoods.toReversed();
    }

    return preparedGoods;
  }

  const visibleGoods = getpreparedGoods(goodsFromServer, sortField, reversed);
  const isSorted = sortField !== '' || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'Sort alphabetically',
          })}
          onClick={() => {
            setSortField('Sort alphabetically');
            setReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'Sort by length',
          })}
          onClick={() => {
            setSortField('Sort by length');
            setReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed !== true,
          })}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('reset');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
