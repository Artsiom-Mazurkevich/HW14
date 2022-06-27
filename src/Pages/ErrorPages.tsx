import React from 'react';
import s from '../Styles/ErrorPage404.module.css'


export const ErrorPages = () => {
    return (
        <div className={s.page}>
            <div>
                <h1 className={s.title}>Page Not Found</h1>
                <section className={s.errorContainer}>
                    <span>4</span>
                    <span><span className={s.screenReaderText}>0</span></span>
                    <span>4</span>
                </section>
            </div>
        </div>
    );
};

