import { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const CLASS_IS_LIGHT = 'is-light';

function getPreparedGoods(goods, { sortField, reversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });
  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  const btnClassAlphabet = classNames({
    button: true,
    'is-info': true,
    [CLASS_IS_LIGHT]: sortField !== SORT_BY_ALPHABET,
  });
  const btnClassLength = classNames({
    button: true,
    'is-success': true,
    [CLASS_IS_LIGHT]: sortField !== SORT_BY_LENGTH,
  });
  const btnClassReverse = classNames({
    button: true,
    'is-warning': true,
    [CLASS_IS_LIGHT]: !reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={btnClassAlphabet}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={btnClassLength}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={btnClassReverse}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(reversed || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
