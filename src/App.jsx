import 'bulma/css/bulma.css';
import './App.scss';
import { useMemo, useState } from 'react';

const goodsFromServer = [
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

const sortMethods = {
  abc: (a, b) => a.localeCompare(b),
  length: (a, b) => a.length - b.length,
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    if (sortField) {
      goods.sort(sortMethods[sortField]);
    }

    return isReversed ? goods.reverse() : goods;
  }, [sortField, isReversed]);

  const isOriginalOrder = !sortField && !isReversed;

  const getButtonClass = (color, isActive) =>
    `button ${color} ${isActive ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('abc')}
          type="button"
          className={getButtonClass('is-info', sortField === 'abc')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('length')}
          type="button"
          className={getButtonClass('is-success', sortField === 'length')}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(prev => !prev)}
          type="button"
          className={getButtonClass('is-warning', isReversed)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
