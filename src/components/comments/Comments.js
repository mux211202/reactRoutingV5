import { useState } from 'react';
import { useParams } from 'react-router';
import { useCallback, useEffect } from 'react/cjs/react.development';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from '../comments/CommentsList';
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, status, data: loadedComments} = useHttp( getAllComments );
  const params = useParams();
  const {quotesId} = params;
  useEffect(()=>{
    sendRequest(quotesId, true);
  }, [quotesId, sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addedCommentHandler = useCallback( () => {
      sendRequest(quotesId)
    }, [sendRequest, quotesId])
  let comments;
  if (status === 'pending') {
    comments = <div className='centered'><LoadingSpinner/></div>
  }
  if (status === 'completed' && (loadedComments && loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments}/>
  }
  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    console.log('hi')
    comments = <p className='centered'>No comments yet</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quotesId} onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
