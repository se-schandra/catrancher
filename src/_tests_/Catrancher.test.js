import React from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {act, cleanup, render, wait} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Catrancher from "../components/Catrancher";

const mock = new MockAdapter(axios);
const testUrl = "http://quantcats.herokuapp.com/bag";

describe("Catrancher renders without crash", () => {

    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it("Catrancher renders empty page before cat list is loaded", async () => {
        mock.onGet(testUrl).replyOnce(200, {
            cats: [
                [
                    2,
                    "t",
                    "s",
                    "r"
                ]
            ]
        });
        let component;
        act(() => {
            component = render(<Catrancher/>);
        });
        const {getByTestId, queryByTestId} = component;
        expect(document.body).toContainHTML("Loading...");
        expect(queryByTestId("cat-list")).toBeNull();
        expect(queryByTestId("clowders-list")).toBeNull();
        await wait(() => {
            expect(document.body).not.toContainHTML("Loading...");
            expect(getByTestId("catrancher-container")).toBeInTheDocument();
            expect(queryByTestId("cat-list-data-error")).toBeNull();
            expect(getByTestId("cats-list")).toBeInTheDocument();
            expect(getByTestId("clowders-list")).toBeInTheDocument();
        });
    });

    it("Catrancher renders error if error is receive", async () => {
        mock.onGet(testUrl).networkErrorOnce();
        let component;
        act(() => {
            component = render(<Catrancher/>);
        });
        const {getByTestId, queryByTestId} = component;
        expect(queryByTestId("cats-list")).toBeNull();
        expect(queryByTestId("clowders-list")).toBeNull();
        await wait(() => {
            expect(document.body).not.toContainHTML("Loading...");
            expect(queryByTestId("catrancher-container")).toBeNull();
            expect(getByTestId("cat-list-data-error")).toBeInTheDocument();
            expect(queryByTestId("cats-list")).toBeNull();
            expect(queryByTestId("clowders-list")).toBeNull();
        });
    });

});
