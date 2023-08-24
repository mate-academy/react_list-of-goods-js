import cn from 'classnames';
import { useState } from 'react';
import 'bulma/css/bulma.css';
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

const goodsWithId = goodsFromServer.map((good, index) => ({
  name: good,
  id: index + 1,
}));

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'byLength';

function getPreparedGoods(goods, sortBy, isReversed) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    const name1 = good1.name;
    const name2 = good2.name;

    switch (sortBy) {
      case SORT_FIELD_ALPHABET:
        return name1.localeCompare(name2);
      case SORT_FIELD_LENGTH:
        return name1.length - name2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsWithId, sortField, isReversed);

  function resetGoods() {
    setSortField('');
    setIsReversed(false);
  }

  function reverseGoods() {
    setIsReversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={cn(
            ('button is-info'),
            ({ 'is-light': sortField !== SORT_FIELD_ALPHABET }),
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn(
            ('button is-success'),
            ({ 'is-light': sortField !== SORT_FIELD_LENGTH }),
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={cn(
            ('button is-warning'),
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            onClick={resetGoods}
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
