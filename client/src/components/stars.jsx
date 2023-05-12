import React from 'react';
import { starsContext } from './App';
import starEmpty from '../icons8-star-ios-16-16.png';
import starFilled from '../icons8-star-ios-16-filled-16.png';

export default function Stars() {
  const { avgRating, setAvgRating } = React.useContext(starsContext);
  let floor = Math.floor(avgRating);
  let percent = Math.ceil((avgRating - Math.floor(avgRating)) * 10);
  if (percent > 7) {
    percent = 10;
  } else if (percent > 5 && percent < 8) {
    percent = 5;
  } else if (percent > 2 && percent < 6) {
    percent = 2.5;
  } else {
    percent = 0;
  }
  const filled = [];
  while (floor > 0) {
    filled.push('star');
    floor -= 1;
  }

  return (
    <div className="bar">
      <div className="stars">
        <div className="stars" id="empty">
          <div>
            <img src={starEmpty} alt="star" />
          </div>
          <div>
            <img src={starEmpty} alt="star" />
          </div>
          <div>
            <img src={starEmpty} alt="star" />
          </div>
          <div>
            <img src={starEmpty} alt="star" />
          </div>
          <div>
            <img src={starEmpty} alt="star" />
          </div>
        </div>
        <div className="stars" id="filled">
          {filled.map((star, i) => (
            <div key={i} className="star">
              <img src={starFilled} alt="star" />
            </div>
          ))}
          <div
            className="star"
            style={{
              width: `${percent}%`,
              overflow: 'hidden',
              paddingRight: '5px',
            }}
          >
            <img
              src={starFilled}
              alt="star"
              style={{ paddingBottom: '20%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}