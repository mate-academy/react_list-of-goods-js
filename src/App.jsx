import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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

const SORT__ALPHABETICALLY = 'alphabet';
const SORT__BY__LENGTH = 'length';
const getPreparedGoods = (goods, visibleGoods, reversed) => {
  const copyGoods = [...goods];

  if (visibleGoods) {
    copyGoods.sort((good1, good2) => {
      switch (visibleGoods) {
        case SORT__ALPHABETICALLY: return good1.localeCompare(good2);
        case SORT__BY__LENGTH: return good1.length - good2.length;

        default: return 0;
      }
    });
  }

  if (reversed) {
    switch (reversed) {
      case 'reverse':
        return copyGoods.reverse();

      default: return copyGoods;
    }
  }

  return copyGoods;
};

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(null);
  const [reversed, setReversed] = useState(false);
  const preparedGoods = getPreparedGoods(
    goodsFromServer, visibleGoods, reversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': visibleGoods !== SORT__ALPHABETICALLY },
          )
          }
          onClick={() => setVisibleGoods(SORT__ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': visibleGoods !== SORT__BY__LENGTH },
          )}
          onClick={() => setVisibleGoods(SORT__BY__LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reversed },
          )}
          onClick={() => (
            !reversed
              ? setReversed('reverse')
              : setReversed(false)
          )}
        >
          Reverse
        </button>

        {(visibleGoods !== null || reversed === 'reverse') && (
          <button
            type="button"
            className={cn(
              'button',
              { 'is-danger': visibleGoods || reversed },
            )}
            onClick={() => {
              setVisibleGoods(null);
              setReversed('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
