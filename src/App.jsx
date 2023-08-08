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

function sortWithRevers(goods, typeSort, reverse) {
  let cloneGoods = [...goods];

  switch (typeSort) {
    case 'alfabet':
      cloneGoods.sort((a, b) => (a.localeCompare(b)));
      break;
    case 'wordlength':
      cloneGoods.sort((a, b) => (a.length - b.length));
      break;
    case '':
      cloneGoods = [...goods];
      break;
    default:
      break;
  }

  if (reverse) {
    cloneGoods.reverse();
  }

  return cloneGoods;
}

export const App = () => {
  const [sort, setSort] = useState('');
  const [rev, setRev] = useState(false);
  const visibleGoods = sortWithRevers(goodsFromServer, sort, rev);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sort !== 'alfabet' })}
          onClick={() => setSort('alfabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sort !== 'wordlength' })}
          onClick={() => setSort('wordlength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': rev === false })}
          onClick={() => {
            if (rev === false) {
              setRev(true);
            } else {
              setRev(false);
            }
          }}

        >
          Reverse
        </button>
        {sort.length > 0 || rev
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSort('');
                setRev(false);
              }
              }
            >
              Reset
            </button>
          ) : ''}

      </div>
      <ul>
        {(visibleGoods).map(good => <li data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
