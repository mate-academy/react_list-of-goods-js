import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

const getPreparedGoods = (goodList, sortField, reverse) => {
  const preparedGoods = [...goodList];

  if (sortField) {
    switch (sortField) {
      case SORT_ALPHABETICALLY:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SORT_BY_LENGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        return preparedGoods;
    }
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const preparedGoods = getPreparedGoods(
    [...goodsFromServer],
    sortField,
    reverse,
  );

  const reset = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {sortField || reverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <GoodList goods={preparedGoods} />
    </div>
  );
};
