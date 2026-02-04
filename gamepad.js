/**
 * @typedef {Object} GamepadState
 * @property {{ leftStick: { x: number, y: number }, rightStick: { x: number, y: number } }} axes
 * @property {{ a: boolean, b: boolean, x: boolean, y: boolean,lb:boolean,rb:boolean,lt:boolean,rt:boolean,back:boolean,start:boolean,ls:Blob,rs:boolean,dpadUp:boolean,dpadDown:boolean,dpadLeft:boolean,dpadUp:boolean }} buttons
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

    pulse(x,y ){
        const gamepad = navigator.getGamepads()[this.index];
        gamepad.vibrationActuator[0].pulse(x,y);
    }


     loop(){
        const gamepad = navigator.getGamepads()[this.index];

        const state = {
            buttons: {}
        }

        gamepad.buttons.forEach((btn,i)=>{
            state.buttons[BUTTON_MAP[i]] = btn.pressed;
        })

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



