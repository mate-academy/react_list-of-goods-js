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

const sortGoods = (goods, type, reversed) => {
  let sortedGoods = [...goods];

  switch (type) {
    case 'Alphabet':
      sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));
      break;

    case 'Length':
      sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  return reversed ? sortedGoods.reverse() : sortedGoods;
};

export const App = () => {
  const [goods] = useState(goodsFromServer);
  const [sortFill, setSortFill] = useState('');
  const [reversed, setReversed] = useState(false);
  const sorterGoods = sortGoods(goods, sortFill, reversed);

  const sortByAlphavit = () => {
    setSortFill('Alphabet');
  };

  const sortByLenghth = () => {
    setSortFill('Length');
  };

  const sortByReverse = () => {
    setReversed(!reversed);
  };

  const goReset = () => {
    setSortFill('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortFill !== 'Alphabet',
          })}
          onClick={sortByAlphavit}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortFill !== 'Length',
          })}
          onClick={sortByLenghth}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={sortByReverse}
        >
          Reverse
        </button>

        {(sortFill !== '' || reversed) && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': sortFill !== '',
            })}
            onClick={goReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sorterGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
