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

const SORT_AL = 'alphabetically';
const SORT_LENGTH = 'length';
const REVERSE = 'reverse';

function prepareGoods(goodsServer, sort, reverse) {
  const goods = [...goodsServer];

  if (sort) {
    goods.sort((good1, good2) => {
      switch (sort) {
        case SORT_AL:
          return good1.localeCompare(good2);

        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sort, setSort] = useState('');
  const [reverse, setReverse] = useState('');

  const preparedGoods = prepareGoods(goodsFromServer, sort, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': sort !== SORT_AL })}
          onClick={() => setSort(SORT_AL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== SORT_LENGTH,
          })}
          onClick={() => setSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse !== REVERSE,
          })}
          onClick={() =>
            reverse === REVERSE ? setReverse('') : setReverse(REVERSE)
          }
        >
          Reverse
        </button>

        {sort !== '' || reverse !== '' ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort('');
              setReverse('');
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
