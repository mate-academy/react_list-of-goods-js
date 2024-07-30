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

const LENGTH_CONDITION = 'length';
const ALPHABET_CONDITION = 'alphabet';

function getSortedGoodsList(goods, isReversed, sortCondition) {
  const goodsListCopy = [...goods];

  if (sortCondition) {
    switch (sortCondition) {
      case LENGTH_CONDITION:
        goodsListCopy.sort((a, b) => a.length - b.length);
        break;
      case ALPHABET_CONDITION:
        goodsListCopy.sort();
        break;
      default:
        return 0;
    }
  }

  if (isReversed) {
    goodsListCopy.reverse();
  }

  return goodsListCopy;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const displayedGoods = getSortedGoodsList(
    goodsFromServer,
    isReversed,
    sortField,
  );
  const isSortFieldChosen = condition => condition !== sortField;

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': isSortFieldChosen(ALPHABET_CONDITION),
          })}
          onClick={() => setSortField(ALPHABET_CONDITION)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': isSortFieldChosen(LENGTH_CONDITION),
          })}
          onClick={() => setSortField(LENGTH_CONDITION)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
