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
  const [goodVisible, setGoodVisible] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');

  const sortAlphabet = () => {
    if (sortField.includes('reverse')) {
      setGoodVisible([...goodVisible].sort((a, b) => b.localeCompare(a)));
      setSortField('alphabet reverse');
    } else {
      setGoodVisible([...goodVisible].sort((a, b) => a.localeCompare(b)));
      setSortField('alphabet');
    }
  };

  const sortLength = () => {
    if (sortField.includes('reverse')) {
      setGoodVisible([...goodVisible].sort((a, b) => b.length - a.length));
      setSortField('length reverse');
    } else {
      setGoodVisible([...goodVisible].sort((a, b) => a.length - b.length));
      setSortField('length');
    }
  };

  const reverse = () => {
    setGoodVisible([...goodVisible].reverse());
    if (sortField.includes('reverse')) {
      setSortField(sortField.split(' ')[0]);
    } else {
      setSortField(`${sortField} reverse`);
    }
  };

  const reset = () => {
    setGoodVisible(goodsFromServer);
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
          className={classButton('alphabet', 'button is-info')}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classButton('length', 'button is-success')}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classButton('reverse', 'button is-warning')}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortField.length > 0
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {goodVisible.map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
