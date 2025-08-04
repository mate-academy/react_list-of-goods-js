import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import GoodsList from './GoodsList/GoodsList';

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

const SORT_FIELD_ALPHABET = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';

const getPreparedGoods = (goods, { sortField, reversed }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return a.localeCompare(b);
        case SORT_FIELD_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        {[SORT_FIELD_ALPHABET, SORT_FIELD_LENGTH].map(field => (
          <button
            key={field || 'default'}
            className={classNames('button', 'is-info', {
              'is-light': sortField === field,
            })}
            onClick={() => setSortField(field)}
            type="button"
          >
            {field || 'Default'}
          </button>
        ))}

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

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
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
