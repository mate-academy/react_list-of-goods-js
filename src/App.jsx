import React, { useState, useRef } from 'react';
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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isAlphabetical, setIsAlphabetical] = useState(false);
  const [isByLength, setIsByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  // Створюємо ref для кнопки Reverse
  const reverseButtonRef = useRef(null);

  const sortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort();

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsAlphabetical(true);
    setIsByLength(false);
    setIsReversed(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsByLength(true);
    setIsAlphabetical(false);
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(!isReversed);

    // Видаляємо або додаємо клас `is-light` вручну
    if (reverseButtonRef.current) {
      if (isReversed) {
        reverseButtonRef.current.classList.add('is-light');
      } else {
        reverseButtonRef.current.classList.remove('is-light');
      }
    }
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsAlphabetical(false);
    setIsByLength(false);
    setIsReversed(false);

    // Повертаємо клас `is-light` до кнопки Reset
    if (reverseButtonRef.current) {
      reverseButtonRef.current.classList.add('is-light');
    }
  };

  const isDefaultOrder = goods.join('') === goodsFromServer.join('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabetical ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isByLength ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          ref={reverseButtonRef} // Прив'язуємо ref до кнопки Reverse
          className="button is-warning is-light" // is-light присутній спочатку
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
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
