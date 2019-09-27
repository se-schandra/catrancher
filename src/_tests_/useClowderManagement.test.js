import React from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {act, renderHook} from "@testing-library/react-hooks";
import useClowderManagement from "../components/useClowderManagement";
import {cleanup} from "@testing-library/react";

const mock = new MockAdapter(axios);

describe("test useClowderManagement hook", () => {

    const url = "http://quantcats.herokuapp.com/bag";
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });


    it("it renders default value and gets updated on fetch resolve", async() => {

        mock.onGet(url).replyOnce(200, {cats: [[2, "t", "s", "r"]]});
        let hook;
        act(() => {
            hook = renderHook(() => useClowderManagement());
        });
        const {result,waitForNextUpdate} = hook;
        expect(result.current.data).toEqual([]);
        expect(result.current.error).toEqual("");
        expect(result.current.loading).toEqual(true);

        await waitForNextUpdate();

        const data = result.current.data;
        expect(data.length).toEqual(1);
        expect(data[0].id).toEqual("2tsr");
        expect(data[0].selected).toEqual(false);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual("");
    });

    it("it renders default value and gets updated on fetch reject", async() => {

        mock.onGet(url).networkErrorOnce();
        let hook;
        act(() => {
            hook = renderHook(() => useClowderManagement());
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

    /* it("when update selection is called thrice, validate clowder is called and selection is reset ", async () => {

         mock.onGet(url).replyOnce(200, {cats: [[1, "t", "s", "r"], [2, "t", "s", "r"], [3, "t", "s", "r"]]});

         let validClowder = false;
         mock.onGet("http://quantcats.herokuapp.com/clowder").replyOnce(function(config) {
             return new Promise(function(resolve, reject) {
                 validClowder = true;
                 resolve({valid:true})
             });
         });

         let hook;
         act(() => {
             hook = renderHook(() => useClowderManagement());
         });
         const {result,waitForNextUpdate} = hook;

         await waitForNextUpdate();

         expect(result.current.data.length).toEqual(3);
         act(() => {
             result.current.updateCatSelection("1tsr");
         });
         await waitForNextUpdate();

         expect(result.current.data[0].selected).toEqual(true);
         act(() => {
             result.current.updateCatSelection("2tsr");
         });
         await waitForNextUpdate();
         expect(result.current.data[1].selected).toEqual(true);
         act(() => {
             result.current.updateCatSelection("3tsr");
         });

         await waitForNextUpdate();

         expect(validClowder).toEqual(true);
         expect(result.current.data[0].selected).toEqual(false);
         expect(result.current.data[1].selected).toEqual(false);
         expect(result.current.data[2].selected).toEqual(false);
     });*/
});


