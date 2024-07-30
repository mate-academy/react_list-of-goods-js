import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_BY_FIRST_LETTER = 'byLetter';
const SORT_BY_GOOD_LENGTH = 'byLength';

function getSortedGoods(goodsList, sortField) {
  const goodsListCopy = [...goodsList];

  if (sortField) {
    goodsListCopy.sort((good1, good2) => {
      switch (sortField) {
        case 'byLetter':
          return good1.localeCompare(good2);
        case 'byLength':
          return good1.length - good2.length;
        default:
          return goodsListCopy;
      }
    });
  }

  return goodsListCopy;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  let renderedGoods = getSortedGoods(goodsFromServer, sortField);
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    renderedGoods = [...renderedGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_BY_FIRST_LETTER,
          })}
          onClick={() => setSortField(SORT_BY_FIRST_LETTER)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_BY_GOOD_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_GOOD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {sortField === '' && !reversed ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
