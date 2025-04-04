import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { GoodList } from './components/GoodList/GoodList';

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

const SORT_FIELD_AZ = 'AZ';
const SORT_FIELD_LENGTH = 'length';

function prepareGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_AZ:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_FIELD_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = prepareGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== 'AZ' ? 'is-light' : ''}`}
          onClick={() => setSortField('AZ')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== 'length' ? 'is-light' : ''}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={visibleGoods} />
    </div>
  );
};
