import React from 'react';
import {act, cleanup, render, wait} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from '../components/App';

describe("renders without crash",()=>{

    afterEach(() => {
        cleanup();
    });

    it("App renders header and container component", async () => {
        act(()=>{
            render(<App/>);
        });
        await wait(() => {
            expect(document.querySelector("header")).toHaveTextContent("Tech Test");
            expect(document.querySelector("div.container")).toBeInTheDocument();
        })
    });

});
