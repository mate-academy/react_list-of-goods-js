import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { useState } from 'react';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortedField, setSortedField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setSortedField('');
    setIsReversed(false);
  };

  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sorted.reverse();
    }

    setVisibleGoods(sorted);
    setSortedField(SORT_FIELD_ALPHABET);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (isReversed) {
      sorted.reverse();
    }

    setVisibleGoods(sorted);
    setSortedField(SORT_FIELD_LENGTH);
  };

  const reverseGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(prev => !prev);
  };

  const isResetVisible = visibleGoods.join(',') !== goodsFromServer.join(',');

  const isAlphActive = sortedField === SORT_FIELD_ALPHABET;
  const isLengthActive = sortedField === SORT_FIELD_LENGTH;
  const isReverseActive = isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isAlphActive,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !isLengthActive,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReverseActive,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
