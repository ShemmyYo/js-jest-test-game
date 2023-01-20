/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");

    document.open();
    document.write(fileContents);
    document.close();
})



describe("game object contains correct keys", () => {
    test("score key exist", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exist", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exist", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exist", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exist", () => {
        expect("turnNumber" in game).toBe(true);
    });
})


describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ["button1", "button2"];
        game.playerMoves = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
        
    });
    test("should set game score to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("should be one element in the computer's array", () => {
        expect(game.currentGame.length).toBe(1);
    })
    test("should set player moves to 0", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 for the element of id score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByName("circle");
        for (element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
    
} )


describe("game play works correctly", () => {
    beforeEach(() => {
        game.score = 
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn add a new urn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should upate game.turnNumber", () => {
        game.turnNumber = 43;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
});

//describe("", () => {

//})