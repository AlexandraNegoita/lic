import * as PIXI from "pixi.js";

export class SpriteManager {
    windowPath: string = '';
    windowTexture: PIXI.Texture | undefined;
    doorPath: string = '';
    doorTexture: PIXI.Texture | undefined;
    constructor() {

    }
    async setWindowPath(windowPath: string) {
        this.windowPath = windowPath;
        let texture = await PIXI.Assets.load(windowPath);
        this.windowTexture = texture;
    }
    getWindowTexture() {
        return this.windowTexture;
    }

    async setDoorPath(doorPath: string) {
        this.doorPath = doorPath;
        let texture = await PIXI.Assets.load(doorPath);
        this.doorTexture = texture;
    }
    getDoorTexture() {
        return this.doorTexture;
    }
}