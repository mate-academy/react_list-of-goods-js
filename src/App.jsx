import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { Buttons } from './components/Buttons/Buttons';
import { GoodList } from './components/GoodList/GoodList';

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

const buttonProps = [
  { class: 'is-info', text: 'Sort alphabetically' },
  { class: 'is-success', text: 'Sort by length' },
  { class: 'is-warning', text: 'Reverse' },
  { class: 'is-danger', text: 'Reset' },
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReverse, setIsReverse] = useState(false);
  const [activeSort, setActiveSort] = useState('');
  const isOriginalOrder = activeSort === '' && !isReverse;

  const getSortedGoods = (sortType, isReverseSort) => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === 'Sort alphabetically') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'Sort by length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReverseSort) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const handleClick = buttonText => {
    switch (buttonText) {
      case 'Sort alphabetically':
        setGoods(getSortedGoods('Sort alphabetically', isReverse));
        setActiveSort('Sort alphabetically');
        break;
      case 'Sort by length':
        setGoods(getSortedGoods('Sort by length', isReverse));
        setActiveSort('Sort by length');
        break;
      case 'Reverse':
        setIsReverse(current => {
          const newValue = !current;
          setGoods(getSortedGoods(activeSort, newValue));
          return newValue;
        });
        break;
      case 'Reset':
        setGoods(goodsFromServer);
        setIsReverse(false);
        setActiveSort('');
        break;
      default:
        break;
    }
  };

  return (
    <div className="section content">
      <Buttons
        buttonProps={buttonProps}
        onClick={handleClick}
        activeSort={activeSort}
        isReverse={isReverse}
        showResetButton={!isOriginalOrder}
      />
      <GoodList goods={goods} />
    </div>
  );
};
