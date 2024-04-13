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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';

const getPrepearedGoods = (goods, { sortField, reverseField }) => {
  const goodsCopy = goods.slice();

  switch (sortField) {
    case SORT_FIELD_LENGTH:
      goodsCopy.sort((a, b) => a.length - b.length);
      break;
    case SORT_FIELD_ALPHABETICALLY:
      goodsCopy.sort((a, b) => a.localeCompare(b));
      break;
    default:
      break;
  }

  if (reverseField) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  const reset = () => {
    setSortField('');
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseField })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
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
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
