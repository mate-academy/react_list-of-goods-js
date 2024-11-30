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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ABC = 'abc';

function createInternalArrayOfObjectsWithId(arr) {
  return arr.map((item, idx) => {
    return {
      name: item,
      internalId: idx,
    };
  });
}

const goodsListWithId = createInternalArrayOfObjectsWithId(goodsFromServer);

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let sortedGoods = goodsListWithId.toSorted((good1, good2) => {
    switch (sortValue) {
      case SORT_BY_LENGTH:
        return good1.name.length - good2.name.length;
      case SORT_BY_ABC:
        return good1.name.localeCompare(good2.name);
      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods = sortedGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortValue !== SORT_BY_ABC,
          })}
          onClick={() => setSortValue(SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortValue !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortValue(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortValue || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortValue('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedGoods} />
    </div>
  );
};
