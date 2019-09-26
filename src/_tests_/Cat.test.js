import React from "react";
import {cleanup, render, wait, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
describe("Cat renders without crash", () => {
    afterEach(() => {
        cleanup();
    });

    it("Cat renders default value",  () => {
    });

});
