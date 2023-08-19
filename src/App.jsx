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

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'sortAlphabet':
          return good1.localeCompare(good2);
        case 'sortLength':
          return good2.length - good1.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('sortAlphabet')}
          type="button"
          className={`button ${sortField === 'sortAlphabet' ? 'is-info' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('sortLength')}
          type="button"
          className={`button ${sortField === 'sortLength' ? 'is-success' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={`button ${reverseField === true ? 'is-warning' : 'is-light'}`}
        >
          Reverse
        </button>
        {sortField === true ? (
          <button
            onClick={() => setSortField('')}
            type="button"
            className={`button ${sortField === '' ? 'is-danger' : 'is-light'}`}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}

      </ul>
    </div>
  );
};
