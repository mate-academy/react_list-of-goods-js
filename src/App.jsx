import 'bulma/css/bulma.css';
import { useState } from 'react';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';

function sortGoods(goods, { actionButtons, reverse }) {
  let copyGoods = [...goods];

  if (actionButtons) {
    copyGoods = copyGoods.sort((good1, good2) => {
      switch (actionButtons) {
        case SORT_BY_ALPHABET:
          return good1[0].localeCompare(good2[0]);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    copyGoods = copyGoods.reverse();
  }

  return copyGoods;
}

export const App = () => {
  const [actionButtons, setActionButtons] = useState('');
  const [reverse, setReverse] = useState('');

  const visibleGoods = sortGoods(goodsFromServer, { actionButtons, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={actionButtons === SORT_BY_ALPHABET ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => {
            setActionButtons(SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={actionButtons === SORT_BY_LENGTH ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => {
            setActionButtons(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverse === REVERSE ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => setReverse(reverse === REVERSE ? '' : REVERSE)}
        >
          Reverse
        </button>

        {
          actionButtons ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setActionButtons('');
                setReverse('');
              }}
            >
              Reset
            </button>
          ) : (
            reverse && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  setActionButtons('');
                  setReverse('');
                }}
              >
                Reset
              </button>
            )
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
