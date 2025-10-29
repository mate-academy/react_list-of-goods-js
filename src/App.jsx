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
  const [originalList] = useState(goodsFromServer);
  const [currentList, setCurrentList] = useState(goodsFromServer);
  const [mode, setMode] = useState('default'); // 'default', 'alphabet', 'length'
  const [reverse, setReverse] = useState(false);

  const sortAlphabetically = () => {
    setMode('alphabet');
    const sorted = [...originalList].sort((a, b) => a.localeCompare(b));

    setCurrentList(reverse ? sorted.reverse() : sorted);
  };

  const sortByLength = () => {
    setMode('length');
    const sorted = [...originalList].sort((a, b) => a.length - b.length);

    setCurrentList(reverse ? sorted.reverse() : sorted);
  };

  const reverseList = () => {
    const newReverse = !reverse;

    setReverse(newReverse);

    let baseList;

    if (mode === 'default') {
      baseList = [...originalList];
    } else if (mode === 'alphabet') {
      baseList = [...originalList].sort((a, b) => a.localeCompare(b));
    } else if (mode === 'length') {
      baseList = [...originalList].sort((a, b) => a.length - b.length);
    }

    setCurrentList(newReverse ? baseList.reverse() : baseList);
  };

  const resetList = () => {
    setCurrentList([...originalList]);
    setMode('default');
    setReverse(false);
  };

  const getButtonClass = buttonType => {
    switch (buttonType) {
      case 'alphabet':
        return `button is-info ${mode === 'alphabet' ? '' : 'is-light'}`;
      case 'length':
        return `button is-success ${mode === 'length' ? '' : 'is-light'}`;
      case 'reverse':
        return `button is-warning ${reverse ? '' : 'is-light'}`;
      case 'reset':
        return `button is-danger`;
      default:
        return 'button is-light';
    }
  };

  const showReset =
    JSON.stringify(currentList) !== JSON.stringify(originalList);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('alphabet')}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('length')}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('reverse')}
          onClick={reverseList}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className={getButtonClass('reset')}
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {currentList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
