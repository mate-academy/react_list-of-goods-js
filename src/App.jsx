import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import React from 'react';
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
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={`button is-info ${cn({ 'is-light': !alphabet })}`}
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
            className={`button is-success ${cn({ 'is-light': !isLength })}`}
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
            className={`button is-warning ${cn({ 'is-light': !reversed })}`}
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
    </>
  );
};
