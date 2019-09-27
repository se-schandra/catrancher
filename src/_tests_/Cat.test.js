import React from "react";
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Cat from "../components/Cat";

describe("Cat renders without crash", () => {
    afterEach(() => {
        cleanup();
    });

    it("Cat renders null if data not availabe", () => {
        render(<Cat/>);
        expect(document.body.children.length).toEqual(1);
        expect(document.body.children[0]).toContainHTML("");
    });

    it("Cat renders when data is available", () => {
        render(<Cat data="test"/>);
        const image = document.querySelector("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "http://quantcats.herokuapp.com/static/cats/test.png");
    });


});
