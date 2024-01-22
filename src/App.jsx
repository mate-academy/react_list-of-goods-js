import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const sortByLength = 'byLength';
const sortByAlphabet = 'ByAlphabet';

function sortGoods(goods, { sortValue, reverse }) {
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

  return reverse ? sortedGoods.reverse() : sortedGoods;
}

export const App = () => {
  const defaultSortSettings = { sortValue: '', reverse: false };

  const [sortSettings, setSortSettings] = useState(defaultSortSettings);

  const { sortValue, reverse } = sortSettings;

  const goods = sortGoods(goodsFromServer, sortSettings).map(good => (
    <li data-cy="Good" key={good}>{good}</li>
  ));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortSettings({
            ...sortSettings,
            sortValue: sortByAlphabet,
          })}
          className={cn('button is-info', {
            'is-light': sortValue !== sortByAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortSettings({
            ...sortSettings,
            sortValue: sortByLength,
          })}
          className={cn('button is-success', {
            'is-light': sortValue !== sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setSortSettings({
            ...sortSettings,
            reverse: !reverse,
          })}
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(sortValue || reverse) && (
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
        {goods}
      </ul>
    </div>
  );
};
