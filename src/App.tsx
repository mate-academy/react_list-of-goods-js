import React, { useState } from 'react';
import './App.scss';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { get5First, getAll, getRedGoods } from './api';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { Good } from './types';
// eslint-disable-next-line import/extensions,import/no-unresolved
import { GoodsList } from './components';

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<Good[]>([]);

  const handleClick = (click: string): void => {
    switch (click) {
      case 'five':
        get5First().then((data: Good[]) => setVisibleGoods(data));
        break;
      case 'red':
        getRedGoods().then((data: Good[]) => setVisibleGoods(data));
        break;
      default:
        getAll().then((data: Good[]) => setVisibleGoods(data));
        break;
    }
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => handleClick('all')}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => handleClick('five')}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => handleClick('red')}
      >
        Load red goods
      </button>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
