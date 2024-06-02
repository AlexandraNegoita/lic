import * as PIXI from "pixi.js";
import { Wall } from "./Wall";
export class Object extends PIXI.Sprite {
    setup(){};
    checkAngle(wall: Wall) {}
    drawTemporary(x: number, y: number) {}
    drawPermanent(x: number, y: number) {}
    export(){}
    update(){}

}