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

export const App = () => {
  const [originalGoods] = useState(goodsFromServer);
  const [goods, setGoods] = useState([...originalGoods]);
  const [sortBy, setSortBy] = useState('default');
  const [isReversed, setIsReversed] = useState(false);

  function getSortedGoods(type, reversed) {
    const base = [...originalGoods];
    let result;

    switch (type) {
      case 'alphabet':
        result = base.sort((a, b) => a.localeCompare(b));
        break;

      case 'length':
        result = base.sort((a, b) => a.length - b.length);
        break;

      default:
        result = base;
    }

    if (reversed) {
      result = result.reverse();
    }

    setGoods(result);
    setSortBy(type);
    setIsReversed(reversed);
  }

  function reset() {
    setGoods(originalGoods);
    setSortBy('default');
    setIsReversed(false);
  }

  function toggleReverse() {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => getSortedGoods('alphabet', isReversed)}
          type="button"
          className={classNames('button is-info', {
            'is-active': sortBy === 'alphabet',
            'is-light': sortBy !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-active': sortBy === 'length',
            'is-light': sortBy !== 'length',
          })}
          onClick={() => getSortedGoods('length', isReversed)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-info', {
            'is-active': isReversed,
            'is-light': !isReversed,
          })}
          onClick={() => toggleReverse()}
        >
          Reverse
        </button>

        {(isReversed === true || sortBy !== 'default') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
