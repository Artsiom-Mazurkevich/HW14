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
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p style={{textAlign: "center"}}>it-incubator</p>
                            <p style={{textAlign: "center"}}>login</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       {...formik.getFieldProps("email")}/>
                            {formik.touched.email && formik.errors.email ? <div
                                style={{color: "red"}}>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div
                                    style={{color: "red"}}>{formik.errors.password}</div> : null}
                            <FormControlLabel label={"Remember me"}
                                              name="rememberMe"
                                              control={
                                                  <Checkbox {...formik.getFieldProps("rememberMe")}
                                                            checked={formik.values.rememberMe}
                                                  />}

                            />
                            {/*<span className={style.btn}>*/}
                                <Button type={"submit"} variant={"contained"} color={"primary"} className={style.btn}>
                                Login
                            </Button>
                            {/*</span>*/}
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>

    );
};

// <Grid container justifyContent={"center"}>
{/*<Grid item justifyContent={"center"}>*/
}

// </Grid>
// </Grid>
/*<div className={s.root}>
            <form>

            </form>
        </div>*/