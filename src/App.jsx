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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeButton, setActiveButton] = useState(null);

  const NOT_ACTIVE_CLASS = 'is-light';

  const isOriginalOrder = () => {
    return goods.every((good, index) => good === goodsFromServer[index]);
  };

  const sortByAlphabet = () => {
    setGoods([...goods].slice().sort());
    setActiveButton('alphabet');
  };

  const sortByLength = () => {
    setGoods([...goods].slice().sort((a, b) => a.length - b.length));
    setActiveButton('length');
  };

  const reversedGoods = () => {
    setGoods([...goods].slice().reverse());
    setActiveButton('reverse');
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setActiveButton(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            [NOT_ACTIVE_CLASS]: activeButton !== 'alphabet',
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            [NOT_ACTIVE_CLASS]: activeButton !== 'length',
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            [NOT_ACTIVE_CLASS]: activeButton !== 'reverse',
          })}
          onClick={reversedGoods}
        >
          Reverse
        </button>

        {!isOriginalOrder() && (
          <button
            type="button"
            className={classNames('button', 'is-danger', NOT_ACTIVE_CLASS)}
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
