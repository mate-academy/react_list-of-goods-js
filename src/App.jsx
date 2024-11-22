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
  const [sortState, setSortState] = useState({
    reversed: false,
    lengthSorted: false,
    alphabetSorted: false,
  });
  const [isReset, setIsReset] = useState(false);

  const sortGoodsByAlphabet = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      if (sortState.reversed) {
        return b.localeCompare(a);
      }

      return a.localeCompare(b);
    });

    setGoods(sortedGoods);
    setSortState({ ...sortState, alphabetSorted: true, lengthSorted: false });
    setIsReset(true);
  };

  const sortGoodsByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      if (sortState.reversed) {
        return b.length - a.length;
      }

      return a.length - b.length;
    });

    setGoods(sortedGoods);
    setSortState({ ...sortState, lengthSorted: true, alphabetSorted: false });
    setIsReset(true);
  };

  const reverseGoods = () => {
    setSortState(prevState => {
      const reversed = !prevState.reversed;

      setGoods(prevGoods => {
        const newGoods = [...prevGoods].reverse();

        setIsReset(
          !newGoods.every(
            (element, index) => element === goodsFromServer[index],
          ),
        );

        return newGoods;
      });

      return { ...prevState, reversed };
    });
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setSortState({
      reversed: false,
      lengthSorted: false,
      alphabetSorted: false,
    });
    setIsReset(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortGoodsByAlphabet}
          type="button"
          className={`button is-info ${!sortState.alphabetSorted && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortGoodsByLength}
          type="button"
          className={`button is-success ${!sortState.lengthSorted && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={`button is-warning ${!sortState.reversed && 'is-light'}`}
        >
          Reverse
        </button>

        {isReset && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
