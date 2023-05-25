"use client";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className='pl-2 pr-2'>
      <h1>Dashboard</h1>
      <div className={styles.container}>
        {Array.from(Array(6).keys()).map((i) => (
          <div className={styles.card} key={i}>
            <h2 className={styles.title}>Container 1</h2>
            <p className='text-muted'>Tickets</p>
            <div className='d-flex justify-content-between'>
              <span>Unassigned:</span>
              <span>10</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span>Asigned:</span>
              <span>10</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span>Mine:</span>
              <span>10</span>
            </div>
            <div className='text-warning d-flex justify-content-between'>
              <span>High Priority:</span>
              <span>1</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
