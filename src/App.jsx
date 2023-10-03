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

  const sortList = (type) => {
    let newList;

    switch (type) {
      case 'Sort alphabetically':
        newList = [...goodsFromServer]
          .sort((good1, good2) => good1.localeCompare(good2));
        break;

      case 'Sort by length':
        newList = [...goodsFromServer]
          .sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        newList = [...goodsFromServer];
    }

    if (isReverse) {
      newList.reverse();
    }

    setListOfGoods(newList);
  };

  const handleSort = (e) => {
    const buttonText = e.currentTarget.innerText;

    sortList(buttonText);
    setTargetInnerText(buttonText);
  };

  const handlleReverse = (e) => {
    setIsReverse(!isReverse);
    setListOfGoods([...listOfGoods].reverse());
  };

  const handleReset = () => {
    setListOfGoods([...goodsFromServer]);
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
          onClick={handleSort}
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
          onClick={handleSort}
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
          onClick={handlleReverse}
        >
          Reverse
        </button>

        {
          (targetInnerText || isReverse)
            ? (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={handleReset}
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
