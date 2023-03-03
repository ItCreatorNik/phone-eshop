import Skeleton from '@mui/material/Skeleton';
import styles from './User.module.scss';
import {useSelector} from "react-redux";
import {selectEmail, selectUserName, selectIsLoggedIn} from "../../store/slice/authSlice";
export const User = () => {

  const email = useSelector(selectEmail);
  const username = useSelector(selectUserName);

  return (
    <div className="container">
      <h2 className={styles.user__title}>User Page</h2>
    <div className={styles.user__wrapper}>
        {selectIsLoggedIn ? (<div><div>name: {username}</div><div>email: {email}</div></div>): (<div>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
        </div>)
        }
    </div>

    </div>

  )
}
