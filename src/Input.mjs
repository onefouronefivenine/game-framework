import { Vector } from "./Vector.mjs";

export class Input
{
    constructor(game)
    {
        this._keystrokes = {};
        this._buttonDown = {};
        this._game = game;
        this._mousePosition = new Vector(0, 0);
    }
    get buttonDown(){return this._buttonDown;}
    get keystrokes(){return this._keystrokes;}
    get mousePosition(){return this._mousePosition;}

    __Start__()
    {
        document.body.addEventListener("contextmenu", e=>{e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();});
        window.addEventListener("keydown", e => {
            this._keystrokes[e.key.toLowerCase()] = true;
        })
        window.addEventListener("keyup", e => {
            this._keystrokes[e.key.toLowerCase()] = false;
        })
        window.addEventListener("mousemove", e => {
            this._mousePosition = new Vector(e.clientX, e.clientY);
        })
        window.addEventListener("mousedown", e => {
            const params = {
                position: new Vector(e.clientX, e.clientY),
                clicked: true
            }
            this._buttonDown[e.button] = params;
        })
        window.addEventListener("mouseup", e => {
            const params = {
                position: new Vector(e.clientX, e.clientY),
                clicked: false
            }
            this._buttonDown[e.button] = params;
        })
    }

    ScreenToWorldPosition(position)
    {
        return new Vector(position.x - this._game.camera.position.x, position.y - this._game.camera.position.y);
    }

    ButtonToCode(button)
    {
        switch(button)
        {
            case "left": return 0;
            case "middle": return 1;
            case "right": return 2;
        }
    }
}