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

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'Length';

function sortGoods(goods, sortField) {
  switch (sortField) {
    case SORT_BY_ALPHABET:
      return [...goods].sort((a, b) => a.localeCompare(b));
    case SORT_BY_LENGTH:
      return [...goods].sort((a, b) => a.length - b.length);
    default:
      return goods;
  }
}

function createResetButton(setSortField, setReversed) {
  return (
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
  );
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  let goods = sortGoods([...goodsFromServer], sortField);
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    goods = goods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_BY_ALPHABET ? 'is-light' : ''}`}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_BY_LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed) && createResetButton(setSortField, setReversed)}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
