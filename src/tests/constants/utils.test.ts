import { getFirstUserLetters, validateName, generateLink, generateCards } from "../../lib/constants/utils";

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
    //this function must return a list of cards
    test('generate normal Cards', () => {
        const cards = generateCards('normal');
        expect(typeof cards).toBe('object');
        expect(cards).toHaveLength(12);
        expect(cards[0].content).toBe('0');
        expect(cards[9].content).toBe('9');
        expect(cards[10].content).toBe('☕');
        expect(cards[11].content).toBe('?');


    });
    //this function must return a list of cards in fibonnacci sequence
    test('generate fibonacci Cards', () => {
        const cards = generateCards('fibonacci');
        expect(typeof cards).toBe('object');
        expect(cards).toHaveLength(12);
        const cardSequence = cards.map((card) => !"☕?".includes(card.content) ? card.content : null).filter(el => el !== null).join(',');
        const sequence = "0,1,2,3,5,8,13,21,34,55"
        expect(cardSequence).toBe(sequence);
        expect(cards[10].content).toBe('☕');
        expect(cards[11].content).toBe('?');
    });
    //this function must return a list of cards in tenX sequence
    test('generate tenX Cards', () => {
        const cards = generateCards('tenX');
        expect(typeof cards).toBe('object');
        expect(cards).toHaveLength(12);
        const cardSequence = cards.map((card) => !"☕?".includes(card.content) ? card.content : null).filter(el => el !== null).join(',');
        const sequence = "0,10,20,30,40,50,60,70,80,90"
        expect(cardSequence).toBe(sequence);
        expect(cards[10].content).toBe('☕');
        expect(cards[11].content).toBe('?');
    });
});

