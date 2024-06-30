import * as PIXI from 'pixi.js';
import { Wall } from './Wall';
import { Board } from './Board';
import { Model } from '../model/Model';
import { GripPoint } from './GripPoint';
import { Coordinates } from './Coordinates';
import { Room } from './Room';
import { SpriteManager } from './SpriteManager';
import { Roof } from './Roof';
import { Plan } from '../model/Parser';

export enum editMode {
    NONE,
    EDIT,
    GRIPPOINT,
    WINDOW,
    DOOR,
    ROOF
}
export class Viewer2D extends PIXI.Application {
    spriteManager: SpriteManager = new SpriteManager();
    walls : Wall[] = [];
    roofs : Roof[] = [];
    rooms: Room[] =[];
    board: Board = new Board();
    model: Model = new Model();
    wall: Wall = new Wall();
    roof: Roof = new Roof();
    room : Room = new Room();
    backgroundLayer = new PIXI.Container();
    wallsLayer = new PIXI.Container();
    roofLayer = new PIXI.Container();
    roomsLayer = new PIXI.Container();
    gripPointsLayer = new PIXI.Container();
    objectsLayer = new PIXI.Container();
    isMouseDown: boolean = false;
    drawMode: string = 'wall';
    editMode: boolean = false;
    edit: editMode = editMode.NONE;
    gripPoints: GripPoint[] = [];
    coords: Coordinates = new Coordinates();
    
    get canvas(): HTMLCanvasElement {
        return super.canvas;
    }
    constructor() {
        super();
    }
    async init(options?: Partial<PIXI.ApplicationOptions> | undefined): Promise<void>{
        return super.init(options);
    }
    
    async setup(spriteManager: SpriteManager) {
        this.spriteManager = spriteManager;
       this.stage.addChild(this.backgroundLayer);
       this.board.drawBoard(this, this.backgroundLayer);
       this.wall.setup(this.model, this.board, this.spriteManager);
     //  console.log(this.board.points);
       this.stage.addChild(this.roomsLayer);
       this.stage.addChild(this.wallsLayer);
       this.stage.addChild(this.roofLayer);
       this.stage.addChild(this.gripPointsLayer);
       this.stage.addChild(this.objectsLayer);
       this.objectsLayer.addChild(this.wall.getObjects());
       this.wall.addChild(this.wall.getObjects());

       this.objectsLayer.addChild(this.roof.getObjects());
       this.roof.addChild(this.roof.getObjects());
       
       this.room.setup(this.model, this.board);
       this.wallsLayer.addChild(this.wall);
       this.roofLayer.addChild(this.roof);
       if(this.editMode == false) {
            this.stage.eventMode = 'dynamic';
       } else {
            this.stage.eventMode = "passive";
            this.stage.interactive = false;
       }
       
       this.isMouseDown = false;
       this.stage.on('mousedown',  (e) => {
            if(this.edit == editMode.NONE) {
                if(this.isMouseDown == true) {
                    this.isMouseDown = false;
                    if(this.drawMode == 'wall') {
                        this.wallsLayer.addChild(this.wall.getGripPoints());
                        this.objectsLayer.addChild(this.wall.getObjects());
                        this.wall.addChild(this.wall.getObjects());
                        this.tryPermanentGripPoint(e.data.global.x, e.data.global.y);
                        this.wall.drawPermanent(e.data.global.x, e.data.global.y);
                        this.gripPointsLayer.addChild(this.wall.getGripPoints());
                        this.updateRooms();
                        this.wall.tryRoom(e.data.global.x, e.data.global.y);
                    } else {
                        this.room.drawPermanentRoom(e.data.global.x, e.data.global.y);
                        this.wallsLayer.addChild(this.room.getWalls());
                        this.gripPointsLayer.addChild(this.room.getGripPoints());
                        this.objectsLayer.addChild(this.wall.getObjects());
                        this.tryPermanentGripPoint(e.data.global.x, e.data.global.y);
                    }
                    
                } 
                if(this.drawMode == 'wall') {
                    this.wall = new Wall();
                    this.wall.setup(this.model, this.board, this.spriteManager);
                    this.wall.addChild(this.wall.getObjects());
                    this.wallsLayer.addChild(this.wall);
                    this.walls.push(this.wall);
                    this.gripPointsLayer.addChild(this.wall.getGripPoints());
                    this.wall.moveToPoint( e.data.global.x, e.data.global.y);
                    this.wall.drawTemporary(e.data.global.x, e.data.global.y);
                } else {
                    this.room = new Room();
                    this.room.setup(this.model, this.board);
                    this.roomsLayer.addChild(this.room);
                    this.wallsLayer.addChild(this.room.getWalls());
                    this.rooms.push(this.room);
                    this.gripPointsLayer.addChild(this.room.getGripPoints());
                    
                    this.room.moveToPoint(e.data.global.x, e.data.global.y);
                    this.room.drawTemporaryRoom(e.data.global.x, e.data.global.y);
                }
                //console.log('Mouse clicked: ' + this.wall.drawPosition);
                this.isMouseDown = true;
            } else if(this.edit == editMode.ROOF) {
                if(this.isMouseDown == true) {
                    this.isMouseDown = false;
                        this.roofLayer.addChild(this.roof.getGripPoints());
                        this.objectsLayer.addChild(this.roof.getObjects());
                        this.roof.addChild(this.roof.getObjects());
                        this.tryPermanentGripPoint(e.data.global.x, e.data.global.y);
                        this.roof.drawPermanent(e.data.global.x, e.data.global.y);
                        this.gripPointsLayer.addChild(this.roof.getGripPoints());
                        this.updateRooms();
                        this.roof.tryRoom(e.data.global.x, e.data.global.y);
                } 
                this.roof = new Roof();
                this.roof.setup(this.model, this.board, this.spriteManager);
                this.roof.addChild(this.roof.getObjects());
                this.roofLayer.addChild(this.roof);
                this.roofs.push(this.roof);
                this.gripPointsLayer.addChild(this.roof.getGripPoints());
                this.roof.moveToPoint( e.data.global.x, e.data.global.y);
                this.roof.drawTemporary(e.data.global.x, e.data.global.y);
                this.room = new Room();
                this.room.setup(this.model, this.board);
                this.roomsLayer.addChild(this.room);
                this.roofLayer.addChild(this.room.getWalls());
                this.rooms.push(this.room);
                this.gripPointsLayer.addChild(this.room.getGripPoints());
                
                this.room.moveToPoint(e.data.global.x, e.data.global.y);
                this.room.drawTemporaryRoom(e.data.global.x, e.data.global.y);
                //console.log('Mouse clicked: ' + this.wall.drawPosition);
                this.isMouseDown = true;
            }
        });
        this.stage.on('mousemove', (e) => {
            if(this.edit == editMode.NONE) {
                if(this.isMouseDown) {
                    if(this.drawMode == 'wall') {
                        this.wall.drawTemporary(e.data.global.x, e.data.global.y);
                    } else {
                        this.wallsLayer.removeChild(this.room.getWalls());
                        this.room.drawTemporaryRoom(e.data.global.x, e.data.global.y);
                        this.wallsLayer.addChild(this.room.getWalls());
                    }
                    
                    //console.log('Mouse moved' + this.wall.drawPosition);
                }
            } else if (this.edit == editMode.WINDOW) {
                this.objectsLayer.addChild(this.wall.getObjects());
                this.wall.addChild(this.wall.getObjects());
               // console.log(this.objectsLayer);
            }else if (this.edit == editMode.DOOR) {
                this.objectsLayer.addChild(this.wall.getObjects());
                this.wall.addChild(this.wall.getObjects());
               // console.log(this.objectsLayer);
            }
            else if(this.edit == editMode.ROOF) {
                if(this.isMouseDown) {
                        this.roof.drawTemporary(e.data.global.x, e.data.global.y);
                    
                    
                    //console.log('Mouse moved' + this.wall.drawPosition);
                }
            }
        });
        this.stage.on('mouseup', (e) => {
            //console.log('Mouse released');
            // this.isMouseDown = false;
            // this.wall.drawPermanent(this.model,this.board, e.data.global.x, e.data.global.y);
            // console.log('X', e.data.global.x, 'Y', e.data.global.y);
        });
        this.stage.on('rightclick', (e) => {
            if(this.edit == editMode.NONE) {
                e.preventDefault();
                if(this.isMouseDown) {
                    if(this.drawMode == 'wall') {
                        this.wall.clearTemporary();
                    } else {
                        this.room.clear();
                        this.wallsLayer.removeChild(this.room.getWalls());
                    }
                    this.isMouseDown = false;
                }
            } else if(this.edit == editMode.ROOF) {
                e.preventDefault();
                if(this.isMouseDown) {
                    this.roof.clearTemporary();
                    
                    this.isMouseDown = false;
                }
            }
        })
        //this.ticker.add(delta=>this.update(delta));
       // console.log(this.stage.children);
    }


    tryPermanentGripPoint(x: number, y: number){
        if(this.edit == editMode.NONE) {
            let newPos : number[] = this.coords.snapToPoint(this.board, x, y);
            if(this.drawMode == 'wall') {
             console.log("try: " + this.wall.drawPosition[0] + " " + this.wall.drawPosition[1]);
            // console.log("try: " + newPos[0] + " " + newPos[1]);
                this.drawPermanentGripPoint(this.wall, this.wall.drawPosition[0], this.wall.drawPosition[1], "start");
                this.drawPermanentGripPoint(this.wall, newPos[0], newPos[1], "end");
                
            } else {
                
                this.room.walls.forEach(wall => {
                    console.log("walls in room: " + wall.drawPosition[0] + " " + wall.drawPosition[1] + ", "+ wall.endPosition[0] + " " + this.wall.endPosition[1])
                    this.drawPermanentGripPoint(wall, wall.drawPosition[0], wall.drawPosition[1], "start");
                    this.drawPermanentGripPoint(wall, wall.endPosition[0], wall.endPosition[1], "end");
                })
                // this.drawPermanentGripPoint(this.room.drawPosition[0], this.room.drawPosition[1], "start");
                // this.drawPermanentGripPoint(this.room.drawPosition[0], y, "end");
                // this.drawPermanentGripPoint(newPos[0], this.room.drawPosition[1], "start");
                // this.drawPermanentGripPoint(newPos[0], newPos[1], "end");
            }
        } else if(this.edit == editMode.ROOF) {
            let newPos : number[] = this.coords.snapToPoint(this.board, x, y);
            // console.log("try: " + this.wall.drawPosition[0] + " " + this.wall.drawPosition[1]);
            // console.log("try: " + newPos[0] + " " + newPos[1]);
                this.drawPermanentGripPoint(this.roof, this.roof.drawPosition[0], this.roof.drawPosition[1], "start");
                this.drawPermanentGripPoint(this.roof, newPos[0], newPos[1], "end");
        }
        
    }


    drawPermanentGripPoint(wall: Wall, x: number, y: number, position: string) {
        if(this.edit == editMode.NONE) {
            let gp = new GripPoint([{wall: wall, position: position}], this.board, this.model);
            
            let pos = gp.checkCoords(x, y);
            console.log(pos);
            let exists = this.model.checkLinkage(pos) && this.wall.gripPoints.length > 0;
            console.log(exists);
            if(!exists) {
                this.gripPoints.push(gp);
                // gp.drawPermanent(x, y);
                wall.drawPermanentGripPoint(gp, x, y);
                for(var wall1 of this.walls) {
                    if(wall1.startPosition[0] == x && wall1.startPosition[1] == y) {
                        gp.walls.push({
                            wall: wall1,
                            position: "start"
                        });
                    } else if (wall1.endPosition[0] == x && wall1.endPosition[1] == y) {
                        gp.walls.push({
                            wall: wall1,
                            position: "end"
                        });
                    }
                }
             //   console.log("doesn't exist: " + x + " " + y)
            } else {
              //  console.log("exists: " + x + " " + y)
                for(var gripPoint of this.gripPoints) {
                    if(gripPoint.center.x == x && gripPoint.center.y == y) {
                        gripPoint.walls.push({
                            wall: wall,
                            position: position
                        });
                    }
                }
                
           }
        } else if(this.edit == editMode.ROOF) {
            let gp = new GripPoint([{wall: wall, position: position}], this.board, this.model);
            let pos = gp.checkCoords(x, y);
            let exists = this.model.checkLinkage(pos);
            //console.log(exists);
            if(!exists) {
                this.gripPoints.push(gp);
                // gp.drawPermanent(x, y);
                wall.drawPermanentGripPoint(gp, x, y);
             //   console.log("doesn't exist: " + x + " " + y)
            } else {
              //  console.log("exists: " + x + " " + y)
                for(var gripPoint of this.gripPoints) {
                    if(gripPoint.center.x == x && gripPoint.center.y == y) {
                        gripPoint.walls.push({
                            wall: wall,
                            position: position
                        });
                    }
                }
                
            }
        }
        
    }

    updateRooms() {
        if(this.edit == editMode.NONE) {
            this.model.walls.forEach(wall1=> {
                this.walls.forEach(wall2=> {
                    if(wall1.wall.wallID == wall2.wallID) {
                        
                        if(wall1.wall.roomID.length > 0) {
                            wall2.partOfRoomID = wall1.wall.roomID;
                        }
                    }
                    //console.log(wall1.wall.roomID + " - - - " + wall2.partOfRoomID)
                })
            })
            
            this.model.rooms.forEach(room => {
                let walls = this.model.getWallsFromRoom(room.room.roomID);
                //console.log("walls in room: " + room.room.roomID)
                let r = new Room(room.room.roomID);
                this.roomsLayer.addChild(r);
                walls.forEach(w1 => {
                   this.walls.forEach(w2 => {
                        if(w1.wall.wallID == w2.wallID) {
                            w2.room = r;
                        }
                   })
                })
            })
        } else if(this.edit == editMode.ROOF) {
            this.model.roof.forEach(wall1=> {
                this.roofs.forEach(wall2=> {
                    if(wall1.wall.wallID == wall2.wallID) {
                        
                        if(wall1.wall.roomID.length > 0) {
                            wall2.partOfRoomID = wall1.wall.roomID;
                        }
                    }
                    //console.log(wall1.wall.roomID + " - - - " + wall2.partOfRoomID)
                })
            })
        }
         
    }

    async clearBoard() {
        this.model.clearModel();
        await this.wallsLayer.children.forEach(async wall =>{
            await this.wallsLayer.removeChild(wall);
        });
        await this.roofLayer.children.forEach(async wall =>{
            await this.roofLayer.removeChild(wall);
        });
        await this.roomsLayer.children.forEach(async wall =>{
            await this.roomsLayer.removeChild(wall);
        });
        await this.gripPointsLayer.children.forEach(async wall =>{
            await this.gripPointsLayer.removeChild(wall);
        });
        await this.objectsLayer.children.forEach(async wall =>{
            await this.objectsLayer.removeChild(wall);
        });
        this.walls = [];
        this.roofs = [];
        this.rooms =[];
        this.gripPoints = [];
        this.wall = new Wall();
        this.roof = new Roof();
        this.room = new Room();
    }

    buildModel(plan: Plan) {
        //this.model.importPlan(plan);
        console.log("model: ");
        console.log(this.model);

        plan.walls.forEach(wall => {
            this.wall = new Wall();
            this.wall.setup(this.model, this.board, this.spriteManager);
            
            this.walls.push(this.wall);
            this.wall.moveToPoint(wall.wall.startPoint.coordX, wall.wall.startPoint.coordY);
            
            this.wall.drawPermanent(wall.wall.endPoint.coordX, wall.wall.endPoint.coordY);
            this.tryPermanentGripPoint(wall.wall.endPoint.coordX, wall.wall.endPoint.coordY);
            this.wall.addChild(this.wall.getObjects());
            this.wallsLayer.addChild(this.wall);
            //console.log(this.wall.getGripPoints()); 
           // this.wallsLayer.addChild(this.wall.getGripPoints());
            this.objectsLayer.addChild(this.wall.getObjects());
            this.gripPointsLayer.addChild(this.wall.getGripPoints());

            //
           // this.wall.tryRoom(wall.wall.endPoint.coordX, wall.wall.endPoint.coordY);
          //  this.wall.room
        })
        console.log(plan);
        plan.rooms.forEach(room => {
            this.room = new Room();
            this.roomsLayer.addChild(this.room);
            let walls = room.room.wallsID.map(wallID => {
                let wall = this.model.findWallByID(wallID);
                if(wall) return {
                    startPoint: {
                        coordX: wall.wall.startPoint.coordX,
                        coordY: wall.wall.startPoint.coordY,
                    },
                    endPoint: {
                        coordX: wall.wall.endPoint.coordX,
                        coordY: wall.wall.endPoint.coordY,
                    }
                } 
                else return {
                    startPoint: {
                        coordX: 0,
                        coordY: 0,
                    },
                    endPoint: {
                        coordX: 0,
                        coordY: 0,
                    }
                }
            });
            console.log("walls: " + walls.forEach(wall=> console.log(wall)));
            //this.room.
            this.room.createRoom(walls);
            this.updateRooms();
        })
        plan.roof.forEach(roof => {
            this.roof = new Roof();
            this.roof.setup(this.model, this.board, this.spriteManager);
            
            
            this.roof.moveToPoint( roof.wall.startPoint.coordX, roof.wall.startPoint.coordY);
            this.roof.drawPermanent(roof.wall.endPoint.coordX, roof.wall.endPoint.coordY);
            this.tryPermanentGripPoint(roof.wall.endPoint.coordX, roof.wall.endPoint.coordY);
            this.gripPointsLayer.addChild(this.roof.getGripPoints());
            this.roof.addChild(this.roof.getObjects());
            this.roofLayer.addChild(this.roof);
            this.roofs.push(this.roof);

        })
    }

    
    //update(delta: PIXI.Ticker) {
       
      
   // }
    setDrawMode(mode: string) {
        this.drawMode = mode;
    }
    setEditMode(mode: editMode) {
        this.edit = mode;
        if(this.edit == editMode.GRIPPOINT) {
            
            this.walls.forEach(wall => {
                wall.setEditMode(mode);
                wall.gripPoints.forEach(gp => {
                    gp.setup(this.stage, true);
                })
            })
        } else {
            this.walls.forEach(wall => {
                wall.setEditMode(mode);
                wall.gripPoints.forEach(gp => {
                    gp.setup(this.stage, false);
                })
            })
        }
        
    }

    getModel() : Model{
        return this.model;
    }

    getBoard() : Board { 
        return this.board;
    }

    toJSON(): string{
        return this.model.toJSON();
    }
}