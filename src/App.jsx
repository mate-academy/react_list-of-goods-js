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
  const [btnReset, setBtnReset] = useState(false);
  const [reverse, setReverse] = useState(false);
  const SORT_ALPHABETICALLY = 'Sort alphabetically';
  const SORT_LENGTH = 'Sort by length';

  const sortGoodsFromServer = (button, reversed) => {
    switch (button) {
      case SORT_ALPHABETICALLY:
        const goods = [...selectedGoodsFromServer].sort((good1, good2) => good2.localeCompare(good1));

        if (reversed) {
          goods.reversed();
        }

        setSelectedGoodsFromServer(goods);
        break;
      case SORT_LENGTH:
        const goods2 = [...selectedGoodsFromServer].sort((good1, good2) => good2.length - good1.length);

        if (reversed) {
          goods2.reversed();
        }
        
        setSelectedGoodsFromServer(goods2);
        break;
      default:
        setSelectedGoodsFromServer([...selectedGoodsFromServer].reverse());
    }
  };

  const equalsArrays = (a, b) => {
    return a.length === b.length && a.every((valor, index) => valor === b[index]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            sortGoodsFromServer(SORT_ALPHABETICALLY, reverse);
            setBtn(SORT_ALPHABETICALLY);
            setBtnReset(true);
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
            setBtnReset(true);
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
