import 'bulma/css/bulma.css';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

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

const goodsFromServerId = goodsFromServer.map(good => ({
  good,
  id: uuidv4(),
}));

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getPrepareGoods(goods, { sortField, reverseGoods }) {
  const preparegoods = [...goods];

  if (sortField) {
    preparegoods.sort(({ good: good1 }, { good: good2 }) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseGoods) {
    preparegoods.reverse();
  }

  return preparegoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseGoods, setReverseGoods] = useState(false);

  const visibleGoods = getPrepareGoods(
    goodsFromServerId,
    { sortField, reverseGoods },
  );

  const hendleReset = () => {
    setSortField('');
    setReverseGoods(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_ALPHABETICALLY },
          )}
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning', { 'is-light': !reverseGoods },
          )}
          onClick={() => setReverseGoods(!reverseGoods)}
        >
          Reverse
        </button>
        {(sortField || reverseGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={hendleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(({ good, id }) => (
          <li data-cy="Good" key={id}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
