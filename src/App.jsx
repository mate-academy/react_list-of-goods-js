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

const SORT_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(sortField) {
  const copiedGoods = [...goodsFromServer];

  if (sortField) {
    copiedGoods.sort((good1, good2) => {
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

  return copiedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [goods, setGoods] = useState(goodsFromServer);
  const [reversed, setReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setGoods(getPreparedGoods(SORT_ALPHABETICALLY));
            setSortField(SORT_ALPHABETICALLY);
            setReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setGoods(getPreparedGoods(SORT_BY_LENGTH));
            setSortField(SORT_BY_LENGTH);
            setReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setGoods([...goods].reverse());
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
