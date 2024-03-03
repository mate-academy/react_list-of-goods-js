import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { GoodsList } from './components/GoodsList/GoodsList';

const goodsFromServer = [
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

const FIELD_ALPHA = 'alphabet';
const FIELD_LENGTH = 'length';
const FIELD_REVERSE = 'reverse';

function getPreparedGoods(goods, sortField, reverseField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case FIELD_ALPHA:
          return a.localeCompare(b);
        case FIELD_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const list = getPreparedGoods(goodsFromServer, sortField, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(FIELD_ALPHA)}
          type="button"
          className={cn('button', {
            'is-info': true,
            'is-light': sortField !== FIELD_ALPHA,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            return reverseField
              ? setReverseField('')
              : setReverseField(FIELD_REVERSE);
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(reverseField || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverseField('');
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={list} />
      </ul>
    </div>
  );
};
