import { useState } from 'react';

import 'bulma/css/bulma.css';
import cn from 'classnames';

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

const BUTTONS = [
  {
    type: 'alphabetically',
    text: 'Sort alphabetically',
    colorClass: 'is-info',
  },
  {
    type: 'byLength',
    text: 'Sort by length',
    colorClass: 'is-success',
  },
  {
    type: 'reverse',
    text: 'Reverse',
    colorClass: 'is-warning',
  },
  {
    type: 'reset',
    text: 'Reset',
    colorClass: 'is-danger',
  },
];

export const App = () => {
  const [currentSortType, setCurrentSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleButtonClick = type => {
    switch (type) {
      case 'alphabetically':
        setCurrentSortType('alphabetically');
        break;

      case 'byLength':
        setCurrentSortType('byLength');
        break;

      case 'reverse':
        setIsReversed(prev => !prev);
        break;

      case 'reset':
        setCurrentSortType('');
        setIsReversed(false);
        break;

      default:
        break;
    }
  };

  const getProcessedGoods = () => {
    let currentGoods = goodsFromServer;

    switch (currentSortType) {
      case 'alphabetically':
        currentGoods = currentGoods.toSorted((a, b) => {
          return a.localeCompare(b);
        });
        break;

      case 'byLength':
        currentGoods = currentGoods.toSorted((a, b) => {
          return a.length - b.length;
        });
        break;

      default:
        break;
    }

    return isReversed ? currentGoods.toReversed() : currentGoods;
  };

  const getButtonClasses = (buttonType, colorClass) => ({
    button: true,
    [colorClass]: true,
    'is-light':
      buttonType !== currentSortType &&
      !(buttonType === 'reverse' && isReversed),
  });

  const currentGoods = getProcessedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        {BUTTONS.map(({ type, text, colorClass }) => {
          const shouldRender =
            type !== 'reset' || currentSortType || isReversed;

          if (!shouldRender) {
            return null;
          }

          return (
            <button
              type="button"
              key={type}
              className={cn(getButtonClasses(type, colorClass))}
              onClick={() => handleButtonClick(type)}
            >
              {text}
            </button>
          );
        })}
      </div>

      <ul>
        {currentGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
