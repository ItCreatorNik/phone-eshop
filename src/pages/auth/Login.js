import styles from './auth.module.scss'
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../../components/loader/Loader';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate()

    const redirectUser = () => {
        navigate("/");
    };

    const loginUser = (e) => {
        e.preventDefault()
        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsLoading(false);
                toast.success("Login Successful...");
                redirectUser()
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });

    };

    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success("Login Successfully");
                redirectUser()
            }).catch((error) => {
                toast.error(error.message);
            });
    }


    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImg} alt="Login" width="400" />
                </div>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={loginUser}>
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className={styles.btn}>
                            Login
                        </button>
                        <div className={styles.links}>
                            <Link to="/reset">Reset Password</Link>
                        </div>
                        <p>-- or --</p>
                    </form>

                    <button
                        className={styles.btn}
                        onClick={signInWithGoogle}
                    >
                        <FaGoogle color="#fff" /> Login With Google
                    </button>
                    <span className={styles.register}>
                        <p>Don't have an account?</p>
                        <Link to="/register">Register</Link>
                    </span>
                </div>
            </section>
        </>
    )
}
