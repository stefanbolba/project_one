import styles from "./UserNav.module.scss";

const UserNav = () => {
  return (
    <ul className={styles.nav}>
      <li className='p-0'>
        <button>
          <picture>
            <img src='/img/icons/search.svg' alt='Search' width={30} height={30} />
          </picture>
        </button>
      </li>
      <li>Profile</li>
    </ul>
  );
};

export default UserNav;
