import { useEffect, useState } from 'react';
import cn from 'classnames';

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

const SORTING_FUNCTIONS = {
  alpha: (a, b) => a.localeCompare(b),
  length: (a, b) => a.length - b.length,
};

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleGoods = () => {
    const newGoods = [...goodsFromServer];

    if (sortField !== '') {
      newGoods.sort(SORTING_FUNCTIONS[sortField]);
    }

    return isReversed
      ? setVisibleGoods(newGoods.reverse())
      : setVisibleGoods(newGoods);
  };

  const sortByAlpha = () => {
    setSortField('alpha');
  };

  const sortByLength = () => {
    setSortField('length');
  };

  const reverse = () => {
    setIsReversed(r => !r);
  };

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isOriginalList = () => {
    return !isReversed && sortField === '';
  };

  useEffect(() => {
    handleGoods();
  }, [sortField, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByAlpha}
          className={cn('button is-info', {
            'is-light': sortField !== 'alpha',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={cn('button is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {!isOriginalList() && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key="goods.id" data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
