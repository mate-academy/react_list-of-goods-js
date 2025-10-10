import { useState } from 'react';
import cn from 'classnames';
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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function prepareGoods(goods, { sortInstruction, reversed }) {
  let preparedGoods = [...goods];

  switch (sortInstruction) {
    case SORT_ALPHABETICALLY:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortInstruction, setSortInstruction] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, {
    sortInstruction,
    reversed,
  });

  const isOriginalOrder = sortInstruction === '' && !reversed;

  const handleSortAlphabetically = () => setSortInstruction(SORT_ALPHABETICALLY);
  const handleSortByLength = () => setSortInstruction(SORT_BY_LENGTH);
  const handleReversed = () => setReversed(prev => !prev);
  const handleReset = () => {
    setSortInstruction('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortInstruction !== SORT_ALPHABETICALLY,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortInstruction !== SORT_BY_LENGTH,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={handleReversed}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            data-cy="Reset"
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
