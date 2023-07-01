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

const SORT_FIELD_ALPHABET = 'aplhabet';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

function getSortedElements(goods, sortField, sortReverse) {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        preparedGoods = preparedGoods
          .sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SORT_FIELD_LENGTH:
        preparedGoods = preparedGoods
          .sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        return 0;
    }
  }

  if (sortReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

function getButtonColor(sortField, thisSortField) {
  return sortField !== thisSortField;
}

function ifReversed(reverseField) {
  return !reverseField
    ? SORT_FIELD_REVERSE
    : '';
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = getSortedElements(goodsFromServer,
    sortField, reverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={classNames(
            'button', 'is-info',
            { 'is-light': getButtonColor(sortField, SORT_FIELD_ALPHABET) },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={classNames(
            'button', 'is-success',
            { 'is-light': getButtonColor(sortField, SORT_FIELD_LENGTH) },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(ifReversed(reverseField))}
          type="button"
          className={classNames(
            'button', 'is-warning',
            { 'is-light': getButtonColor(reverseField, SORT_FIELD_REVERSE) },
          )}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setSortField('');
              setReverseField('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
