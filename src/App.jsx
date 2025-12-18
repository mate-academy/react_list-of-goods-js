import ch from 'classnames';
import 'bulma/css/bulma.css';
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

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const itemsToDisplay = isReversed
    ? [...visibleGoods].reverse()
    : visibleGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={ch('button', 'is-info', {
            'is-light': sortBy !== 'alphabet',
          })}
          onClick={() => {
            const sortedAlphabet = [...visibleGoods].sort((a, b) => {
              return a.localeCompare(b);
            });

            setVisibleGoods(sortedAlphabet);
            setSortBy('alphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={ch('button', 'is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => {
            const sortedLength = [...goodsFromServer].sort(
              (a, b) => a.length - b.length,
            );

            setVisibleGoods(sortedLength);
            setSortBy('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={ch('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setVisibleGoods(goodsFromServer);
              setSortBy('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {itemsToDisplay.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
