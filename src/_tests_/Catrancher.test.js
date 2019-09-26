import React from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {cleanup, render, wait, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Catrancher from "../components/Catrancher";

const mock = new MockAdapter(axios);
const testUrl = "http://quantcats.herokuapp.com/bag";

describe("Catrancher renders without crash", () => {
    afterEach(() => {
        cleanup();
    });

    it("Catrancher renders empty page before cat list is loaded", async () => {
        mock.onGet(testUrl).replyOnce(200, {
            cats: [
                { name:"1ttr" }
            ]
        });
        let component;
        act(() => {
            component = render(<Catrancher/>);
        });
        const {getByTestId, queryByTestId} = component;
        expect(queryByTestId("cat-list")).toBeNull();
        expect(queryByTestId("clowders-list")).toBeNull();
        wait(() => {
            expect(getByTestId("catrancher-container")).toBeInTheDocument();
            expect(getByTestId("cat-list")).toBeInTheDocument();
            expect(getByTestId("clowders-list")).toBeInTheDocument();
        });
    });

});
