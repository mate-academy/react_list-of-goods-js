import { useState } from 'react';
import cn from 'classnames';
import { GoodList } from './components/GoodList';

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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

const getPreperdGoods = (goods, sortField, reversed) => {
  let preperdGoods = [...goods];

  preperdGoods.sort((goodOne, goodSecend) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        return goodOne.localeCompare(goodSecend);
      case SORT_FIELD_LENGTH:
        return goodOne.length - goodSecend.length;
      default:
        return 0;
    }
  });

  preperdGoods = !reversed ? preperdGoods : preperdGoods.reverse();

  return preperdGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [reversed, setReversed] = useState(null);
  const visibleGoods = getPreperdGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            onClick={() => {
              setReversed(null);
              setSortField(null);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
