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

function getPreparedGoods(goods, sortField, reversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alpha':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseOrder,
  );

  const handleReverseClick = () => {
    setReverseOrder(!reverseOrder);
  };

  const handleResetClick = () => {
    setSortField('');
    setReverseOrder(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField('alpha');
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alpha',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField('length');
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            handleReverseClick();
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseOrder === false,
          })}
        >
          Reverse
        </button>

        {visibleGoods[0] !== goodsFromServer[0] ? (
          <button
            onClick={handleResetClick}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => {
          return <li data-cy="Good">{good}</li>;
        })}
      </ul>
    </div>
  );
};
