import styles from "./Header.module.scss"
import { BsCart } from "react-icons/bs"
import { AiOutlineUser } from "react-icons/ai"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { ShowOnLogin, ShowOnLogout } from "../hiddenLink/hiddenLink";
import { REMOVE_ACTIVE_USER, selectIsLoggedIn, SET_ACTIVE_USER } from "../../store/slice/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../store/slice/cartSlice";


const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")

export const Header = () => {

    const [displayName, setdisplayName] = useState("");

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const cartTotalQuantity = useSelector(selectCartTotalQuantity);


    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Logout Successful...", {
                position: toast.POSITION.TOP_LEFT
            });
            navigate("/")
        }).catch((error) => {
            toast.error(error.message, {
                position: toast.POSITION.TOP_LEFT,
            });
        });
    };

    const checkout = () => {
        if (isLoggedIn) {
            navigate("/user");
        } else {
            navigate("/login");
            toast.info("Account is not authorized", {
                position: toast.POSITION.TOP_LEFT,
            })
        }
    };


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.displayName == null) {
                    const u1 = user.email.slice(0, -10);
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
                    setdisplayName(uName);
                } else {
                    setdisplayName(user.displayName);
                }

                dispatch(
                    SET_ACTIVE_USER({
                        email: user.email,
                        userName: user.displayName ? user.displayName : displayName,
                        userID: user.uid,
                    })
                );
            } else {
                setdisplayName("");
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName]);

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, []);

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.header__wrapper}>

                    <div className={styles.header__logo}>
                        <Link to="/">
                            <h2>
                                <span>NONAME.DIGITAL</span>
                            </h2>
                        </Link>
                    </div>

                    <nav className={styles.header__nav}>
                        <ul className={styles["header__nav-links"]}>
                            <NavLink to="/" className={activeLink} end>
                                <li className={styles["header__nav-link"]}>Home</li>
                            </NavLink>
                        </ul>
                    </nav>

                    <div className={styles.header__auth}>
                        <ul className={styles["header__auth-links"]}>
                            <ShowOnLogout init>
                                <NavLink to="/login" className={activeLink}>
                                    <li className={styles["header__auth-link"]}>Login</li>
                                </NavLink>
                            </ShowOnLogout>
                            <ShowOnLogin>
                                <NavLink to="/" >
                                    <li className={styles["header__auth-link"]} onClick={logoutUser}>Logout</li>
                                </NavLink>
                            </ShowOnLogin>
                        </ul>

                        <div className={styles.header__icons}>

                            <div className={styles.header__icon} onClick={checkout}>
                                <AiOutlineUser size={20} />
                                <ShowOnLogin>
                                    {displayName}
                                </ShowOnLogin>
                            </div>

                            <NavLink to="/cart" className={activeLink}>
                                <BsCart size={20} className={styles.header__icon} />
                                <span>{cartTotalQuantity}</span>
                            </NavLink>
                        </div>
                    </div>

                </div>

            </div>
        </header>
    )
}
