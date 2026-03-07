import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
const ALPHABETICAL_SORTING = 'alphabetical';
const LENGTH_SORTING = 'length';

function updateState(sortState, goods, isReverse) {
  let visibleGoods = [...goods];

  if (sortState) {
    visibleGoods = visibleGoods.toSorted((good1, good2) => {
      switch (sortState) {
        case ALPHABETICAL_SORTING:
          return good1.localeCompare(good2);
        case LENGTH_SORTING:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortState, setSortState] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = updateState(sortState, goodsFromServer, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortState(ALPHABETICAL_SORTING)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortState !== ALPHABETICAL_SORTING,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortState(LENGTH_SORTING)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortState !== LENGTH_SORTING,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(sortState || reversed) && (
          <button
            onClick={() => {
              setReversed(false);
              setSortState('');
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
