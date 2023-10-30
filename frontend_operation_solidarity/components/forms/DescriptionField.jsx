const DescriptionField = ({ task, setTask }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-primary-800"
        htmlFor="description"
      >
        Request Description
      </label>
      <input
        type="textarea"
        id="description"
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-xs placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        required
        placeholder="Write your request here"
      />
    </div>
  );
};

export default DescriptionField;
