import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const filter = () => {
    const goods = [...goodsFromServer];

    switch (sortType) {
      case 'Sort alphabetically':
        goods.sort((a, b) => a.localeCompare(b));
        break;
      case 'Sort by length':
        goods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  };

  const checkReversed = () => {
    setIsReversed(!isReversed);
  };

  const sortedGoods = filter();

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length'].map(method => (
          <button
            onClick={() => {
              setSortType(method);
            }}
            key={method}
            className={classNames('button', {
              'is-info':
                method === 'Sort alphabetically' && sortType === method,
              'is-success': method === 'Sort by length' && sortType === method,
              'is-warning': method === 'Reverse' && sortType === method,
              'is-light': sortType !== method,
            })}
          >
            {method}
          </button>
        ))}

        {
          <button
            type="button"
            className={classNames('button is-warning', {
              'is-light': !isReversed,
            })}
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>
        }

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {setSortType(''); setIsReversed(false);}}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
