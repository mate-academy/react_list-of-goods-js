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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const RESET = 'reset';
const REVERSE = 'reverse';


const sortGoodsBy = (goods, query) => {
  const copyOfGoods = [...goods];

  switch(query) {
    case SORT_BY_ALPHABET:
      return copyOfGoods.sort((a, b) => a.localeCompare(b));

    case SORT_BY_LENGTH:
      return copyOfGoods.sort((a, b) => a.length - b.length);

    case RESET:
      return goodsFromServer;

    default:
      return goods;
  }
}

export const App = () => {
  const [visibleGood, setVisibleGood] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [activeResetButton, setActiveResetButton] = useState(false); //
  const [activeSort, setActiveSort] = useState(''); // for 'is-light' CSS class

  return(
  <div className="section content">
    <div className="buttons">
      <button 
      type="button" 
      className={ classNames('button', 'is-info', {'is-light': activeSort !== SORT_BY_ALPHABET})}
      onClick={() => {
        setVisibleGood(sortGoodsBy(visibleGood, SORT_BY_ALPHABET))
        setActiveResetButton(true);
        setActiveSort(SORT_BY_ALPHABET);
      }
      }
      >
        Sort alphabetically
      </button>

      <button 
      type="button" 
      className={ classNames('button', 'is-success', {'is-light': activeSort !== SORT_BY_LENGTH})}
      onClick={() => {
        setVisibleGood(sortGoodsBy(visibleGood, SORT_BY_LENGTH))
        setActiveResetButton(true);
        setActiveSort(SORT_BY_LENGTH);
      }
      }
      >
        Sort by length
      </button>

      <button 
      type="button" 
      className={ classNames('button', 'is-warning', {'is-light': !isReversed})}
      onClick={() => {
        {isReversed ? setIsReversed(false) : setIsReversed(true)};
      }
      }
      >
        Reverse
      </button>

      {isReversed || activeResetButton ? 
      (
        <button 
      type="button" 
      className={ classNames('button', 'is-danger', 'is-light')}
      onClick={() => {
        setVisibleGood(sortGoodsBy(visibleGood, RESET));
        setIsReversed(false);
        setActiveResetButton(false);
        setActiveSort('')
      }
      }
      >
        Reset
      </button>
      ) : 
      ('')}
    </div>

    <ul>
      {isReversed ?
        ([...visibleGood].reverse().map(good => {
            return <li data-cy="Good" key={good}>{good}</li>}))
              :       
        (visibleGood.map(good => {
            return <li data-cy="Good" key={good}>{good}</li>}))}
    </ul>
  </div>
  );
};
