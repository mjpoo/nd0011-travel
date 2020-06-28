import { oneDay } from "../src/client/js/date";

describe("Testing the date functionality", () => {
    test("Testing the oneDay() calculation", () => {
        expect(oneDay()).toBe(86400000);
    });
});
