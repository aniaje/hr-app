import React, { useState } from "react";
import api from "utils/api"; // eslint-disable-line no-use-before-define
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeTokenInLocalStorage } from "auth/common";
import { notifySuccess, notifyError } from "utils/toast/toastNotify";
import { IFormDataLogin } from "types";
import { ToastContainer } from "react-toastify";
import { useSigninUserMutation } from "redux/services/user";
import { useAppDispatch } from "redux/hook";
import * as yup from "yup";
import { setUser } from "redux/authUser";
import {
  SForm,
  SFormControl,
  SFormTitle,
  SInput,
  SCheckbox,
  SRedirect,
  SShowIcon,
  SRedirectLabel,
  SCheckboxLabel,
  Error,
} from "../../components/forms/Form.styles";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";

const defaultData = {
  username: "",
  password: "",
};

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [signinUser, { data, isLoading, error, isError, isSuccess }] =
    useSigninUserMutation();
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const loginValidation = yup.object().shape({
    username: yup.string().email().required("Please Enter your Email"),

    password: yup
      .string()
      .required("Please Enter your password")
      .max(20)
      .min(5, "Minimum length is 5"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormDataLogin>({
    mode: "onBlur",
    defaultValues: defaultData,
    resolver: yupResolver(loginValidation),
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = async (data: IFormDataLogin) => {
    try {
      const result = await signinUser(data).unwrap();
      const accessToken = result?.access_token;
      dispatch(
        setUser({
          token: result?.access_token,
          username: data.username,
        })
      );
      storeTokenInLocalStorage(accessToken);
      navigate("/profile");
    } catch (err) {
      if (error) {
        console.error("Unautheticated.");
      }
      notifyError();
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <ToastContainer />

      <SFormTitle> Login </SFormTitle>
      <SForm onSubmit={handleSubmit(onSubmit)}>
        <SFormControl>
          {/* <SLabel>E-mail</SLabel> */}
          <SInput
            {...register("username")}
            name="username"
            type="text"
            placeholder="Email"
          />
        </SFormControl>
        <Error>{errors.username?.message}</Error>
        <SFormControl>
          <SInput
            {...register("password")}
            name="password"
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
          />

          <SShowIcon type="button" onClick={togglePassword}>
            {passwordShown ? <AiFillEyeInvisible /> : <AiOutlineEye />}
          </SShowIcon>
        </SFormControl>
        <Error>{errors.password?.message}</Error>
        <SFormControl>
          <SCheckbox
            {...register("remember")}
            placeholder="Remember"
            name="remember"
            type="checkbox"
          />
          <SCheckboxLabel htmlFor="remember">Remember me</SCheckboxLabel>
        </SFormControl>
        <button disabled={!isValid && !isDirty} type="submit">
          sign in
        </button>
        <SRedirect>
          <SRedirectLabel>
            Dont have an account?
            <Link onClick={() => navigate("/signup")} to="/signup">
              <br />
              Click here to create one
            </Link>
          </SRedirectLabel>
        </SRedirect>
      </SForm>
    </>
  );
};
