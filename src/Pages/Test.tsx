import React from 'react';
import SuperButton from "../Components/SuperButton/SuperButton";
import SuperInputText from "../Components/SuperInput/SuperInputText";
import SuperCheckbox from "../Components/SuperCheckbox/SuperCheckbox";

export const Test = () => {
    return (
        <div>
          <h1>Test</h1>
            <SuperButton>Test</SuperButton>
            <SuperInputText placeholder={'test'}/>
            <SuperCheckbox/>
        </div>
    );
};

