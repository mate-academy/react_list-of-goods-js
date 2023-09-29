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

const SORT_TEXT_ALPHABET = 'alphabet';
const SORT_TEXT_LENGTH = 'length';
const SORT_TEXT_REVERSE = 'reverse';

function getReadyGoods(goods, { sortText }) {
  const readyGoods = [...goods];

  if (sortText) {
    readyGoods.sort((good1, good2) => {
      switch (sortText) {
        case SORT_TEXT_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_TEXT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return readyGoods;
}

export const App = () => {
  const [sortText, setSortText] = useState('');
  const [reverseText, setReverseText] = useState('');
  let sortedGoods = getReadyGoods(goodsFromServer, { sortText });

  if (sortText !== SORT_TEXT_REVERSE && reverseText === SORT_TEXT_REVERSE) {
    sortedGoods = sortedGoods.reverse();
  } else if (reverseText === SORT_TEXT_REVERSE) {
    sortedGoods = goodsFromServer.reverse();
  } else if (sortText === SORT_TEXT_ALPHABET
    && reverseText === SORT_TEXT_REVERSE) {
    sortedGoods = getReadyGoods(sortedGoods, { sortText });
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortText(SORT_TEXT_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortText !== SORT_TEXT_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortText(SORT_TEXT_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortText !== SORT_TEXT_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseText ? () => {
            setReverseText('');
          } : () => {
            setReverseText(SORT_TEXT_REVERSE);
          }
        }
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseText !== SORT_TEXT_REVERSE,
          })}
        >
          Reverse
        </button>

        {(sortText || reverseText) && (
        <button
          onClick={() => {
            setSortText('');
            setReverseText('');
          }}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
