import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../styles/User.module.css";
import { loginUser } from "./../../features/user/userSlice";

const UserLoginForm = ({ closeForm, toogleCurrentFormType }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some((val) => !val);
    if (isEmpty) return;
    dispatch(loginUser(values));
    closeForm();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={styles.title}>Log In</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            requited
          />
        </div>

        <div className={styles.group}>
          <input
            type="passwor"
            placeholder="Your password"
            name="password"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
            requited
          />
        </div>
        <div
          className={styles.link}
          onClick={() => {
            toogleCurrentFormType("login");
          }}
        >
          {" "}
          Firstly create an account{" "}
        </div>
        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default UserLoginForm;
