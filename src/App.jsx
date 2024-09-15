import { useState } from 'react';

import 'bulma/css/bulma.css';
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

const goodsForRender = goodsFromServer.map((good, index) => {
  return { id: index + 1, product: good };
});

const buttonsDataForRender = {
  ALPHA: {
    id: 1,
    visible: true,
    value: 'Sort alphabetically',
    classes: ['button', 'is-info', 'is-light'],
  },
  LENGTH: {
    id: 2,
    visible: true,
    value: 'Sort by length',
    classes: ['button', 'is-success', 'is-light'],
  },
  REVERSE: {
    id: 3,
    visible: true,
    value: 'Reverse',
    classes: ['button', 'is-warning', 'is-light'],
  },
  RESET: {
    id: 4,
    visible: false,
    value: 'Reset',
    classes: ['button', 'is-danger', 'is-light'],
  },
};

export const App = () => {
  const [buttons, setButtons] = useState(buttonsDataForRender);
  const [goods, setGoods] = useState(goodsForRender);
  const [isReversed, setIsReversed] = useState(false);

  function handleButtonClick(key) {
    let sortedGoods = JSON.parse(JSON.stringify(goods));
    let updatedButtons = JSON.parse(JSON.stringify(buttons));

    const makeResetVisible = show => {
      updatedButtons.RESET.visible = show;
    };

    const offLightClass = buttonType => {
      const list = updatedButtons[buttonType].classes;
      const indexOfLight = list.indexOf('is-light');

      if (indexOfLight >= 0) {
        list.splice(indexOfLight, 1);
      }
    };

    const lightClassSwitcher = keyWord => {
      return updatedButtons[keyWord].classes.includes(`is-light`)
        ? updatedButtons[keyWord].classes.pop()
        : updatedButtons[keyWord].classes.push(`is-light`);
    };

    const resetClasses = () => {
      const listToReset = Object.keys(updatedButtons).filter(
        w => w !== 'REVERSE',
      );

      listToReset.forEach(buttonType => {
        updatedButtons[buttonType].classes = [
          ...buttonsDataForRender[buttonType].classes,
        ];
      });
    };

    const sortList = (listToSort, isSortByLetters) => {
      let sortedList = listToSort;

      if (isSortByLetters) {
        sortedList = isReversed
          ? listToSort.sort((a, b) => b.product.localeCompare(a.product))
          : listToSort.sort((a, b) => a.product.localeCompare(b.product));
      } else {
        sortedList = isReversed
          ? listToSort.sort((a, b) => b.product.length - a.product.length)
          : listToSort.sort((a, b) => a.product.length - b.product.length);
      }

      return sortedList;
    };

    switch (key) {
      case 'ALPHA':
        resetClasses();

        sortList(sortedGoods, true);

        makeResetVisible(true);

        offLightClass(key);

        break;

      case 'LENGTH':
        resetClasses();

        sortList(sortedGoods, false);

        makeResetVisible(true);

        offLightClass(key);

        break;

      case 'REVERSE':
        sortedGoods.reverse();

        setIsReversed(!isReversed);

        makeResetVisible(!isReversed);

        lightClassSwitcher(key);
        break;

      case 'RESET':
        sortedGoods = [...goodsForRender];
        updatedButtons = { ...buttonsDataForRender };
        break;

      default:
        sortedGoods.sort(() => 0);
        break;
    }

    setGoods(sortedGoods);
    setButtons(updatedButtons);
  }

  return (
    <div className="section content">
      <div className="buttons">
        {Object.keys(buttons).map(key => {
          const { id, visible, value, classes } = buttons[key];

          return visible ? (
            <button
              key={id}
              onClick={() => handleButtonClick(key)}
              type="button"
              className={classes.join(' ')}
            >
              {value}
            </button>
          ) : null;
        })}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.product}
          </li>
        ))}
      </ul>
    </div>
  );
};
