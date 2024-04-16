import * as PIXI from "pixi.js";
import { Coordinates } from './Coordinates';
export class Board extends PIXI.Graphics {
    points: Coordinates[] = [];
    lines: number = 0;
    cols: number = 0;
    constructor (geometry?: PIXI.GraphicsContext) {
        super(geometry);
    }
    async drawBoard(app: PIXI.Application, backgroundLayer:PIXI.Container ) {
        // const texture = await PIXI.Assets.load(imgPath);

        // const img = new PIXI.TilingSprite({
        //     texture,
        //     width: this.screen.width,
        //     height: this.screen.height,
        // });
        // this.renderer.events.cursorStyles.default = 'crosshair';
        // this.backgroundLayer.addChild(img);
        let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        bg.width = app.screen.width;
        bg.height = app.screen.height;
        bg.tint = 0xFAEBD7;
        backgroundLayer.addChild(bg);
        app.renderer.events.cursorStyles.default = 'crosshair';
        for (let i = 0; i < app.screen.width; i+=30) {
            for(let j = 0; j < app.screen.height; j+=30){
                let point = new PIXI.Graphics()
                    .circle(i, j, 1)
                    .fill('black');
                this.points.push(new Coordinates(i, j));
                backgroundLayer.addChild(point);
            }
        }
    }
}
