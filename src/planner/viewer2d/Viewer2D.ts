import * as PIXI from 'pixi.js';
import { Wall } from './Wall';
import { Board } from './Board';
import { Model } from '../model/Model';

export class Viewer2D extends PIXI.Application {
    
    wall: Wall = new Wall();
    board: Board = new Board();
    model: Model = new Model();
    backgroundLayer = new PIXI.Container();
    wallsLayer = new PIXI.Container();
    isMouseDown: boolean = false;
    drawMode: string = 'wall';
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
            this.wall.drawMode = this.drawMode;
            this.wallsLayer.addChild(this.wall);
            this.wall.moveToPoint(this.board, e.data.global.x, e.data.global.y);
            this.wall.drawTemporary(this.board, e.data.global.x, e.data.global.y);
            console.log('Mouse clicked: ' + this.wall.drawPosition);
            this.isMouseDown = true;
        });
        this.stage.on('mousemove', (e) => {
            
            if(this.isMouseDown) {
                this.wall.drawTemporary(this.board, e.data.global.x, e.data.global.y);
                console.log('Mouse moved' + this.wall.drawPosition);
            }
        });
        this.stage.on('mouseup', (e) => {
            console.log('Mouse released');
            this.isMouseDown = false;
            this.wall.drawPermanent(this.model,this.board, e.data.global.x, e.data.global.y);
            // console.log('X', e.data.global.x, 'Y', e.data.global.y);
        });
        //this.ticker.add(delta=>this.update(delta));
        console.log(this.stage.children);
    }

    
    //update(delta: PIXI.Ticker) {
       
      
   // }
    setDrawMode(mode: string) {
        this.drawMode = mode;
    }
    getDrawMode(): string {
        return this.wall.drawMode;
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