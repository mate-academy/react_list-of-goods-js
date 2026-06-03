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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('default');
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlphabetically = () => {
    setSortType('alphabetical');
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortType('default');
    setIsReversed(false);
  };

  const sortedGoods = [...goods].sort((a, b) => {
    if (sortType === 'alphabetical') {
      return a.localeCompare(b);
    }

    if (sortType === 'length') {
      return a.length - b.length;
    }

    return 0;
  });
  const visibleGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(`button is-info`, {
            'is-light': sortType !== 'alphabetical',
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(`button is-success`, {
            'is-light': sortType !== 'length',
          })}
          onClick={() => {
            setSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(`button is-warning`, {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== 'default' || isReversed) && (
          <button
            type="button"
            className={classNames(`button is-danger`, {
              'is-light': true,
            })}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
