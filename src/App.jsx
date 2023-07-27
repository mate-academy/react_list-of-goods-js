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

export const rev = 'reverse';
export const alphabet = 'alphabet';
export const alphabetRev = 'alphabet reverse';
export const length = 'length';
export const lengthRev = 'length reverse';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const sortAlphabet = () => {
    if (sortField.includes(rev)) {
      setVisibleGoods([...visibleGoods].sort((a, b) => b.localeCompare(a)));
      setSortField(alphabetRev);
    } else {
      setVisibleGoods([...visibleGoods].sort((a, b) => a.localeCompare(b)));
      setSortField(alphabet);
    }
  };

  const sortLength = () => {
    if (sortField.includes(rev)) {
      setVisibleGoods([...visibleGoods].sort((a, b) => b.length - a.length));
      setSortField(lengthRev);
    } else {
      setVisibleGoods([...visibleGoods].sort((a, b) => a.length - b.length));
      setSortField(length);
    }
  };

  const reverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    if (sortField.includes(rev)) {
      setSortField(sortField.split(' ')[0]);
    } else {
      setSortField(`${sortField} ${rev}`);
    }
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
  };

  const classButton = (buttonName, classButtonActive) => {
    if (sortField.includes(buttonName)) {
      return classButtonActive;
    }

    return `${classButtonActive} is-light`;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classButton(alphabet, 'button is-info')}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classButton(length, 'button is-success')}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classButton(rev, 'button is-warning')}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortField.length > 0 && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
