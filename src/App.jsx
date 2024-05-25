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

const FIELD_ALPHABET = 'alphabet';
const FIELD_LENGTH = 'length';

function getGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case FIELD_ALPHABET:
        return good1.localeCompare(good2);
      case FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });
  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(FIELD_ALPHABET)}
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== FIELD_ALPHABET })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(FIELD_LENGTH)}
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== FIELD_LENGTH })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${cn({ 'is-light': !isReversed })}`}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
