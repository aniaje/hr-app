import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeTokenInLocalStorage } from "auth/common";
import { notifySuccess, notifyError } from "utils/toast/toastNotify";
import { IFormDataLogin } from "types";
import { ToastContainer } from "react-toastify";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useSigninUserMutation } from "redux/services/user";
import { useAppDispatch } from "redux/hook";
import * as yup from "yup";
import { setUser } from "redux/authUser";
import {
  Form,
  FormControl,
  FormTitle,
  Input,
  Checkbox,
  Redirect,
  ShowIcon,
  RedirectLabel,
  CheckboxLabel,
  Error,
} from "../../components/forms/Form.styles";

const defaultData = {
  username: "",
  password: "",
};

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [signinUser, { isLoading, error }] = useSigninUserMutation();
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

      <FormTitle> Login </FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          {/* <SLabel>E-mail</SLabel> */}
          <Input
            {...register("username")}
            name="username"
            type="text"
            placeholder="Email"
          />
        </FormControl>
        <Error>{errors.username?.message}</Error>
        <FormControl>
          <Input
            {...register("password")}
            name="password"
            type={passwordShown ? "text" : "password"}
            placeholder="Password"
          />

          <ShowIcon type="button" onClick={togglePassword}>
            {passwordShown ? <AiFillEyeInvisible /> : <AiOutlineEye />}
          </ShowIcon>
        </FormControl>
        <Error>{errors.password?.message}</Error>
        <FormControl>
          <Checkbox
            {...register("remember")}
            placeholder="Remember"
            name="remember"
            type="checkbox"
          />
          <CheckboxLabel htmlFor="remember">Remember me</CheckboxLabel>
        </FormControl>
        <button disabled={!isValid && !isDirty} type="submit">
          sign in
        </button>
        <Redirect>
          <RedirectLabel>
            Dont have an account?
            <Link onClick={() => navigate("/signup")} to="/signup">
              <br />
              Click here to create one
            </Link>
          </RedirectLabel>
        </Redirect>
      </Form>
    </>
  );
};
