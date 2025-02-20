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

const SORT_ALPHABETICELY = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_REVERSED = 'reverse';
const RESET = 'reset';

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [buttonPressed, setButtonPressed] = useState(RESET);
  const [buttonReversed, setButtonReversed] = useState('');

  const sortGoods = type => {
    const copy = [...sortedGoods];

    switch (type) {
      case SORT_ALPHABETICELY:
        copy.sort((good1, good2) => good1.localeCompare(good2));
        if (buttonReversed === SORT_REVERSED) {
          copy.reverse();
        }

        break;
      case SORT_BY_LENGTH:
        copy.sort((a, b) => {
          if (a.length !== b.length) {
            return a.length - b.length;
          }

          return a.localeCompare(b);
        });
        if (buttonReversed === SORT_REVERSED) {
          copy.reverse();
        }

        break;
      default:
        return copy;
    }

    setButtonPressed(type);
    setSortedGoods(copy);

    return copy;
  };

  const sortToReverse = type => {
    const copy = [...sortedGoods];

    if (type === SORT_REVERSED) {
      copy.reverse();
    }

    if (buttonReversed === '') {
      setButtonReversed(type);
    } else if (buttonReversed === SORT_REVERSED) {
      setButtonReversed('');
    }

    setSortedGoods(copy);

    return copy;
  };

  const resetGoods = () => {
    setSortedGoods([...goodsFromServer]);
    setButtonPressed(RESET);
    setButtonReversed('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            buttonPressed === SORT_ALPHABETICELY
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            sortGoods(SORT_ALPHABETICELY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            buttonPressed === SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            sortGoods(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            buttonReversed === SORT_REVERSED
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => {
            sortToReverse(SORT_REVERSED);
          }}
        >
          Reverse
        </button>

        {buttonPressed === RESET && buttonReversed === '' ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              resetGoods(RESET);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={sortedGoods} />
    </div>
  );
};

export const GoodList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  );
};
