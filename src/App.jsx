import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const sortType = {
  alphabet: 'abc',
  length: 'length',
};

function getVisibleGoods(goods, sortField, isReversed) {
  let ret = [...goods];

  if (sortField === sortType.alphabet) {
    ret = ret.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortField === sortType.length) {
    ret = ret.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    ret.reverse();
  }

  return ret;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const handleSort = sort => setSortField(sort);
  const handleReverse = () => setIsReversed(pr => !pr);
  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === sortType.alphabet
            ? cn('button is-info') : cn('button is-info is-light')}
          onClick={() => handleSort(sortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortField === 'length'
            ? cn('button is-success') : cn('button is-success is-light')}
          onClick={() => handleSort(sortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(`button is-warning ${isReversed ? '' : 'is-light'}`)}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortField === '' && !isReversed ? '' : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >

            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
