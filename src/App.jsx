import 'bulma/css/bulma.css';
import cn from 'classnames';
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

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);
  const [sortParam, setSortParam] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const isModified = sortedGoods.join(',') !== goodsFromServer.join(',');

  function sortGoodsBy(param) {
    const preparedGoods = [...goodsFromServer];

    switch (param) {
      case 'length':
        preparedGoods.sort((a, b) => a.length - b.length);
        break;

      case 'reverse':
        setIsReversed(current => !current);
        setSortedGoods(current => [...current].reverse());

        return;

      case 'alphabetically':
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;

      default:
        break;
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    setSortParam(param);
    setSortedGoods(preparedGoods);
  }

  function handleReset() {
    setSortParam('');
    setIsReversed(false);
    setSortedGoods(goodsFromServer);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sortGoodsBy('alphabetically')}
          type="button"
          className={cn('button is-info', {
            'is-light': sortParam !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sortGoodsBy('length')}
          type="button"
          className={cn('button is-success', {
            'is-light': sortParam !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => sortGoodsBy('reverse')}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isModified && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
