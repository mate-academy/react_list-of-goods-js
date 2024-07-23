import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { Good } from './components/Good';

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

const SORT_FIELD_ALPHABET = 'alpha';
const SORT_FIELD_LENGTH = 'length';

const getPreparedGoods = (goods, sortField, reversed) => {
  let sortedGoods = [...goods];

  if (sortField === SORT_FIELD_ALPHABET) {
    sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SORT_FIELD_LENGTH) {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  const preparedGoods = getPreparedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button is-danger', { 'is-light': !reversed })}
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
        {preparedGoods.map(good => (
          <Good key={good} content={good} />
        ))}
      </ul>
    </div>
  );
};
