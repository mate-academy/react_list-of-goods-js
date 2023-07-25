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
    setGoodVisible([...goodVisible].sort((a, b) => a.localeCompare(b)));
    setSortField('alphabet');
  };

  const sortLength = () => {
    setGoodVisible([...goodVisible].sort((a, b) => a.length - b.length));
    setSortField('length');
  };

  const reverse = () => {
    if (sortField.includes('reverse')) {
      setGoodVisible([...goodVisible].reverse());
      setSortField(sortField.split(' ')[0]);
    } else {
      setGoodVisible([...goodVisible].reverse());
      setSortField(`${sortField} reverse`);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField.includes('alphabet')
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField.includes('length')
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            sortField.includes('reverse')
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={reverse}
        >
          Reverse
        </button>

        {sortField.length > 0
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setGoodVisible(goodsFromServer);
                setSortField('');
              }}
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
