import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
const CONST_STATE_BY_LENGTH = 'byLength';
const CONST_STATE_BY_ALPHABET = 'byAlphabet';
const CONST_STATE_BY_REVERSE = 'byReverse';

export const App = () => {
  const [goodsFromServerApp, setGoodsFromServer] = useState(goodsFromServer);
  const [sortStateByLength, setSortStateByLength] = useState(null);
  const [sortStateByAlphabet, setSortStateByAlphabet] = useState(null);
  const [sortStateReverse, setSortStateReverse] = useState(null);

  function sortByLength() {
    setGoodsFromServer(
      [...goodsFromServer].sort((good1, good2) => good1.length - good2.length),
    );
    setSortStateByLength(CONST_STATE_BY_LENGTH);
    setSortStateByAlphabet(null);
  }

  function sortByAlphabet() {
    setGoodsFromServer(
      [...goodsFromServer].sort((good1, good2) => good1.localeCompare(good2)),
    );
    setSortStateByAlphabet(CONST_STATE_BY_ALPHABET);
    setSortStateByLength(null);
  }

  function reverseGood() {
    if (sortStateReverse === CONST_STATE_BY_REVERSE) {
      setGoodsFromServer([...goodsFromServerApp].reverse());
      setSortStateReverse(null);
    } else {
      setGoodsFromServer([...goodsFromServerApp].reverse());
      setSortStateReverse(CONST_STATE_BY_REVERSE);
    }
  }

  function reset() {
    setGoodsFromServer([...goodsFromServer]);
    setSortStateByLength(null);
    setSortStateByAlphabet(null);
    setSortStateReverse(null);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortStateByAlphabet === null,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortStateByLength === null,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortStateReverse === null,
          })}
          onClick={reverseGood}
        >
          Reverse
        </button>

        {(sortStateByLength || sortStateByAlphabet || sortStateReverse) && (
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
        {goodsFromServerApp.map((good, index) => (
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
