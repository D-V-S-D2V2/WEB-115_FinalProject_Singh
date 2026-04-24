# 2d Snake Game
**WEB-115 Final Project Proposal**

Student: Darsh Pratap Singh | Repo: `WEB-115_FinalProject_Singh`

---

## Overview

This is a customizable web-based 2D Snake game that lets users define their own playing field. Before playing, the user inputs their desired grid dimensions, and the app dynamically generates the game board. Once the game begins, the player controls the snake to collect apples, growing longer and increasing their score with each one. The game continues until the snake collides with a wall its own tail, or all spaces are filled.

The target user is anyone looking for a quick, retro arcade experience with the added twist of customizing the difficulty through board size. All high scores are saved locally, allowing users to compete against their past runs even after closing the browser.

---

## Features

- Custom Game Board: Users input the grid size and click a button to dynamically generate the playing field.
- Start & Reset Controls: A dedicated start button begins the game loop, and the board can be reset after a game over.
- Collision Detection: The game tracks the snake's coordinates in real-time, instantly ending the run if it hits the boundary walls or its own body.
- Score Tracking: The current score updates live as apples are eaten.
- Persistent High Scores: The highest score achieved is saved to `localStorage` and displayed on the screen across sessions.

---

## Core Requirements Coverage

| Requirement | Implementation |
|---|---|
| **If Statements & Loops** | if statements are heavily used for collision detection (checking if the snake's head coordinates match a wall, its own body, or an apple). The core game relies on a continuous loop to repeatedly update the snake's position and re-render the grid until a game-over or win condition is met. |
| **Event Listeners** | A click listener on the "Create Game" button reads the user's input to build the grid. A click listener on the "Start" button triggers the game loop. An active keydown event listener monitors arrow key presses to update the snake's directional velocity.|
| **DOM Element Creation** | The entire visual interface of the game is dynamically created using document.createElement. This includes the game container, every individual grid cell (based on the user's size input), the start button, and the score displays.|
| **Classes & Subclasses** | A base GridEntity class holds shared properties like x and y coordinates and a render() method. Two subclasses extend it: a Snake subclass (which adds an array for the body segments and a move() method) and an Apple subclass (which adds a respawn() method to pick random open coordinates). |

---


## DLC — Additional Topics

### JSON & Local Storage
To keep players engaged, the game utilizes `localStorage` to save their personal best. When a game ends, the app checks if the current score is higher than the saved high score. If it is, `JSON.stringify()` formats the new record, and it is saved to the browser. On page load, `JSON.parse()` retrieves the high score so the user immediately sees the target they need to beat.

---

## Tech Stack

- HTML, CSS, Vanilla JavaScript
- `localStorage` for high score persistence
- VS Code + GitHub
