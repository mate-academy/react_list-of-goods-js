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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reverse }) {
  let preparedGoods = goods.map((item, index) => {
    const tempObj = {};

    tempObj.name = item;
    tempObj.id = index;
    tempObj.length = item.length;

    return tempObj;
  });

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1[sortField].localeCompare(good2[sortField]);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem good={good} />
    ))}
  </ul>
);

export const GoodItem = ({ good }) => <li data-cy="Good">{good.name}</li>;

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  function showReset() {
    if (sortField || reverse) {
      return (
        <button
          onClick={() => {
            setSortField('');
            setReverse(false);
          }}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      );
    }

    return '';
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SORT_FIELD_NAME })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_FIELD_LENGTH })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => (reverse ? setReverse(false) : setReverse(true))}
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reverse })}`}
        >
          Reverse
        </button>
        {showReset()}
      </div>

      <GoodList key={visibleGoods.id} goods={visibleGoods} />
    </div>
  );
};
