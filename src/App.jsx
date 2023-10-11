import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

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

const SORT_FIELD_ALPHABET = 'aplphabet';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

const buttons = [
  {
    title: 'Sort alphabetically',
    value: SORT_FIELD_ALPHABET,
    className: 'is-info',
  },
  {
    title: 'Sort by length',
    value: SORT_FIELD_LENGTH,
    className: 'is-success',
  },
  {
    title: 'Reverse',
    value: SORT_FIELD_REVERSE,
    className: 'is-warning',
  },
];

const getPreparedGoods = (goods, sortField, isReversed) => {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABET:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_FIELD_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            key={button.value}
            type="button"
            className={cn('button', button.className, {
              'is-light':
                button.value === SORT_FIELD_REVERSE
                  ? !isReversed
                  : button.value !== sortField,
            })}
            onClick={() => {
              if (button.value === SORT_FIELD_REVERSE) {
                setIsReversed(!isReversed);
              } else {
                setSortField(button.value);
              }
            }}
          >
            {button.title}
          </button>
        ))}

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
