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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

const getGoods = (goods, sortType) => {
  const resultGoods = [...goods];

  if (sortType) {
    resultGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return resultGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortedGoods = getGoods(goodsFromServer, sortType);
  const visibleGoods = reversed ? sortedGoods.reverse() : sortedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info',
              { 'is-light': sortType !== SORT_ALPHABETICALLY })
          }
          onClick={() => setSortType(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success', { 'is-light': sortType !== SORT_BY_LENGTH })
          }
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortType) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          <li data-cy="Good" key={`${good + index}`}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
