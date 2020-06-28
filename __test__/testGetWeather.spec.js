import { getWeather } from "../src/client/js/weather";

describe("Testing the weather functionality", () => {
    test("Testing the getWeather() function exists", () => {
           expect(getWeather).toBeDefined();
    });
});
