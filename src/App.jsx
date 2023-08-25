import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classnames from 'classnames';

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

function getPrepearedGoods(goods, { currentSortField, reversedState }) {
  const prepearedGoods = [...goods];

  if (currentSortField === '') {
    if (reversedState === 'reversed') {
      prepearedGoods.reverse();
    }
  }

  if (currentSortField === 'Name') {
    if (reversedState === 'reversed') {
      prepearedGoods.sort().reverse();
    }

    if (reversedState !== 'reversed') {
      prepearedGoods.sort();
    }
  }

  if (currentSortField === 'Length') {
    if (reversedState === 'reversed') {
      prepearedGoods.sort(
        (good1, good2) => (good1.length - good2.length),
      ).reverse();
    }

    if (reversedState !== 'reversed') {
      prepearedGoods.sort((good1, good2) => (good1.length - good2.length));
    }
  }

  return prepearedGoods;
}

export const App = () => {
  const [currentSortField, setCurrentSortField] = useState('');
  const [reversedState, setReversedState] = useState('');
  const vissibleGoods = getPrepearedGoods(goodsFromServer,
    { currentSortField, reversedState });

  const isStateNotReversedOrSorted
  = (reversedState === 'reversed') || (currentSortField !== '');

  const sortByName = () => {
    setCurrentSortField('Name');
  };

  const sortByLength = () => {
    setCurrentSortField('Length');
  };

  const reverse = () => {
    if (reversedState === 'reversed') {
      setReversedState('');
    }

    if (reversedState !== 'reversed') {
      setReversedState('reversed');
    }
  };

  const reset = () => {
    setReversedState('');
    setCurrentSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByName}
          type="button"
          className={
            classnames('button is-info',
              { 'is-light': currentSortField !== 'Name' })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={
          classnames('button is-success',
            { 'is-light': currentSortField !== 'Length' })
          }
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={
            classnames('button is-warning',
              { 'is-light': reversedState !== 'reversed' })
            }
        >
          Reverse
        </button>

        {isStateNotReversedOrSorted && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {vissibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
