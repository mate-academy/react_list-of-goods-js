import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_APLHABET = 'alphabet';
const SORT_LENGTH = 'length';
const INITIAL_STATE = '';

const prepareGoods = (goods, action, reverse) => {
  const preparedGoods = [...goods];

  if (action) {
    switch (action) {
      case SORT_APLHABET:
        preparedGoods.sort();
        break;

      case SORT_LENGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        break;
    }
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

const RenderGoodList = ({ goods }) => {
  return goods.map(good => (
    <li key={good} data-cy="Good">
      {good}
    </li>
  ));
};

export const App = () => {
  const [sortAction, setSortAction] = useState(INITIAL_STATE);
  const [isReversed, setIsReversed] = useState(false);
  const showReset = sortAction || isReversed;
  const handleReset = () => {
    setSortAction(INITIAL_STATE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortAction !== SORT_APLHABET,
          })}
          onClick={() => setSortAction(SORT_APLHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortAction !== SORT_LENGTH,
          })}
          onClick={() => setSortAction(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className={classNames('button', 'is-info')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}

        <ul>
          <RenderGoodList
            goods={prepareGoods(goodsFromServer, sortAction, isReversed)}
          />
        </ul>
      </div>
    </div>
  );
};
