import { useState } from 'react';
import cn from 'classnames';
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

const SORT_BY = {
  alphabet: 'alphabet',
  length: 'length',
};

function sortGoods(goods, sortBy) {
  const sortedGoods = [...goods];

  switch (sortBy) {
    case SORT_BY.alphabet:
      return sortedGoods
        .sort((a, b) => a.localeCompare(b));

    case SORT_BY.length:
      return sortedGoods
        .sort((a, b) => a.length - b.length);

    default:
      return sortedGoods;
  }
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverced, setIsReverced] = useState(false);
  const renderGood = sortGoods(goodsFromServer, sortField);

  if (isReverced) {
    renderGood.reverse();
  }

  const recet = () => {
    setSortField('');
    setIsReverced(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SORT_BY.alphabet })
          }
          onClick={() => setSortField(SORT_BY.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_BY.length })
          }
          onClick={() => setSortField(SORT_BY.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReverced })
          }
          onClick={() => setIsReverced(!isReverced)}
        >
          Reverse
        </button>

        {(sortField || isReverced) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={recet}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderGood.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
