import * as PIXI from 'pixi.js';
import { Wall } from './Wall';
import { Board } from './Board';

export class Viewer2D extends PIXI.Application {
    wall: Wall = new Wall();
    board: Board = new Board();
    backgroundLayer = new PIXI.Container();
    wallsLayer = new PIXI.Container();
    isMouseDown: boolean = false;
    get canvas(): HTMLCanvasElement {
        return super.canvas;
    }
    constructor() {
        super();
    }
    async init(options?: Partial<PIXI.ApplicationOptions> | undefined): Promise<void>{
        return super.init(options);
    }
    
    async setup() {
       this.stage.addChild(this.backgroundLayer);
       this.board.drawBoard(this, this.backgroundLayer);
     //  console.log(this.board.points);
       this.stage.addChild(this.wallsLayer);
      
       this.wallsLayer.addChild(this.wall);
       this.isMouseDown = false;
       this.stage.on('mousedown',  (e) => {
            this.wall = new Wall();
            this.wallsLayer.addChild(this.wall);
            this.wall.moveToPoint(this.board, e.data.global.x, e.data.global.y);
            this.wall.drawTemporaryWall(this.board, e.data.global.x, e.data.global.y);
            console.log('Mouse clicked: ' + this.wall.drawPosition);
            this.isMouseDown = true;
            

            
        });
        this.stage.on('mousemove', (e) => {
            
            if(this.isMouseDown) {
                this.wall.drawTemporaryWall(this.board, e.data.global.x, e.data.global.y);
                console.log('Mouse moved' + this.wall.drawPosition);
            }
        });
        this.stage.on('mouseup', (e) => {
            console.log('Mouse released');
            this.isMouseDown = false;
            this.wall.drawPermanentWall(this.board, e.data.global.x, e.data.global.y);
            // console.log('X', e.data.global.x, 'Y', e.data.global.y);
        });
        //this.ticker.add(delta=>this.update(delta));
        console.log(this.stage.children);
    }

    
    //update(delta: PIXI.Ticker) {
       
      
   // }
    toJSON(){

    }
}