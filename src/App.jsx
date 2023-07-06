import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_BY_NAME = 'is-info';
const SORT_BY_LENGTH = 'is-success';

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

export const buttons = [
  {
    name: 'Sort alphabetically',
    class: 'is-info',
  },
  {
    name: 'Sort by length',
    class: 'is-success',
  },
];

const sortList = (goods, buttonClass, isReversed) => {
  const list = [...goods];
  const sortLength = (good1, good2) => good1.length - good2.length;

  if (buttonClass === SORT_BY_NAME) {
    return !isReversed ? list.sort() : list.sort().reverse();
  }

  if (buttonClass === SORT_BY_LENGTH) {
    return !isReversed
      ? list.sort(sortLength)
      : list.sort(sortLength).reverse();
  }

  if (isReversed) {
    list.reverse();
  }

  return list;
};

export const App = () => {
  const [status, setStatus] = useState('');
  const [direction, setDirection] = useState(false);

  const preparedGoods = sortList(goodsFromServer, status, direction);

  const clickReset = () => {
    setDirection(false);
    setStatus('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map(button => (
          <button
            type="button"
            key={button.class}
            className={cn(
              'button',
              `${button.class}`, {
                'is-light': status !== button.class,
              },
            )}
            onClick={() => {
              if (button.class === SORT_BY_NAME
              || button.class === SORT_BY_LENGTH
              ) {
                setStatus(button.class);
              }
            }}
          >
            {button.name}
          </button>
        ))}
        <button
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !direction,
            },
          )}
          onClick={() => {
            setDirection(!direction);
          }}
        >
          Reverse
        </button>

        {(
          status !== '' || direction
        ) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={clickReset}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(goodItem => (
          <li
            data-cy="Good"
            key={goodItem}
          >
            {goodItem}
          </li>
        ))}
      </ul>
    </div>
  );
};
