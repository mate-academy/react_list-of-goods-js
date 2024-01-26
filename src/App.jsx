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

function getPrepared(goods, sortField, isReversed) {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_LENGTH:
        preparedGoods.sort((good1, good2) => good2.length - good1.length);
        break;
      case SORT_FIELD_ALPHABETICALLY:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      default:
        break;
    }
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, SetIsReversed] = useState(false);

  const visibleGoods = getPrepared(goodsFromServer, sortField, isReversed);

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
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            SetIsReversed(!isReversed);
            getPrepared(goodsFromServer, sortField, isReversed);
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
