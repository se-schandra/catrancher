import React from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {renderHook, act} from "@testing-library/react-hooks";
import useService from "../components/useService";
import {cleanup} from "@testing-library/react";

const mock = new MockAdapter(axios);

describe("test useService hook", () => {

    const url = "test_url";
    afterEach(() => {
        cleanup();
    });


    it("it renders default value and gets updated on fetch resolve", async() => {

        mock.onGet(url, { delayResponse: 2000 }).replyOnce(200, {
            cats: [
                { name:"1ttr" }
            ]
        });
        let hook;
        act(() => {
            hook = renderHook(() => useService(url,[]));
        });
        const {result,waitForNextUpdate} = hook;
        expect(result.current.data).toEqual([]);
        expect(result.current.error).toEqual("");
        expect(result.current.loading).toEqual(true);

        await waitForNextUpdate();

        const data = result.current.data;
        expect(data.cats.length).toEqual(1);
        expect(data.cats[0].name).toEqual("1ttr" );
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual("");
    });

    it("it renders default value and gets updated on fetch reject", async() => {

        mock.onGet(url).networkErrorOnce();
        let hook;
        act(() => {
            hook = renderHook(() => useService(url,[]));
        });
        const {result,waitForNextUpdate} = hook;
        expect(result.current.data).toEqual([]);
        expect(result.current.error).toEqual("");
        expect(result.current.loading).toEqual(true);

        await waitForNextUpdate();

        const data = result.current.data;
        expect(data.length).toEqual(0);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).not.toEqual("");
    });

});


