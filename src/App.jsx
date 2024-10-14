import 'bulma/css/bulma.css';
import cn from 'classnames/bind';
import { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';

export const goodsFromServer = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

const SORT_BY_ABC = 'abc';
const SORT_BY_LENGTH = 'length';

function getReorderedGoods(goods, sortType, isReversed) {
  const visibleGoods = [...goods];

  if (sortType === SORT_BY_LENGTH) {
    visibleGoods.sort((good1, good2) => good1.name.length - good2.name.length);
  }

  if (sortType === SORT_BY_ABC) {
    visibleGoods.sort((good1, good2) => good1.name.localeCompare(good2.name));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getReorderedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ABC,
          })}
          onClick={() => setSortField(SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed !== true,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField || reversed ? (
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
        ) : null}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
