import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  const buttons = ['Sort alphabetically', 'Sort by length', 'Reverse', 'Reset'];
  const mods = ['is-info', 'is-success', 'is-warning', 'is-danger'];
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'Sort alphabetically':
        return good1.localeCompare(good2);
      case 'Sort by length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  if (sortField === 'Reset') {
    visibleGoods = [...goodsFromServer];
  }

  function buttonClick(button) {
    switch (button) {
      case 'Reset':
        setSortField('');
        setIsReversed(false);
        break;

      case 'Reverse':
        setIsReversed(prev => !prev);
        break;

      default:
        setSortField(button);
        break;
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map((button, i) => {
          const isSelected =
            button === 'Reverse' ? isReversed : button === sortField;

          if (button === 'Reset' && !(sortField || isReversed)) {
            return null;
          }

          return (
            <button
              key={button}
              type="button"
              className={cn('button', mods[i], { 'is-light': !isSelected })}
              onClick={() => {
                buttonClick(button);
              }}
            >
              {button}
            </button>
          );
        })}
      </div>

      <ul>
        {visibleGoods.map(good => {
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
