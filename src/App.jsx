import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
import './App.scss';
import { GoodList } from './components/GoodList';

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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reverseField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        case SORT_BY_NAME:
          return good1.localeCompare(good2);
        default:
          return false;
      }
    });
  }

  if (reverseField) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button',
            'is-info',
            { 'is-light': sortField !== SORT_BY_NAME })}
          onClick={() => setSortField(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button',
            'is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button',
            'is-warning',
            { 'is-light': reverseField !== true })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>
        {
          (sortField || reverseField) ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={
                () => {
                  setSortField('');
                  setReverseField(false);
                }
              }
            >
              Reset
            </button>
          ) : (
            ''
          )
        }
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
