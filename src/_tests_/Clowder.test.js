import React from "react";
import {cleanup, render, wait, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
describe("Clowder renders without crash", () => {
    afterEach(() => {
        cleanup();
    });

    it("Clowder renders default value",  () => {
    });

});
