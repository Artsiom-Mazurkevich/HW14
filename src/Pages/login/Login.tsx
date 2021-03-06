import React, {useEffect} from "react";
import {useFormik} from "formik";
import style from "./Login.module.css"
import {
    Checkbox,
    FormControl, FormControlLabel,
    FormGroup,
    FormLabel,
    TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {loginTC} from "../../bll/reducers/login-reducer";
import {Navigate, useNavigate} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
}

export const Login = () => {
    const navigate = useNavigate();


    const divError = (top: string) => ({
        width: "100%",
        color: "red",
        position: "absolute",
        right: "0px",
        fontSize: "16px",
        top: `${top}px`,
    } as {})

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 7) {
                errors.password = "password should be at least seven symbols";
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    });

    // useEffect(() => {
    //     if (isInitialized) {
    //         return navigate('/profile')
    //     }
    // }, [])
    if (isInitialized) {
        return <Navigate to={"/profile/"}/>
    }


    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <form onSubmit={formik.handleSubmit}
                      className={style.formRegister}>
                    <FormControl className={style.inputs}>
                        <FormLabel>
                            <p className={style.titleItInc}>it-incubator</p>
                            <p className={style.signUp}>Sign Up</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       variant="standard"
                                       fullWidth
                                       {...formik.getFieldProps("email")}/>
                            {formik.touched.email && formik.errors.email ? <div style={divError('184')}>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       variant="standard"
                                       {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password
                                ? <div
                                    style={divError('255')}>{formik.errors.password}</div>
                                : null}
                            {/*<Checkbox {...formik.getFieldProps("rememberMe")}>?????????????????? ????????</Checkbox>*/}
                            <FormControlLabel
                                control={
                                <>
                                <Checkbox value="remember" color="primary"/>
                                    <span className={style.forgot_password}><a
                                        href="/forgot">Forgot Password</a></span>
                                </>
                                }
                                label="Remember me"
                                {...formik.getFieldProps('rememberMe')}
                            />
                            {/*<span className={style.forgot_password}><a
                                href="/forgot">Forgot Password</a></span>*/}
                            <button type={"submit"}
                                    className={style.btn}>Login
                            </button>
                            <span className={style.dont_account}>Dont have an account</span>
                            <span className={style.linkSignup}><a
                                href="src/Pages/Profile/Profile">Sign
                                    up</a></span>
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    );
};
// 1 ??????????????: ???????????????? ???????????????? ??????????????????????: ?????????????????? ????????????, ???????????????? ???????????? ?????? ?????????????? ???? ???????????????? ????????????????


