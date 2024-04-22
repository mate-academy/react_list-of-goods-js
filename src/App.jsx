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

const SORT_ABC = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';

function sortingMethods(array, { sortField, reversed }) {
  const prepGoods = [...array];

  if (sortField) {
    switch (sortField) {
      case SORT_ABC:
        prepGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SORT_LENGTH:
        prepGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      default:
        break;
    }
  }

  if (reversed) {
    prepGoods.reverse();
  }

  return prepGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = sortingMethods(goodsFromServer, { sortField, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_ABC,
          })}
          onClick={() => setSortField(SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className={classNames('button is-light is-danger')}
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
