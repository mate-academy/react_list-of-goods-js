import React, { useState } from 'react';
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

export const App = () => {
  const [goodsToSort, setGoodsToSort] = useState(goodsFromServer);
  const [selectedOption, setSelectedOption] = useState("");
  const [isReverseActive, setIsReverseActive] = useState(false);


  function handleGoodsAlphabetically() {
      setSelectedOption("Sort alphabetically")
      if(isReverseActive) {
        setGoodsToSort([...goodsToSort].sort((a, b) => b.localeCompare(a)));
      } else{
        setGoodsToSort([...goodsToSort].sort((a, b) => a.localeCompare(b)));
      }

  }

  function handleSortGoodsByLength() {
    setSelectedOption('Sort by length')
    if(isReverseActive) {
      setGoodsToSort([...goodsToSort].sort((a, b) => b.length - a.length));
    } else {
    setGoodsToSort([...goodsToSort].sort((a, b) =>  a.length - b.length));
    }
  }

  function handleReverseGoods() {
    setGoodsToSort([...goodsToSort].reverse());
    setIsReverseActive(!isReverseActive);
  }

  function handleGoodsToOriginal() {
    setGoodsToSort(goodsFromServer);
    setSelectedOption("");
    setIsReverseActive(false);
  }

  function checkIfArrayIsEqualsToFromServer() {
    return goodsToSort.every((good, index) => good === goodsFromServer[index]);
  }

  return (
    <div className="section content">
      <div className="buttons">
      <div className="buttons">
      <button type="button" onClick={handleGoodsAlphabetically} className={`button is-info ${selectedOption !== "Sort alphabetically" ? "is-light": ""}`}>
        Sort alphabetically
      </button>

      <button type="button" onClick={handleSortGoodsByLength} className={`button is-success ${selectedOption !== 'Sort by length' ? "is-light": ''}`} >
        Sort by length
      </button>

      <button type="button" onClick={handleReverseGoods} className={`button is-warning ${isReverseActive ? '' : "is-light"}`}>
        Reverse
      </button>

     { 
      !checkIfArrayIsEqualsToFromServer() &&
      <button type="button" onClick={handleGoodsToOriginal} className="button is-danger is-light">
        Reset
      </button>
      }
    </div>
      </div>

      <ul>
        {
          goodsToSort.map((good) => (
            <li key={good} data-cy="Good">{good}</li>
          ))
        }
      </ul>
    </div>
  );
}
