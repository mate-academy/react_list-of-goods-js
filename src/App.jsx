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

const SORTED_BY_LENGTH = 'by length';
const SORTED_BY_ALPH = 'by alph';

function prepareGoods(goods, { sortedBy, isReversed }) {
  const preparedGoods = [...goods];

  if (sortedBy) {
    preparedGoods.sort((a, b) => {
      switch (sortedBy) {
        case SORTED_BY_ALPH:
          return a.localeCompare(b);
        case SORTED_BY_LENGTH:
          return a.length - b.length;
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
  const [sortedBy, setSortedBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = prepareGoods(goodsFromServer, { sortedBy, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortedBy !== SORTED_BY_ALPH,
          })}
          onClick={() => setSortedBy(SORTED_BY_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortedBy !== SORTED_BY_LENGTH,
          })}
          onClick={() => setSortedBy(SORTED_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          // eslint-disable-next-line max-len, prettier/prettier
          onClick={() => isReversed ? setIsReversed(false) : setIsReversed(true)}
        >
          Reverse
        </button>
        {visibleGoods.join('|') !== goodsFromServer.join('|') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedBy('');
              setIsReversed(false);
            }}
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
