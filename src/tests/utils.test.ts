import { getFirstUserLetters, validateName, generateLink } from "../lib/constants/utils";

describe('testing utils', () => {
    //this function must return the first two letters of the username on uppercase
    test('getFirstUserLetters', () => {
        expect(typeof getFirstUserLetters('John Doe')).toBe('string');
        expect(getFirstUserLetters('John Doe')).toBe('JD');
        expect(getFirstUserLetters('Doe')).toBe('DO');
        expect(getFirstUserLetters('')).toBe('');
        expect(getFirstUserLetters('J')).toBe('J');
    });
    //this function must validate the username to be valid
    test('validateName', () => {
        expect(() => validateName('JohnDoe')).not.toThrow();
        expect(() => validateName('John')).toThrow();
        expect(() => validateName('JohnDoe1234')).toThrow();
        expect(() => validateName('JohnDoe!')).toThrow();
        expect(() => validateName('John Doe123!')).toThrow();
        expect(() => validateName('125368')).toThrow();
    });
    //this function must return a link with the RoomId
    test('generateLink', () => {
        const BASE_URL = process.env.BASE_URL ?? 'http://localhost';
        expect(typeof generateLink('1234')).toBe('string');
        expect(generateLink('1234')).toBe(`${BASE_URL}/room/1234`);
    });
});

