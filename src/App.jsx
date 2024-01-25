import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { GoodsList } from './components/GoodsList';

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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabet';
const SORT_FIELD_REVERSE = 'reverse';

function getPrepared(goods, sortField) {
  let preparedGoods = [...goodsFromServer];

  if (sortField) {
    if (sortField === SORT_FIELD_REVERSE) {
      preparedGoods = preparedGoods.reverse();
    }

    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good2.length - good1.length;
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        default:
          return good1;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  // const [currentList, setCurrentList] = useState(goodsFromServer);

  const visibleGoods = getPrepared(goodsFromServer, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortField === SORT_FIELD_REVERSE ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD_REVERSE);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortField('');
          }}
        >
          Reset
        </button>
      </div>
      <GoodsList list={visibleGoods} />
    </div>
  );
};
