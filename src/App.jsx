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
const SORTED_ALPHABETICALLY = 'Sort alphabetically';
const SORTED_BY_LENGTH = 'Sort by length';

function getSortedGoods(sortType, isReversed) {
  const sortedGoods = [...goodsFromServer];

  switch (sortType) {
    case SORTED_ALPHABETICALLY: sortedGoods
      .sort((a, b) => a.localeCompare(b));
      break;
    case SORTED_BY_LENGTH: sortedGoods
      .sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [value, setValue] = useState('');
  const [reversed, setReversed] = useState(false);
  const preparedGoods = getSortedGoods(value, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({ 'is-light': value !== SORTED_ALPHABETICALLY },
            'button', 'is-info')}
          onClick={() => setValue(SORTED_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({ 'is-light': value !== SORTED_BY_LENGTH },
            'button', 'is-success')}
          onClick={() => setValue(SORTED_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({ 'is-light': !reversed },
            'button', 'is-warning')}
          onClick={() => setReversed(current => !current)}
        >
          Reverse
        </button>

        {(value || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setValue('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
