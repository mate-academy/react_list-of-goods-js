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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';
const REVERSE = 'Reverse';
const RESET = 'Reset';

const convertGoods = (goods, nameOperation, modifire) => {
  const preparedGoods = [...goods];

  if (nameOperation) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (nameOperation) {
        case SORT_ALPHABETICALLY:
          return firstGood.localeCompare(secondGood);

        case SORT_BY_LENGTH:
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });
  }

  if (modifire) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [nameOperation, setNameOperation] = useState('');
  const [isModifire, setIsModifire] = useState(false);
  const visibleGoods = convertGoods(goodsFromServer, nameOperation, isModifire);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            nameOperation === SORT_ALPHABETICALLY
              ? `button
        is-info`
              : `button is-info is-light`
          }
          onClick={() => {
            setNameOperation(SORT_ALPHABETICALLY);
          }}
        >
          {SORT_ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={
            nameOperation === SORT_BY_LENGTH
              ? `button
        is-info`
              : `button is-info is-light`
          }
          onClick={() => {
            setNameOperation(SORT_BY_LENGTH);
          }}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={
            isModifire
              ? `button
        is-info`
              : `button is-info is-light`
          }
          onClick={() => {
            setIsModifire(!isModifire);
          }}
        >
          {REVERSE}
        </button>

        {nameOperation || isModifire ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setNameOperation('');
              setIsModifire(false);
            }}
          >
            {RESET}
          </button>
        ) : null}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
