import { useState } from 'react';
import classNames from 'classnames';
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

const SORT_FIELD = {
  None: '',
  Alphabet: 'alphabet',
  Length: 'length',
};

function getPreparedGoods(goods, field, isReversed) {
  const preparedGoods = [...goods];

  if (field) {
    preparedGoods.sort((good1, good2) => {
      switch (field) {
        case SORT_FIELD.Alphabet:
          return good1.localeCompare(good2);

        case SORT_FIELD.Length:
          return good1.length - good2.length;

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
  const [field, setField] = useState(SORT_FIELD.None);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, field, isReversed);

  const resetSort = () => {
    setField(SORT_FIELD.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setField(SORT_FIELD.Alphabet)}
          type="button"
          className={classNames('button is-info', {
            'is-light': field !== SORT_FIELD.Alphabet,
            'is-active': field === SORT_FIELD.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setField(SORT_FIELD.Length)}
          type="button"
          className={classNames('button is-success', {
            'is-light': field !== SORT_FIELD.Length,
            'is-active': field === SORT_FIELD.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': isReversed === false,
            'is-active': isReversed,
          })}
        >
          Reverse
        </button>

        {(field || isReversed) && (
          <button
            onClick={resetSort}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
