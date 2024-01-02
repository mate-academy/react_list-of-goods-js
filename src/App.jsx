import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const adoptedGoods = goodsFromServer.map((good, id) => ({ name: good, id }));
const ALPHABETIC = 'ALPHABETIC';
const LENGTH = 'LENGTH';

export const App = () => {
  const [goods, setState] = useState(adoptedGoods);
  const [sortedByState, setsortedByState] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortBy = (value) => {
    const modifiedGoods = [...goods];

    if (value === ALPHABETIC) {
      modifiedGoods.sort((good1, good2) => (
        good1.name.localeCompare(good2.name)));
      setsortedByState(ALPHABETIC);
      setState(modifiedGoods);

      return;
    }

    if (value === LENGTH) {
      modifiedGoods.sort((good1, good2) => (
        good1.name.length - good2.name.length));
      setsortedByState(LENGTH);
      setState(modifiedGoods);
    }
  };

  const reverseGoods = () => {
    if (isReversed) {
      setIsReversed(false);
    } else {
      setIsReversed(true);
    }

    setState([...goods].reverse());
  };

  const resetGoods = () => {
    setsortedByState(null);
    setIsReversed(false);
    setState(adoptedGoods);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(['button', 'is-info'], {
            'is-light': sortedByState !== ALPHABETIC,
          })}
          onClick={() => sortBy(ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(['button', 'is-success'], {
            'is-light': sortedByState !== LENGTH,
          })}
          onClick={() => sortBy(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(['button', 'is-warning'], {
            'is-light': isReversed === false,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          style={{ display: isReversed || sortedByState
            ? 'inline-block' : 'none' }}
          onClick={resetGoods}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li key={good.id} data-cy="Good">{good.name}</li>
        ))}
      </ul>
    </div>
  );
};
