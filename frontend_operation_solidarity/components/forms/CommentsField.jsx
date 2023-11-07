import { useContext } from 'react';
import { RefDataContext } from '@/components/RefDataContext';

const CommentsField = ({ task, setTask }) => {
  const { language, labels } = useContext(RefDataContext);

  return (
    <div className="my-4">
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-primary-800"
      >
        {labels[language].addComments}
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          value={task.comments}
          onChange={(e) => setTask({ ...task, comments: e.target.value })}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default CommentsField;
