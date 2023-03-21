import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateteUser } from "./../../features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const handleChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some((val) => !val);
    if (isEmpty) return;
    dispatch(updateteUser(values));
  };
  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>Ypu need to login</span>
      ) : (
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

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
