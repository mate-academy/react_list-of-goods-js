import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { Table } from './Components/Table/Table';

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

const sort = {
  alphabet: 'alphabetically',
  length: 'length',
  reset: 'reset',
};

function getPreparedGoods(goods, { sortField }, reversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case sort.alphabet:
          return good1.localeCompare(good2);
        case sort.length:
          return good1.length - good2.length;
        case sort.reset:
          return [...goodsFromServer];
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField },
    reversed,
  );

  function isNotClicked(sorter) {
    return sortField !== sorter;
  }

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': isNotClicked(sort.alphabet),
          })}
          onClick={() => setSortField(sort.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': isNotClicked(sort.length),
          })}
          onClick={() => setSortField(sort.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <Table goods={visibleGoods} />
      </ul>
    </div>
  );
};
