import GoodPage from '../GoodPage/Good';

const GoodList = ({ goods }) => {
  return (
    <ul>
      {goods.map(item => {
        return <GoodPage good={item} key={item} />;
      })}
    </ul>
  );
};

export default GoodList;
