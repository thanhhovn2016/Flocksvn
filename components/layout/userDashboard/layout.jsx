import { useMediaBreakpoints } from "../../../hooks";
import Header from "./header";
// import Footer from "./Footer";
import NewHeader from './newHeader'


const Layout = ({ children }) => {
  const { isMobile } = useMediaBreakpoints();
  return (
    <>
    <NewHeader>
      {/* <Header > */}
      <main style={{ padding: isMobile ? "1rem 0 1rem 1rem" : "1rem 0 1rem 0" }}>
        {children}
      </main>
      {/* </Header> */}
    </NewHeader>
    </>
  );
};

export default Layout;