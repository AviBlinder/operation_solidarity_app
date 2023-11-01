export default function Header({ title }) {
  return (
    <div className="hidden md:flex blue_gradient text-4xl capitalize">
      {title}
    </div>
  );
}
