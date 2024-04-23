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
  const [reverse, setReverse] = useState(false);

  const copyOfGoods = [...goodsFromServer];

  const SORT_ALPHABETICALY = 'alphabet';
  const SORT_BY_LENGTH = 'length';

  const resetFunction = () => {
    setReverse(false);
    setSortMethod('');
  };

  const changeList = () => {
    if (sortMethod === SORT_ALPHABETICALY) {
      copyOfGoods.sort((obj1, obj2) => obj1.localeCompare(obj2));
    } else if (sortMethod === SORT_BY_LENGTH) {
      copyOfGoods.sort((obj1, obj2) => obj1.length - obj2.length);
    }

    if (reverse) {
      copyOfGoods.reverse();
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
            setSortMethod(SORT_ALPHABETICALY);
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
            setSortMethod(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(!reverse);
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
          onClick={() => resetFunction()}
        >
          Reset
        </button>
      </div>

      <ul>
        {copyOfGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
