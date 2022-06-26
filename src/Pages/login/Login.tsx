import React from "react";
import {useFormik} from "formik";
import style from "./Login.module.css"
import {
    FormControl,
    FormGroup,
    FormLabel,
    TextField
} from "@mui/material";
import {NavLink} from "react-router-dom";


export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });


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
                            {formik.touched.email && formik.errors.email ? <div
                                style={{color: "red"}}>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       variant="standard"
                                       {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password
                                ? <div
                                    style={{color: "red"}}>{formik.errors.password}</div>
                                : null}
                            <span className={style.forgot_password}><a href="forgot">Forgot Password</a></span>
                            <button type={"submit"}
                                    className={style.btn}>Login
                            </button>
                            <span className={style.dont_account}>Dont have an account</span>
                            <span className={style.linkSignup}><a href="profile">Sign
                                    up</a></span>
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>

    );
};
// 1 студент: создание страницы логинизации: отправить запрос, показать ошибку или перейти на страницу профайла


