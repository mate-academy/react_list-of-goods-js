import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

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

function generateRandomNumericId(length = 10) {
  const digits = '0123456789';
  let randomId = '';

  // eslint-disable-next-line
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);

    randomId += digits[randomIndex];
  }

  return randomId;
}

export const App = () => {
  const [goodsList, setGoodsList] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortAlphabetically = () => {
    setSortType('by name');

    return setGoodsList(goodsList.toSorted());
  };

  const sortByLength = () => {
    setSortType('by length');

    return setGoodsList(
      goodsList.toSorted((good1, good2) => good1.length - good2.length),
    );
  };

  const sortByReverse = () => {
    setReversed(!reversed);

    return setGoodsList(goodsList.toReversed());
  };

  const resetSort = () => {
    setSortType('');
    setReversed(false);
    setGoodsList([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== 'by name',
          })}
          onClick={() => sortAlphabetically()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== 'by length',
          })}
          onClick={() => sortByLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => sortByReverse()}
        >
          Reverse
        </button>

        {sortType !== '' || reversed !== false ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetSort()}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goodsList.map(good => {
          return (
            <li data-cy="Good" key={generateRandomNumericId()}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
