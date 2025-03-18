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

function prepareGoods(goods, sortField) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case 'length':
      return preparedGoods.sort((a, b) => b.length - a.length);
    case 'alph':
      return preparedGoods.sort((a, b) => a.localeCompare(b));
    default:
      return preparedGoods;
  }
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = prepareGoods(goodsFromServer, sortField);

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  const isOrderUnchanged = visibleGoods.every(
    (item, index) => item === goodsFromServer[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== 'alph',
          })}
          onClick={() => setSortField('alph')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isOrderUnchanged ? (
          <button
            type="button"
            className="button is-danger is-light"
            style={{
              visibility: !isOrderUnchanged ? 'visible' : 'hidden',
            }}
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
