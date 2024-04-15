import { useState } from 'react';
import 'bulma/css/bulma.css';
import { goodsFromServer } from './data';

import './App.scss';

const BASIC_SORT = 'all';
const ALPHA_SORT = 'alpha';
const LENGTH_SORT = 'length';

const sortGoods = (goods, sortMethod, reverse) => {
  let result = [...goods];

  switch (sortMethod) {
    case BASIC_SORT: {
      if (reverse) {
        result.reverse();
      } else {
        result = goodsFromServer;
      }

      break;
    }

    case ALPHA_SORT: {
      if (reverse) {
        result = result.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        result = result.sort((a, b) => a.name.localeCompare(b.name));
      }

      break;
    }

    case LENGTH_SORT: {
      if (reverse) {
        result.sort(
          (a, b) =>
            b.name.length - a.name.length || b.name.localeCompare(a.name),
        );
      } else {
        result.sort(
          (a, b) =>
            a.name.length - b.name.length || a.name.localeCompare(b.name),
        );
      }

      break;
    }

    default: {
      break;
    }
  }

  return result;
};

export const App = () => {
  const [filter, setFilter] = useState(BASIC_SORT);
  const [reverse, setReverse] = useState(false);

  const goods = sortGoods(goodsFromServer, filter, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${filter !== ALPHA_SORT && 'is-light'}`}
          onClick={() => {
            setFilter(ALPHA_SORT);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${filter !== LENGTH_SORT && 'is-light'}`}
          onClick={() => {
            setFilter(LENGTH_SORT);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(filter !== BASIC_SORT || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setFilter(BASIC_SORT);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good.id}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
