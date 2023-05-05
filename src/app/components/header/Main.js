import Link from "next/link";
import styles from "./Main.module.scss";

const Main = () => {
  return (
    <ul className={styles.nav}>
      <li>
        <Link href='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link href='/mailbox'>MailBox</Link>
      </li>
      <li>
        <Link href='/docs'>Docs</Link>
      </li>
      <li>
        <Link href='/reports'>Reports</Link>
      </li>

      <li>
        <Link href='/customers'>Customers</Link>
      </li>
    </ul>
  );
};

export default Main;
