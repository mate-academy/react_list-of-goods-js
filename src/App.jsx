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

const alphabetSort = 'Sort alphabetically';
const lengthSort = 'Sort by length';
const reverseSort = 'Reverse';
const resetSort = 'Reset';

function sorts(buttonName, [...good] = goodsFromServer) {
  if (buttonName === reverseSort) {
    return good.reverse();
  }

  return good.sort((item1, item2) => {
    switch (buttonName) {
      case alphabetSort:
        return item1.localeCompare(item2);

      case lengthSort:
        return item1.length - item2.length;

      default:
        return '';
    }
  });
}

export const App = () => {
  const [buttonName, buttonSort] = useState('');

  const [...visibleSort] = sorts(buttonName);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${buttonName === alphabetSort ? '' : 'is-light'}`}
          onClick={() => buttonSort(alphabetSort)}
        >
          {alphabetSort}
        </button>

        <button
          type="button"
          className={`button is-success ${buttonName === lengthSort ? '' : 'is-light'}`}
          onClick={() => buttonSort(lengthSort)}
        >
          {lengthSort}
        </button>

        <button
          type="button"
          className={`button is-warning ${buttonName === reverseSort ? '' : 'is-light'}`}
          onClick={() => buttonSort(reverseSort)}
        >
          {reverseSort}
        </button>

        {visibleSort.join('') !== goodsFromServer.join('') && (
          <button
            type="button"
            className={`button  is-danger  ${buttonName === resetSort ? 'is-light' : ''}`}
            onClick={() => buttonSort(resetSort)}
          >
            {resetSort}
          </button>
        )}
      </div>
      <ul>
        {visibleSort.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * <ul>
 *
      <li data-cy="Good">Dumplings</li>
      <li data-cy="Good">Carrot</li>
      <li data-cy="Good">Eggs</li>
      <li data-cy="Good">Ice cream</li>
      <li data-cy="Good">Apple</li>
      <li data-cy="Good">...</li>
    </ul>


    const SORT_BY_ALPHABET = 'alphabet';
    const SORT_BY_LENGTH = 'length';

    export const App = () => {
      const [sortfiled, setSortfiled] = useState('');
      const [isReversed, setIsReversed] = useState(false);

      const visibileGoods = [...goodsFromServer].sort((a, b) => {
        if (sortfiled === SORT_BY_ALPHABET) {
          return a.localeCompare(b);
        }

        if (sortfiled === SORT_BY_LENGTH) {
          return a.length - b.length;
        }

        return 0;
      });

      if (isReversed) {
        visibileGoods.reverse();
      }

      return (
        <div className="section content">
          <div className="buttons">
            <button
              type="button"
              className={`button is-info ${sortfiled === SORT_BY_ALPHABET ? '' : 'is-light'}`}
              onClick={() => setSortfiled(SORT_BY_ALPHABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className={`button is-success ${sortfiled === SORT_BY_LENGTH ? '' : 'is-light'}`}
              onClick={() => setSortfiled(SORT_BY_LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className={`button is-warning ${isReversed ? '' : 'is-light'}`}
              onClick={() => setIsReversed(prev => !prev)}
            >
              Reverse
            </button>

            {(sortfiled || isReversed) && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  setSortfiled('');
                  setIsReversed(false);
                }}
              >
                Reset
              </button>
            )}
          </div>

          <ul>
            {visibileGoods.map(good => (
              <li key={good} data-cy="Good">
                {good}
              </li>
            ))}
          </ul>
        </div>
      );
    };
 */
