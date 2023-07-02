import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

function getPreparedGoods(goods, { sortField, isReversed }) {
  let allGoods = [...goods];

  switch (sortField) {
    case 'alphabet':
      allGoods.sort();
      break;
    case 'length':
      allGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    case '':
      allGoods = [...goodsFromServer];
      break;
    default:
      allGoods = [...goods];
      break;
  }

  if (isReversed) {
    allGoods.reverse();
  }

  return allGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
          onClick={() => setSortField('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReversed(false);
                setSortField('');
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
