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
  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [sortLength, setSortLength] = useState(false);
  const [sortReverse, setSortReverse] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortAlphabetically ? 'button is-info' : 'button is-info is-light'
          }
          onClick={() => {
            setSortAlphabetically(true);
            setSortLength(false);

            const sortedAlphabet = [...goods].sort((good1, good2) => {
              if (sortReverse) {
                return good2.localeCompare(good1);
              }

              return good1.localeCompare(good2);
            });

            setGoods(sortedAlphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortLength ? 'button is-success' : 'button is-success is-light'
          }
          onClick={() => {
            setSortLength(true);
            setSortAlphabetically(false);

            const sortedLength = [...goods].sort((good1, good2) => {
              if (sortReverse) {
                return good2.length - good1.length;
              }

              return good1.length - good2.length;
            });

            setGoods(sortedLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            sortReverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => {
            const reversed = [...goods].toReversed();

            setGoods(reversed);
            setSortReverse(!sortReverse);
          }}
        >
          Reverse
        </button>

        {(sortAlphabetically || sortLength || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortAlphabetically(false);
              setSortLength(false);
              setSortReverse(false);

              setGoods(goodsFromServer);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
