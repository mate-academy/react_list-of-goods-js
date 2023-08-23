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

const SORT_ALPHABETICALLY = 'sort alphabetically';
const SORT_BY_LENGTH = 'sort by length';

const sortByCondition = (condition, isReversed) => {
  const goodsCopy = [...goodsFromServer];

  if (condition) {
    goodsCopy.sort((good1, good2) => {
      switch (condition) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed
    ? goodsCopy.reverse()
    : goodsCopy;
};

export const App = () => {
  const [sortParam, setSortParam] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goods = sortByCondition(sortParam, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortParam !== SORT_ALPHABETICALLY })}`}
          onClick={() => setSortParam(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortParam !== SORT_BY_LENGTH })}`}
          onClick={() => setSortParam(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !isReversed })}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortParam || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReversed(false);
                setSortParam('');
              }}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
