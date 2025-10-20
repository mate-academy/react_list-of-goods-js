import { useState } from 'react';
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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [buttonStatus, setButtonStatus] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const isInitial =
    goods.length === goodsFromServer.length &&
    goods.every((g, i) => g === goodsFromServer[i]);

  const applyReverseIfNeeded = arr => {
    return isReversed ? [...arr].reverse() : arr;
  };

  const sortAlph = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(applyReverseIfNeeded(sorted));
    setButtonStatus('alph');
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(applyReverseIfNeeded(sorted));
    setButtonStatus('length');
  };

  const reverse = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setButtonStatus('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlph}
          className={`button is-info ${buttonStatus === 'alph' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${buttonStatus === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isInitial && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
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
