import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';
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
  const [isAlphabetical, setIsAlphabetical] = useState(false);
  const [isByLength, setIsByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    if (isReversed) {
      setGoods([...goods].sort((good1, good2) => good2.localeCompare(good1)));
    } else {
      setGoods([...goods].sort((good1, good2) => good1.localeCompare(good2)));
    }
    setIsAlphabetical(true);
    setIsByLength(false);
  };

  const sortByLength = () => {
    if (isReversed) {
      setGoods([...goods].sort((good1, good2) => good2.length - good1.length));
    } else {
      setGoods([...goods].sort((good1, good2) => good1.length - good2.length));
    }

    setIsAlphabetical(false);
    setIsByLength(true);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
    setIsAlphabetical(isAlphabetical);
    setIsByLength(isByLength);
  };

  const resetGoodsOrder = () => {
    setGoods(goodsFromServer);
    setIsAlphabetical(false);
    setIsByLength(false);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isAlphabetical,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': !isByLength,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(isAlphabetical || isByLength || isReversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', {
              'is-light': !isReversed,
            })}
            onClick={resetGoodsOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
