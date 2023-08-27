import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

const SORT_BY_NAME = 'alphabet';
const SORT_BY_LENGTH = 'length';
const REVERSE_ORDER = 'reversed';
let isNameSelected = false;
let isLengthSelected = false;
let isReverseSelected = false;

function getPreparedGoods(goods, sortField, reverseSelection) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_BY_NAME:
        isNameSelected = true;
        isLengthSelected = false;

        return good1.localeCompare(good2);
      case SORT_BY_LENGTH:
        isLengthSelected = true;
        isNameSelected = false;

        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverseSelection) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, isReverseSelected,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_NAME)}
          type="button"
          className={cn(
            'button', 'is-info', {
              'is-light': !isNameSelected,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn(
            'button', 'is-success', {
              'is-light': !isLengthSelected,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            isReverseSelected = !isReverseSelected;
            setReverseField(isReverseSelected ? REVERSE_ORDER : '');
          }}
          type="button"
          className={cn(
            'button', 'is-warning', {
              'is-light': !isReverseSelected,
            },
          )}
        >
          Reverse
        </button>

        {(sortField || reverseField)
          && (
            <button
              onClick={() => {
                setSortField('');
                setReverseField('');
                isNameSelected = false;
                isLengthSelected = false;
                isReverseSelected = false;
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }
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
