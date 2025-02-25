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

const goodsWithId = goodsFromServer.map((item, id) => ({
  id: id + 1,
  name: item,
}));

export const App = () => {
  const [goods, setGoods] = useState(goodsWithId);
  const [isReversed, setIsReversed] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isSortedByAlphabet, setIsSortedByAlphabet] = useState(false);

  const sortedByAlphabet = () => {
    const sorted = [...goods].sort(
      (a, b) => {
        return !isReversed
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      },
      // eslint-disable-next-line function-paren-newline
    );

    setGoods(sorted);
    setIsSortedByAlphabet(true);
    setIsSortedByLength(false);
  };

  const sortedByLength = () => {
    const sorted = [...goods].sort(
      (a, b) => {
        const letterA = a.name;
        const letterB = b.name;

        return !isReversed
          ? letterA.length - letterB.length
          : letterB.length - letterA.length;
      },
      // eslint-disable-next-line function-paren-newline
    );

    setGoods(sorted);
    setIsSortedByLength(true);
    setIsSortedByAlphabet(false);
  };

  const reverse = () => {
    setGoods(items => [...items].reverse());
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(goodsWithId);
    setIsSortedByLength(false);
    setIsReversed(false);
    setIsSortedByAlphabet(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!isSortedByAlphabet ? 'is-light' : ''}`}
          onClick={sortedByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!isSortedByLength ? 'is-light' : ''}`}
          onClick={sortedByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning  ${!isReversed ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isSortedByAlphabet || isSortedByLength || isReversed) && (
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
        {goods.map(({ id, name }) => (
          <li key={id} data-cy="Good">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
