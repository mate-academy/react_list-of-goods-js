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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortedAlph, setSortedAlph] = useState(false);
  const [sortedByLength, setSortedByLength] = useState(false);
  const [reverse, setReverse] = useState(false);

  const applySortingAndReverse = (array, sortType) => {
    const updatedGoods = [...array];

    if (sortType === 'alphabetical') {
      updatedGoods.sort((good1, good2) => good1.localeCompare(good2));
    } else if (sortType === 'length') {
      updatedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (reverse) {
      updatedGoods.reverse();
    }

    return updatedGoods;
  };

  const changeGoods = condition => {
    switch (condition) {
      case 'sortAlph':
        if (sortedAlph) {
          setSortedAlph(false);
          setGoods(applySortingAndReverse(goodsFromServer, null));
        } else {
          setSortedAlph(true);
          setSortedByLength(false);
          setGoods(applySortingAndReverse(goodsFromServer, 'alphabetical'));
        }

        break;

      case 'sortByLength':
        if (sortedByLength) {
          setSortedByLength(false);
          setGoods(applySortingAndReverse(goodsFromServer, null));
        } else {
          setSortedByLength(true);
          setSortedAlph(false);
          setGoods(applySortingAndReverse(goodsFromServer, 'length'));
        }

        break;

      case 'reverse':
        setReverse(!reverse);
        setGoods([...goods].reverse());
        break;

      case 'reset':
        setSortedAlph(false);
        setSortedByLength(false);
        setReverse(false);
        setGoods([...goodsFromServer]);
        break;

      default:
        break;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedAlph ? '' : 'is-light'}`}
          onClick={() => changeGoods('sortAlph')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedByLength ? '' : 'is-light'}`}
          onClick={() => changeGoods('sortByLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => changeGoods('reverse')}
        >
          Reverse
        </button>

        {(sortedAlph || sortedByLength || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => changeGoods('reset')}
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
