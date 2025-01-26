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

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [...goodsFromServer],
      originalOrder: [...goodsFromServer],
      isReversed: false,
      activeButton: '',
    };
  }

  sortAlphabetically = () => {
    const { goods, isReversed } = this.state;
    const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));

    this.setState({
      goods: isReversed ? sortedGoods.reverse() : sortedGoods,
      activeButton: 'alphabetically',
    });
  };

  sortByLength = () => {
    const { goods, isReversed, originalOrder } = this.state;

    const sortedGoods = [...goods].sort((a, b) => {
      if (a.length === b.length) {
        return originalOrder.indexOf(a) - originalOrder.indexOf(b);
      }

      return a.length - b.length;
    });

    this.setState({
      goods: isReversed ? sortedGoods.reverse() : sortedGoods,
      activeButton: 'length',
    });
  };

  reverseOrder = () => {
    const { goods, isReversed } = this.state;

    this.setState({
      goods: [...goods].reverse(),
      isReversed: !isReversed,
    });
  };

  resetOrder = () => {
    const { originalOrder } = this.state;

    this.setState({
      goods: [...originalOrder],
      isReversed: false,
      activeButton: '',
    });
  };

  render() {
    const { goods, isReversed, activeButton, originalOrder } = this.state;

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={classNames('button is-info', {
              'is-light': activeButton !== 'alphabetically',
            })}
            onClick={this.sortAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames('button is-success', {
              'is-light': activeButton !== 'length',
            })}
            onClick={this.sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames('button is-warning', {
              'is-light': !isReversed,
            })}
            onClick={this.reverseOrder}
          >
            Reverse
          </button>

          {(JSON.stringify(goods) !== JSON.stringify(originalOrder) ||
            isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={this.resetOrder}
            >
              Reset
            </button>
          )}
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
  }
}
