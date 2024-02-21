/* eslint-disable default-case */
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

const SORT_FIELD_ALPHABET = 'Alphabet';
const SORT_FIELD_LENGTH = 'Length';

function prepareGoods(goods, type, reverse) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (type) {
      case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortQuery, setSortQuery] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortedGoods = prepareGoods(goodsFromServer, sortQuery, reversed);

  const isChanged = sortQuery || reversed;

  const resetFilter = () => {
    setSortQuery('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortQuery === SORT_FIELD_ALPHABET || 'is-light'}`}
          onClick={() => setSortQuery(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortQuery === SORT_FIELD_LENGTH || 'is-light'}`}
          onClick={() => setSortQuery(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed || 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilter}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
