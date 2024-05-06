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
  const [sortButton, setSortButton] = useState('');
  const [reverseClicked, setReverseClicked] = useState(false);

  const getSortedGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortButton) {
      sorted.sort((good1, good2) => {
        switch (sortButton) {
          case 'Sort alphabetically':
            return good1.localeCompare(good2);

          case 'Sort by length':
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (reverseClicked) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleButtonClick = buttonName => {
    if (buttonName === 'Reverse') {
      setReverseClicked(!reverseClicked);
    } else {
      setSortButton(buttonName);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        {[
          ['Sort alphabetically', 'is-info'],
          ['Sort by length', 'is-success'],
          ['Reverse', 'is-warning'],
        ].map(button => {
          return (
            <button
              key={button}
              type="button"
              onClick={() => handleButtonClick(button[0])}
              className={classNames('button', button[1], {
                'is-light':
                  (button[0] !== sortButton && button[0] !== 'Reverse') ||
                  (button[0] === 'Reverse' && !reverseClicked),
              })}
            >
              {button[0]}
            </button>
          );
        })}

        {getSortedGoods().some(
          (value, index) => value !== goodsFromServer[index],
        ) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortButton('');
              setReverseClicked(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getSortedGoods().map(good => {
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
