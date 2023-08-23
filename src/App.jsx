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

export const App = () => {
  const [visibileGoods, setVisibileGoods] = useState(goodsFromServer);

  const [isAlphActive, setIsAlphActive] = useState(false);
  const [isLengthActive, setIsLengthActive] = useState(false);
  const [isReverseActive, setIsReverseActive] = useState(false);
  const [resetButtonVisible, setResetButtonVisible] = useState(false);

  const sortByAlph = () => {
    setVisibileGoods(
      [...visibileGoods].sort((goods1, goods2) => goods1.localeCompare(goods2)),
    );

    setIsAlphActive(true);
    setIsLengthActive(false);
    setResetButtonVisible(true);
  };

  const sortByLength = () => {
    setVisibileGoods(
      [...visibileGoods].sort(
        (goods1, goods2) => goods1.length - goods2.length,
      ),
    );

    setIsAlphActive(false);
    setIsLengthActive(true);
    setResetButtonVisible(true);
  };

  const reverse = () => {
    setVisibileGoods(
      visibileGoods.reverse(),
    );

    setIsReverseActive(!isReverseActive);
  };

  const reset = () => {
    setVisibileGoods(goodsFromServer);

    setIsAlphActive(false);
    setIsLengthActive(false);
    setIsReverseActive(false);
    setResetButtonVisible(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !isAlphActive,
          })}
          onClick={sortByAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': !isLengthActive,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverseActive,
          })}
          onClick={reverse}
        >
          Reverse
        </button>
        {(resetButtonVisible || isReverseActive) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibileGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
