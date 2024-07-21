import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="flex flex-row items-baseline justify-between px-5 lg:px-20 py-4 font-bold">
        <Link to="/" className="text-xl">
          Cars2Compare
        </Link>
        <ul className="flex gap-5 items-baseline">
          <CustomLink to="/Search"> Search</CustomLink>
          <CustomLink to="/CarsSaved">Saved Cars</CustomLink>
          <CustomLink to="/Review">Review A Car</CustomLink>

          <CustomLink
            to="/SignIn"
            className="border-2 border-black p-2 rounded-xl hover:bg-black hover:text-white"
          >
            Sign In
          </CustomLink>
        </ul>
      </nav>
    </>
  );
};

function CustomLink({ to, children, ...props }) {
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
export default Navbar;
