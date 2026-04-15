import { useState } from 'react';
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

const SORTED_ALPHABETICALLY = 'name';
const SORTED_BY_LENGTH = 'length';

function getPreparedList(goods, sortedBy, isReverse) {
  const preparedGoods = [...goods];

  if (sortedBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedBy) {
        case SORTED_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORTED_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0
      }
    })
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortedBy, setSortedBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedList(goodsFromServer, sortedBy, isReverse);

  function reset() {
    setSortedBy('');
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            "button",
            "is-info",
            {
              "is-light": sortedBy !== SORTED_ALPHABETICALLY
            }
          )}
          onClick={() => setSortedBy(SORTED_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            "button",
            "is-success",
            {
              "is-light": sortedBy !== SORTED_BY_LENGTH
            }
          )}
          onClick={() => setSortedBy(SORTED_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            "button",
            "is-warning",
            {
              "is-light": !isReverse
            }
          )}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortedBy || isReverse) &&
          <button type="button" className="button is-danger is-light" onClick={reset}>
            Reset
          </button>
        }
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>{good}</li>
          );
        })}
      </ul>
    </div>
  )
};
