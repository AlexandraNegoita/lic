import * as THREE from 'three';
import { Model } from '../model/Model';
import { TextureManager } from './TextureManager';

export class Renderer {
    scene: THREE.Scene =  new THREE.Scene();
    camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    mesh: THREE.Mesh = new THREE.Mesh();

    model: Model;
    houseGroup = new THREE.Group();
    house = new THREE.Object3D();
    textures : TextureManager;

  
    constructor(model: Model, textures: TextureManager ) {
        this.model = model;
        this.textures = textures;
    }

    setup(fov: number, width: number, height: number, near: number, far: number) {
        this.setupCamera(fov, width, height, near, far)
        this.renderer.setSize( width, height);
        this.houseGroup.add(this.house);
        this.house.rotateX(-Math.PI / 2);
        
        this.renderModel();
        
       // document.body.appendChild( this.renderer.domElement );
    }

    clear() {
        this.scene.remove(this.mesh);
    }

    setupCamera(fov: number, width: number, height: number, near: number, far: number) {
        this.camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
        //this.cameraPosition(new THREE.Vector3(0, 5, 0));
        // if(this.house.children.length != 0)
        // this.cameraPosition(new THREE.Vector3(this.house.children[0].position.x, this.house.children[0].position.y + 5, this.house.children[0].position.z))

    }

    cameraPosition(position: THREE.Vector3) {
        // this.camera.position.x = position.x;
        // this.camera.position.y = position.y;
        // this.camera.position.z = position.z;
        //
        var direction = new THREE.Vector3();
		this.house.getWorldDirection( direction );
		
		this.camera.position.set( position.x, position.y, position.z );   
        this.camera.lookAt(this.house.position);    
        //this.camera.quaternion.copy( this.house.quaternion );
    }

    renderModel() {
        //const renderModel :  Renderer = new Renderer(model);
        
        this.scene.add(this.build3DModel());
        // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        // const material = new THREE.MeshLambertMaterial ( { color: 0x5BC2D5 } );
        // this.mesh = new THREE.Mesh( geometry, material );
        // this.mesh.position.set(0,0,0);
        // this.mesh.geometry.computeVertexNormals();
        // this.scene.add(this.mesh);
    }
     
    getRenderer() : THREE.WebGLRenderer {
        return this.renderer;
    }

    getCamera() : THREE.PerspectiveCamera {
        return this.camera;
    }

    build3DModel() : THREE.Group {
        
       // this.buildRooms();
        this.buildWalls();
        //this.house.position.copy(new THREE.Vector3(0, 0, 0));
        return this.houseGroup;
    }

    setupWallMaterial(texture: THREE.Texture, normalTexture: THREE.Texture, heightTexture: THREE.Texture): THREE.MeshPhongMaterial {
        // const textureLoaded = new THREE.TextureLoader().load(texture);
        // const normalTextureLoaded = new THREE.TextureLoader().load(normalTexture);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.2,  0.2);
        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.RepeatWrapping;
        normalTexture.repeat.set( 0.2, 0.2 );
        heightTexture.wrapS = THREE.RepeatWrapping;
        heightTexture.wrapT = THREE.RepeatWrapping;
        heightTexture.repeat.set( 0.2, 0.2 );
        return new THREE.MeshPhongMaterial({ 
            map: texture,
            normalMap: normalTexture,
            displacementMap: heightTexture,
            displacementScale: 0.05,
            envMap: this.textures.envMap
        })
    }
    
    buildRooms() {
        
    }

    calculateRatio(coord: number) {
        return coord/30;
    }

    buildWalls() {
        this.model.walls.forEach(wallData => {
            const thickness = 5;
            const wallShape = new THREE.Shape();
            if(wallData.wall.startPoint.coordX == wallData.wall.endPoint.coordX) {
                // vertical
                wallShape.moveTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX + thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX + thickness), this.calculateRatio(wallData.wall.endPoint.coordY - thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX - thickness), this.calculateRatio(wallData.wall.endPoint.coordY - thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
            } else if(wallData.wall.startPoint.coordY == wallData.wall.startPoint.coordY) {
                // orizontal
                wallShape.moveTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY - thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX + thickness), this.calculateRatio(wallData.wall.endPoint.coordY + thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX + thickness), this.calculateRatio(wallData.wall.endPoint.coordY - thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY - thickness));
            } else {
                // diagonal
                wallShape.moveTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX + thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX - thickness), this.calculateRatio(wallData.wall.endPoint.coordY + thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX + thickness), this.calculateRatio(wallData.wall.endPoint.coordY - thickness));
                wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY - thickness));
            }
            
            const wallGeometry = new THREE.ExtrudeGeometry([ wallShape ], {
                steps: 512,
                depth: wallData.wall.wallHeight / 10,
                bevelEnabled: false,
                curveSegments: 32
            });

            // Promise.all(this.textures.getTextures(this.textures.groundTexturePath))
            // .then(textures => {
            //     // create your materials, meshs...
            //     // render the scene
            // // })
            // .catch(err => console.error(err))

            const wall = new THREE.Mesh(wallGeometry, this.setupWallMaterial(
                this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallCOL,
                this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallNRM,
                this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallHGT
                ));
            wall.position.z = 0;

            // var geo = new THREE.EdgesGeometry( wall.geometry ); // or WireframeGeometry
            // var mat = new THREE.LineBasicMaterial( { color: 0xffffff } );
            // var wireframe = new THREE.LineSegments( geo, mat );
            // wall.add( wireframe );
            
            this.house.add(wall);
        });
        
        
    }



}