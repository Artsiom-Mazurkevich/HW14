import React from "react";
import {useFormik} from "formik";
import style from "./Login.module.css"
import {
    Button,
    Checkbox,
    FormControl, FormControlLabel,
    FormGroup,
    FormLabel,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import s from "../Register/Registration.module.css";

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
                <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                    <FormControl style={{width: '90%'}}>
                        <FormLabel>
                            <p className={style.titleItInc}>it-incubator</p>
                            <p className={style.signUp}>login</p>
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
                            {formik.touched.password && formik.errors.password ?
                                <div
                                    style={{color: "red"}}>{formik.errors.password}</div> : null}
                            {/*<FormControlLabel label={"Remember me"}
                                              name="rememberMe"
                                              control={
                                                  <Checkbox {...formik.getFieldProps("rememberMe")}
                                                            checked={formik.values.rememberMe}

                                                  />}

                            />*/}

                            {/*    <Button type={"submit"} variant={"contained"} color={"primary"} className={style.btn}>
                                Login
                            </Button>*/}
                            <button type={'submit'} className={style.btn}>Login</button>

                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>

    );
};
// 1 студент: создание страницы логинизации: отправить запрос, показать ошибку или перейти на страницу профайла

// <Grid container justifyContent={"center"}>
{/*<Grid item justifyContent={"center"}>*/
}

// </Grid>
// </Grid>
/*<div className={s.root}>
            <form>

            </form>
        </div>*/