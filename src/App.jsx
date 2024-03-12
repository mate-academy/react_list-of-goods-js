/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  const [sortMethod, setSortMethod] = useState('');
  const [reverse, setReverse] = useState('');

  const copyOfGoods = [...goodsFromServer];

  const SORT_ALPHABETICALY = 'alphabet';
  const SORT_BY_LENGTH = 'length';
  const REVERSED_SORT = 'reversed';

  const checkForSecondClick = (current, setMethod, sortParameter) => {
    if (sortParameter === current) {
      setMethod('');
    } else {
      setMethod(sortParameter);
    }
  };

  const changeList = () => {
    switch (sortMethod) {
      case SORT_ALPHABETICALY:
        copyOfGoods.sort((obj1, obj2) => obj1.localeCompare(obj2));
        break;

      case SORT_BY_LENGTH:
        copyOfGoods.sort((obj1, obj2) => obj1.length - obj2.length);
        break;
    }
  };

  changeList();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SORT_ALPHABETICALY !== sortMethod,
          })}
          onClick={() => {
            checkForSecondClick(sortMethod, setSortMethod, SORT_ALPHABETICALY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SORT_BY_LENGTH !== sortMethod,
          })}
          onClick={() => {
            checkForSecondClick(sortMethod, setSortMethod, SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': REVERSED_SORT !== reverse,
          })}
          onClick={() => {
            checkForSecondClick(reverse, setReverse, REVERSED_SORT);
          }}
        >
          Reverse
        </button>
        <button
          type="button"
          className="button is-danger is-light"
          style={{
            display: reverse === '' && sortMethod === '' ? 'none' : 'block',
          }}
          onClick={() => {
            setReverse('');
            setSortMethod('');
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {reverse === REVERSED_SORT
          ? copyOfGoods.reverse().map(good => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
          ))
          : copyOfGoods.map(good => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
          ))}
      </ul>
    </div>
  );
};
