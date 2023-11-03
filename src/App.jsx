import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

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
const sortTypes = { alphabetically: 'alphabet', byLength: 'length' };

function getPreparedGoods(goods, sortField, isReverse) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case sortTypes.alphabetically:
          return goods1.localeCompare(goods2);
        case sortTypes.byLength:
          return goods1.length - goods2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, sortField, isReverse);

  const reset = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': !(sortField === sortTypes.alphabetically) },
          )}
          onClick={() => setSortField(sortTypes.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': !(sortField === sortTypes.byLength) },
          )}
          onClick={() => setSortField(sortTypes.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {
          (sortField || isReverse) && (
            <button
              type="button"
              className={cn(
                'button is-danger',
                { 'is-light': sortField || isReverse },
              )}
              onClick={reset}
            >
              Reset
            </button>
          )
        }

      </div>

      <ul>
        {visibleGoods.map(product => (
          <li data-cy="Good" key={product}>{product}</li>
        ))}
      </ul>
    </div>
  );
};
