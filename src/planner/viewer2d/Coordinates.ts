import { Model } from "../model/Model";
import { Board } from "./Board";

export class Coordinates {
    public x: number = 0;
    public y: number = 0;
    constructor(x?: number, y?:number) {
        if(x) this.x = x;
        if(y) this.y = y;
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

    snapToExisting(model:Model, x: number, y:number): number[] {
        let positions:number[] = [];
      //  console.log(board.points);
        model.walls.forEach(function (wall) {
            if(Math.abs(x - wall.wall.startPoint.coordX) <= 15){
            //    console.log(x + " " + coord);
                x = wall.wall.startPoint.coordX;
            }
            if(Math.abs(x - wall.wall.endPoint.coordX) <= 15){
                //    console.log(x + " " + coord);
                x = wall.wall.endPoint.coordX;
            }
            if(Math.abs(y - wall.wall.startPoint.coordY) <= 15){
                y = wall.wall.startPoint.coordY;
            }
            if(Math.abs(y - wall.wall.endPoint.coordY) <= 15){
                y = wall.wall.endPoint.coordY;
            }
        });
        positions.push(x);
        positions.push(y);
        return positions;
    }
    
}