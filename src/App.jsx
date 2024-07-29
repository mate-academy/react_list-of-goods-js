import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
const lengthCondition = 'length';
const alphabetCondition = 'alphabet';
const reverseCondition = 'reverse';

function getSortedList(list, condition) {
  const listCopy = [...list];

  if (condition) {
    switch (condition) {
      case lengthCondition:
        return listCopy.sort((a, b) => a.length - b.length);
      case alphabetCondition:
        return listCopy.sort();
      default:
        return listCopy;
    }
  }

  return listCopy;
}

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortCondition, setSortCondition] = useState('');

  const handleClick = condition => {
    if (condition === reverseCondition) {
      setIsReversed(prev => !prev);
    } else {
      const newSortedGoods = getSortedList(goodsFromServer, condition);

      setSortCondition(condition);
      setSortedGoods(newSortedGoods);
    }
  };

  const reset = () => {
    setSortCondition('');
    setSortedGoods(goodsFromServer);
    setIsReversed(false);
  };

  const displayedGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortCondition !== alphabetCondition,
          })}
          onClick={() => handleClick(alphabetCondition)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortCondition !== lengthCondition,
          })}
          onClick={() => handleClick(lengthCondition)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => handleClick(reverseCondition)}
        >
          Reverse
        </button>

        {(sortCondition || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
