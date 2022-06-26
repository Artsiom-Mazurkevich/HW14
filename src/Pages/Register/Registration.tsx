import React from 'react';
import {useFormik} from "formik";
import {FormControl, FormGroup, FormLabel, TextField} from "@mui/material";
import s from './Registration.module.css'
import app from '../login/Login.module.css'
import {Navigate} from "react-router-dom";

export const Registration = () => {


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    /*if(true){
        return <Navigate to={"/login"}/>
    }*/


    return (
        <div className={app.wrapper}>
            <div className={s.containerRegister}>
                <form onSubmit={formik.handleSubmit} className={s.formRegister}>
                    <FormControl className={s.inputs}>
                        <FormLabel>
                            <p className={s.titleItInc}>it-incubator</p>
                            <p className={s.signUp}>Sign Up</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       variant="standard"
                                       fullWidth
                                       {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       variant="standard"
                                       fullWidth
                                       {...formik.getFieldProps("password")}
                            />
                            <TextField type="password"
                                       label="Confirm Password"
                                       margin="normal"
                                       variant="standard"
                                       fullWidth
                                       {...formik.getFieldProps("confirmPassword")}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: "red"}}>{formik.errors.password}</div> : null}

                            <div className={s.groupButton}>
                                <button className={s.btnCancel}>Cancel</button>
                                <button type={'submit'} className={s.btnRegister}>Register</button>
                            </div>

                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>

    );
};

// 2 студент: создание страницы регистрации: отправить запрос, показать ошибку или перейти на страницу логинизации