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

export const App = () => {
  const [value, setValue] = useState('');
  const [reversed, setReversed] = useState(false);
  let sortedGoods = [...goodsFromServer];

  switch (value) {
    case SORTED_ALPHABETICALLY: sortedGoods
      .sort((a, b) => a.localeCompare(b));
      break;
    case SORTED_BY_LENGTH: sortedGoods
      .sort((a, b) => a.length - b.length);
      break;
    default: sortedGoods = [...goodsFromServer];
      break;
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({ 'is-light': value !== SORTED_ALPHABETICALLY },
            'button', 'is-info')}
          onClick={value === SORTED_ALPHABETICALLY
            ? () => setValue('')
            : () => setValue(SORTED_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({ 'is-light': value !== SORTED_BY_LENGTH },
            'button', 'is-success')}
          onClick={value === SORTED_BY_LENGTH
            ? () => setValue('')
            : () => setValue(SORTED_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({ 'is-light': !reversed },
            'button', 'is-warning')}
          onClick={reversed
            ? () => setReversed(false)
            : () => setReversed(true)}
        >
          Reverse
        </button>

        {(value !== '' || reversed === true) && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
