import React, { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { RefDataContext } from '@/components/RefDataContext';

const Comments = ({ taskDetails }) => {
  const { language, labels } = useContext(RefDataContext);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [email, setEmail] = useState('');
  const [showAddComment, setShowAddComment] = useState(false);
  const { data: session } = useSession();

  const fetchComments = async () => {
    setComments(setComments([...comments, taskDetails.comments]));
  };

  const appendComment = async () => {
    try {
      const response = await fetch('/api/append-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: task.taskId,
          entryDate: task.entryDate,
          comments: newComment,
          email: session?.user.email ? session?.user.email : 'Anonymous',
        }),
      });
      setComments([...comments, response.data]); // Add the new comment to the local state
      setNewComment(''); // Clear the input after submission
      // Optionally, refetch comments here if your API response doesn't include the new comment
    } catch (error) {
      console.error('Error appending comment:', error);
    }
  };

  // Run fetchComments when the component mounts
  useEffect(() => {
    if (taskDetails && taskDetails.comments && comments.length === 0) {
      // Convert the comments object into an array
      setComments(taskDetails.comments);
    }
  }, [taskDetails]);
  console.log('taskDetails.comments =', taskDetails.comments);
  console.log('comments =', comments);
  return (
    <div className="flex flex-col ">
      <ul>
        {comments &&
          comments.map((comment, index) => (
            <li
              key={index}
              className={`flex flex-col px-3 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-300'
              }`}
            >
              <div>
                <span className="font-normal">
                  {comment.email} {' | '}
                </span>
                <span className="date pl-2">
                  {new Date(comment.date).toLocaleString()}
                </span>
              </div>
              <div>
                <span>{comment.commentText}</span>
              </div>
            </li>
          ))}
      </ul>

      <div className="flex flex-col ">
        <div className="mb-3">
          <label>
            <input
              type="checkbox"
              checked={showAddComment}
              className="rounded-lg mx-2 my-2"
              onChange={(e) => setShowAddComment(e.target.checked)}
            />{' '}
            {labels[language].addCommentLabel}
          </label>
        </div>

        {showAddComment && (
          <div className="flex flex-col   ">
            <textarea
              className="w-full "
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here"
            />

            <div className="flex justify-center my-2">
              <button
                className="p-2 rounded-lg bg-secondary-400"
                onClick={appendComment}
              >
                Post Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
