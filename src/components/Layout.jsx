import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="px-6">{children}</main>
    </div>
  );
}

export default Layout;
