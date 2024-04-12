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

const SORTER_ALPHABET = 'alphabetically';
const SORTER_LENGTH = 'length';
const SORTER_RESET = 'reset';

function getPreparedGoods(goods, { sortField }, reversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORTER_ALPHABET:
          return good1.localeCompare(good2);
        case SORTER_LENGTH:
          return good1.length - good2.length;
        case SORTER_RESET:
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
    if (sortField !== sorter) {
      return true;
    }

    return false;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': isNotClicked(SORTER_ALPHABET),
          })}
          onClick={() => setSortField(SORTER_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': isNotClicked(SORTER_LENGTH),
          })}
          onClick={() => setSortField(SORTER_LENGTH)}
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
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
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
