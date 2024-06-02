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

    refresh() {
        this.scene.remove(this.houseGroup);
        this.houseGroup.remove(this.house);
        for(var wall of this.house.children) {
            this.house.remove(wall);
        }
    }

    renderModel() {
        //const renderModel :  Renderer = new Renderer(model);
        this.build3DModel();
        this.houseGroup.add(this.house);
        this.scene.add(this.houseGroup);
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

    build3DModel() {
        
       // this.buildRooms();
        this.buildWalls();
        //this.house.position.copy(new THREE.Vector3(0, 0, 0));
    }

    setupWallMaterial(texture: THREE.Texture, normalTexture: THREE.Texture, heightTexture: THREE.Texture): THREE.MeshPhongMaterial {
        // const textureLoaded = new THREE.TextureLoader().load(texture);
        // const normalTextureLoaded = new THREE.TextureLoader().load(normalTexture);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 2,  2);
        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.RepeatWrapping;
        normalTexture.repeat.set( 2, 2 );
        heightTexture.wrapS = THREE.RepeatWrapping;
        heightTexture.wrapT = THREE.RepeatWrapping;
        heightTexture.repeat.set( 2, 2 );
        return new THREE.MeshPhongMaterial({ 
            map: texture,
            normalMap: normalTexture,
            normalScale: new THREE.Vector2(2,2),
            displacementMap: heightTexture,
            displacementScale: 0,
            envMap: this.textures.envMap,
            reflectivity: 0.5,
        })
    }

    setupWindowMaterial(texture: THREE.Texture, normalTexture: THREE.Texture, heightTexture: THREE.Texture): THREE.MeshPhysicalMaterial {
        // const textureLoaded = new THREE.TextureLoader().load(texture);
        // const normalTextureLoaded = new THREE.TextureLoader().load(normalTexture);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.3,  0.3);
        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.RepeatWrapping;
        normalTexture.repeat.set( 0.4, 0.3);
        heightTexture.wrapS = THREE.RepeatWrapping;
        heightTexture.wrapT = THREE.RepeatWrapping;
        heightTexture.repeat.set( 0.4, 0.4 );
        return new THREE.MeshPhysicalMaterial({ 
            metalness: 0,
            roughness: 1,
            envMapIntensity: 0.9,
            clearcoat: 1,
            transparent: true,
            transmission: .95,
            opacity: 1,
            reflectivity: 0.2,
            
        })
    }

    setupWindowFrameMaterial(texture: THREE.Texture, normalTexture: THREE.Texture, heightTexture: THREE.Texture): THREE.MeshPhongMaterial {
        // const textureLoaded = new THREE.TextureLoader().load(texture);
        // const normalTextureLoaded = new THREE.TextureLoader().load(normalTexture);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.3,  0.3);
        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.RepeatWrapping;
        normalTexture.repeat.set( 0.4, 0.3);
        heightTexture.wrapS = THREE.RepeatWrapping;
        heightTexture.wrapT = THREE.RepeatWrapping;
        heightTexture.repeat.set( 0.4, 0.4 );
        return new THREE.MeshPhongMaterial({ 
            map: texture,
            normalMap: normalTexture,
            displacementMap: heightTexture,
            displacementScale: 0,
            envMap: this.textures.envMap
        })
    }

    calculateRatio(coord: number) {
        return coord/30;
    }


    checkAngle(startPointX: number, startPointY: number, endPointX: number, endPointY: number) {
        //distance
        var wall1X = 1;
        var wall1Y = 0; //this.y - this.y
        var wall2X = endPointX - startPointX;
        var wall2Y = endPointY - startPointY;
        var angle = Math.atan2(wall1X * wall2Y - wall1Y * wall2X, wall1X * wall2X + wall1Y * wall2Y);
       // if(angle < 0) {angle = angle * -1;}
        var degree_angle = 180 - angle * (180 / Math.PI);
        console.log("angle: " + degree_angle)
        return angle;
        //if(degree_angle > 90) return false;
        //return true;
    }


    buildDoors(wallID: number, width: number, height: number, thickness: number, orientation: string) {
        //     let wallShape = new THREE.Shape();
        //     wallShape.moveTo(-width, height);
        //     wallShape.lineTo(-width, -height);
        //     wallShape.lineTo(width, -height);
        //     wallShape.lineTo(width, height);
        //     wallShape.lineTo(-width, height);
            this.model.objects.doors.forEach(doorData => {
                console.log(doorData.door.partOfWall + " >> " + wallID)
                if(doorData.door.partOfWall == wallID){
                    
                   
    
                    let local1 = new THREE.Vector3(this.calculateRatio(doorData.door.centerPoint.coordX), this.calculateRatio(doorData.door.centerPoint.coordY) + this.calculateRatio(height) * 0.6);
    
                    // let hole = new THREE.Path();
                    // hole.moveTo(local1.x - this.calculateRatio(height) * 0.4, local1.y + this.calculateRatio(height) * 0.3);
                    // hole.lineTo(local1.x + this.calculateRatio(height) * 0.4, local1.y + this.calculateRatio(height) * 0.3);
                    // hole.lineTo(local1.x + this.calculateRatio(height) * 0.4, local1.y - this.calculateRatio(height) * 0.3);
                    // hole.lineTo(local1.x - this.calculateRatio(height) * 0.4, local1.y - this.calculateRatio(height) * 0.3);
                    // hole.lineTo(local1.x - this.calculateRatio(height) * 0.4, local1.y + this.calculateRatio(height) * 0.3);
    
                    // wallShape.holes.push(hole);
                   
    
                    let doorShape = new THREE.Shape();
                    doorShape.moveTo(local1.x - height * 0.2, local1.y + height * 0.4);
                    doorShape.lineTo(local1.x + height * 0.2, local1.y + height * 0.4);
                    doorShape.lineTo(local1.x + height * 0.2, local1.y - height * 0.4);
                    doorShape.lineTo(local1.x - height * 0.2, local1.y - height * 0.4);
                    doorShape.lineTo(local1.x - height * 0.2, local1.y + height * 0.4);
    
                    const doorGeometry = new THREE.ExtrudeGeometry([ doorShape ], {
                        steps: 512,
                        depth: thickness * 1.5,
                        bevelEnabled: false,
                    });
                    doorGeometry.translate(-local1.x, -local1.y, -(thickness*1.5) / 2);
                    doorGeometry.rotateX(Math.PI / 2);
                    if(orientation == 'vertical') doorGeometry.rotateZ(Math.PI / 2);
                    doorGeometry.translate(local1.x, local1.y, height * 0.4);
                    let door = new THREE.Mesh(doorGeometry, this.setupWindowFrameMaterial(
                        this.textures.windowTextureLoaded.winCOL,
                        this.textures.windowTextureLoaded.winNRM,
                        this.textures.windowTextureLoaded.winHGT
                    ));
                    door.position.z = 0;
                    this.house.add(door);
    
                    let doorFrameShape = new THREE.Shape();
                    doorFrameShape.moveTo(local1.x - height * 0.2 - 0.1, local1.y + height * 0.4 + 0.1);
                    doorFrameShape.lineTo(local1.x + height * 0.2 + 0.1, local1.y + height * 0.4 + 0.1);
                    doorFrameShape.lineTo(local1.x + height * 0.2 + 0.1, local1.y - height * 0.4 - 0.1);
                    doorFrameShape.lineTo(local1.x - height * 0.2 - 0.1, local1.y - height * 0.4 - 0.1);
                    
                    let hole = new THREE.Path();
                    hole.moveTo(local1.x - height * 0.2, local1.y + height * 0.4);
                    hole.lineTo(local1.x + height * 0.2, local1.y + height * 0.4);
                    hole.lineTo(local1.x + height * 0.2, local1.y - height * 0.4);
                    hole.lineTo(local1.x - height * 0.2, local1.y - height * 0.4);
                    hole.lineTo(local1.x - height * 0.2, local1.y + height * 0.4);
                    
                    doorFrameShape.holes.push(hole);
                    const doorFrameGeometry = new THREE.ExtrudeGeometry([ doorFrameShape ], {
                        steps: 512,
                        depth: thickness,
                        bevelEnabled: true,
                    });
                    doorFrameGeometry.translate(-local1.x, -local1.y, -thickness / 2);
                    doorFrameGeometry.rotateX(Math.PI / 2);
                    if(orientation == 'vertical') doorFrameGeometry.rotateZ(Math.PI / 2);
                    doorFrameGeometry.translate(local1.x, local1.y, height * 0.4);
                    let doorFrame = new THREE.Mesh(doorFrameGeometry, this.setupWindowFrameMaterial(
                        this.textures.windowTextureLoaded.winCOL,
                        this.textures.windowTextureLoaded.winNRM,
                        this.textures.windowTextureLoaded.winHGT
                    ));
                    doorFrame.position.z = 0;
                    this.house.add(doorFrame);
    
                }
            });
        }


    buildWindows(wallID: number, width: number, height: number, thickness: number, orientation: string) {
    //     let wallShape = new THREE.Shape();
    //     wallShape.moveTo(-width, height);
    //     wallShape.lineTo(-width, -height);
    //     wallShape.lineTo(width, -height);
    //     wallShape.lineTo(width, height);
    //     wallShape.lineTo(-width, height);
        this.model.objects.windows.forEach(windowData => {
            console.log(windowData.window.partOfWall + " >> " + wallID)
            if(windowData.window.partOfWall == wallID){
                
               

                let local1 = new THREE.Vector3(this.calculateRatio(windowData.window.centerPoint.coordX), this.calculateRatio(windowData.window.centerPoint.coordY) + this.calculateRatio(height) * 0.6);

                // let hole = new THREE.Path();
                // hole.moveTo(local1.x - this.calculateRatio(height) * 0.4, local1.y + this.calculateRatio(height) * 0.3);
                // hole.lineTo(local1.x + this.calculateRatio(height) * 0.4, local1.y + this.calculateRatio(height) * 0.3);
                // hole.lineTo(local1.x + this.calculateRatio(height) * 0.4, local1.y - this.calculateRatio(height) * 0.3);
                // hole.lineTo(local1.x - this.calculateRatio(height) * 0.4, local1.y - this.calculateRatio(height) * 0.3);
                // hole.lineTo(local1.x - this.calculateRatio(height) * 0.4, local1.y + this.calculateRatio(height) * 0.3);

                // wallShape.holes.push(hole);
               

                let windowShape = new THREE.Shape();
                windowShape.moveTo(local1.x - height* 0.4, local1.y + height * 0.3);
                windowShape.lineTo(local1.x + height * 0.4, local1.y + height * 0.3);
                windowShape.lineTo(local1.x + height * 0.4, local1.y - height * 0.3);
                windowShape.lineTo(local1.x - height * 0.4, local1.y - height * 0.3);
                windowShape.lineTo(local1.x - height * 0.4, local1.y + height * 0.3);

                const windowGeometry = new THREE.ExtrudeGeometry([ windowShape ], {
                    steps: 512,
                    depth: thickness * 1.5,
                    bevelEnabled: false,
                });
                windowGeometry.translate(-local1.x, -local1.y, -(thickness*1.5) / 2);
                windowGeometry.rotateX(Math.PI / 2);
                if(orientation == 'vertical') windowGeometry.rotateZ(Math.PI / 2);
                windowGeometry.translate(local1.x, local1.y, (thickness*1.5) + height * 0.3);
                let window = new THREE.Mesh(windowGeometry, this.setupWindowMaterial(
                    this.textures.windowTextureLoaded.winCOL,
                    this.textures.windowTextureLoaded.winNRM,
                    this.textures.windowTextureLoaded.winHGT
                ));
                window.position.z = 0;
                this.house.add(window);

                let windowFrameShape = new THREE.Shape();
                windowFrameShape.moveTo(local1.x - height * 0.4 - 0.1, local1.y + height * 0.3 + 0.1);
                windowFrameShape.lineTo(local1.x + height * 0.4 + 0.1, local1.y + height * 0.3 + 0.1);
                windowFrameShape.lineTo(local1.x + height * 0.4 + 0.1, local1.y - height * 0.3 - 0.1);
                windowFrameShape.lineTo(local1.x - height * 0.4 - 0.1, local1.y - height * 0.3 - 0.1);
                windowFrameShape.lineTo(local1.x - height * 0.4 - 0.1, local1.y + height * 0.3 + 0.1);
                
                let hole = new THREE.Path();
                hole.moveTo(local1.x - height * 0.4, local1.y + height * 0.3);
                hole.lineTo(local1.x + height * 0.4, local1.y + height * 0.3);
                hole.lineTo(local1.x + height * 0.4, local1.y - height * 0.3);
                hole.lineTo(local1.x - height * 0.4, local1.y - height * 0.3);
                hole.lineTo(local1.x - height * 0.4, local1.y + height * 0.3);
                
                windowFrameShape.holes.push(hole);
                const windowFrameGeometry = new THREE.ExtrudeGeometry([ windowFrameShape ], {
                    steps: 512,
                    depth: thickness,
                    bevelEnabled: true,
                });
                windowFrameGeometry.translate(-local1.x, -local1.y, -thickness / 2);
                windowFrameGeometry.rotateX(Math.PI / 2);
                if(orientation == 'vertical') windowFrameGeometry.rotateZ(Math.PI / 2);
                windowFrameGeometry.translate(local1.x, local1.y, (thickness*1.5) + height * 0.3);
                let windowFrame = new THREE.Mesh(windowFrameGeometry, this.setupWindowFrameMaterial(
                    this.textures.windowTextureLoaded.winCOL,
                    this.textures.windowTextureLoaded.winNRM,
                    this.textures.windowTextureLoaded.winHGT
                ));
                windowFrame.position.z = 0;
                this.house.add(windowFrame);

            }
        });
    }

    buildWalls() {
        let orientation = '';
        this.model.walls.forEach(wallData => {
            const thickness = 0.5;
            //let wallShape = new THREE.Shape();
            let dist = this.model.calculateWallLengthRatio(wallData.wall.wallID);
            let wallGeometry;
           if(dist) wallGeometry = new THREE.BoxGeometry(dist + thickness,  thickness, this.calculateRatio(wallData.wall.wallHeight));
           

             if(wallData.wall.startPoint.coordX == wallData.wall.endPoint.coordX) {
            //     // vertical
                orientation = 'vertical';
                wallGeometry?.rotateZ(Math.PI / 2);
                // wallShape.moveTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX + thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX + thickness), this.calculateRatio(wallData.wall.endPoint.coordY - thickness));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX - thickness), this.calculateRatio(wallData.wall.endPoint.coordY - thickness));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                    
                // wallShape.moveTo(this.calculateRatio(wallData.wall.startPoint.coordX), this.calculateRatio(wallData.wall.startPoint.coordY));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX) ,this.calculateRatio(wallData.wall.endPoint.coordY));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX) + this.calculateRatio(wallData.wall.wallHeight), this.calculateRatio(wallData.wall.endPoint.coordY) );
                // wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX)+ this.calculateRatio(wallData.wall.wallHeight),  this.calculateRatio(wallData.wall.startPoint.coordY));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX),  this.calculateRatio(wallData.wall.startPoint.coordY));
                
            } else if(wallData.wall.startPoint.coordY == wallData.wall.endPoint.coordY) {
            //     // orizontal
                    orientation = 'horizontal';
                // wallShape.moveTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY - thickness));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX + thickness), this.calculateRatio(wallData.wall.endPoint.coordY + thickness));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX + thickness), this.calculateRatio(wallData.wall.endPoint.coordY - thickness));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY - thickness));

                // wallShape.moveTo(this.calculateRatio(wallData.wall.startPoint.coordX), this.calculateRatio(wallData.wall.startPoint.coordY));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX),this.calculateRatio(wallData.wall.endPoint.coordY));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX), this.calculateRatio(wallData.wall.endPoint.coordY) + this.calculateRatio(wallData.wall.wallHeight));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX),  this.calculateRatio(wallData.wall.startPoint.coordY) + this.calculateRatio(wallData.wall.wallHeight));
                // wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX),  this.calculateRatio(wallData.wall.startPoint.coordY));
        
            } else {
            //     // diagonal
                orientation = 'diagonal';
                wallGeometry?.rotateZ(this.checkAngle(wallData.wall.startPoint.coordX, wallData.wall.startPoint.coordY, wallData.wall.endPoint.coordX, wallData.wall.endPoint.coordY));

            //     wallShape.moveTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
            //     wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX + thickness), this.calculateRatio(wallData.wall.startPoint.coordY + thickness));
            //     wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX - thickness), this.calculateRatio(wallData.wall.endPoint.coordY + thickness));
            //     wallShape.lineTo(this.calculateRatio(wallData.wall.endPoint.coordX + thickness), this.calculateRatio(wallData.wall.endPoint.coordY - thickness));
            //     wallShape.lineTo(this.calculateRatio(wallData.wall.startPoint.coordX - thickness), this.calculateRatio(wallData.wall.startPoint.coordY - thickness));
             }
            
            // if(this.model.objects.windows.length > 0) {
            //     let wallShape = new THREE.Shape();
            //     if(dist) wallShape = this.buildWindows(wallData.wall.wallID, dist + thickness, wallData.wall.wallHeight );
            //     console.log(wallShape.holes);
            //     wallGeometry = new THREE.ExtrudeGeometry([ wallShape ], {
            //         steps: 200,
            //         depth: thickness,
            //         bevelEnabled: false,
            //     });
            // }
            
            
            // Promise.all(this.textures.getTextures(this.textures.groundTexturePath))
            // .then(textures => {
            //     // create your materials, meshs...
            //     // render the scene
            // // })
            // .catch(err => console.error(err))
            // wallGeometry.rotateOd(Math.PI / 2);
             console.log("orientation: " + orientation)
            let middle = this.model.calculateMiddleRatio(wallData.wall.wallID);
           if(middle) wallGeometry?.translate(middle.coordX, middle.coordY, this.calculateRatio(wallData.wall.wallHeight) / 2);
           console.log(middle?.coordX + " >>>>>> " + middle?.coordY);
           let wall = new THREE.Mesh(wallGeometry, this.setupWallMaterial(
                this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallCOL,
                this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallNRM,
                this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallHGT
                ));
            wall.position.z = 0;
            // let wallGroup = new THREE.Group();
            // wallGroup.add(wall);
            // wallGroup.rotateX(- Math.PI / 2)
                //wall.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI);

            // var geo = new THREE.WireframeGeometry( wall.geometry ); // or WireframeGeometry
            // var mat = new THREE.LineBasicMaterial( { color: 0xffffff } );
            // var wireframe = new THREE.LineSegments( geo, mat );
            // wall.add( wireframe );
            if( dist) this.buildWindows(wallData.wall.wallID, dist + thickness, this.calculateRatio(wallData.wall.wallHeight), thickness, orientation);
            if( dist) this.buildDoors(wallData.wall.wallID, dist + thickness, this.calculateRatio(wallData.wall.wallHeight), thickness, orientation);
            
            this.house.add(wall);
        });
        
        
    }



}