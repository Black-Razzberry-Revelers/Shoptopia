/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { intlFormat } from 'date-fns';
import fetcher from '../../fetcher';
import Stars from '../../stars';
// #6E355F
function ReviewTile({ review }) {
  const style = {
    width: '4rem',
    borderRadius: '4rem',
    height: '4rem',
    marginInline: '0.5rem',
  };

  const [image, setImage] = useState('');
  const [feedback, setFeedback] = useState(
    () => localStorage.getItem(review.review_id) === true,
  );
  const [showMore, setShowMore] = useState(false);

  const sendPositiveFeedback = () => {
    if (!feedback) {
      localStorage.setItem(review.review_id, 'true');
      setFeedback(true);
      fetcher.markReviewAsHelpful(review.review_id);
    }
  };

  const sendNegativeFeedback = () => {
    if (!feedback) {
      localStorage.setItem(review.review_id, 'true');
      setFeedback(true);
      fetcher.reportReview(review.review_id);
    }
  };
  useEffect(() => {
    const savedFeedback = localStorage.getItem(review.review_id) === 'true';
    setFeedback(savedFeedback);
  }, [review.review_id]);

  return (
    <div className="review-tile">
      <div className="stars-user-date">
        <div className="rating-star"><Stars avgRating={review.rating} /></div>
        <div className="user+date">
          <p className="label tile-user">{`${review.reviewer_name},  `}</p>
          <p className="label tile-date">
            {intlFormat(new Date(review.date), {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}

          </p>
        </div>

      </div>

      <p className="info-text" style={{ fontWeight: 'bold' }}>
        {review.summary.length > 60 ? `${review.summary.slice(0, 60)}...` : review.summary}
      </p>
      <p className="info-text">{showMore ? review.body : `${review.body.slice(0, 250)}...`}</p>
      {review.body.length > 250 && (
        <a className="show-button" onClick={() => setShowMore(true)}>Show More</a>
      )}
      {review.photos.map((photo, i) => (
        <img
          key={`${i}reviewPhotos`}
          src={photo.url}
          alt="img"
          style={style}
          onClick={() => setImage(photo.url)}
        />
      ))}
      {image && (
        <div>
          <img
            className="modalframe-img"
            src={image}
            alt="img"
          />
          <div className="modal-frame-overlay" onClick={() => setImage('')} />
        </div>
      )}

      {review.response && (
        <div className="review-response">
          <p className="label">Response from seller</p>
          <p className="info-text">{reiew.response}</p>
        </div>
      )}
      <p className="info-text rating-info-text">{review.response && reiew.response}</p>
      <p className="info-text rating-recommend">{review.recommend && 'I recommend this product'}</p>
      <p className="info-text rating-helpful">
        <span className="helpful"> Helpful ? </span>
        <a className="helpful-button" onClick={() => sendPositiveFeedback(review.review_id)}>
          Yes (
          <span className="helpfulness-count">{review.helpfulness}</span>
          )
        </a>

        <a className="helpful-button-report" onClick={() => sendNegativeFeedback(review.review_id)}>Report</a>
      </p>
    </div>
  );
}

export default ReviewTile;
