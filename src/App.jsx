/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const BUTTON_SORT_ALPHABET = 'alphabet';
const BUTTON_SORT_LENGTH = 'length';

function getPreparedGoods(goods, { buttonSort, buttonReverse }) {
  let preparedGoods = [...goods];

  if (buttonSort) {
    preparedGoods.sort((good1, good2) => {
      switch (buttonSort) {
        case BUTTON_SORT_ALPHABET:
          return good1.localeCompare(good2);

        case BUTTON_SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (buttonReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [buttonSort, setButtonSort] = useState('');
  const [buttonReverse, setButtonReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    buttonSort,
    buttonReverse,
  });

  const handleSortAlphabet = () => {
    setButtonSort(BUTTON_SORT_ALPHABET);
  };

  const handleSortLength = () => {
    setButtonSort(BUTTON_SORT_LENGTH);
  };

  const handleReverse = () => {
    // Старий варіант
    // setButtonReverse(!buttonReverse);
    // Більш новіший варіант і типу читаєміший
    setButtonReverse(prev => !prev);
  };

  const handleReset = () => {
    setButtonSort('');
    setButtonReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className={`button is-info ${BUTTON_SORT_ALPHABET !== buttonSort ? 'is-light' : ''}`}
          className={cn('button is-info', {'is-light': BUTTON_SORT_ALPHABET !== buttonSort})}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          // className={`button is-success ${BUTTON_SORT_LENGTH !== buttonSort ? 'is-light' : ''}`}
          className={cn('button is-success', {'is-light': BUTTON_SORT_LENGTH !== buttonSort})}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          // className={`button is-warning ${!buttonReverse ? 'is-light' : ''}`}
          className={cn('button is-warning', {'is-light': !buttonReverse})}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(buttonSort || buttonReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};

// ★ Краще 1-й варіант, по міркам семантики:
// className={`button is-info ${BUTTON_SORT_ALPHABET !== buttonSort ? 'is-light' : ''}`}
// className={`button is-info ${BUTTON_SORT_ALPHABET !== buttonSort && 'is-light'}`}

// ★ Не забывать про уникальные ключи в map()
