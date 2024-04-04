import * as PIXI from "pixi.js";
import { Board } from "./Board";
import { Model } from "../model/Model";
export class Wall extends PIXI.Graphics {

    drawPosition: number[] = [0,0];
    lineTempWidth: number;
    lineTempColor: string;
    lineWidth: number;
    lineColor: string;
    constructor(lineSize?: number, lineColor?: string) {
        super();
        this.lineTempWidth = 2;
        this.lineWidth = lineSize || 5;
        this.lineTempColor = "0xFF0000";
        this.lineColor = lineColor || "0x530000";
    }
    moveToPoint(board: Board, x: number, y: number): this {
        this.drawPosition = this.snapToPoint(board, x, y);
		return super.moveTo(x, y);
	}
    lineTo(x: number, y: number): this {
		return super.lineTo(x, y);
	}
    drawTemporaryWall(board: Board, x: number, y: number) {
        this.clear();
        //const points = mouse_points.map((val, index) => val || this.points[index]);
        //this.points = points;
        this.moveToPoint(board, this.drawPosition[0], this.drawPosition[1]);
        let newPos : number[] = this.snapToPoint(board, x, y);
        this.lineTo(newPos[0], newPos[1]);
        this.stroke({ width: this.lineTempWidth, color: this.lineTempColor });
    }
    drawPermanentWall(board:Board, x: number, y: number) {
        this.clear();
        let newPos : number[] = this.snapToPoint(board, x, y);
        //console.log(x, y, newPos[0], newPos[1], this.drawPosition[0], this.drawPosition[1]);
        this.moveToPoint(board, this.drawPosition[0], this.drawPosition[1]);
        this.lineTo(newPos[0], newPos[1]);
        this.stroke({ width: this.lineWidth, color: this.lineColor });
    }

    snapToPoint(board:Board, x: number, y:number): number[] {
        let positions:number[] = [];
      //  console.log(board.points);
        board.points.forEach(function (coord) {
            if(Math.abs(x - coord.x) <= 15){
            //    console.log(x + " " + coord);
                x = coord.x;
            }
            if(Math.abs(y - coord.y) <= 15){
                y = coord.y;
            }
        });
        positions.push(x);
        positions.push(y);
        return positions;
    }

}
