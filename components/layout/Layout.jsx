import Header from "./Header";
import Footer from "./Footer";
import HotProject from "./HotProject";

import { CalendarIcon } from "../icons";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: "#F8F8F8", marginTop: 45 }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
