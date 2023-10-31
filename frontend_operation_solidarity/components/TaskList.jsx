import TaskCard from '@/components/TaskCard';

const TaskList = ({ tasks }) => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {tasks.length > 0 &&
        tasks.map((task, index) => <TaskCard key={index} task={task} />)}
    </ul>
  );
};

export default TaskList;
