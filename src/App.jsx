import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

const ALPHABETICALLY = 'alphabetically';
const LENGTH = 'length';
const RESET = '';

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
  const [select, setSelect] = useState('');
  const [isReversed, setReversed] = useState();

  const sortMethod = () => {
    let res = [...goodsFromServer];

    if (select === ALPHABETICALLY) {
      res = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    }

    if (select === LENGTH) {
      res = [...goodsFromServer].sort((a, b) => a.length - b.length);
    }

    if (select === RESET) {
      return goodsFromServer;
    }

    if (isReversed) {
      res = res.reverse();
    }

    return res;
  };

  const Reset = () => {
    if (select !== '') {
      return (
        <button
          type="button"
          className={cn('button is-danger', { 'is-light': select !== RESET })}
          onClick={() => {
            setSelect(RESET);
            setReversed(false);
          }}
        >
          Reset
        </button>
      );
    }

    return null;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': select !== ALPHABETICALLY })}
          onClick={() => {
            setSelect(ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', { 'is-light': select !== LENGTH })}
          onClick={() => {
            setSelect(LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        <Reset />
      </div>

      <ul>
        {
          sortMethod().map(item => <li data-cy="Good" key={item}>{item}</li>)
        }
      </ul>
    </div>
  );
};
