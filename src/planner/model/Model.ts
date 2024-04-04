import * as fs from "fs";


export class Model {
    public walls: { 
        wall: {
            startPoint: {
                coordX: number; 
                coordY:number
            }; 
            endPoint: {
                coordX: number; 
                coordY:number
            }; 
        }
    }[] = []; 
    
    addToWalls(startPointX: number, startPointY: number, endPointX: number, endPointY: number) {
        this.walls.push({
            wall: {
                startPoint :{
                    coordX: startPointX,
                    coordY: startPointY
                },
                endPoint: {
                    coordX: endPointX,
                    coordY: endPointY
                }
            }
        })
    }
    toJSON(): string {
        return JSON.stringify(JSON.stringify({walls: this.walls}));
    }
}