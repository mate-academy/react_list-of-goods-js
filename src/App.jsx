import 'bulma/css/bulma.css';
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

const SORT_FILED_ALPHABETICALLY = 'name';
const SORT_FILED_LENGTH = 'length';

function getPreparedGoods(goods, sortFiled, reverse) {
  const preparedGoods = [...goods];

  if (sortFiled) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFiled) {
        case SORT_FILED_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FILED_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortFiled, setSortFiled] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortFiled, reverse);

  const getSort = (field) => {
    setSortFiled(field === sortFiled ? '' : field);
  };

  const getReset = () => {
    setReverse(false);
    setSortFiled('');
  };

  const getReverse = () => {
    setReverse(!reverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortFiled === SORT_FILED_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => getSort(SORT_FILED_ALPHABETICALLY)}
        >

          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortFiled === SORT_FILED_LENGTH ? '' : 'is-light'}`}
          onClick={() => getSort(SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={getReverse}
        >
          Reverse
        </button>
        {(reverse || sortFiled) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={getReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
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
