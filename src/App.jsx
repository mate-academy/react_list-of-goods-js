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

function getGoods(goods, sortParams) {
  const goodsCopy = [...goods];

  if (sortParams.property) {
    goodsCopy.sort((good1, good2) => {
      switch (sortParams.property) {
        case 'name':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (sortParams.reverse) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

const Good = ({ good }) => (
  <li data-cy="Good">{good}</li>
);

const GoodList = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <Good good={good} key={good} />
    ))}
  </ul>
);

export const App = () => {
  const [sortParams, setSortParams] = useState({
    property: '',
    reverse: false,
  });
  const preparedGoods = getGoods(goodsFromServer, sortParams);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortParams.property !== 'name' },
          )}
          onClick={() => setSortParams({
            ...sortParams,
            property: 'name',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortParams.property !== 'length' },
          )}
          onClick={() => setSortParams({
            ...sortParams,
            property: 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !sortParams.reverse },
          )}
          onClick={() => setSortParams({
            ...sortParams,
            reverse: !sortParams.reverse,
          })}
        >
          Reverse
        </button>

        {(sortParams.property || sortParams.reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortParams({
              property: '',
              reverse: false,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={preparedGoods} />
    </div>
  );
};
