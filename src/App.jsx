import 'bulma/css/bulma.css';
import { useState } from 'react';
import classNames from 'classnames';
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
const STATE_ALPHABETICALLY = 'alpha';
const STATE_BY_LENGTH = 'Length';
const STATE_REVERSE = 'reverse';

function sorting(list, state, stateArray) {
  const listForSorting = [...list];

  if (state === STATE_ALPHABETICALLY) {
    if (stateArray.includes(STATE_REVERSE)) {
      return listForSorting
        .sort((item1, item2) => item1.localeCompare(item2))
        .reverse();
    }

    return listForSorting.sort((item1, item2) => item1.localeCompare(item2));
  }

  if (state === STATE_BY_LENGTH) {
    if (stateArray.includes(STATE_REVERSE)) {
      return listForSorting
        .sort((item1, item2) => item1.length - item2.length)
        .reverse();
    }

    return listForSorting.sort((item1, item2) => item1.length - item2.length);
  }

  if (state === STATE_REVERSE) {
    return listForSorting.reverse();
  }

  return list;
}

function addStates(state, stateArray, prev) {
  if (!stateArray.includes(state)) {
    return [...prev, state];
  }

  if (stateArray.includes(state)) {
    return stateArray.filter(item => item !== state);
  }

  return [...prev];
}

export const App = () => {
  const [state, setState] = useState(null);
  const [listOfGoods, setListOfGoods] = useState(goodsFromServer);
  const [stateArray, setStateArray] = useState([]);
  const listForPrint = sorting(listOfGoods, state, stateArray);
  const isButtonAlphabetLight =
    !stateArray.includes(STATE_ALPHABETICALLY) &&
    (!stateArray.includes(STATE_ALPHABETICALLY) ||
      !stateArray.includes(STATE_REVERSE));
  const isButtonByLengthLight =
    !stateArray.includes(STATE_BY_LENGTH) &&
    (!stateArray.includes(STATE_BY_LENGTH) ||
      !stateArray.includes(STATE_REVERSE));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info ', {
            'is-light': isButtonAlphabetLight,
          })}
          onClick={() => {
            setState(STATE_ALPHABETICALLY);
            setStateArray(prev => {
              return addStates(STATE_ALPHABETICALLY, stateArray, prev);
            });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success ', {
            'is-light': isButtonByLengthLight,
          })}
          onClick={() => {
            setState(STATE_BY_LENGTH);
            setStateArray(prev => {
              return addStates(STATE_BY_LENGTH, stateArray, prev);
            });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning ', {
            'is-light': !stateArray.includes(STATE_REVERSE),
          })}
          onClick={() => {
            setState(STATE_REVERSE);
            setListOfGoods(listForPrint);
            setStateArray(prev => {
              return addStates(STATE_REVERSE, stateArray, prev);
            });
          }}
        >
          Reverse
        </button>

        {stateArray.length !== 0 && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setState(null);
              setListOfGoods(goodsFromServer);
              setStateArray([]);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listForPrint.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
