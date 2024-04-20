import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { List } from './components/listOfGoods';

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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_REVERSE = 'reverse';

function getPreparedGoods(goods, sortField, reverseField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return reverseField === SORT_FIELD_REVERSE
    ? preparedGoods.reverse()
    : preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortFieldReverse, setSortFieldReverse] = useState('');

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    sortFieldReverse,
  );

  let buttonReset = (
    <button
      type="button"
      className="button is-danger is-light"
      onClick={() => {
        setSortField('');
        setSortFieldReverse('');
      }}
    >
      Reset
    </button>
  );

  if (sortField === '' && sortFieldReverse === '') {
    buttonReset = null;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortFieldReverse !== SORT_FIELD_REVERSE,
          })}
          onClick={() => {
            if (sortFieldReverse === '') {
              setSortFieldReverse(SORT_FIELD_REVERSE);
            } else {
              setSortFieldReverse('');
            }
          }}
        >
          Reverse
        </button>

        {buttonReset}
      </div>

      <ul>
        <List goods={visibleGoods} />
      </ul>
    </div>
  );
};
