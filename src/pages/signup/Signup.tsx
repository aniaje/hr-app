import React, { useState, useEffect } from "react";
import api from "utils/api"; // eslint-disable-line no-use-before-define
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { IFormDataRegister } from "types";
import { useSignupUserMutation } from "redux/services/user";
import { notifySignupSuccess, notifyError } from "utils/toast/toastNotify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

import {
  SForm,
  SFormTitle,
  SInput,
  SRedirect,
  SRedirectLabel,
  Error,
} from "../../components/forms/Form.styles";

const defaultData = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  passwordConfirmation: "",
};

export const SignUp: React.FC = () => {
  // const [formValue, setFormValue] = useState(defaultData);
  // const { firstName, lastName, username, password, passwordConfirmation } =
  //   formValue;
  console.log("SignUp");

  const [
    signupUser,
    {
      data: signupData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
      isLoading,
    },
  ] = useSignupUserMutation();

  const navigate = useNavigate();

  const registerValidation = yup.object().shape({
    firstname: yup.string().required("Your Name is Required"),
    lastname: yup.string().required(),
    username: yup.string().email("Invalid Email address").required(),
    password: yup
      .string()
      .required("Please Enter your password")
      .max(20)
      .min(5, "Minimum length is 5"),
    passwordConfirmation: yup
      .string()
      .required("Please fulfill this field.")
      .oneOf([yup.ref("password"), null], "Passwords should match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormDataRegister>({
    mode: "onBlur",
    defaultValues: defaultData,
    resolver: yupResolver(registerValidation),
  });

  const onSubmit = async (signupData: IFormDataRegister) => {
    console.log("dupa");
    try {
      const result = await signupUser(signupData);
      notifySignupSuccess();
      if (!isRegisterSuccess) {
        setTimeout(() => navigate("/signin"), 2000);
      }
    } catch (error) {
      notifyError();
    }
  };

  return (
    <>
      <ToastContainer />
      <SFormTitle> Sign Up </SFormTitle>
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <SInput
          {...register("firstname")}
          name="firstname"
          type="text"
          placeholder="First name"
        />
        <Error aria-live="assertive">{errors.firstname?.message}</Error>
        <SInput
          {...register("lastname")}
          name="lastname"
          type="text"
          placeholder="Last Name"
        />
        <Error aria-live="assertive">{errors.lastname?.message}</Error>
        <SInput
          {...register("username")}
          name="username"
          type="text"
          placeholder="Email"
        />
        <Error aria-live="assertive">{errors.username?.message}</Error>
        <SInput
          {...register("password")}
          name="password"
          type="password"
          placeholder="Password"
        />
        <Error aria-live="assertive">{errors.password?.message}</Error>
        <SInput
          {...register("passwordConfirmation")}
          name="passwordConfirmation"
          type="password"
          placeholder="Retype Password"
        />
        <Error aria-live="assertive">
          {errors.passwordConfirmation?.message}
        </Error>

        <button disabled={!isValid && !isDirty} type="submit">
          Sign Up
        </button>

        <SRedirect>
          <SRedirectLabel>
            Already have an account? <br />
            Then <span> </span>
            <Link to="/signin">Sign in</Link>
          </SRedirectLabel>
        </SRedirect>
      </SForm>
    </>
  );
};
