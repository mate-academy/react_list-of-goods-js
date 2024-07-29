import { useState } from 'react';
import cn from 'classnames';

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

const BUTTONS = {
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

export const App = () => {
  const [sortButton, setSortButton] = useState('');
  const [reversed, setReversed] = useState(false);

  function prepareList(someList) {
    let preparedList = [...someList];

    switch (sortButton) {
      case BUTTONS.ALPHABET:
        preparedList = preparedList.sort((a, b) => {
          return a.localeCompare(b);
        });
        break;

      case BUTTONS.LENGTH:
        preparedList = preparedList.sort((a, b) => {
          return a.length - b.length;
        });
        break;

      default:
        return preparedList;
    }

    return preparedList;
  }

  function reverseVisibleList(listToReverse, reverseParam) {
    return reverseParam ? listToReverse.reverse() : listToReverse;
  }

  function reset() {
    setSortButton('');
    setReversed(false);
  }

  const visibleList = prepareList(goodsFromServer);
  const acltualList = reverseVisibleList(visibleList, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortButton(BUTTONS.ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortButton !== BUTTONS.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortButton(BUTTONS.LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortButton !== BUTTONS.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversed(prev => !prev);
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortButton || reversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {acltualList.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
