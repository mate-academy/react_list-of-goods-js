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

const REVERSE_ON = 'reverse';
const REVERSE_OFF = 'reverse_off';
const SORT_ALPHABETICALLY = 'sortAlphabetically';
const SORT_BY_LENGTH = 'sortByLength';

const sortAlphabetically = (a, b) => a.localeCompare(b);
const sortByLength = (a, b) => a.length - b.length;

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reverseType, setReverseType] = useState(REVERSE_OFF);

  const getProcessedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SORT_ALPHABETICALLY) {
      sortedGoods.sort(sortAlphabetically);
    } else if (sortType === SORT_BY_LENGTH) {
      sortedGoods.sort(sortByLength);
    }

    if (reverseType === REVERSE_ON) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const goods = getProcessedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortType(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortType(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseType !== REVERSE_ON,
          })}
          onClick={() => {
            // Перемикаємо реверс
            setReverseType(
              reverseType === REVERSE_ON ? REVERSE_OFF : REVERSE_ON,
            );
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', {
            'is-hidden': sortType === '' && reverseType === REVERSE_OFF,
            'is-light': sortType !== '' || reverseType !== REVERSE_OFF,
          })}
          onClick={() => {
            // Скидаємо всі стани та список
            setSortType('');
            setReverseType(REVERSE_OFF);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
