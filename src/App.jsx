import { useState } from 'react';
import cn from 'classnames';

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

const VALUE_SORT_ALPHABETICALLY = 'alphabetically';
const VALUE_SORT_LENGTH = 'length';

function sortGoods(goods, { valueSort, valueReverse }) {
  if (valueSort === VALUE_SORT_ALPHABETICALLY) {
    goods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (valueSort === VALUE_SORT_LENGTH) {
    goods.sort((good1, good2) => good1.length - good2.length);
  }

  if (valueReverse) {
    goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [valueSort, setValueSort] = useState('');
  const [valueReverse, setValueReverse] = useState(false);
  const clickReset = () => {
    setValueSort('');
    setValueReverse(false);
  };

  const sortList = sortGoods([...goodsFromServer], { valueSort, valueReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': valueSort !== VALUE_SORT_ALPHABETICALLY,
          })}
          onClick={() => setValueSort(VALUE_SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': valueSort !== VALUE_SORT_LENGTH,
          })}
          onClick={() => setValueSort(VALUE_SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !valueReverse,
          })}
          onClick={() => setValueReverse(!valueReverse)}
        >
          Reverse
        </button>

        {valueSort !== '' || valueReverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => clickReset()}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {sortList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
