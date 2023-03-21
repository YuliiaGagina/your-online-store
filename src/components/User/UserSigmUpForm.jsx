import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../styles/User.module.css";
import { createUser } from "./../../features/user/userSlice";

const UserSigmUpForm = ({ closeForm, toogleCurrentFormType }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some((val) => !val);
    if (isEmpty) return;
    dispatch(createUser(values));
    closeForm();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={styles.title}>Sign Up</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="name"
            placeholder="Your name"
            name="name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            requited
          />
        </div>
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
            type="avatar"
            placeholder="Your avatar"
            name="avatar"
            autoComplete="off"
            value={values.avatar}
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
          I already have an account{" "}
        </div>
        <button type="submit" className={styles.submit}>
          Create an account{" "}
        </button>
      </form>
    </div>
  );
};

export default UserSigmUpForm;
