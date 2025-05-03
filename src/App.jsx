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

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function getPreparedGoods(goods, field) {
    const preparedGoods = [...goods];

    switch (field) {
      case 'alphabetically':
        preparedGoods.sort();
        break;
      case 'by-length':
        preparedGoods.sort((a, b) => b.length - a.length);
        break;
      default:
        break;
    }

    return isReversed ? preparedGoods.reverse() : preparedGoods;
  }

  const renderGoods = getPreparedGoods(goodsFromServer, sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            button: true,
            'is-info': true,
            'is-light': sortType !== 'alphabetically',
          })}
          onClick={() => {
            setSortType('alphabetically');
            // Не скидаємо isReversed, щоб застосувати реверс до нового сортування
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-success': true,
            'is-light': sortType !== 'by-length',
          })}
          onClick={() => {
            setSortType('by-length');
            // Не скидаємо isReversed
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            button: true,
            'is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {sortType !== '' && (
          <button
            type="button"
            className={cn({
              button: true,
              'is-danger': true,
              'is-light': true,
              iframe: true,
            })}
            onClick={() => {
              setSortType('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
