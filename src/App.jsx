import React, { useState, useMemo } from 'react';
import './App.scss';

const initialGoods = [
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
  const [selectedGood, setSelectedGood] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const goods = useMemo(() => {
    const result = [...initialGoods];

    if (sortType === 'alphabetical') {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === 'length') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortType, isReversed]);

  const isChanged = sortType !== null || isReversed;

  const resetGoods = () => {
    setSortType(null);
    setIsReversed(false);
    setSelectedGood(null);
  };

  return (
    <div className="section">
      <div className="container">
        <div className="buttons">
          <button
            type="button"
            className={`button ${sortType === 'alphabetical' ? '' : 'is-light'}`}
            onClick={() => setSortType('alphabetical')}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button ${sortType === 'length' ? '' : 'is-light'}`}
            onClick={() => setSortType('length')}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button ${isReversed ? '' : 'is-light'}`}
            onClick={() => setIsReversed(prev => !prev)}
          >
            Reverse
          </button>

          {isChanged && (
            <button
              type="button"
              className="button is-dark"
              onClick={resetGoods}
            >
              Reset
            </button>
          )}
        </div>

        <h1 className="title">
          {selectedGood ? (
            <span data-cy="TitleText">{selectedGood} is selected</span>
          ) : (
            'No goods selected'
          )}

          {selectedGood && (
            <button
              data-cy="ClearButton"
              type="button"
              className="delete is-medium"
              onClick={() => setSelectedGood(null)}
              style={{ marginLeft: '10px' }}
            />
          )}
        </h1>

        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>Action</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            {goods.map(good => {
              const isSelected = selectedGood === good;

              return (
                <tr
                  key={good}
                  data-cy="Good"
                  className={isSelected ? 'has-background-success-light' : ''}
                >
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {isSelected ? (
                      <button
                        data-cy="RemoveButton"
                        type="button"
                        className="button is-info is-small"
                        onClick={() => setSelectedGood(null)}
                        style={{ marginRight: '10px' }}
                      >
                        -
                      </button>
                    ) : (
                      !selectedGood && (
                        <button
                          data-cy="AddButton"
                          type="button"
                          className="button is-success is-small"
                          onClick={() => setSelectedGood(good)}
                          style={{ marginRight: '10px' }}
                        />
                      )
                    )}
                  </td>

                  <td>
                    <span data-cy="GoodTitle">{good}</span>
                  </td>

                  <td />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
