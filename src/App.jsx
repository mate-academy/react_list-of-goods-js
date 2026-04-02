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

const SORT_ALPHABET = 'alphabet'
const SORT_LENGTH = 'length'
const SORT_REVERSE = 'reverse'

const GoodList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li
          key={good}
          data-cy="Good"
        >
          {good}
        </li>
      )
      )}
    </ul>
  )
}

function getPreparedGoods(goods, { sortField, reversed }) {
  let preparedGoods = [...goods]

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    })
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const initialGoods = [...goodsFromServer];
  const [sortField, setSortField] = useState('')
  const [reversed, setReversed] = useState(false);
  const prepared = getPreparedGoods(initialGoods, { sortField, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
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
        )}
      </div>

      <GoodList goods={prepared} />
    </div >
  )
};
