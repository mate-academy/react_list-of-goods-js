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
const defaultState = {
  reversed: false,
  isLength: false,
  alphabet: false,
};

export const App = () => {
  const [trackStatus, setTrackStatus] = useState(defaultState);

  const { reversed, isLength, alphabet } = trackStatus;

  const getGoods = () => {
    const goods = [...goodsFromServer];

    if (isLength || alphabet) {
      goods.sort((a, b) => {
        if (isLength) {
          return a.length - b.length;
        }

        return a.localeCompare(b);
      });
    }

    if (reversed) {
      goods.reverse();
    }

    return goods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${alphabet ? '' : 'is-light'}`}
          onClick={() =>
            setTrackStatus({
              ...trackStatus,
              alphabet: !alphabet,
              isLength: false,
            })
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isLength ? '' : 'is-light'}`}
          onClick={() =>
            setTrackStatus({
              ...trackStatus,
              isLength: !isLength,
              alphabet: false,
            })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() =>
            setTrackStatus({ ...trackStatus, reversed: !reversed })
          }
        >
          Reverse
        </button>

        {(reversed || isLength || alphabet) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setTrackStatus(defaultState)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getGoods().map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
