import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const goodsFromServer = [
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
const SORT_LENGTH = 'LENGTH';
const SORT_ALPHABETICALLY = 'ALPHABETICALLY';

function getPreparedGoods(goods, { isReverse, sortField }) {
  const goodsClone = Array.from(goods);

  if (sortField) {
    switch (sortField) {
      case SORT_LENGTH:
        goodsClone.sort((good1, good2) => good1.length - good2.length);
        break;
      case SORT_ALPHABETICALLY:
        goodsClone.sort((good1, good2) => good1.localeCompare(good2));
        break;
      default:
        return 0;
    }
  }

  if (isReverse) {
    goodsClone.reverse();
  }

  return goodsClone;
}

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortField, setSortField] = useState(null);
  const goods = getPreparedGoods(goodsFromServer, { isReverse, sortField });

  const reset = () => {
    setIsReverse(false);
    setSortField(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
          type="button"
          className={classNames('button is-info ', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_LENGTH)}
          type="button"
          className={classNames('button is-success ', {
            'is-light': sortField !== SORT_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={classNames('button is-warning ', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
