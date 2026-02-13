/**
 * @typedef {Object} GamepadState
 * @property {{ leftStick: { x: number, y: number }, rightStick: { x: number, y: number } }} axes
 * @property {{ a: boolean, b: boolean, x: boolean, y: boolean,lb:boolean,rb:boolean,lt:boolean,rt:boolean,back:boolean,start:boolean,ls:Blob,rs:boolean,dpadUp:boolean,dpadDown:boolean,dpadLeft:boolean,dpadUp:boolean }} buttons
 * @property {{lt:number , rt:number}} triggers
 */

const gamepads = [];

const BUTTON_MAP = {
  0: "a",
  1: "b",
  2: "x",
  3: "y",
  4: "lb",
  5: "rb",
  6: "lt",
  7: "rt",
  8: "back",
  9: "start",
  10: "ls",
  11: "rs",
  12: "dpadUp",
  13: "dpadDown",
  14: "dpadLeft",
  15: "dpadRight"
};



export default class Gamepad {
    constructor(index = 0){
        this.index = index;
        this.listeners = []
        this.onListeners = {}
        this.prevButtons = {};

    }
        /**
         * @param {(state: GamepadState) => void} cb
         */
        listen(cb) {
        this.listeners.push(cb);
        }


    start() {
        const gamepad = navigator.getGamepads()[this.index];
        this.loop(gamepad);
    }

    on(eventName, callback) {
        if (!this.onListeners[eventName]) {
            this.onListeners[eventName] = [];
        }

        this.onListeners[eventName].push(callback);
    }

    emit(eventName, data) {
        const handlers = this.onListeners[eventName];
        if (!handlers) return;

        handlers.forEach(cb => cb(data));
    }


     loop(){
        const gamepad = navigator.getGamepads()[this.index];

        if(!gamepad){
            requestAnimationFrame(this.loop.bind(this))
            return;
        }

        const state = {
            buttons: {},
            triggers : {}
        }

        gamepad.buttons.forEach((btn,i)=>{
            state.buttons[BUTTON_MAP[i]] = btn.pressed;

            const name = BUTTON_MAP[i];
            if (!name) return;

            const wasPressed = this.prevButtons[name] || false;
            const isPressed = btn.pressed;

            if (isPressed && !wasPressed) {
            this.emit(`${name}:press`,{
                button:name,
                value: btn.value
            });
            }

            if (!isPressed && wasPressed) {
            this.emit(`${name}:release`);
            }

            this.prevButtons[name] = isPressed;
        })

        state["triggers"] = {
            lt : gamepad.buttons[6].value,
            rt: gamepad.buttons[7].value
        }

        state["axes"] = {
            leftStick:{
                x:gamepad.axes[0],
                y:gamepad.axes[1]
            },
            rightStick:{
                x:gamepad.axes[2],
                y:gamepad.axes[3]
            }
        };    


        this.listeners.forEach(cb=>cb(state))
        window.requestAnimationFrame(this.loop.bind(this));
    
    }
}



