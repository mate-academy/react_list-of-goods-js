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

function getGoodsPrepared(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABETICALLY:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SORT_FIELD_LENGHT:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        return 0;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  let visibleGoods = getGoodsPrepared(goodsFromServer, { sortField });
  const [reversed, setReversed] = useState(false);

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const reset = () => {
    setSortField('');
    setReversed(false);
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
            'is-light': reversed === false,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
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
          <li data-cy="Good" key={good.toString()}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
