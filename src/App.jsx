import 'bulma/css/bulma.css';
import './App.scss';
import { useMemo, useState } from 'react';
import cn from 'classnames';

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

const defaultSortSettings = { sortValue: '', isReversed: false };
const sortByLength = 'byLength';
const sortByAlphabet = 'ByAlphabet';
const sortValueKey = 'sortValue';
const reverseValueKey = 'isReversed';

function sortGoods(goods, { sortValue, isReversed }) {
  const sortedGoods = [...goods];

  if (sortValue) {
    sortedGoods.sort((good1, good2) => {
      switch (sortValue) {
        case sortByLength:
          return good1.length - good2.length;
        case sortByAlphabet:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App = () => {
  const [sortSettings, setSortSettings] = useState(defaultSortSettings);

  const goods = useMemo(
    () => sortGoods(goodsFromServer, sortSettings),
    [goodsFromServer, sortSettings],
  );

  const { sortValue, isReversed } = sortSettings;

  const handleSortClick = (key, value) => () => {
    setSortSettings({ ...sortSettings, [key]: value });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortClick(sortValueKey, sortByAlphabet)}
          className={cn('button is-info', {
            'is-light': sortValue !== sortByAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortClick(sortValueKey, sortByLength)}
          className={cn('button is-success', {
            'is-light': sortValue !== sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleSortClick(reverseValueKey, !isReversed)}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortValue || isReversed) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => setSortSettings(defaultSortSettings)}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {goods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
