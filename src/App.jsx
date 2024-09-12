import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [originalGoods] = useState([...goodsFromServer]);
  const [reversed, setReversed] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const sortGoods = type => {
    let sortedGoods = [...goods];

    switch (type) {
      case 'alphabetically':
        sortedGoods.sort((a, b) => a.localeCompare(b));
        setActiveButton('alphabetically');
        setReversed(false);
        break;

      case 'length':
        sortedGoods.sort((a, b) => a.length - b.length);
        setActiveButton('length');
        setReversed(false);
        break;

      case 'reverse':
        sortedGoods.reverse();
        setReversed(!reversed);
        setActiveButton('reverse');
        break;

      case 'reset':
        sortedGoods = originalGoods;
        setReversed(false);
        setActiveButton('');
        break;

      default:
        break;
    }

    setGoods(sortedGoods);
  };

  const showResetButton = goods.join() !== originalGoods.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => {
            sortGoods('alphabetically');
            setActiveButton('alphabetically');
            setReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            sortGoods('length');
            setActiveButton('length');
            setReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
          onClick={() => {
            sortGoods('reverse');
            setReversed(!reversed);
            setActiveButton('reverse');
          }}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              sortGoods('reset');
              setActiveButton('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
