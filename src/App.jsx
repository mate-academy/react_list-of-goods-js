import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

function sortByParameter(goods, { param = '', reverse }) {
  let goodsArr = goods;

  switch (param) {
    case SORT_ALPHABET: {
      goodsArr = goods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });

      break;
    }

    case SORT_LENGTH: {
      goodsArr = goods.sort((good1, good2) => {
        return good1.length - good2.length;
      });

      break;
    }

    default: {
      break;
    }
  }

  if (reverse) {
    const temp = [];

    for (let i = goodsArr.length - 1; i >= 0; i -= 1) {
      temp.push(goodsArr[i]);
    }

    return temp;
  }

  return goodsArr;
}

export const App = () => {
  const [sort, setSort] = useState('');
  let goods = [...goodsFromServer];

  const clickBtn = param => {
    setSort(param);
  };

  if (sort) {
    const ind = sort.search(' ');
    const param = ind === -1 ? sort : sort.slice(0, ind + 1).trim();
    const reverse = ind === -1 ? '' : sort.slice(ind + 1, sort.length).trim();

    const obj = {
      param,
    };

    if (reverse) {
      obj.reverse = reverse;
    }

    goods = sortByParameter(goods, obj);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !sort.startsWith(SORT_ALPHABET),
          })}
          onClick={() => {
            const query = sort.includes('reverse')
              ? `${SORT_ALPHABET} reverse`
              : SORT_ALPHABET;

            clickBtn(query);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !sort.startsWith(SORT_LENGTH),
          })}
          onClick={() => {
            const query = sort.includes('reverse')
              ? `${SORT_LENGTH} reverse`
              : SORT_LENGTH;

            clickBtn(query);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !sort.includes('reverse'),
          })}
          onClick={() =>
            clickBtn(
              sort.includes('reverse')
                ? sort.slice(0, sort.search(' '))
                : `${sort} reverse`,
            )
          }
        >
          Reverse
        </button>

        {sort !== '' && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => clickBtn('')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => {
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
