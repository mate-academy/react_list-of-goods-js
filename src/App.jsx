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
  const [newsGoods, setNewsGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabetical' ? '' : 'is-light'}`}
          onClick={() => {
            const sortedGoods = [...goodsFromServer].sort();

            if (isReversed) {
              sortedGoods.reverse();
            }

            setNewsGoods(sortedGoods);
            setActiveSort('alphabetical');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === 'length' ? '' : 'is-light'}`}

          onClick={() => {
            const sortedGoods = [...goodsFromServer].sort(
              (a, b) => a.length - b.length,
            );

            if (isReversed) {
              sortedGoods.reverse();
            }

            setNewsGoods(sortedGoods);
            setActiveSort('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setNewsGoods([...newsGoods].reverse());
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {activeSort !== '' || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setNewsGoods(goodsFromServer);
              setActiveSort('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {newsGoods.map(newsProducts => (
          <li data-cy="Good" key={newsProducts}>
            {newsProducts}
          </li>
        ))}
      </ul>
    </div>
  );
};
