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

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'len';

function getPreparedContent(goods, { sortMethod, reversed }) {
  const preparedGoods = [...goods];

  if (sortMethod) {
    preparedGoods.sort((elem1, elem2) => {
      switch (sortMethod) {
        case SORT_BY_LENGTH:
          return elem1.length - elem2.length;

        case SORT_BY_ALPHABET:
          return elem1.localeCompare(elem2);
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
  const [sortMethod, setSortMethod] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedContent(goodsFromServer, {
    sortMethod,
    reversed,
  });

  const reset = () => {
    setSortMethod('');
    setReversed(false);
  };

  const isChanged = sortMethod.length > 0 || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortMethod(SORT_BY_ALPHABET)}
          className={cn('button is-info', {
            'is-light': sortMethod !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortMethod(SORT_BY_LENGTH)}
          className={cn('button is-success', {
            'is-light': sortMethod !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {isChanged && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
