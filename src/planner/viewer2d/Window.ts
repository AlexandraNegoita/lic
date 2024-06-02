import * as PIXI from "pixi.js";
import { Wall } from "./Wall";
import { Model } from "../model/Model";
import { SpriteManager } from "./SpriteManager";
import { Object } from "./Object";

export class Window extends Object {
    texturePath: string ='';
    partOfWall: Wall;
    model: Model;
    windowID: number = 0;
    constructor(partOfWall: Wall, model : Model, spriteManager: SpriteManager) {
        super(spriteManager.windowTexture);
        this.texturePath = spriteManager.windowPath;
        this.partOfWall = partOfWall;
        this.model = model;
    }
    setup() {
        //this.partOfWall.objects.push(this);
        this.anchor.set(0.5);
        this.height = this.partOfWall.lineWidth;
        this.width = 90;
    }

    checkAngle(wall: Wall) {
        //distance
        var wall1X = (this.x + 0.5) - (this.x - 0.5);
        var wall1Y = 0; //this.y - this.y
        var wall2X = wall.endPosition[0] - wall.startPosition[0];
        var wall2Y = wall.endPosition[1] - wall.startPosition[1];
        var angle = Math.atan2(wall1X * wall2Y - wall1Y * wall2X, wall1X * wall2X + wall1Y * wall2Y);
       // if(angle < 0) {angle = angle * -1;}
        var degree_angle = 180 - angle * (180 / Math.PI);
        return angle;
        //if(degree_angle > 90) return false;
        //return true;
    }

    drawTemporary(x: number, y: number) {
        this.alpha = 0.5;
        this.rotation = this.checkAngle(this.partOfWall);
        this.x = x;
        this.y = y;
    }

    drawPermanent(x: number, y: number) {
        this.alpha = 1;
        if((((x + 0.5) > this.partOfWall.startPosition[0] && (x - 0.5) < this.partOfWall.endPosition[0]) ||
        ((x + 0.5) < this.partOfWall.startPosition[0] && (x - 0.5) > this.partOfWall.endPosition[0]))){
            this.rotation = this.checkAngle(this.partOfWall);
            this.x = x;
            this.y = y;
        }
        this.export();
    }

    export(){
        let windowID = this.model.addToObjects('window', this.x, this.y, this.partOfWall.wallID);
        if(windowID) this.windowID = windowID;
    }

    update(){
        this.model.updateWindow(this.windowID, {
            window: {
                windowID: this.windowID,
                centerPoint: {
                    coordX: this.x,
                    coordY: this.y
                },
                partOfWall: this.partOfWall.wallID
            }
        });
    }
}