import { useState } from 'react';
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

const SORT_ALPH = 'alph';
const SORT_LEN = 'len';

export const App = () => {
  /**
   *
   * @param {String[]} list
   * @param {String} sortedBy
   * @param {Boolean} isReversed
   * @returns {String[]}
   */
  function sort(list, sortedBy, isReversed = false) {
    let sorted;

    switch (sortedBy) {
      case SORT_ALPH:
        sorted = list.toSorted((it, other) => it.localeCompare(other));
        break;
      case SORT_LEN:
        sorted = list.toSorted((it, other) => it.length - other.length);
        break;
      default:
        sorted = [...list];
    }

    return isReversed ? sorted.reverse() : sorted;
  }

  const [sortedBy, setSortedBy] = useState('');
  const [reversed, setReversed] = useState(false);
  const sortedGoods = sort(goodsFromServer, sortedBy, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedBy !== SORT_ALPH && 'is-light'}`}
          onClick={() => setSortedBy(SORT_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedBy !== SORT_LEN && 'is-light'}`}
          onClick={() => setSortedBy(SORT_LEN)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed && 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortedBy || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortedBy('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
