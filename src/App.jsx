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

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setButton('byAlphabet');
            setAlphabetBtnLight(true);
            setLengthBtnLight(false);

            if (reverseBtnLight) {
              setSortedGoods(
                [...goodsFromServer].sort((a, b) => b.localeCompare(a)),
              );
            } else {
              setSortedGoods(
                [...goodsFromServer].sort((a, b) => a.localeCompare(b)),
              );
            }
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !alphabetBtnLight,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': !lengthBtnLight,
          })}
          onClick={() => {
            setButton('byLength');
            setAlphabetBtnLight(false);
            setLengthBtnLight(true);

            if (reverseBtnLight) {
              setSortedGoods(
                [...goodsFromServer].sort((a, b) => b.length - a.length),
              );
            } else {
              setSortedGoods(
                [...goodsFromServer].sort((a, b) => a.length - b.length),
              );
            }
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
            setButton('byReversed');
            setSortedGoods([...sortedGoods].reverse());
            setReverseBool(!reversedBool);
            setReverseBtnLight(!reverseBtnLight);
          }}
        >
          Reverse
        </button>

        {currentButton && (
          <button
            type="button"
            style={{
              display: sortedGoods === goodsFromServer ? 'none' : 'block',
            }}
            className="button is-danger is-light"
            onClick={() => {
              setButton('reset');
              setSortedGoods(goodsFromServer);
              setAlphabetBtnLight(false);
              setLengthBtnLight(false);
              setReverseBtnLight(false);
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
