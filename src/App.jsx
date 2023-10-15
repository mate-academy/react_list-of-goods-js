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

const SORT_BY_ALPHABETICALLY = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_BY_REVERSE = 'reverse';

function getPreparedGood(goods, sortField, revers) {
  let visibleGoods = [...goods];
  const copyGoodsFromServer = [...goodsFromServer];

  if (sortField) {
    switch (sortField) {
      case SORT_BY_ALPHABETICALLY:
        visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      case SORT_BY_LENGTH:
        visibleGoods
          = copyGoodsFromServer.sort((good1, good2) => (
            good1.length - good2.length
          ));
        break;
      case SORT_BY_REVERSE:
        visibleGoods.reverse();
        break;
      default:
        break;
    }
  }

  return revers ? visibleGoods.reverse() : visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [reverse, setReverse] = useState(false);
  const [alphabet, setAlphabet] = useState(false);
  const [length, setLength] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const copyVisibleGoods = [...visibleGoods];

  const sortByLength = () => {
    setSortField(SORT_BY_LENGTH);
    setVisibleGoods(
      getPreparedGood(visibleGoods, SORT_BY_LENGTH, reverse),
    );
    setLength(true);
    setAlphabet(false);
    setIsReset(true);
  }
  const sortByReverse = () => {
    setReverse(!reverse);
    setSortField(SORT_BY_REVERSE);
    setVisibleGoods(getPreparedGood(visibleGoods, sortField, !reverse));
    setIsReset(
      JSON.stringify(copyVisibleGoods.reverse())
      !== JSON.stringify(goodsFromServer),
    );
  }
  const resetGoods = () => {
    setSortField('');
    setVisibleGoods(goodsFromServer);
    setAlphabet(false);
    setLength(false);
    setReverse(false);
    setIsReset(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            '': alphabet,
            'is-light': !alphabet,
          })}
          onClick={() => {
            setSortField(SORT_BY_ALPHABETICALLY);
            setVisibleGoods(
              getPreparedGood(visibleGoods, SORT_BY_ALPHABETICALLY, reverse),
            );
            setAlphabet(true);
            setLength(false);
            setIsReset(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            '': length,
            'is-light': !length,
          })}
          onClick={() => sortByLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            '': reverse,
            'is-light': !reverse,
          })}
          onClick={() => sortByReverse()}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className={cn('button is-danger', {
              '': sortField === '',
              'is-light': sortField !== '',
            })}
            onClick={() => resetGoods()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
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
