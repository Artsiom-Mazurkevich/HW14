import React from 'react';
import s from '../Styles/RootStyles.module.css'
import {PacksList} from "./Packs_List/PacksList";

export const ForgotPassword = () => {
    return (
        <div className={s.root}>
            <PacksList/>
        </div>
    );
};

