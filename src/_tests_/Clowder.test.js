import React from "react";
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Clowder from "../components/Clowder";

describe("Cat renders without crash", () => {
    afterEach(() => {
        cleanup();
    });

    it("Cat renders null if data not availabe", () => {
        render(<Clowder/>);
        expect(document.body.children.length).toEqual(1);
        expect(document.body.children[0]).toContainHTML("");
    });

    it("Cat renders when data is available", () => {
        const anArray = ["test1", "test2"];
        render(<Clowder data={anArray} index={0}/>);
        const row = document.querySelectorAll("tr");
        expect(row.length).toEqual(1);
        const columns = document.querySelectorAll("td");
        expect(columns.length).toEqual(2);
        expect(columns[0]).toContainHTML("test1");
        expect(columns[1]).toContainHTML("test2");
    });


});
