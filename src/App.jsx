import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
  'Garlic'
];

export const App = () => {
  const [selectedGoodsFromServer, setSelectedGoodsFromServer] =
    useState(goodsFromServer);
  const [btn, setBtn] = useState('');
  const SORT_ALPHABETICALLY = 'Sort alphabetically';
  const SORT_LENGTH = 'Sort by length';
  const SORT_REVERSE = 'Reverse';

  const sortGoodsFromServer = button => {
    switch (button) {
      case SORT_ALPHABETICALLY:
        setSelectedGoodsFromServer(
          [...selectedGoodsFromServer].sort((good1, good2) =>
            good1.localeCompare(good2)
          )
        );
        break;
      case SORT_LENGTH:
        setSelectedGoodsFromServer(
          [...selectedGoodsFromServer].sort(
            (good1, good2) => good1.length - good2.length
          )
        );
        break;
      case SORT_REVERSE:
        setSelectedGoodsFromServer([...selectedGoodsFromServer].reverse());
        break;
      default:
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            sortGoodsFromServer(SORT_ALPHABETICALLY);
            setBtn(SORT_ALPHABETICALLY);
          }}
          type="button"
          className={
            btn === SORT_ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            sortGoodsFromServer(SORT_LENGTH);
            setBtn(SORT_LENGTH);
          }}
          type="button"
          className={
            btn === SORT_LENGTH ? 'button is-info' : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            sortGoodsFromServer(SORT_REVERSE);
            setBtn(SORT_REVERSE);
          }}
          type="button"
          className={
            btn === SORT_REVERSE ? 'button is-info' : 'button is-info is-light'
          }
        >
          Reverse
        </button>

        {btn !== '' ? (
          <button
            onClick={() => {
              setBtn('');
              setSelectedGoodsFromServer(goodsFromServer);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {selectedGoodsFromServer.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
