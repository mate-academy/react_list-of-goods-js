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

const SORT_FILD_BY_ALPHABET = 'SORT_FILD_BY_ALPHABET';
const SORT_BY_LENGTH = 'SORT_BY_LENGTH';

function getPrepeadGoods(goods, sortFiled, reverse) {
  const prepearedGoods = [...goods];

  if (sortFiled) {
    prepearedGoods.sort((a, b) => {
      switch (sortFiled) {
        case SORT_FILD_BY_ALPHABET:
          return a.nameGood.localeCompare(b.nameGood);
        case SORT_BY_LENGTH:
          return a.nameGood.length - b.nameGood.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const goodsFromServerObjekt = goodsFromServer
    .map((item, index) => ({ nameGood: item, id: index + 1 }));

  const [sortBtnFild, setSortBtnFild] = useState('');
  const [reverseList, setReversedList] = useState(false);

  const goodsList = getPrepeadGoods(
    goodsFromServerObjekt,
    sortBtnFild,
    reverseList,
  );

  const showResetBtn = (sortBtnFild !== '') || reverseList;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBtnFild !== SORT_FILD_BY_ALPHABET && 'is-light'} `}
          onClick={() => setSortBtnFild(SORT_FILD_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBtnFild !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={() => setSortBtnFild(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverseList && 'is-light'}`}
          onClick={() => setReversedList(!reverseList)}
        >
          Reverse
        </button>

        {showResetBtn && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBtnFild('');
              setReversedList(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map((good) => {
          const { nameGood, id } = good;

          return (
            <li key={id} data-cy="Good">
              {nameGood}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
