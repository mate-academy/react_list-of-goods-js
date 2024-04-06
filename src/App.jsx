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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGHT = 'lenght';

function getGoodsPrepared(goods, { sortField, isReversed }) {
  let preparedGoods = [...goods];

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        return isReversed
          ? preparedGoods.sort((good1, good2) => good2.localeCompare(good1))
          : preparedGoods.sort((good1, good2) => good1.localeCompare(good2));

      case SORT_FIELD_LENGHT:
        return isReversed
          ? preparedGoods.sort((good1, good2) => good2.length - good1.length)
          : preparedGoods.sort((good1, good2) => good1.length - good2.length);

      default:
        return 0;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getGoodsPrepared(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGHT,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGHT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
