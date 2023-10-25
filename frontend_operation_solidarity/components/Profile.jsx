import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  return session?.user.id ? (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}'s Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  ) : (
    <section>
      <h1 className="head_text text-left">
        <span className="blue_gradient">Profile</span>
      </h1>
      <p className="desc text-left">Please login to view your profile</p>
    </section>
  );
};

export default Profile;
