# 🎮 gamepadEasy

A lightweight JavaScript helper library that simplifies the Web Gamepad API by providing
a clean, readable input state for **buttons** and **axes**.

Instead of manually polling and dealing with raw indices, this library gives you a
structured state object every frame.

---

## ✨ Features (Current)

- Clean `listen()` API
- Named buttons (no numeric indices)
- Normalized analog stick axes
- Stable state object passed every frame

---

## 🚀 Basic Usage

```js
const pad = new Gamepad(0); // change 0 for multiple controllers 

pad.listen((e) => {
  if (e.buttons.a) {
    console.log("A button is pressed");
  }

  if (e.axes.leftStick.x > 0.5) {
    console.log("Moving right");
  }
});

pad.start();
