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

  if (buttonClass === 'is-info') {
    return isReversed ? list.sort().reverse() : list.sort();
  }

  if (buttonClass === 'is-success') {
    return isReversed
      ? list.sort(sortLength).reverse()
      : list.sort(sortLength);
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
              if (button.class === 'is-info'
              || button.class === 'is-success'
              ) {
                setStatus(button.class);
              }

              if (button.class === 'is-warning') {
                setDirection(!direction);
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
          onClick={() => {
            setDirection(false);
            setStatus('');
          }}
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
