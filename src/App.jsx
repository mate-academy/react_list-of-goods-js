import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
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
const ALFABET_SORT = 'alfabet';
const WORD_LENGTH_SORT = 'wordlength';

function sortWithRevers(goods, typeSort, reverse) {
  let cloneGoods = [...goods];

  switch (typeSort) {
    case ALFABET_SORT:
      cloneGoods.sort((a, b) => (a.localeCompare(b)));
      break;
    case WORD_LENGTH_SORT:
      cloneGoods.sort((a, b) => (a.length - b.length));
      break;
    default:
      cloneGoods = [...goods];
      break;
  }

  if (reverse) {
    cloneGoods.reverse();
  }

  return cloneGoods;
}

export const App = () => {
  const [sort, setSort] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = sortWithRevers(goodsFromServer, sort, isReverse);

  const reversList = () => (
    isReverse === false
      ? setIsReverse(true)
      : setIsReverse(false)
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sort !== ALFABET_SORT })}
          onClick={() => setSort(ALFABET_SORT)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sort !== WORD_LENGTH_SORT })}
          onClick={() => setSort(WORD_LENGTH_SORT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReverse })}
          onClick={() => reversList()}

        >
          Reverse
        </button>
        {sort.length > 0 || isReverse
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSort('');
                setIsReverse(false);
              }
              }
            >
              Reset
            </button>
          ) : ''}

      </div>
      <ul>
        {(visibleGoods).map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
