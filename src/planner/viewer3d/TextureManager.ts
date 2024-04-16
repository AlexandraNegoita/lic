import * as THREE from 'three';

export class TextureManager {
    loader: THREE.TextureLoader = new THREE.TextureLoader();
    idWall: number = 0;

    readPaths : {
        id: string, 
        for: string, 
        path : string, 
        type: string, 
    }[] = [];

    wallTexturePath: { [id: string] : {
        wallCOL: string,
        wallNRM: string,
        wallHGT: string
    } } = {};
    groundTexturePath: {
        groundCOL: string,
        groundNRM: string
    } = {
        groundCOL: '',
        groundNRM: ''
    };

    HDRIPath: string;
    envMap: THREE.Texture = new THREE.Texture;

    wallTextureLoaded: { [id: string] : {
        wallCOL: THREE.Texture,
        wallNRM: THREE.Texture,
        wallHGT: THREE.Texture
    } } = {};

    groundTextureLoaded: {
        groundCOL: THREE.Texture,
        groundNRM: THREE.Texture
    } = {
        groundCOL: new THREE.Texture,
        groundNRM: new THREE.Texture
    };
    wallTextureSelected: number = 1634;

    
    
    constructor(readPaths: {id: string, for: string, path : string, type: string}[], HDRI: string) {
        this.readPaths = readPaths;
        // this.groundTextureLoaded = {
        //     groundCOL: this.loadTexture(groundTexture.groundCOL),
        //     groundNRM: this.loadTexture(groundTexture.groundNRM)
        // }
        this.HDRIPath = HDRI;
    }

    setEnvMap(texture: THREE.Texture) {
        this.envMap = texture;
    }

    createWallTexture(id: number) {
        this.wallTexturePath[id] = {
            wallCOL: '',
            wallNRM: '',
            wallHGT: ''
        };
        this.wallTextureLoaded[id] = {
            wallCOL: new THREE.Texture,
            wallNRM: new THREE.Texture,
            wallHGT: new THREE.Texture
        }
    }

    addGroundTexture(type: string, path: string, texture: THREE.Texture) {
        switch(type) {
            case "COL": {
                this.groundTexturePath = {
                    groundCOL: path,
                    groundNRM: this.groundTexturePath.groundNRM
                };
        
                this.groundTextureLoaded = {
                    groundCOL: texture,
                    groundNRM: this.groundTextureLoaded.groundNRM,
                }
                break;
            }
            case "NRM": {
                this.groundTexturePath = {
                    groundCOL: this.groundTexturePath.groundCOL,
                    groundNRM: path
                };
        
                this.groundTextureLoaded = {
                    groundCOL: this.groundTextureLoaded.groundCOL,
                    groundNRM: texture,
                }
                break;
            }
        }
        
    }

    addWallTexture(id: string, type: string, path: string, texture: THREE.Texture) {
        switch(type) {
            case "COL": {
                this.wallTexturePath[id] = {
                    wallCOL: path,
                    wallNRM: this.wallTexturePath[id]?this.wallTexturePath[id].wallNRM:"",
                    wallHGT: this.wallTexturePath[id]?this.wallTexturePath[id].wallHGT:""
                };
        
                this.wallTextureLoaded[id] = {
                    wallCOL: texture,
                    wallNRM: this.wallTextureLoaded[id]?this.wallTextureLoaded[id].wallNRM:new THREE.Texture,
                    wallHGT: this.wallTextureLoaded[id]?this.wallTextureLoaded[id].wallHGT:new THREE.Texture
                }
                break;
            }
            case "NRM": {
                this.wallTexturePath[id] = {
                    wallCOL: this.wallTexturePath[id]?this.wallTexturePath[id].wallCOL:"",
                    wallNRM: path,
                    wallHGT: this.wallTexturePath[id]?this.wallTexturePath[id].wallHGT:""
                };
        
                this.wallTextureLoaded[id] = {
                    wallCOL: this.wallTextureLoaded[id]?this.wallTextureLoaded[id].wallCOL:new THREE.Texture,
                    wallNRM: texture,
                    wallHGT: this.wallTextureLoaded[id]?this.wallTextureLoaded[id].wallHGT:new THREE.Texture
                }
                break;
            }
            case "HGT":{
                this.wallTexturePath[id] = {
                    wallCOL: this.wallTexturePath[id]?this.wallTexturePath[id].wallCOL:"",
                    wallNRM: this.wallTexturePath[id]?this.wallTexturePath[id].wallNRM:"",
                    wallHGT: path
                };
        
                this.wallTextureLoaded[id] = {
                    wallCOL: this.wallTextureLoaded[id]?this.wallTextureLoaded[id].wallCOL:new THREE.Texture,
                    wallNRM: this.wallTextureLoaded[id]?this.wallTextureLoaded[id].wallNRM:new THREE.Texture,
                    wallHGT: texture
                }
                break;
            }
        }
        
    }

    // loadTexture(texturePath: string) {
    //     return this.loader.load(texturePath, );
    // }

    selectWallTexture(id: number) {
        this.wallTextureSelected = id;
    }



    getGroundTexture() : {
        groundCOL: THREE.Texture,
        groundNRM: THREE.Texture
    }{
        return this.groundTextureLoaded;
    }

    // getWallTexture(index: number) : {
    //     wallCOL: THREE.Texture,
    //     wallNRM: THREE.Texture
    // } | null 
    // {
    //     if(this.wallTexturePath[index]){
    //         if(!this.wallTextureLoaded[index]) {
    //             this.wallTextureLoaded[index] = {
    //                 wallCOL: this.loadTexture(this.wallTexturePath[index].wallCOL),
    //                 wallNRM: this.loadTexture(this.wallTexturePath[index].wallNRM)
    //             }
    //         } 
    //         return this.wallTextureLoaded[index];
    //     }
    //     return null;
    // }
}