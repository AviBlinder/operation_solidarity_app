import React, { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { RefDataContext } from '@/components/RefDataContext';

const Comments = ({ taskDetails }) => {
  const { language, labels } = useContext(RefDataContext);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showAddComment, setShowAddComment] = useState(false);
  const { data: session } = useSession();

  let response = '';
  const appendComment = async () => {
    try {
      response = await fetch('/api/tasks/append-comment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          accessToken: session?.accessToken,
        },
        body: JSON.stringify({
          taskId: taskDetails.taskId,
          entryDate: taskDetails.entryDate,
          comments: newComment,
          email: session?.user.email,
        }),
      });
      if (response.ok) {
        const res = await response.json();
        // setComments([...comments, res.comments]);
        setComments(res.comments);
        setNewComment('');
      } else {
        console.log('Error appending comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error appending comment:', error);
    }
  };

  useEffect(() => {
    if (taskDetails && taskDetails.comments && comments.length === 0) {
      // Convert the comments object into an array
      setComments(taskDetails.comments);
    }
  }, [taskDetails]);

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
                  {comment?.email} {' | '}
                </span>
                <span className="date pl-2">
                  {new Date(comment?.date).toLocaleString()}
                </span>
              </div>
              <div>
                <span>{comment?.commentText}</span>
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
