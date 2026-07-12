import 'bulma/css/bulma.css';
import classNames from 'classnames';
import { useState } from 'react';
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

export const buttonNames = [
  {
    text: 'Sort alphabetically',
    buttonClass: 'is-info',
    sortType: 'alphabetically',
  },
  {
    text: 'Sort by length',
    buttonClass: 'is-success',
    sortType: 'byLength',
  },
  { text: 'Reverse', buttonClass: 'is-warning', isReverse: true },
  { text: 'Reset', buttonClass: 'is-danger', isReset: true },
];

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);

  const originalOrder = sortType === '' && !reversed;
  const sortedGoods = [...goodsFromServer];

  if (sortType === 'alphabetically') {
    sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === 'byLength') {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  const handleClick = button => {
    if (button.isReset) {
      setSortType('');
      setReversed(false);

      return;
    }

    if (button.isReverse) {
      setReversed(prevReversed => !prevReversed);

      return;
    }

    setSortType(button.sortType);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {buttonNames
          .filter(button => !button.isReset || !originalOrder)
          .map(button => {
            const isActive =
              button.sortType === sortType || (button.isReverse && reversed);

            return (
              <button
                key={button.text}
                type="button"
                className={classNames('button', button.buttonClass, {
                  'is-light': !isActive,
                })}
                onClick={() => handleClick(button)}
              >
                {button.text}
              </button>
            );
          })}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
