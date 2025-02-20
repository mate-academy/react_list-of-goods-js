/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable function-paren-newline */
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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [activeButton, setActiveButton] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  function SortAlphabetically() {
    setGoods(prevGoods => {
      const sortedGoods  = [...prevGoods]
      .slice()
      .sort((a, b) => a.localeCompare(b))

      return isReversed ? sortedGoods.reverse() : sortedGoods;
    });

    setActiveButton('alphabet');
  }

  function SortByLength() {
    const sortedGoods =  [...goods].sort((a, b) => {
      return isReversed
        ? b.length - a.length
        : a.length - b.length;
      }
    );

    setGoods(sortedGoods);
    setActiveButton('length');
  }

  function ReverseList() {
    setGoods(prevGoods => {
      const reversed = [...prevGoods].reverse();

      return reversed.every((good, index) => good === goodsFromServer[index])
        ? [...goodsFromServer]
        : reversed;
    });

    setIsReversed(prev => !prev);
    // setActiveButton('reverse');
  }

  function ResetList() {
    setGoods([...goodsFromServer]);

    setIsReversed(false);
    setActiveButton('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabet' ? '' : 'is-light'}`}
          onClick={SortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${activeButton === 'length' ? '' : 'is-light'}`}
          onClick={SortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={ReverseList}
        >
          Reverse
        </button>

        {goods.some((good, index) => good !== goodsFromServer[index]) && (
            <button
              type="button"
              className={`button is-info ${activeButton === 'reset' ? '' : 'is-light'}`}
              onClick={ResetList}
            >
              Reset
            </button>
        )
      }
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
