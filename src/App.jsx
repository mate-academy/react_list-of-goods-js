import './App.scss';
import { useState } from 'react';
import { goodsFromServer, buttonClassesFields } from './data/data';
import { Buttons } from './components/buttons/Buttons';
import { List } from './components/list/List';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReversed] = useState(false);

  const handleClick = sortType => {
    switch (sortType) {
      case 'Sort alphabetically':
      case 'Sort by length':
        setSortField(sortType);
        break;
      case 'Reverse':
        setReversed(!isReversed);
        break;
      case 'Reset':
        setSortField('');
        setReversed(false);
        break;
      default:
        break;
    }
  };

  function prepareGoods(
    initialGoods,
    { sortField: field, isReversed: reversed },
  ) {
    const copyGgoods = [...initialGoods];

    copyGgoods.sort((goodA, goodB) => {
      switch (field) {
        case 'Sort alphabetically':
          return goodA.localeCompare(goodB);
        case 'Sort by length':
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });

    if (reversed) {
      copyGgoods.reverse();
    }

    return copyGgoods;
  }

  const goods = prepareGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <Buttons
        buttonClassesFields={buttonClassesFields}
        sortField={sortField}
        handleClick={handleClick}
        isReversed={isReversed}
      />
      <List goods={goods} />
    </div>
  );
};
