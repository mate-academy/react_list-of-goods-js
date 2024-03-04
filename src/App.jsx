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

const SortType = {
  ALPHA: 'alphabet',
  LENGTH: 'length',
  NONE: '',
};

function getPreparedGoods(goods, sortField, isReversedField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.ALPHA:
          return a.localeCompare(b);

        case SortType.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversedField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.NONE);
  const [isReversedField, setIsReversedField] = useState(false);
  const list = getPreparedGoods(goodsFromServer, sortField, isReversedField);

  function resetStates() {
    setIsReversedField('');
    setSortField('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHA)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHA,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversedField(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversedField,
          })}
        >
          Reverse
        </button>

        {(isReversedField || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetStates}
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
