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

const NOT_SORTED = 'not sorted';
const SORT_ALPHABETICALLY = 'sort alphabetically';
const SORT_BY_LENGTH = 'sort by length';

function getUpdatedList(statusOfCurrentList, isReversed) {
  const goods = [...goodsFromServer];

  // eslint-disable-next-line max-len, prettier/prettier
  const rev = whatReverse => (isReversed ? whatReverse.reverse() : whatReverse);

  switch (statusOfCurrentList) {
    case SORT_ALPHABETICALLY:
      goods.sort(
        (good1, good2) => good1.localeCompare(good2),
        // eslint-disable-next-line function-paren-newline
      );

      return rev(goods);
    case SORT_BY_LENGTH:
      goods.sort((good1, good2) => good1.length - good2.length);

      return rev(goods);
    case NOT_SORTED:
      return rev(goods);
    default:
      return goodsFromServer;
  }
}

export const App = () => {
  const [statusOfCurrentList, setStatusOfCurrentList] = useState(NOT_SORTED);
  const [isReversed, setIsReversed] = useState(false);
  const showReset = statusOfCurrentList !== NOT_SORTED || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': statusOfCurrentList !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setStatusOfCurrentList(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': statusOfCurrentList !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setStatusOfCurrentList(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setStatusOfCurrentList(NOT_SORTED);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getUpdatedList(statusOfCurrentList, isReversed).map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
