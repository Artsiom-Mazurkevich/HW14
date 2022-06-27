import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import {Header} from "./Pages/header/Header";
import {Profile} from "./Pages/Profile";
import {Login} from "./Pages/login/Login";
import {Registration} from "./Pages/Register/Registration";
import {Test} from "./Pages/Test";
import {RecoveryPassword} from "./Pages/RecoveryPassword";
import {ForgotPassword} from "./Pages/ForgotPassword";
import {ErrorPages} from "./Pages/ErrorPages";

function App() {

    return (
        <div className="app">
            <div className="content">
                <Header/>
                <div className="wrapper">
                    <Routes>
                        <Route path={"/profile"} element={<Profile/>}></Route>
                        <Route path={"/login"} element={<Login/>}></Route>
                        <Route path={"/registration"}
                               element={<Registration/>}></Route>
                        <Route path={"/test"} element={<Test/>}></Route>
                        <Route path={"/recovery"}
                               element={<RecoveryPassword/>}></Route>
                        <Route path={"/forgot"}
                               element={<ForgotPassword/>}></Route>
                        <Route path={"error"} element={<ErrorPages/>}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
