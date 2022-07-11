import React from "react";
import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./Pages/header/Header";
import {Profile} from "./Pages/Profile/Profile";
import {Login} from "./Pages/login/Login";
import {Registration} from "./Pages/Register/Registration";
import {Test} from "./Pages/Test";
import {RecoveryPassword} from "./Pages/RecoveryPassword";
import {ForgotPassword} from "./Pages/ForgotPassword";
import {PATH} from "./enum/path";
import {ErrorSnackbar} from "./Components/common/errorBar/ErrorBar";

export const App = React.memo(() => {

    /*const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.login.isAuth)

    useEffect(() => {
        dispatch(authMeTC());
    }, [dispatch, isAuth])*/

    return (
        <div className="app">
            <ErrorSnackbar/>
            <div className="content">
                <Header/>
                <div className="wrapper">
                    <Routes>
                        <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>
                        <Route path={PATH.PROFILE} element={<Profile/>}></Route>
                        <Route path={PATH.LOGIN} element={<Login/>}></Route>
                        <Route path={PATH.REGISTRATION} element={<Registration/>}></Route>
                        <Route path={PATH.TEST} element={<Test/>}></Route>
                        <Route path={PATH.RECOVERY} element={<RecoveryPassword/>}></Route>
                        <Route path={PATH.FORGOT} element={<ForgotPassword/>}></Route>
                        {/*<Route path={"/*"} element={<ErrorPages/>}></Route>*/}
                    </Routes>
                </div>
            </div>
        </div>
    );
})
