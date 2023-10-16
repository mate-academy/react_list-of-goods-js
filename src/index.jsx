import ReactDOM from 'react-dom';
import { useState } from 'react';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));
export const [sortField, setSortField] = useState('');
