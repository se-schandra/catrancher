import React from "react";
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Clowders from "../components/Clowders";

describe("Cat renders without crash", () => {
    afterEach(() => {
        cleanup();
    });

    it("Clowder renders null if data not available", () => {
        render(<Clowders/>);
        expect(document.body.children.length).toEqual(1);
        expect(document.body.children[0]).toContainHTML("");
    });

    it("Clowder renders when data is available", () => {
        const anArray = [
            ["test1", "test2"],
            ["test3", "test4"]
        ];
        render(<Clowders clowderList={anArray}/>);

        const row = document.querySelectorAll("tr");
        expect(row.length).toEqual(2);
        const columns = document.querySelectorAll("td");
        expect(columns.length).toEqual(4);
        expect(columns[0]).toContainHTML("test1");
        expect(columns[1]).toContainHTML("test2");
        expect(columns[2]).toContainHTML("test3");
        expect(columns[3]).toContainHTML("test4");
    });


});
