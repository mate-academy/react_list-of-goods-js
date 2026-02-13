import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';

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
  const [goods] = React.useState(goodsFromServer);
  const sortedGoods = [...goods];
  const [sortType, setSortType] = React.useState('default');
  const [isReverse, setIsReverse] = React.useState(false);

  if (sortType === 'alphabet') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  const reset = () => {
    setSortType('default');
    setIsReverse(false);
  };

  const sortAlphabetically = () => {
    setSortType('alphabet');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={`button is-info ${sortType !== 'alphabet' ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType('length')}
          type="button"
          className={`button is-info ${sortType !== 'length' ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(prev => !prev)}
          type="button"
          className={`button is-warning ${!isReverse ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {sortType !== 'default' || isReverse ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
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
