import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render, act} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import App from '../components/App';

describe("renders without crash",()=>{

    afterEach(() => {
        cleanup();
    });

    it("App renders header and container component", () => {
        act(()=>{
            render(<App/>);
        })
        expect(document.querySelector("header")).toHaveTextContent("Tech Test");
        expect(document.querySelector("div.container")).toBeInTheDocument();
        cleanup();
    });

});
