import * as THREE from 'three';
import { Model } from '../model/Model';
import { TextureManager } from './TextureManager';

export class Renderer {
    showRoof: boolean = false;
    scene: THREE.Scene =  new THREE.Scene();
    camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    mesh: THREE.Mesh = new THREE.Mesh();

    model: Model;
    houseGroup = new THREE.Group();
    house = new THREE.Object3D();
    roof = new THREE.Object3D();
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
    
    toggleShowRoof(showRoof: boolean){
        console.log(showRoof);
        if(this.model.roof.length > 0) {
            let roof = this.buildRoof();
            if(roof) {
                if(showRoof == true) {
                    this.house.add(roof);
                } else {
                    this.house.remove(roof);
                }
            }
            
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

    setupWallMaterial(width: number, texture: THREE.Texture, normalTexture: THREE.Texture, heightTexture: THREE.Texture): THREE.MeshPhongMaterial {
        // const textureLoaded = new THREE.TextureLoader().load(texture);
        // const normalTextureLoaded = new THREE.TextureLoader().load(normalTexture);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
       // texture.repeat.set( 1,  1);
        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.RepeatWrapping;
        //normalTexture.repeat.set( 1, 1 );
        heightTexture.wrapS = THREE.RepeatWrapping;
        heightTexture.wrapT = THREE.RepeatWrapping;

        texture.repeat.set(width / 4, 1);
        normalTexture.repeat.set(width / 4, 1);
        heightTexture.repeat.set(width / 4, 1);
        texture.needsUpdate = true;
        normalTexture.needsUpdate = true;
        heightTexture.needsUpdate = true;

        return new THREE.MeshPhongMaterial({ 
            map: texture,
            normalMap: normalTexture,
            // normalScale: new THREE.Vector2(4,4),
            displacementMap: heightTexture,
            displacementScale: 0,
            envMap: this.textures.envMap,
            reflectivity: 0.5,
        })
    }

    setupRoofMaterial(width: number, texture: THREE.Texture, normalTexture: THREE.Texture, heightTexture: THREE.Texture): THREE.MeshPhongMaterial {
        // const textureLoaded = new THREE.TextureLoader().load(texture);
        // const normalTextureLoaded = new THREE.TextureLoader().load(normalTexture);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
       // texture.repeat.set( 1,  1);
        normalTexture.wrapS = THREE.RepeatWrapping;
        normalTexture.wrapT = THREE.RepeatWrapping;
        //normalTexture.repeat.set( 1, 1 );
        heightTexture.wrapS = THREE.RepeatWrapping;
        heightTexture.wrapT = THREE.RepeatWrapping;
        
        texture.repeat.set(width/16, 1);
        normalTexture.repeat.set(width/16, 1);
        heightTexture.repeat.set(width/16, 1);
        texture.needsUpdate = true;
        normalTexture.needsUpdate = true;
        heightTexture.needsUpdate = true;

        return new THREE.MeshPhongMaterial({ 
            map: texture,
            normalMap: normalTexture,
            // normalScale: new THREE.Vector2(4,4),
            displacementMap: heightTexture,
            displacementScale: 0,
            envMap: this.textures.envMap,
            reflectivity: 0.5,
            side: THREE.DoubleSide
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
        //console.log("angle: " + degree_angle)
        return angle;
        //if(degree_angle > 90) return false;
        //return true;
    }


    buildDoors(wallID: number, width: number, height: number, thickness: number, orientation: string, angle: number) {
        //     let wallShape = new THREE.Shape();
        //     wallShape.moveTo(-width, height);
        //     wallShape.lineTo(-width, -height);
        //     wallShape.lineTo(width, -height);
        //     wallShape.lineTo(width, height);
        //     wallShape.lineTo(-width, height);
            this.model.objects.doors.forEach(doorData => {
                //console.log(doorData.door.partOfWall + " >> " + wallID)
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
                    if(orientation == 'vertical') doorGeometry.rotateZ(Math.PI/2);
                    else if(orientation == 'diagonal') doorGeometry.rotateZ(angle);
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
                    if(orientation == 'vertical') doorFrameGeometry.rotateZ(Math.PI/2);
                    else if(orientation == 'diagonal') doorFrameGeometry.rotateZ(angle);
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


    buildWindows(wallID: number, width: number, height: number, thickness: number, orientation: string, angle : number) {
    //     let wallShape = new THREE.Shape();
    //     wallShape.moveTo(-width, height);
    //     wallShape.lineTo(-width, -height);
    //     wallShape.lineTo(width, -height);
    //     wallShape.lineTo(width, height);
    //     wallShape.lineTo(-width, height);
        this.model.objects.windows.forEach(windowData => {
           // console.log(windowData.window.partOfWall + " >> " + wallID)
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
                if(orientation == 'vertical') windowGeometry.rotateZ(Math.PI/2);
                    else if(orientation == 'diagonal') windowGeometry.rotateZ(angle);
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
                if(orientation == 'vertical') windowFrameGeometry.rotateZ(Math.PI/2);
                else if(orientation == 'diagonal') windowFrameGeometry.rotateZ(angle);
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

    buildFloor() {
        this.model.rooms.forEach(roomData => {
            let floorShape = new THREE.Shape();
            roomData.room.wallsID.forEach(wallID => {
                let wall = this.model.findWallByID(wallID);
             //   console.log("nu gaseseste wall");
                if(wall) {
                   // console.log(this.calculateRatio(wall.wall.startPoint.coordX - 0.5), this.calculateRatio(wall.wall.startPoint.coordY - 0.5))
                    floorShape.moveTo(this.calculateRatio(wall.wall.startPoint.coordX - 0.5), this.calculateRatio(wall.wall.startPoint.coordY - 0.5));
                    floorShape.lineTo(this.calculateRatio(wall.wall.endPoint.coordX - 0.5), this.calculateRatio(wall.wall.endPoint.coordY - 0.5));
                }
            });
            let floorGeometry = new THREE.ExtrudeGeometry(floorShape, {
                        steps: 200,
                        depth: 0.2,
                        bevelEnabled: false,
                    }, );

            let floor = new THREE.Mesh(floorGeometry, this.setupWindowFrameMaterial(
                this.textures.windowTextureLoaded.winCOL,
                this.textures.windowTextureLoaded.winNRM,
                this.textures.windowTextureLoaded.winHGT
            )  
            );
            this.house.add(floor);
        })
    }

    buildRoof() {
        const vertices = [];
        const indices = [];
        let perimeter = this.model.roof;
        if(perimeter) {
           // console.log(perimeter);
            // Extract unique perimeter points from walls
            const perimeterPoints: { x: number, y: number; }[] = [];
            const uniquePoints = new Set();
            perimeter.forEach(wall => {
                const startPointKey = `${wall.wall.startPoint.coordX},${wall.wall.startPoint.coordY}`;
                const endPointKey = `${wall.wall.endPoint.coordX},${wall.wall.endPoint.coordY}`;
                if (!uniquePoints.has(startPointKey)) {
                    perimeterPoints.push({ x: this.calculateRatio(wall.wall.startPoint.coordX), y: this.calculateRatio(wall.wall.startPoint.coordY) });
                    uniquePoints.add(startPointKey);
                }
                if (!uniquePoints.has(endPointKey)) {
                    perimeterPoints.push({ x: this.calculateRatio(wall.wall.endPoint.coordX), y: this.calculateRatio(wall.wall.endPoint.coordY) });
                    uniquePoints.add(endPointKey);
                }
            });
        
            // Compute center point for the hip roof
            const centerX = perimeterPoints.reduce((sum, p) => sum + p.x, 0) / perimeterPoints.length;
            const centerY = perimeterPoints.reduce((sum, p) => sum + p.y, 0) / perimeterPoints.length;
        
            // Add vertices for the base and the top
            for (let i = 0; i < perimeterPoints.length; i++) {
                vertices.push(perimeterPoints[i].x, perimeterPoints[i].y, this.calculateRatio(perimeter[0].wall.wallHeight)); // base vertex
                vertices.push(perimeterPoints[i].x, perimeterPoints[i].y, this.calculateRatio(perimeter[0].wall.wallHeight)); // top vertex
            }
            vertices.push(centerX, centerY, this.calculateRatio(perimeter[0].wall.wallHeight + 120)); // center top vertex
        
            const topIndex = perimeterPoints.length * 2;
        
            // Create faces for the hip roof sides
            for (let i = 0; i < perimeterPoints.length; i++) {
                const nextIndex = (i + 1) % perimeterPoints.length;
                // Base to top center
                indices.push(i * 2, nextIndex * 2, topIndex);
                // Top vertices to top center
                indices.push(nextIndex * 2 + 1, i * 2 + 1, topIndex);
            }
        
            // Create BufferGeometry and set attributes
            const geometry = new THREE.BufferGeometry();
            const verticesFloat32Array = new Float32Array(vertices);
            
             // Compute bounding box
            const minX = Math.min(...perimeterPoints.map(p => p.x));
            const maxX = Math.max(...perimeterPoints.map(p => p.x));
            const minY = Math.min(...perimeterPoints.map(p => p.y));
            const maxY = Math.max(...perimeterPoints.map(p => p.y));
             // Create UVs
            const uvs = [];
            for (let i = 0; i < perimeterPoints.length; i++) {
                // Normalize the perimeter points to [0, 1] range based on bounding box
                const u = (perimeterPoints[i].x - minX) / (maxX - minX);
                const v = (perimeterPoints[i].y - minY) / (maxY - minY);
                uvs.push(u, v); // base vertex
                uvs.push(u, v); // top vertex
            }
            // Center top vertex UV (approximated as center of UV space)
            uvs.push(0.5, 0.5);
            const uvsFloat32Array = new Float32Array(uvs);
            geometry.setAttribute('position', new THREE.BufferAttribute(verticesFloat32Array, 3));
            geometry.setAttribute('uv', new THREE.BufferAttribute(uvsFloat32Array, 2));

            const indicesUint32Array = new Uint32Array(indices);
            geometry.setIndex(new THREE.BufferAttribute(indicesUint32Array, 1));
            geometry.computeVertexNormals();
        
            // Create the roof mesh
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
            return new THREE.Mesh(geometry, this.setupRoofMaterial(
                centerX*2,
                this.textures.roofTextureLoaded[this.textures.roofTextureSelected].roofCOL.clone(),
                this.textures.roofTextureLoaded[this.textures.roofTextureSelected].roofNRM.clone(),
                this.textures.roofTextureLoaded[this.textures.roofTextureSelected].roofHGT.clone()
            ),);
            // this.house.add(roof);
        }
        
    }

    buildWalls() {
        let orientation = '';
        let wallGeometry: THREE.BoxGeometry;
        let angle : number = 0;
        this.model.walls.forEach(wallData => {
            const thickness = 0.5;
            //let wallShape = new THREE.Shape();
            let dist = this.model.calculateWallLengthRatio(wallData.wall.wallID);
            
           if(dist) wallGeometry = new THREE.BoxGeometry(dist + thickness - 0.1,  thickness, this.calculateRatio(wallData.wall.wallHeight));
           

             if(wallData.wall.startPoint.coordX == wallData.wall.endPoint.coordX) {
            //     // vertical
                orientation = 'vertical';
                wallGeometry.rotateZ(Math.PI / 2);
                angle = Math.PI/2;
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
                angle = this.checkAngle(wallData.wall.startPoint.coordX, wallData.wall.startPoint.coordY, wallData.wall.endPoint.coordX, wallData.wall.endPoint.coordY);
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
            // console.log("orientation: " + orientation)




           let middle = this.model.calculateMiddleRatio(wallData.wall.wallID);
           if(middle) wallGeometry?.translate(middle.coordX, middle.coordY, this.calculateRatio(wallData.wall.wallHeight) / 2);
           // console.log(middle?.coordX + " >>>>>> " + middle?.coordY);
           let wall;
           if(wallGeometry && dist) {
                wall = new THREE.Mesh(wallGeometry, 
                    this.setupWallMaterial(
                        dist + thickness,
                        this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallCOL.clone(),
                        this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallNRM.clone(),
                        this.textures.wallTextureLoaded[this.textures.wallTextureSelected].wallHGT.clone()
                    ),
                );

                wall.position.z = 0;
                // let wallGroup = new THREE.Group();
                // wallGroup.add(wall);
                // wallGroup.rotateX(- Math.PI / 2)
                    //wall.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI);

                // var geo = new THREE.WireframeGeometry( wall.geometry ); // or WireframeGeometry
                // var mat = new THREE.LineBasicMaterial( { color: 0xffffff } );
                // var wireframe = new THREE.LineSegments( geo, mat );
                // wall.add( wireframe );
                if( dist) this.buildWindows(wallData.wall.wallID, dist + thickness, this.calculateRatio(wallData.wall.wallHeight), thickness, orientation, angle);
                if( dist) this.buildDoors(wallData.wall.wallID, dist + thickness, this.calculateRatio(wallData.wall.wallHeight), thickness, orientation, angle);
                this.buildFloor();
                
                this.house.add(wall);
           }
          
        });   
    }
}