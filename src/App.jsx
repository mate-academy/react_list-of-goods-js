import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';
import { GoodList } from './components/GoodList/GoodList';

const SORT_FIELD_ALPHABET = 'name';
const SORT_FIELD_LENGTH = 'length';

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  // if (sortField) {
  //   visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  //   visibleGoods.sort((good1, good2) => good1.length - good2.length);
  // }

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
  };

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
    setVisibleGoods([...visibleGoods].reverse());
    // setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">

        <button
          onClick={sortByAlphabet}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}

        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={sortByReverse}
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': sortField },
          )}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={reset}
            type="button"
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
