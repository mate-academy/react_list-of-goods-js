import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames'

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

const ALPHA_SORTED = 'alphabet'
const LENGTH_SORTED = 'length'


export const App = () => {
const [goods, setGoods] = useState(goodsFromServer);
const [isReversed, setIsReversed] = useState(false);
const [sortBy, setSortBy] = useState('');

const sortGoods = (sortingBy) => {
  const goodsCopy = [...goodsFromServer]

  switch (sortingBy) {
    case ALPHA_SORTED:
      goodsCopy.sort((good1, good2) => good1.localeCompare(good2))
      break

    case (LENGTH_SORTED):
      goodsCopy.sort((good1, good2) => good1.length - good2.length)
      break

    default:
      break
  }

  if(isReversed) {
    goodsCopy.reverse()
  }

  setGoods(goodsCopy)
}

const alphaSortHandler = () => {
  setSortBy(ALPHA_SORTED)
  sortGoods(ALPHA_SORTED)
}

const lengthSortHandler = () => {
  setSortBy(LENGTH_SORTED)
  sortGoods(LENGTH_SORTED)
}

const reverseHandler = () => {
  setIsReversed(!isReversed)
  setGoods([...goods].reverse())
}

const handleReset = () => {
  setSortBy('');
  setIsReversed(false);
  setGoods([...goodsFromServer]);
};


  return (
    <div className="section content">
      <div className="buttons">
        <button
        type="button"
        className={cn('button is-info', {
          'is-light': sortBy !== ALPHA_SORTED
        })}
        onClick={alphaSortHandler}
        >
          Sort alphabetically
        </button>

        <button
        type="button"
        className={cn('button is-success', {
          'is-light': sortBy !== LENGTH_SORTED
        })}
        onClick={lengthSortHandler}
        >
          Sort by length
        </button>

        <button
        type="button"
        className={cn('button is-warning', {
          'is-light': !isReversed
        })}
        onClick={reverseHandler}
        >
          Reverse
        </button>


        {goods.join() !== goodsFromServer.join() && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>
      <ul>
        {goods.map(good => {
          return (
            <li data-cy="Good" key={good}>{good}</li>
          )
        })}
      </ul>
    </div>
  )
};
