import styles from './auth.module.scss'
import resetImg from "../../assets/forgot.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { Loader } from '../../components/loader/Loader';

export const Reset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false);
                toast.success("Check your email for a reset link");
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    }

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={resetImg} alt="Reset Password" width="400" />
                </div>
                    <div className={styles.form}>
                        <h2>Login</h2>
                        <form onSubmit={resetPassword}>
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className={styles.btn}>
                                Reset Password
                            </button>
                            <div className={styles.links}>
                                <p>
                                    <Link to="/login">Login</Link>
                                </p>
                                <p>
                                    <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </form>



                    </div>
            </section>
        </>
    )
}