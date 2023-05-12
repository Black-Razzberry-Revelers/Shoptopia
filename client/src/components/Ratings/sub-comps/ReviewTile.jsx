/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import fetcher from '../../fetcher';

function ReviewTile({ review }) {
  const style = {
    width: '5rem',
    borderRadius: '5rem',
    height: '5rem',
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
    <div>
      <p>*****</p>
      <p>{review.reviewer_name}</p>
      <p>{review.date}</p>
      <p style={{ fontWeight: 'bold' }}>
        {review.summary.length > 60 ? `${review.summary}...` : review.summary}
      </p>
      <p>{showMore ? review.body : review.body.slice(0, 250)}</p>
      {review.body.length > 250 && (
        <a onClick={() => setShowMore(true)}>Show More</a>
      )}
      {review.photos.map((photo) => (
        <img
          src={photo.url}
          alt="img"
          style={style}
          onClick={() => setImage(photo.url)}
        />
      ))}
      {image && (
        <>
          <img
            src={image}
            alt="img"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <button onClick={() => setImage('')}>close</button>
        </>
      )}

      {review.response && (
        <>
          <p>Response from seller</p>
          <p>{reiew.response}</p>
        </>
      )}
      <p>{review.response && reiew.response}</p>
      <p>{review.recommend && 'I recommend this product'}</p>
      <p>
        Was this review helpful?
        <a onClick={() => sendPositiveFeedback(review.review_id)}>
          Yes (
          {review.helpfulness}
          )
        </a>
        <a onClick={() => sendNegativeFeedback(review.review_id)}>No (0)</a>
      </p>
    </div>
  );
}

export default ReviewTile;