import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

export function getReorderedGoods(
  goods,
  { sortType, isReversed },
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case 'alphabet':
      visibleGoods.sort();
      break;

    case 'length':
      visibleGoods.sort((itemA, itemB) => itemA.length - itemB.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export class App extends React.Component {
  state = {
    isReversed: false,
    sortType: 'none',
  };

  reverseList = () => {
    this.setState(state => ({
      isReversed: !state.isReversed,
    }));
  };

  sortByAlphabet = () => {
    this.setState({ sortType: 'alphabet' });
  };

  sortByLength = () => {
    this.setState({ sortType: 'length' });
  };

  reset = () => {
    this.setState(({ isReversed: false, sortType: 'none' }));
  };

  render() {
    const { isReversed, sortType } = this.state;
    const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={classNames(
              'button is-info',
              { 'is-light': sortType !== 'alphabet' },
            )}
            onClick={this.sortByAlphabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames(
              'button is-success',
              { 'is-light': sortType !== 'length' },
            )}
            onClick={this.sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames(
              'button is-warning',
              { 'is-light': !isReversed },
            )}
            onClick={this.reverseList}
          >
            Reverse
          </button>

          {(isReversed || sortType !== 'none') && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={this.reset}
            >
              Reset
            </button>
          )}

        </div>

        <ul>
          <ul>
            {goods.map(goodItem => (
              <li
                data-cy="Good"
                key={goodItem}
              >
                {goodItem}
              </li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}
