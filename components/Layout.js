// import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../styles/Home.module.css';
const Layout = ({ children }) => {
  return (
    <div>
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
