import React from 'react';
import {useFormik} from "formik";
import {FormControl, FormGroup, FormLabel, TextField} from "@mui/material";
import s from './Registration.module.css'
import app from '../login/Login.module.css'
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {registerTC} from "../../bll/reducers/registration-reducer";


type FormikErrorType = {
    email?:string
    password?:string
    confirmPassword?:string
}

export const Registration = () => {

    const divError = (top: string) => ({
        width: '100%',
        color:"red",
        position: 'absolute',
        right: '0px',
        fontSize: '16px',
        top: `${top}px`,
    } as {})

    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.auth.isRegistered)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
        onSubmit: values => {
            // registerAPI.register(values.email, values.password).then(r => console.log(r))
            dispatch(registerTC(values.email, values.password))
            // alert(JSON.stringify(values, null, 2));
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'password should be at least seven symbols';
            }
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'password does not match';
            }
            return errors;
        },
    });


    if (isRegistered) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className={app.wrapper}>
            <div className={s.containerRegister}>
                <form className={s.formRegister} onSubmit={formik.handleSubmit}>
                    <FormControl className={s.inputs}>
                        <FormLabel>
                            <p className={s.titleItInc}>it-incubator</p>
                            <p className={s.signUp}>Sign Up</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       variant="standard"
                                       color={'secondary'}
                                       fullWidth
                                       {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? <div style={divError('184')}>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       variant="standard"
                                       color={'secondary'}
                                       fullWidth
                                       {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? <div style={divError('255')}>{formik.errors.password}</div> : null}
                            <TextField type="password"
                                       label="Confirm Password"
                                       margin="normal"
                                       variant="standard"
                                       color={'secondary'}
                                       fullWidth
                                       {...formik.getFieldProps("confirmPassword")}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                <div style={divError('327')}>{formik.errors.confirmPassword}</div> : null}

                            <div className={s.groupButton}>
                                <button className={s.btnCancel}>Cancel</button>
                                {/*<Button type={'submit'}*/}
                                {/*        variant={'contained'}*/}
                                {/*        style={*/}
                                {/*            {*/}
                                {/*                borderRadius: '32px',*/}
                                {/*                width: '187px',*/}
                                {/*                height: '36px',*/}
                                {/*                backgroundColor: '#21268F',*/}
                                {/*            }*/}
                                {/*        }*/}
                                {/*>*/}
                                {/*    Register*/}
                                {/*</Button>*/}
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