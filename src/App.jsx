import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { link } from 'fs';

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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [alpLightOff, setalpLightOff] = useState(true);
  const [lengthLightOff, setlengthLightOff] = useState(true);
  const [reversLightOff, setreversLightOff] = useState(true);
  const [isHiden, setisHiden] = useState(true);

  function action(currentArr, revers, initialArr, initiator) {
    const sortAlphabet
      = [...currentArr].sort((el1, el2) => el1.localeCompare(el2));
    const sortLength
      = [...currentArr].sort((el1, el2) => el1.length - el2.length);

    switch (initiator) {
      case 'reset':
        setIsReversed(false);
        setVisibleGoods(initialArr);
        setalpLightOff(true);
        setlengthLightOff(true);
        setreversLightOff(true);
        setisHiden(true);
        break;
      case 'reverse':
        setIsReversed(!isReversed && true);
        setVisibleGoods(currentArr.reverse());
        setreversLightOff(!reversLightOff && true);
        setisHiden(false);
        break;
      case 'alphabet':
        if (!revers) {
          setVisibleGoods(sortAlphabet);
        } else {
          setVisibleGoods(sortAlphabet.reverse());
        }

        setisHiden(false);
        setalpLightOff(false);
        setlengthLightOff(true);
        break;
      case 'length':
        if (!revers) {
          setVisibleGoods(sortLength);
        } else {
          setVisibleGoods(sortLength.reverse());
        }

        setisHiden(false);
        setalpLightOff(true);
        setlengthLightOff(false);
        break;

      default:
        setVisibleGoods(initialArr);
    };
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => action(
            [...visibleGoods],
            isReversed,
            goodsFromServer,
            'alphabet',
          )}
          type="button"
          className={`button is-info ${alpLightOff && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => action(
            [...visibleGoods],
            isReversed,
            goodsFromServer,
            'length',
          )}
          type="button"
          className={`button is-success ${lengthLightOff && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => action(
            [...visibleGoods],
            isReversed,
            goodsFromServer,
            'reverse',
          )}
          type="button"
          className={`button is-warning ${reversLightOff ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        <button
          onClick={() => action(
            [...visibleGoods],
            isReversed,
            goodsFromServer,
            'reset',
          )}
          type="button"
          className={`button is-danger is-light ${isHiden && 'hiden'}`}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
};
