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
  const [reverse, setReverse] = useState(false);
  const SORT_ALPHABETICALLY = 'Sort alphabetically';
  const SORT_LENGTH = 'Sort by length';

  const sortGoodsFromServer = (button, reversed) => {
    switch (button) {
      case SORT_ALPHABETICALLY: {
        if (reversed) {
          setSelectedGoodsFromServer([...selectedGoodsFromServer].sort((good1, good2) =>
            good2.localeCompare(good1)));
        } else {
          setSelectedGoodsFromServer([...selectedGoodsFromServer].sort((good1, good2) =>
            good1.localeCompare(good2)));
        }
      }
      break;
      case SORT_LENGTH: {
        if (reversed) {
          setSelectedGoodsFromServer([...selectedGoodsFromServer].sort( (good1, good2) => 
            good2.length - good1.length));
        } else {
          setSelectedGoodsFromServer([...selectedGoodsFromServer].sort( (good1, good2) => 
            good1.length - good2.length));
        }
      }
      break;
      default:
        setSelectedGoodsFromServer([...selectedGoodsFromServer].reverse());
    }
  };

  const equalsArrays = (a, b) => {
    return (
      a.length === b.length && a.every((valor, index) => valor === b[index])
    );
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            sortGoodsFromServer(SORT_ALPHABETICALLY, reverse);
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
            sortGoodsFromServer(SORT_LENGTH, reverse);
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
            sortGoodsFromServer();
            reverse ? setReverse(false) : setReverse(true);
          }}
          type="button"
          className={
            reverse === true ? 'button is-info' : 'button is-info is-light'
          }
        >
          Reverse
        </button>

        {equalsArrays(goodsFromServer, selectedGoodsFromServer) === false ? (
          <button
            onClick={() => {
              setBtn('');
              setReverse(false);
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
