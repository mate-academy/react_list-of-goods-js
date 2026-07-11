import 'bulma/css/bulma.css';
import classNames from 'classnames';
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

function getSortedGoods(goods, sortMarker, reverseMarker) {
  const preparedGoods = [...goods];

  if (sortMarker) {
    switch (sortMarker) {
      case 'alphabet':
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case 'length':
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        break;
    }
  }

  if (reverseMarker) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortMarker, setSortMarker] = useState('');
  const [reverseMarker, setReverseMarker] = useState(false);
  const shownGoods = getSortedGoods(goodsFromServer, sortMarker, reverseMarker);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortMarker !== 'alphabet',
          })}
          onClick={() => setSortMarker('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortMarker !== 'length',
          })}
          onClick={() => setSortMarker('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reverseMarker === false,
          })}
          onClick={() => {
            setReverseMarker(!reverseMarker);
          }}
        >
          Reverse
        </button>

        {(sortMarker !== '' || reverseMarker) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortMarker('');
              setReverseMarker(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {shownGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
