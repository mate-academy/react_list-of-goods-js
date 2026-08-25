import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { useState } from 'react';

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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const showGoods = [...goodsFromServer];

  if (sortType !== '') {
    showGoods.sort((a, b) => {
      switch (sortType) {
        case 'Sort alphabetically':
          return a.localeCompare(b);
        case 'Sort by length':
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    showGoods.reverse();
  }

  const handleSortChange = field => {
    if (field === 'Reverse') {
      setIsReversed(prev => !prev);

      return;
    }

    if (field === 'Reset') {
      setIsReversed(false);
      setSortType('');

      return;
    }

    setSortType(field);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length', 'Reverse', 'Reset'].map(
          field => {
            if (field === 'Reset' && sortType === '' && !isReversed) {
              return null;
            }

            return (
              <button
                key={field}
                type="button"
                className={classNames('button is-info', {
                  'is-light':
                    field === 'Reverse' ? !isReversed : field !== sortType,
                })}
                onClick={() => handleSortChange(field)}
              >
                {field}
              </button>
            );
          },
        )}
      </div>

      <ul>
        {showGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
