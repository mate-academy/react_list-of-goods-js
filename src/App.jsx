import cn from 'classnames';
import { useState } from 'react';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const REVERSE_LIST = 'reverse';

function sortGoodsBy(goods, sortingType) {
  const sameGoods = [...goods];

  switch (sortingType) {
    case SORT_BY_ALPHABET:
      return sameGoods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });

    case SORT_BY_LENGTH:
      return sameGoods.sort((good1, good2) => {
        return good1.length - good2.length;
      });

    case REVERSE_LIST:
      return sameGoods.reverse();

    default:
      return goods;
  }
}

// eslint-disable-next-line no-fallthrough
export const App = () => {
  const [goodsList, setGoodsList] = useState(goodsFromServer);
  const [currentSorting, setCurrentSorting] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': currentSorting !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setGoodsList(sortGoodsBy(goodsList, SORT_BY_ALPHABET));
            setCurrentSorting(SORT_BY_ALPHABET);
            setIsReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': currentSorting !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setGoodsList(sortGoodsBy(goodsList, SORT_BY_LENGTH));
            setCurrentSorting(SORT_BY_LENGTH);
            setIsReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': currentSorting !== REVERSE_LIST,
          })}
          onClick={() => {
            setGoodsList(sortGoodsBy(goodsList, REVERSE_LIST));

            setIsReversed(!isReversed);

            setCurrentSorting(isReversed ? '' : REVERSE_LIST);
          }}
        >
          Reverse
        </button>

        {JSON.stringify(goodsList) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoodsList(goodsFromServer);
              setCurrentSorting('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
