import 'bulma/css/bulma.css';
import cn from 'classnames';
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

export const App = () => {
  const [currentButton, setButton] = useState('');
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);
  const [reversedBool, setReverseBool] = useState(false);
  const [reverseBtnLight, setReverseBtnLight] = useState(false);
  const [alphabetBtnLight, setAlphabetBtnLight] = useState(false);
  const [lengthBtnLight, setLengthBtnLight] = useState(false);

  function handleButtonBehavior(typeofButton) {
    setButton(typeofButton);

    // handle styles
    switch (typeofButton) {
      case 'byAlphabet':
        setAlphabetBtnLight(true);
        setLengthBtnLight(false);
        break;

      case 'byLength':
        setAlphabetBtnLight(false);
        setLengthBtnLight(true);
        break;

      case 'byReversed':
        setSortedGoods([...sortedGoods].reverse());
        setReverseBool(!reversedBool);
        setReverseBtnLight(!reverseBtnLight);
        break;

      case 'reset':
        setSortedGoods(goodsFromServer);
        setAlphabetBtnLight(false);
        setLengthBtnLight(false);
        setReverseBtnLight(false);
        break;

      default:
    }
  }

  function handleReverseLogic(typeofButton) {
    if (reverseBtnLight && typeofButton === 'byAlphabet') {
      setSortedGoods([...goodsFromServer].sort((a, b) => b.localeCompare(a)));
    } else if (!reverseBtnLight && typeofButton === 'byAlphabet') {
      setSortedGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    }

    if (reverseBtnLight && typeofButton === 'byLength') {
      setSortedGoods([...goodsFromServer].sort((a, b) => b.length - a.length));
    } else if (!reverseBtnLight && typeofButton === 'byLength') {
      setSortedGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !alphabetBtnLight,
          })}
          onClick={() => {
            handleButtonBehavior('byAlphabet');
            handleReverseLogic('byAlphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': !lengthBtnLight,
          })}
          onClick={() => {
            handleButtonBehavior('byLength');
            handleReverseLogic('byLength');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseBtnLight,
          })}
          onClick={() => {
            handleButtonBehavior('byReversed');
          }}
        >
          Reverse
        </button>

        {currentButton && (
          <button
            type="button"
            className="button is-danger is-light"
            style={{
              display:
                JSON.stringify(sortedGoods) === JSON.stringify(goodsFromServer)
                  ? 'none'
                  : 'block',
            }}
            onClick={() => {
              handleButtonBehavior('reset');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
