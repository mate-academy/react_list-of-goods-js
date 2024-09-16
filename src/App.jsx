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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const SortBy = {
    ALPHABET: 'Alphabetically',
    LENGTH: 'ByLength',
  };

  const sort = typeOfSortGoods => {
    let sortedGoods;

    switch (typeOfSortGoods) {
      case SortBy.ALPHABET:
        sortedGoods = [...goods].sort((a, b) => {
          return isReversed ? b.localeCompare(a) : a.localeCompare(b);
        });
        setGoods(sortedGoods);
        setActiveSort(SortBy.ALPHABET);
        break;

      case SortBy.LENGTH:
        sortedGoods = [...goods].sort((a, b) => {
          return isReversed ? b.length - a.length : a.length - b.length;
        });
        setGoods(sortedGoods);
        setActiveSort(SortBy.LENGTH);
        break;

      default:
        throw new Error(`Unknown sort type: ${typeOfSortGoods}`);
    }
  };

  const reverseGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setActiveSort('');
  };

  const sortByAlphabet = () => {
    sort(SortBy.ALPHABET);
  };

  const sortByLength = () => {
    sort(SortBy.LENGTH);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': activeSort !== SortBy.ALPHABET,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': activeSort !== SortBy.LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-warning': isReversed,
            'is-warning is-light': !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(activeSort !== '' || isReversed) && (
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
