import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

function isEquial(optionsA, optionsb) {
  return JSON.stringify(optionsA) === JSON.stringify(optionsb);
}

export const App = () => {
  const [sortOption, setSortOption] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const copiedGoods = [...goodsFromServer];
  const sortedGoods = copiedGoods.sort((a, b) => {
    const actionsByOption = {
      alphabetically: (optionA, optionB) => optionA.localeCompare(optionB),
      length: (optionA, optionB) => optionA.length - optionB.length,
    };

    if (sortOption) {
      return actionsByOption[sortOption](a, b);
    }

    return 0;
  });

  const goodsToShow = isReversed ? sortedGoods.reverse() : sortedGoods;

  const handleSetSort = option => {
    if (sortOption !== option) {
      setSortOption(option);
    }
  };

  const handleReset = () => {
    setSortOption('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOption !== 'alphabetically',
          })}
          onClick={() => handleSetSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOption !== 'length',
          })}
          onClick={() => handleSetSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {!isEquial(goodsFromServer, goodsToShow) && (
          <button
            type="button"
            className={cn('button is-info is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsToShow.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
