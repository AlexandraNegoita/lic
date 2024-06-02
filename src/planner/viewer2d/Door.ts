import * as PIXI from "pixi.js";
import { Wall } from "./Wall";
import { Model } from "../model/Model";
import { SpriteManager } from "./SpriteManager";
import { Object } from "./Object";

export class Door extends Object {
    texturePath: string ='';
    partOfWall: Wall;
    model: Model;
    doorID: number = 0;
    constructor(partOfWall: Wall, model : Model, spriteManager: SpriteManager) {
        super(spriteManager.doorTexture);
        this.texturePath = spriteManager.doorPath;
        this.partOfWall = partOfWall;
        this.model = model;
    }
    setup() {
        this.partOfWall.objects.push(this);
        this.anchor.set(this.partOfWall.lineWidth / this.width);
        this.scale = 0.2;
        //this.height = this.partOfWall.lineWidth *10;
        //this.width = 90;
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
        this.x = x ;
        this.y = y - this.partOfWall.lineWidth / 2 ;
    }

    drawPermanent(x: number, y: number) {
        this.alpha = 1;
        if((((x + 0.5) > this.partOfWall.startPosition[0] && (x - 0.5) < this.partOfWall.endPosition[0]) ||
        ((x + 0.5) < this.partOfWall.startPosition[0] && (x - 0.5) > this.partOfWall.endPosition[0]))){
            this.rotation = this.checkAngle(this.partOfWall);
            this.x = x;
            this.y = y - this.partOfWall.lineWidth / 2;
        }
        this.export();
    }

    export(){
        let doorID = this.model.addToObjects('door', this.x, this.y, this.partOfWall.wallID);
        if(doorID) this.doorID = doorID;
    }

    update(){
        this.model.updateDoor(this.doorID, {
            door: {
                doorID: this.doorID,
                centerPoint: {
                    coordX: this.x,
                    coordY: this.y
                },
                partOfWall: this.partOfWall.wallID
            }
        });
    }
}