import 'bulma/css/bulma.css';
import './App.scss';

export const words = [
  'einfach - просто',
  'hauptstadt - столица',
  'kannst - может',
];

export const App = () => {
  return (
    <div className="section content">
      <ul>
        {words.map(word => (
          <li key={word}>{word}</li>
        ))}
      </ul>
    </div>
  );
};
