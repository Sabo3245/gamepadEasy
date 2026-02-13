# 🎮 gamepadEasy

A lightweight abstraction over the browser Gamepad API that provides:

- Clean button state access
- Structured axes access
- Continuous polling
- Event-based button input (press / release)

This library removes the need to manually handle `navigator.getGamepads()` and state comparisons every frame.

---

# Installation

```console
  npm install gamepad-easy
```

---

# Quick Start

```js
const gp = new Gamepad();

gp.listen((e) => {
  if (e.buttons.a) {
    console.log("Holding A");
  }

  if (e.axes.leftStick.x > 0.5) {
    console.log("Moving Right");
  }
});
```

---

# State Object Structure

The callback passed into `listen()` receives a structured object `e`:

```js
e = {
  buttons: {
    a: boolean,
    b: boolean,
    x: boolean, 
    y: boolean,
    lb:boolean,
    rb:boolean,
    lt:boolean,
    rt:boolean,
    back:boolean,
    start:boolean,
    ls:boolean,
    rs:boolean,
    dpadUp:boolean,
    dpadDown:boolean,
    dpadLeft:boolean,
    dpadUp:boolean
  },

  axes: {
    leftStick: {
      x: Number,
      y: Number
    },
    rightStick: {
      x: Number,
      y: Number
    }
  },

  triggers:{
    lt:number , 
    rt:number
  }
}
```

---

# Continuous Listening

`listen(callback)` continuously polls the connected gamepad using `requestAnimationFrame`.

```js
gp.listen((e) => {
  if (e.buttons.a) {
    console.log("A is being held");
  }
});
```

---

# Event-Based Input

Instead of manually checking button states every frame, you can subscribe to button events.

These events fire only when the button state changes (edge-triggered).

---

## on

Fires once when the button is pressed.

```js
gp.on("a:press", () => {
  console.log("A was pressed");
});
```

---

Fires once when the button is released.

```js
gp.on("a:release", () => {
  console.log("A was released");
});
```

---

# Axes Access

You can directly read joystick values:

```js
gp.listen((e) => {
  const x = e.axes.leftStick.x;
  const y = e.axes.leftStick.y;

  if (x > 0.5) {
    console.log("Moving Right");
  }

  if (y < -0.5) {
    console.log("Moving Up");
  }
});
```

Axis values range from:

```
-1.0  → Full Left / Up
 0.0  → Neutral
 1.0  → Full Right / Down
```

---

# Features

- Simple structured state object
- Clean button naming
- Stick abstraction
- Continuous polling
- Edge-triggered button events
- Easy integration into games and web apps

---

# Browser Support

Works in modern browsers that support the Gamepad API.

---


