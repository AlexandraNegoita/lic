import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { Model } from '../model/Model';
import { Renderer } from './Renderer';
import { Board } from "../viewer2d/Board";
import { Ground } from "./Ground";
import { TextureManager } from "./TextureManager";


export class Viewer3D {
    model: Model;
    renderer: Renderer;
    controls: OrbitControls | undefined;
    houseCenter: THREE.Vector3 | undefined;
    ground: Ground = new Ground();
    board: Board;
    textures: TextureManager;
    pmremGenerator: THREE.PMREMGenerator;
   
    
    constructor(model: Model, board: Board, textures: TextureManager) {
        this.animate = this.animate.bind(this);
        this.model = model;
        this.textures = textures;
        this.renderer = new Renderer(this.model, this.textures);
        this.pmremGenerator = new THREE.PMREMGenerator(this.renderer.getRenderer());
        this.board = board;
    }

    getTextures(textureArray: {id: string, for: string, path : string, type: string}[]) {
        const allPromises: Promise<{id: string, for: string, path : string, type: string, texture: THREE.Texture}>[] = [];
        textureArray.forEach( function( jsonMat ) {

            allPromises.push( new Promise( function( resolve, reject ) {
        
                new THREE.TextureLoader().load(
                   jsonMat.path, 
        
                   function( texture ) {
                    const loadedTexture = {
                        id: jsonMat.id,
                        for: jsonMat.for,
                        path: jsonMat.path,
                        type: jsonMat.type,
                        texture: texture
                    };
                    //    // Success callback of TextureLoader
                    //    texture.wrapS = THREE.RepeatWrapping;
                    //    texture.wrapT = THREE.RepeatWrapping;
                    //    texture.repeat.set( jsonMat.scaleu, jsonMat.scalev );
                    //    var material = new THREE.MeshLambertMaterial({
                    //        map: texture,
                    //        side: THREE.DoubleSide,
                    //        name: jsonMat.mname
                    //    });
                    //    THREEMatList.push( material );
        
                    //    // We're done, so tell the promise it is complete
                    //    resolve( material );
                    resolve(loadedTexture);

                   },
        
                   function( xhr ) {
                       // Progress callback of TextureLoader
                       // ...
                   },
        
                   function( xhr ) {
                       // Failure callback of TextureLoader
                       // Reject the promise with the failure
                       reject( new Error( 'Could not load ' + jsonMat.path) );
                   }
                );
        
            }));
        
        });
        return allPromises;
    }


    setup(fov: number, width: number, height: number, near: number, far: number) {
        const hdriLoader = new RGBELoader()
        hdriLoader.load( this.textures.HDRIPath,  ( hdrMap ) => {
            hdrMap.mapping = THREE.EquirectangularReflectionMapping;

            this.renderer.scene.environment = hdrMap;
            this.renderer.scene.background = hdrMap;
            this.textures.setEnvMap(hdrMap);
        

            Promise.all(this.getTextures(this.textures.readPaths))
                .then(allTextures => {
                    allTextures.forEach( ( texture ) => {
                        if(texture.for == "GROUND") {
                            this.textures.addGroundTexture(texture.type, texture.path, texture.texture);
                        } else if(texture.for == "WALL") {
                            //console.log(texture.id, texture.type, texture.path, texture.texture);
                            this.textures.addWallTexture(texture.id, texture.type, texture.path, texture.texture);
                        }
                    });
                    this.renderer.setup(fov, width, height, near, far);
                    this.controls = new OrbitControls(this.renderer.getCamera(), this.renderer.getRenderer().domElement);
                    this.controls.update();
                })
            .catch(err => console.error(err))
        } );
        
    }

    

    setupCamera() {
        const box = new THREE.Box3().setFromObject( this.renderer.house );
        this.houseCenter = box.getCenter( new THREE.Vector3() );
        if(this.houseCenter) {
            this.renderer.camera.position.copy(new THREE.Vector3(this.houseCenter.x, this.houseCenter.y + 5, this.houseCenter.z));
            this.controls?.target.copy(this.houseCenter);
        }
    }

    setupLighting() {
        let dl = new THREE.AmbientLight(0xFFFFFF, 0.7);
       // let dlHelper = new THREE.DirectionalLightHelper(dl, 3);
        if(this.houseCenter) {
            dl.position.set(this.houseCenter.x, this.houseCenter.y + 5, this.houseCenter.z);
        }
        this.renderer.scene.add(dl);
    }

    run() {
        this.renderer.houseGroup.add(this.ground.buildGround(this.board, this.textures));
        this.renderer.build3DModel();
        this.renderer.getRenderer().setAnimationLoop(this.animate);
        
        this.setupCamera();
        this.setupLighting();
    }

    stop() {
        this.renderer.clear();
        this.renderer.getRenderer().setAnimationLoop(null);
    }

    getRendererCanvas() : HTMLCanvasElement {
        return this.renderer.getRenderer().domElement;
    }

    animate() {
        this.renderer.mesh.rotation.x += 0.01;
        this.renderer.mesh.rotation.y += 0.01;
        this.renderer.getRenderer().render( this.renderer.scene, this.renderer.camera );
        if(this.controls) {
            //this.controls.target.copy(this.renderer.houseGroup.position);
            
            this.controls.update();   

            // this.controls.update();
        }
    }
    
}
