import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';

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

export const App = () => {
  const [listOfGoods, setListOfGoods] = useState([...goodsFromServer]);
  const [targetInnerText, setTargetInnerText] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const sortList = (list, type) => {
    switch (type) {
      case 'Sort alphabetically':
        if (isReverse) {
          return list.sort((good1, good2) => good2.localeCompare(good1));
        }

        return list.sort((good1, good2) => good1.localeCompare(good2));

      case 'Sort by length':
        if (isReverse) {
          return list.sort((good1, good2) => good2.length - good1.length);
        }

        return list.sort((good1, good2) => good1.length - good2.length);

      case 'Reverse':
        return list.reverse();

      default:
        return list;
    }
  };

  const handleSort = (e) => {
    const text = e.currentTarget.innerText;

    setTargetInnerText(text);
    setListOfGoods(sortList(listOfGoods, text));
  };

  const handlleReverse = (e) => {
    const text = e.currentTarget.innerText;

    if (isReverse) {
      setIsReverse(false);
    } else {
      setIsReverse(true);
    }

    setListOfGoods(sortList(listOfGoods, text));
  };

  const handleReset = () => {
    setListOfGoods(sortList([...goodsFromServer], ''));
    setTargetInnerText('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button is-info',
              { 'is-light': targetInnerText !== 'Sort alphabetically' },
            )
          }
          onClick={(e) => {
            handleSort(e);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-success',
              { 'is-light': targetInnerText !== 'Sort by length' },
            )
          }
          onClick={(e) => {
            handleSort(e);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button is-warning',
              { 'is-light': !isReverse },
            )
          }
          onClick={(e) => {
            handlleReverse(e);
          }}
        >
          Reverse
        </button>

        {
          (targetInnerText || isReverse)
            ? (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={() => {
                  handleReset();
                }}
              >
                Reset
              </button>
            )
            : null
        }
      </div>

      <ul>
        {listOfGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
