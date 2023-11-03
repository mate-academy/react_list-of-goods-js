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

const FILTER_ALPHABETICALLY = 'Sort alphabetically';
const FILTER_LENGTH = 'Sort by length';

export const App = () => {
  const [chosenFilter, setChosenFilter] = useState('');
  const [reverseBtn, setReverseBtn] = useState(false);
  let sortedGoods = [...goodsFromServer];

  if (chosenFilter) {
    switch (chosenFilter) {
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
            if (good2.length !== good1.length) {
              return good2.length - good1.length;
            }

            return good2.localeCompare(good1);
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
              { 'is-light': chosenFilter !== FILTER_ALPHABETICALLY })
          }
          onClick={() => setChosenFilter(FILTER_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success',
              { 'is-light': chosenFilter !== FILTER_LENGTH })
          }
          onClick={() => setChosenFilter(FILTER_LENGTH)}
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

        {(chosenFilter || reverseBtn)
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setChosenFilter('');
              setReverseBtn(false);
            }}
          >
            Reset
          </button>
          )}
      </div>

      <ul>
        {!chosenFilter && reverseBtn
          ? sortedGoods
            .reverse()
            .map(tempGood => <li data-cy="Good">{tempGood}</li>)
          : sortedGoods.map(good => <li data-cy="Good">{good}</li>)
        }
      </ul>
    </div>
  );
};
