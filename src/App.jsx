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
const SORT_FIELD_ALPHABET = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';


function getPreparedGoods(goods, sortField, isReverse = false ) {
  let prepearedGoods = [...goods];

  if(sortField) {
    prepearedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;

        default:
          return 0;
       }
      });
     }
    if (isReverse) {
      prepearedGoods.reverse();
    }

  return prepearedGoods;
}


export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  function reset() {
        setSortField('');
        setReverse(false);
      }

  return (
  <div className="section content">
    <div className="buttons">
      <button
      type="button"
      onClick={() => {
        setSortField(SORT_FIELD_ALPHABET);
      }}
      className={cn('button', 'is-info', {'is-light': sortField !== SORT_FIELD_ALPHABET})}
      >
        Sort alphabetically
      </button>

      <button
      type="button"
      onClick={() => {
        setSortField(SORT_FIELD_LENGTH);
      }}
      className={cn('button', 'is-success', {'is-light': sortField !== SORT_FIELD_LENGTH})}
      >
        Sort by length
      </button>

      <button
      type="button"
      onClick={() => {
        setReverse((prev => !prev))
      }}
      className={cn('button', 'is-warning', {'is-light': !isReverse})}
      >
        Reverse
      </button>

    {
    (sortField || isReverse) && (
      <button
      type="button"
      onClick={reset}
      className="button is-danger is-light">
        Reset
      </button>
      )
    }
     </div>

     <ul className='list'>
      {visibleGoods.map(good => (
        <li
        data-cy="Good"
        key={good}>
          {good}
        </li>
      ))}
     </ul>
    </div>
  );
};
