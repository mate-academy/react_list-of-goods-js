import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const ALPHABETICAL_SORT = 'A';
const LENGTH_SORT = 'L';
const RESET = null;

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [curentVelue, setCurentVelue] = useState(null);
  const [isReverse, setIsReverse] = useState(false);

  function applySort(value, reverse) {
    let newArr = [...goodsFromServer];

    switch (value) {
      case ALPHABETICAL_SORT:
        newArr.sort((a, b) => a.localeCompare(b));
        break;
      case LENGTH_SORT:
        newArr.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (reverse) {
      newArr.reverse();
    }

    setGoods(newArr);
  }

  const AlphabeticalSort = () => {
    const newValue =
      curentVelue === ALPHABETICAL_SORT ? null : ALPHABETICAL_SORT;

    setCurentVelue(newValue);
    applySort(newValue, isReverse);
  };

  const LengthSort = () => {
    const newValue = curentVelue === LENGTH_SORT ? null : LENGTH_SORT;

    setCurentVelue(newValue);
    applySort(newValue, isReverse);
  };

  const Reverse = () => {
    const newReverse = !isReverse;

    setIsReverse(newReverse);
    applySort(curentVelue, newReverse);
  };

  const Reset = () => {
    setCurentVelue(RESET);
    setIsReverse(false);
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': curentVelue !== ALPHABETICAL_SORT,
          })}
          onClick={AlphabeticalSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': curentVelue !== LENGTH_SORT,
          })}
          onClick={LengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={Reverse}
        >
          Reverse
        </button>

        {(curentVelue !== null || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={Reset}
          >
            Reset
          </button>
        )}
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
