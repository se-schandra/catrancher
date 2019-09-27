import React from "react";
import {cleanup, fireEvent, render} from '@testing-library/react';
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
        expect(image).not.toHaveAttribute("onClick");
    });

    it("call click handler on click event", () => {
        const clickHandler = jest.fn();
        render(<Cat data="test" updateCatSelection={clickHandler}/>);
        const image = document.querySelector("img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "http://quantcats.herokuapp.com/static/cats/test.png");
        expect(image).not.toHaveAttribute("onClick");
        fireEvent.click(image);
        expect(clickHandler).toHaveBeenCalledTimes(1);
    });


});
