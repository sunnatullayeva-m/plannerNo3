import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.scss'
import { PiDeviceTabletSpeakerLight } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { SlNotebook } from "react-icons/sl";
import { RxTable } from "react-icons/rx";
import { PiTimer } from "react-icons/pi";


function Layout() {
    return (
        <section>


            <header className={styles.header}>

                <h1 className={styles.logo}>EraPlanner</h1>
                <p className={styles.logo1}>Organize. Progress. Thrive. Your Time, Optimized.</p>
                {/* <hr className={styles.hr} /> */}


            </header>

            <Outlet />

            <footer>


                <nav className='nav' style={{ display: 'flex', justifyContent: 'space-around', fontSize: '17px' }}>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? `${styles.nav} ${styles.active}` : styles.nav}
                    >

                        < GoHome className={styles.icon}/>
                    </NavLink>

                    <NavLink
                        to='/table'
                        className={({ isActive }) => isActive ? `${styles.nav} ${styles.active}` : styles.nav}
                    >
                        <  RxTable className={styles.icon} />
                    </NavLink>

                    <NavLink
                        to='/project'
                        className={({ isActive }) => isActive ? `${styles.nav} ${styles.active}` : styles.nav}
                    >
                        <SlNotebook className={styles.icon1}/>
                    </NavLink>

                    <NavLink
                        to='/time'
                        className={({ isActive }) => isActive ? `${styles.nav} ${styles.active}` : styles.nav}
                    >

                        <PiTimer className={styles.icon} />
                    
                    </NavLink>

                    
                </nav>

            </footer>

        </section>
    )
}

export default Layout;
