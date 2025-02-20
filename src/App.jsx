import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortMethod, setSortMethod] = useState('');
  const isModified = JSON.stringify(goods) !== JSON.stringify(goodsFromServer);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort((good1, good2) => {
      return isReversed
        ? good2.name.localeCompare(good1.name)
        : good1.name.localeCompare(good2.name);
    });

    setGoods(sortedGoods);
    setSortMethod('alphabetically');
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((good1, good2) => {
      return isReversed
        ? good2.name.length - good1.name.length
        : good1.name.length - good2.name.length;
    });

    setGoods(sortedGoods);
    setSortMethod('length');
  };

  const reversed = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setSortMethod('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMethod === 'alphabetically' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMethod === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reversed}
        >
          Reverse
        </button>

        {isModified && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good.id}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
