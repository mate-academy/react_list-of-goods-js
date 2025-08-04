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

export const App = () => {
  const buttons = {
    sort_alphabetically: false,
    sort_by_length: false,
    reverse: false,
    reset: false,
  };
  const [goodsList, setGoodsList] = useState(goodsFromServer);
  const [buttonsState, setButtonsState] = useState(buttons);

  const getReversed = arr => [...arr].reverse();

  const sortGoods = par => {
    switch (par) {
      case 'sort_alphabetically': {
        let sorted = [...goodsList].sort((a, b) => a.localeCompare(b));

        if (buttonsState.reverse) {
          sorted = getReversed(sorted);
        }

        setGoodsList(sorted);
        setButtonsState({
          ...buttonsState,
          sort_alphabetically: true,
          sort_by_length: false,
          reset: true,
        });
        break;
      }

      case 'sort_by_length': {
        let sorted = [...goodsList].sort((a, b) => a.length - b.length);

        if (buttonsState.reverse) {
          sorted = getReversed(sorted);
        }

        setGoodsList(sorted);
        setButtonsState({
          ...buttonsState,
          sort_by_length: true,
          sort_alphabetically: false,
          reset: true,
        });
        break;
      }

      case 'reverse': {
        const reversed = getReversed(goodsList);

        setGoodsList(reversed);
        setButtonsState({
          ...buttonsState,
          reverse: !buttonsState.reverse,
        });
        break;
      }

      case 'reset': {
        setGoodsList([...goodsFromServer]);
        setButtonsState({ ...buttons });
        break;
      }

      default:
        return 0;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${buttonsState.sort_alphabetically ? '' : 'is-light'}`}
          onClick={() => sortGoods('sort_alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${buttonsState.sort_by_length ? '' : 'is-light'}`}
          onClick={() => sortGoods('sort_by_length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${buttonsState.reverse ? '' : 'is-light'}`}
          onClick={() => sortGoods('reverse')}
        >
          Reverse
        </button>

        {Object.values(buttonsState).some(el => el === true) ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => sortGoods('reset')}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
