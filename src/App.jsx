import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const ALPHABETICALLY = 'alphabetically';
const LENGTH = 'length';
const REVERSE = 'reverse';
const RESET = 'reset';

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
  const [goods, setGoods] = useState(goodsFromServer);
  const [select, setSelect] = useState('');

  const sortMethod = (howToSort) => {
    switch (howToSort) {
      case ALPHABETICALLY:
        setGoods([...goods].sort((a, b) => a.localeCompare(b)));
        setSelect(ALPHABETICALLY);
        break;
      case LENGTH:
        setGoods([...goods].sort((a, b) => a.length - b.length));
        setSelect(LENGTH);
        break;
      case REVERSE:
        setGoods([...goods].reverse());
        setSelect(REVERSE);
        break;
      default:
        setGoods(goodsFromServer);
        setSelect(RESET);
    }
  };

  const Reset = () => {
    if (select !== RESET) {
      return (
        <button
          type="button"
          className={`button is-danger ${select !== RESET ? 'is-light' : undefined}`}
          onClick={() => sortMethod()}
        >
          Reset
        </button>
      );
    }

    return null;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${select !== ALPHABETICALLY ? 'is-light' : undefined}`}
          onClick={() => sortMethod(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${select !== LENGTH ? 'is-light' : undefined}`}
          onClick={() => sortMethod(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${select !== REVERSE ? 'is-light' : undefined}`}
          onClick={() => sortMethod(REVERSE)}
        >
          Reverse
        </button>

        <Reset />
      </div>

      <ul>
        {
          goods.map(item => <li data-cy="Good" key={item}>{item}</li>)
        }
      </ul>
    </div>
  );
};
