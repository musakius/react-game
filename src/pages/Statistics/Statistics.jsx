import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getStatistics_LS} from '../../helpers/LS';
import './Statistics.scss';

const Statistics = ({styleApp}) => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    setStatistics(getStatistics_LS());
  }, []);

  return (
    <main className="main main-statistics">
      <h1 className="title">Statistics</h1>
      <div className="container">
        <table className="table border border-dark">
          <thead>
            <tr className="table-dark">
              <th className="num">№</th>
              <td>Player won</td>
              <td>Field size</td>
              <td>Time</td>
              <td>Moves</td>
            </tr>
          </thead>
          <tbody>
            {statistics.map((el, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    {el.playerWin.name} ( {el.playerWin.symbol} )
                  </td>
                  <td>
                    {el.sizeField}x{el.sizeField}
                  </td>
                  <td>{el.time}</td>
                  <td>{el.moves}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-100 pb-3">
          <Link to="/" className={`btn btn-${styleApp}`}>
            Back
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Statistics;
