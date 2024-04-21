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
  const [goodsList, setGoodsList] = useState(goodsFromServer);
  const [sortedBy, setSortedBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    if (isReversed) {
      setGoodsList([...goodsList].sort().reverse());
    } else {
      setGoodsList([...goodsList].sort());
    }
    setSortedBy('alphabetically');
  };

  const sortByLength = () => {
    if (isReversed) {
      setGoodsList([...goodsList].sort((a, b) => b.length - a.length));
    } else {
      setGoodsList([...goodsList].sort((a, b) => a.length - b.length));
    }
    setSortedBy('length');
  };

  const reversed = () => {
    setGoodsList([...goodsList].reverse());
    setIsReversed(!isReversed);
  };

  const reseted = () => {
    setGoodsList(goodsFromServer);
    setSortedBy('');
    setIsReversed(false);
  };
  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={`button is-info  ${sortedBy === 'alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${sortedBy === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reversed}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortedBy !== '' || isReversed ? (
          <button
            type="button"
            onClick={reseted}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goodsList.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
