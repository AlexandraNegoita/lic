export class Model {
    wallIndex: number = 0;
    roomIndex: number = 0;
    public rooms: {
        room: {
            roomID: number,
            wallsID: number[]
        }
    }[] = [];
    public walls: { 
        wall: {
            wallID: number,
            startPoint: {
                coordX: number,
                coordY:number
            }; 
            endPoint: {
                coordX: number, 
                coordY:number
            }; 
            wallHeight: number
        }
    }[] = []; 
    
    addToWalls(startPointX: number, startPointY: number, endPointX: number, endPointY: number, wallHeight: number): number {
        this.walls.push({
            wall: {
                wallID: this.wallIndex,
                startPoint :{
                    coordX: startPointX,
                    coordY: startPointY
                },
                endPoint: {
                    coordX: endPointX,
                    coordY: endPointY
                },
                wallHeight: wallHeight
            }
        });
        return this.wallIndex ++;
    }
    addToRooms(wallsID: number[]) {
        this.rooms.push({
            room: {
                roomID: this.roomIndex,
                wallsID: wallsID
            }
        })
    }

    toJSON(): string {
        let model = {
            rooms: this.rooms,
            walls: this.walls
        };
        return JSON.stringify(model);
    }
}