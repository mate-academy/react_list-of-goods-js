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

export const buttonLabels = [
  'Sort alphabetically',
  'Sort by length',
  'Reverse',
];

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [buttonArr, setButtonArr] = useState([...buttonLabels]);
  const [isAlpha, setIsAlpha] = useState(true);
  const [isLength, setIsLength] = useState(true);
  const [isReverse, setIsReverse] = useState(true);

  const setAlphabetically = () => {
    if (!buttonArr.includes('Reset')) {
      setButtonArr([...buttonArr, 'Reset']);
    }

    if (isReverse === false) {
      return setGoods(prevGoods => {
        return [...prevGoods].toSorted((a, b) => b.localeCompare(a));
      });
    }

    return setGoods(prevGoods => {
      return [...prevGoods].toSorted((b, a) => b.localeCompare(a));
    });
  };

  const setByLength = () => {
    if (!buttonArr.includes('Reset')) {
      setButtonArr([...buttonArr, 'Reset']);
    }

    if (isReverse === false) {
      return setGoods(goods.toSorted((a, b) => b.length - a.length));
    }

    return setGoods(goods.toSorted((a, b) => a.length - b.length));
  };

  const reverseArray = () => {
    if (!buttonArr.includes('Reset')) {
      setButtonArr([...buttonArr, 'Reset']);
    } else if (isAlpha && isLength && !isReverse) {
      setButtonArr([...buttonLabels]);
    }

    setGoods([...goods].reverse());
  };

  const resetArray = () => {
    setGoods([...goodsFromServer]);
    if (buttonArr.includes('Reset')) {
      setButtonArr([...buttonLabels]);
    }
  };

  const handleClickBtn = button => {
    if (button === 'Sort alphabetically') {
      setIsAlpha(false);
      setIsLength(true);
      setAlphabetically(button);
    } else if (button === 'Sort by length') {
      setIsLength(false);
      setIsAlpha(true);
      setByLength(button);
    } else if (button === 'Reverse') {
      setIsReverse(prev => !prev);
      reverseArray();
    } else if (button === 'Reset') {
      setIsAlpha(true);
      setIsLength(true);
      setIsReverse(true);
      resetArray(button);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        {buttonArr.map(button => {
          return (
            <button
              key={button}
              type="button"
              onClick={() => {
                handleClickBtn(button);
              }}
              className={classNames({
                button: true,
                'is-info': button === 'Sort alphabetically',
                'is-success': button === 'Sort by length',
                'is-warning': button === 'Reverse',
                'is-danger': button === 'Reset',
                'is-light':
                  (button === 'Sort alphabetically' && isAlpha) ||
                  (button === 'Sort by length' && isLength) ||
                  (button === 'Reverse' && isReverse) ||
                  button === 'Reset',
              })}
            >
              {button}
            </button>
          );
        })}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
