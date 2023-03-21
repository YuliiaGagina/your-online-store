import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSigmUpForm from "./UserSigmUpForm";

import UserLoginForm from "./UserLoginForm";
import styles from "../../styles/User.module.css";
import { toogleform, toogleFormType } from "../../features/user/userSlice";

const UserForm = () => {
  const { showform, formType } = useSelector(({ user }) => user);
  const distatch = useDispatch();
  const closeForm = () => distatch(toogleform(false));
  const toogleCurrentFormType = (type) => distatch(toogleFormType(type));

  return showform ? (
    <>
      {" "}
      <div className={styles.overlay} onClick={closeForm} />
      {formType === "signup" ? (
        <UserSigmUpForm
          toogleCurrentFormType={toogleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toogleCurrentFormType={toogleCurrentFormType}
          closeForm={closeForm}
        />
      )}{" "}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
