import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
const SortAlphabetically = 'Sort alphabetically';
const SortByLength = 'Sort by length';

function sortGoods(goods, { sortField, reversed }) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortByLength:
          return good1.length - good2.length;
        case SortAlphabetically:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    prepareGoods = prepareGoods.toReversed();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  const visibleGoods = sortGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  // if (reversed) {
  //   visibleGoods = visibleGoods.toReversed();
  // }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortAlphabetically)}
          type="button"
          className={
            sortField === SortAlphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortByLength)}
          type="button"
          className={
            sortField === SortByLength
              ? 'button is-info'
              : 'button is-info  is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={reversed ? 'button is-info' : 'button is-info is-light'}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
