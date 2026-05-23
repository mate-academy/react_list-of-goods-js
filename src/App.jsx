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

const SORT_ALPHABETIC = 'alphabetic';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, sortField, isReverse = false) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_ALPHABETIC:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
  }

  return isReverse === true ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortField, setField] = useState('');
  const [isReverseField, setIsRevers] = useState(false);

  let preparedGoods = [...goodsFromServer];

  preparedGoods = getPreparedGoods(preparedGoods, sortField, isReverseField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETIC,
          })}
          onClick={() => {
            setField(SORT_ALPHABETIC);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => {
            setField(SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReverseField === false,
          })}
          onClick={() => {
            setIsRevers(!isReverseField);
          }}
        >
          Reverse
        </button>

        {sortField !== '' || isReverseField === true ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setField('');
              setIsRevers(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {preparedGoods.map(g => (
          <li data-cy="Good" key={g}>
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
