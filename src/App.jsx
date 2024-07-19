import classNames from 'classnames';
import { useState } from 'react';
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

const SORT_FIELD = {
  Name: 'name',
  Length: 'lenght',
  None: 'none',
};

function getPreparedGoods(goods, sortField, isReversed) {
  const prepareGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD.Name:
      prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_FIELD.Length:
      prepareGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

   if (isReversed) {
    prepareGoods.reverse();
   }

  return prepareGoods;

}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD.None);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD.Name)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_FIELD.Name,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD.Length)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_FIELD.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== SORT_FIELD.None || isReversed) && (
          <button
            onClick={() => {
              setSortField(SORT_FIELD.None);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
