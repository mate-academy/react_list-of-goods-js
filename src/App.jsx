import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { link } from 'fs';

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

let reserVisible = true;
let byAlphabetLight = true;
let byLengthLight = true;
let reverseLight = true;
let reversedState = false;

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  const byAlphabet = () => {
    const sortIt = [...visibleGoods].sort((el1, el2) => el1.localeCompare(el2));

    setVisibleGoods(
      reversedState === false ? (
        sortIt
      ) : (
        sortIt.reverse()
      ),
    );
    reserVisible = false;
    byAlphabetLight = false;
    byLengthLight = true;
  };

  const byLength = () => {
    const sortIt
      = [...visibleGoods].sort((el1, el2) => el1.length - el2.length);

    setVisibleGoods(
      reversedState === false ? (
        sortIt
      ) : (
        sortIt,
        sortIt.reverse()
      ),
    );
    reserVisible = false;
    byLengthLight = false;
    byAlphabetLight = true;
  };

  const reverse = () => {
    setVisibleGoods(
      [...visibleGoods].reverse(),
    );
    reserVisible = false;
    reverseLight = reverseLight === false && true;
    reversedState = reversedState === false && true;
  };

  const reset = () => {
    setVisibleGoods(
      goodsFromServer,
    );
    reserVisible = true;
    byAlphabetLight = true;
    byLengthLight = true;
    reverseLight = true;
    reversedState = false;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={byAlphabet}
          type="button"
          className={`button is-info ${byAlphabetLight && 'is-light'}`}
          install

        >
          Sort alphabetically
        </button>

        <button
          onClick={byLength}
          type="button"
          className={`button is-success ${byLengthLight && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button is-warning ${reverseLight && 'is-light'}`}
        >
          Reverse
        </button>

        <button
          onClick={reset}
          type="button"
          className={`button is-danger is-light ${reserVisible && 'hiden'}`}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(item => <li>{item}</li>)}
      </ul>
    </div>
  );
};
