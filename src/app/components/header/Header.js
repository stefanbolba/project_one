import Main from "./Main";
import UserNav from "./UserNav";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className='w-100 d-flex justify-content-between'>
        <Main />
        <UserNav />
      </nav>
    </header>
  );
};

export default Header;
