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

const FILTER_ALPHABETICALLY = 'abc';
const FILTER_LENGTH = 'length';

export const App = () => {
  const [chosenCategory, setChosenCategory] = useState('');
  const [reverseBtn, setReverseBtn] = useState(false);
  let sortedGoods = [...goodsFromServer];

  // const handleClickFilter = () => {
  //   setSortedGoods([...sortedGoods]
  //     .sort((good1, good2) => good1.localeCompare(good2)));
  //   setChosenCategory(FILTER_ID);
  // };

  if (chosenCategory) {
    switch (chosenCategory) {
      case FILTER_ALPHABETICALLY:
        sortedGoods = sortedGoods.sort((good1, good2) => {
          if (reverseBtn) {
            return good2.localeCompare(good1);
          }

          return good1.localeCompare(good2);
        });
        break;

      case FILTER_LENGTH:
        sortedGoods = sortedGoods.sort((good1, good2) => {
          if (reverseBtn) {
            return good2.length - good1.length;
          }

          return good1.length - good2.length;
        });
        break;

      default:
        return 0;
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': chosenCategory !== FILTER_ALPHABETICALLY })
          }
          onClick={() => setChosenCategory(FILTER_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success',
              { 'is-light': chosenCategory !== FILTER_LENGTH })
          }
          onClick={() => setChosenCategory(FILTER_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-warning',
              { 'is-light': !reverseBtn })
          }
          onClick={() => setReverseBtn(!reverseBtn)}
        >
          Reverse
        </button>

        {(chosenCategory || reverseBtn)
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setChosenCategory('');
              setReverseBtn(false);
            }}
          >
            Reset
          </button>
          )}
      </div>

      <ul>
        {sortedGoods.map((good, index) => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
