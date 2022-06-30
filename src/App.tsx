import React, {useEffect} from "react";
import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {Header} from "./Pages/header/Header";
import {Profile} from "./Pages/Profile";
import {Login} from "./Pages/login/Login";
import {Registration} from "./Pages/Register/Registration";
import {Test} from "./Pages/Test";
import {RecoveryPassword} from "./Pages/RecoveryPassword";
import {ForgotPassword} from "./Pages/ForgotPassword";
import {ErrorPages} from "./Pages/ErrorPages";
import {PATH} from "./enum/path";
import {useAppDispatch, useAppSelector} from "./bll/store";
import {authMe} from "./bll/reducers/app-reducers";
import {Loader} from "./Components/common/Loader";

function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state=>state.app.isInitialized)

    useEffect(()=>{
    dispatch(authMe())
    },[])

    if(!isInitialized){
        return <Loader/>
    }

    return (
        <div className="app">
            <div className="content">
                <Header/>
                <div className="wrapper">
                    <Routes>
                        {/*<Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>*/}
                        <Route path={PATH.PROFILE} element={<Profile/>}></Route>
                        <Route path={PATH.PROFILE} element={<Login/>}></Route>
                        <Route path={PATH.REGISTRATION} element={<Registration/>}></Route>
                        <Route path={PATH.TEST} element={<Test/>}></Route>
                        <Route path={PATH.RECOVERY} element={<RecoveryPassword/>}></Route>
                        <Route path={PATH.FORGOT} element={<ForgotPassword/>}></Route>
                        <Route path={"/*"} element={<ErrorPages/>}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
