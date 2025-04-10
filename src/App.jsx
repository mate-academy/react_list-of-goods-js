/* eslint-disable function-paren-newline */
import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
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

export const App = () => {
  const [didSortAlf, setDidSortAlf] = useState('');
  const [goods] = useState([...goodsFromServer]);
  const [showResetB, setShowResetB] = useState(true);
  const [secondClick, setSecondClick] = useState(1);

  function showButton(boolen) {
    setShowResetB(boolen);
  }

  function countClick() {
    setSecondClick(prev => 1 - prev);
  }

  function appLogic(goodsClon, howSort) {
    if (howSort === 'DoSortAlf') {
      // eslint-disable-next-line max-len
      return [...goodsClon].sort((firts, second) =>
        firts.localeCompare(second),
      );
    }

    if (howSort === 'sortLength') {
      // eslint-disable-next-line max-len
      return [...goodsClon].sort(
        (firts, second) => firts.length - second.length,
      );
    }

    if (secondClick === 0) {
      return [...goodsClon.reverse()];
    }

    if (howSort === 'reverse') {
      return [...goodsClon.reverse()];
    }

    if (howSort === 'reset') {
      return goodsFromServer;
    }

    return goodsClon;
  }

  const isSortGoods = appLogic(goods, didSortAlf);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': didSortAlf !== 'DoSortAlf',
          })}
          onClick={() => {
            showButton(true);
            setDidSortAlf('DoSortAlf');
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': didSortAlf !== 'sortLength',
          })}
          onClick={() => {
            showButton(true);
            setDidSortAlf('sortLength');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-danger', {
            'is-light': didSortAlf !== 'reverse',
          })}
          onClick={() => {
            countClick();
            showButton(true);
            setDidSortAlf('reverse');
          }}
        >
          Reverse
        </button>

        {showResetB && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': didSortAlf !== 'reset',
              iframe: didSortAlf === '',
            })}
            onClick={() => {
              showButton(false);
              setDidSortAlf('reset');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {isSortGoods.map(good => {
          return (
            <li key={good} data-cy="good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
