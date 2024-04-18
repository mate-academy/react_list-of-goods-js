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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABET = 'alphabet';

const getPreparedGoods = (array, { sortField, reverseMethod }) => {
  const preparedGoodsArray = [...array];

  if (sortField) {
    preparedGoodsArray.sort((g1, g2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return g1.length - g2.length;

        case SORT_FIELD_ALPHABET:
          return g1.localeCompare(g2);

        default:
          return 0;
      }
    });
  }

  if (reverseMethod) {
    return preparedGoodsArray.reverse();
  }

  return preparedGoodsArray;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseMethod, setReverseMethod] = useState(false);

  const visibleGoodsButtons = getPreparedGoods(goodsFromServer, {
    sortField,
    reverseMethod,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          type="button"
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseMethod(!reverseMethod)}
          className={classNames('button is-warning', {
            'is-light': !reverseMethod,
          })}
          type="button"
        >
          Reverse
        </button>

        {(reverseMethod || sortField) && (
          <button
            onClick={() => {
              setReverseMethod(false);
              setSortField('');
            }}
            className="button is-danger is-light"
            type="button"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoodsButtons.map(word => (
          <li data-cy="Good" key={word}>
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
};
