// import { describe } from 'yargs'
import { getDaysInMonth, getFirstDayOfMonth, getMonthName } from '../calendar'


describe("Calendar Utility Functions", () => {
    test("getDaysInMonth returns correct days for February in leap year", () => {
        expect(getDaysInMonth(2024, 1)).toBe(29); // Feb 2024
    });

    test("getDaysInMonth returns correct days for April", () => {
        expect(getDaysInMonth(2025, 3)).toBe(30); 
    });

    test("getFirstDayOfMonth returns correct day index for Jan 2025", () => {
        expect(getFirstDayOfMonth(2025, 0)).toBe(3); // Wednesday
    });

    test("getMonthName returns correct month name", () => {
        expect(getMonthName(0)).toBe("January");
        expect(getMonthName(11)).toBe("December");
    });
});