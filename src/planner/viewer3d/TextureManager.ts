import * as THREE from 'three';

export class TextureManager {
    loader: THREE.TextureLoader = new THREE.TextureLoader();
    idWall: number = 0;

    public readPaths : {
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

    roofTexturePath: { [id: string] : {
        roofCOL: string,
        roofNRM: string,
        roofHGT: string
    } } = {};

    windowTexturePath: {
        winCOL: string,
        winNRM: string,
        winHGT: string
     } = {
         winCOL: '',
         winNRM: '',
         winHGT: ''
     };
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
    roofTextureLoaded: { [id: string] : {
        roofCOL: THREE.Texture,
        roofNRM: THREE.Texture,
        roofHGT: THREE.Texture
    } } = {};

    windowTextureLoaded: {
        winCOL: THREE.Texture,
        winNRM: THREE.Texture,
        winHGT: THREE.Texture
    } = {
        winCOL: new THREE.Texture,
        winNRM: new THREE.Texture,
        winHGT: new THREE.Texture
    };

    groundTextureLoaded: {
        groundCOL: THREE.Texture,
        groundNRM: THREE.Texture
    } = {
        groundCOL: new THREE.Texture,
        groundNRM: new THREE.Texture
    };
    wallTextureSelected: string = "1634";
    roofTextureSelected:string = "4683";

    
    
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

    createRoofTexture(id: number) {
        this.roofTexturePath[id] = {
            roofCOL: '',
            roofNRM: '',
            roofHGT: ''
        };
        this.roofTextureLoaded[id] = {
            roofCOL: new THREE.Texture,
            roofNRM: new THREE.Texture,
            roofHGT: new THREE.Texture
        }
    }

    createWindowTexture(id: number) {
        this.windowTexturePath = {
            winCOL: '',
            winNRM: '',
            winHGT: ''
        };
        this.windowTextureLoaded = {
            winCOL: new THREE.Texture,
            winNRM: new THREE.Texture,
            winHGT: new THREE.Texture
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

    addRoofTexture(id: string, type: string, path: string, texture: THREE.Texture) {
        switch(type) {
            case "COL": {
                this.roofTexturePath[id] = {
                    roofCOL: path,
                    roofNRM: this.roofTexturePath[id]?this.roofTexturePath[id].roofNRM:"",
                    roofHGT: this.roofTexturePath[id]?this.roofTexturePath[id].roofHGT:""
                };
        
                this.roofTextureLoaded[id] = {
                    roofCOL: texture,
                    roofNRM: this.roofTextureLoaded[id]?this.roofTextureLoaded[id].roofNRM:new THREE.Texture,
                    roofHGT: this.roofTextureLoaded[id]?this.roofTextureLoaded[id].roofHGT:new THREE.Texture
                }
                break;
            }
            case "NRM": {
                this.roofTexturePath[id] = {
                    roofCOL: this.roofTexturePath[id]?this.roofTexturePath[id].roofCOL:"",
                    roofNRM: path,
                    roofHGT: this.roofTexturePath[id]?this.roofTexturePath[id].roofHGT:""
                };
        
                this.roofTextureLoaded[id] = {
                    roofCOL: this.roofTextureLoaded[id]?this.roofTextureLoaded[id].roofCOL:new THREE.Texture,
                    roofNRM: texture,
                    roofHGT: this.roofTextureLoaded[id]?this.roofTextureLoaded[id].roofHGT:new THREE.Texture
                }
                break;
            }
            case "HGT":{
                this.roofTexturePath[id] = {
                    roofCOL: this.roofTexturePath[id]?this.roofTexturePath[id].roofCOL:"",
                    roofNRM: this.roofTexturePath[id]?this.roofTexturePath[id].roofNRM:"",
                    roofHGT: path
                };
        
                this.roofTextureLoaded[id] = {
                    roofCOL: this.roofTextureLoaded[id]?this.roofTextureLoaded[id].roofCOL:new THREE.Texture,
                    roofNRM: this.roofTextureLoaded[id]?this.roofTextureLoaded[id].roofNRM:new THREE.Texture,
                    roofHGT: texture
                }
                break;
            }
        }
        
    }

    addWindowTexture(id: string, type: string, path: string, texture: THREE.Texture) {
        switch(type) {
            case "COL": {
                this.windowTexturePath = {
                    winCOL: path,
                    winNRM: this.windowTexturePath?this.windowTexturePath.winNRM:"",
                    winHGT: this.windowTexturePath?this.windowTexturePath.winHGT:""
                };
        
                this.windowTextureLoaded = {
                    winCOL: texture,
                    winNRM: this.windowTextureLoaded?this.windowTextureLoaded.winNRM:new THREE.Texture,
                    winHGT: this.windowTextureLoaded?this.windowTextureLoaded.winHGT:new THREE.Texture
                }
                break;
            }
            case "NRM": {
                this.windowTexturePath = {
                    winCOL: this.windowTexturePath?this.windowTexturePath.winCOL:"",
                    winNRM: path,
                    winHGT: this.windowTexturePath?this.windowTexturePath.winHGT:""
                };
        
                this.windowTextureLoaded = {
                    winCOL: this.windowTextureLoaded?this.windowTextureLoaded.winCOL:new THREE.Texture,
                    winNRM: texture,
                    winHGT: this.windowTextureLoaded?this.windowTextureLoaded.winHGT:new THREE.Texture
                }
                break;
            }
            case "HGT":{
                this.windowTexturePath = {
                    winCOL: this.windowTexturePath?this.windowTexturePath.winCOL:"",
                    winNRM: this.windowTexturePath?this.windowTexturePath.winNRM:"",
                    winHGT: path
                };
        
                this.windowTextureLoaded = {
                    winCOL: this.windowTextureLoaded?this.windowTextureLoaded.winCOL:new THREE.Texture,
                    winNRM: this.windowTextureLoaded?this.windowTextureLoaded.winNRM:new THREE.Texture,
                    winHGT: texture
                }
                break;
            }
        }
        
    }

    // loadTexture(texturePath: string) {
    //     return this.loader.load(texturePath, );
    // }

    selectWallTexture(id: string) {
        this.wallTextureSelected = id;
    }

    selectRoofTexture(id: string) {
        this.roofTextureSelected = id;
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