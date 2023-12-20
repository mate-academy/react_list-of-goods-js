import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';
import { GoodsList } from './components/GoodsList/GoodsList';

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
const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'Reverse';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const sortByAlphabet = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
    );
    setSortField(SORT_FIELD_ALPHABET);
  };

  const sortByLength = () => {
    setVisibleGoods(
      [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
    );
    setSortField(SORT_FIELD_LENGTH);
  };

  const sortByReverse = () => {
    setVisibleGoods(
      [...visibleGoods].reverse(),
    );
    setSortField(SORT_FIELD_REVERSE);
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlphabet}
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={sortByReverse}
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_FIELD_REVERSE })}
        >
          Reverse
        </button>
        {sortField
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
          : (
            ''
          )
        }

      </div>
      <GoodsList goods={visibleGoods} />
    </div>
  );
};
