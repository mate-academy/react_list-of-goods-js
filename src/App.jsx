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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_BY_REVERSE = 'reverse';

const some = name => {
  return {
    name,
    condition: false,
  };
};

const alphabet = some(SORT_BY_ALPHABET);
const length = some(SORT_BY_LENGTH);
const reverse = some(SORT_BY_REVERSE);

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setGoods([...goods].sort((a, b) => a.localeCompare(b)));
            alphabet.condition = !alphabet.condition;
            length.condition = false;

            if (!alphabet.condition && !reverse.condition) {
              setGoods([...goodsFromServer]);
            }

            if (alphabet.condition && reverse.condition) {
              setGoods(
                [...goodsFromServer]
                  .sort((a, b) => a.localeCompare(b))
                  .reverse(),
              );
            }
          }}
          type="button"
          className={`button is-info ${!alphabet.condition && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setGoods([...goods].sort((a, b) => a.length - b.length));
            length.condition = !length.condition;
            alphabet.condition = false;

            if (!length.condition && !reverse.condition) {
              setGoods([...goodsFromServer]);
            }

            if (length.condition && reverse.condition) {
              setGoods(
                [...goodsFromServer]
                  .sort((a, b) => a.length - b.length)
                  .reverse(),
              );
            }
          }}
          type="button"
          className={`button is-success ${!length.condition && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setGoods([...goods].reverse());
            reverse.condition = !reverse.condition;
            if (
              !reverse.condition &&
              !alphabet.condition &&
              !length.condition
            ) {
              setGoods([...goodsFromServer]);
            }
          }}
          type="button"
          className={`button is-warning ${!reverse.condition && 'is-light'}`}
        >
          Reverse
        </button>

        {(alphabet.condition || length.condition || reverse.condition) && (
          <button
            onClick={() => {
              setGoods([...goodsFromServer]);
              length.condition = false;
              alphabet.condition = false;
              reverse.condition = false;
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
