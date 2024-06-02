

export class Model {
    wallIndex: number = 0;
    roomIndex: number = 0;
    windowIndex: number = 0;
    doorIndex: number = 0;
    furnitureIndex: number = 0;
    public rooms: {
        room: {
            roomID: number,
            wallsID: number[]
        }
    }[] = [];
    public walls: { 
        wall: {
            wallID: number,
            startPoint: {
                coordX: number,
                coordY:number
            }; 
            endPoint: {
                coordX: number, 
                coordY:number
            }; 
            wallHeight: number,
            linked: {
                startPoint: {
                    wallID: number,
                    roomID: number
                }[],
                endPoint: {
                    wallID: number,
                    roomID: number
                }[]
            },
            roomID: number[]
        }
    }[] = []; 

    public objects : {
        windows: {
            window: {
                windowID: number,
                centerPoint: {
                    coordX: number,
                    coordY: number
                },
                partOfWall: number
            }
        }[],
        doors: {
            door: {
                doorID: number,
                centerPoint: {
                    coordX: number,
                    coordY: number
                },
                partOfWall: number
            }
        }[],
        furniture: {}[]
    } = {
        windows: [],
        doors: [],
        furniture: []
    };


    public polygonWalls : {
        wall: {
            wallID: number,
            startPoint: {
                coordX: number,
                coordY:number
            }; 
            endPoint: {
                coordX: number, 
                coordY:number
            }; 
            wallHeight: number,
            linked: {
                startPoint: {
                    wallID: number,
                    roomID: number
                }[],
                endPoint: {
                    wallID: number,
                    roomID: number
                }[]
            },
            roomID: number[]
        }
    }[] = [];
    
    
    addToWalls(startPointX: number, startPointY: number, endPointX: number, endPointY: number, wallHeight: number): {
        wall: {
            wallID: number,
            startPoint :{
                coordX: number,
                coordY: number
            },
            endPoint: {
                coordX: number,
                coordY: number
            },
            wallHeight: number,
            linked: {
                startPoint: {
                    wallID: number,
                    roomID: number
                }[],
                endPoint: {
                    wallID: number,
                    roomID: number
                }[]
            },
            roomID : number[]
        }
    } {
        let newWall = {
            wall: {
                wallID: this.wallIndex,
                startPoint :{
                    coordX: startPointX,
                    coordY: startPointY
                },
                endPoint: {
                    coordX: endPointX,
                    coordY: endPointY
                },
                wallHeight: wallHeight,
                linked: {
                    startPoint: [],
                    endPoint: []
                },
                roomID: [this.roomIndex]
            }
        };
        this.walls.push(newWall);
        this.wallIndex++;
        return newWall;
    }

    addToRooms(wallsID: number[]) {
        this.rooms.push({
            room: {
                roomID: this.roomIndex,
                wallsID: wallsID
            }
        })
        return this.roomIndex++;
    }

    calculateWallLength(wallID: number) {
        let wall = this.findWallByID(wallID);
        if(wall) return Math.sqrt(Math.pow(wall.wall.endPoint.coordX - wall.wall.startPoint.coordX, 2) + Math.pow(wall.wall.endPoint.coordY - wall.wall.startPoint.coordY, 2));
    }

    calculateWallLengthRatio(wallID: number) {
        let wall = this.findWallByID(wallID);
        if(wall) return Math.sqrt(Math.pow(wall.wall.endPoint.coordX /30 - wall.wall.startPoint.coordX / 30, 2) + Math.pow(wall.wall.endPoint.coordY/30 - wall.wall.startPoint.coordY/30, 2));
    }

    calculateMiddle(wallID: number) {
        let wall = this.findWallByID(wallID);
        if(wall) return {
            coordX: (wall.wall.endPoint.coordX + wall.wall.startPoint.coordX) / 2,
            coordY: (wall.wall.endPoint.coordY + wall.wall.startPoint.coordY) / 2
        }
    }

    calculateMiddleRatio(wallID: number) {
        let wall = this.findWallByID(wallID);
        if(wall) return {
            coordX: (wall.wall.endPoint.coordX / 30 + wall.wall.startPoint.coordX / 30) / 2,
            coordY: (wall.wall.endPoint.coordY / 30 + wall.wall.startPoint.coordY / 30) / 2
        }
    }

    addToObjects(type: string, centerPointX: number, centerPointY: number, partOfWall?: number) {
        if(type == 'window' && partOfWall != undefined) {
            this.objects.windows.push({
                window: {
                    windowID: this.windowIndex,
                    centerPoint: {
                        coordX: centerPointX,
                        coordY: centerPointY
                    },
                    partOfWall: partOfWall
                }
            })
            return this.windowIndex++;
        } else if(type == 'door' && partOfWall != undefined) {
            this.objects.doors.push({
                door: {
                    doorID: this.doorIndex,
                    centerPoint: {
                        coordX: centerPointX,
                        coordY: centerPointY
                    },
                    partOfWall: partOfWall
                }
            })
            return this.doorIndex++;
        } else if(type == 'furniture') {
            return this.furnitureIndex++;
        }
    }

    findWindowByID(windowID: number){ 
        for (var window of this.objects.windows) {
            if(window.window.windowID == windowID){
                return window;
            }
        }
        return undefined;
    }

    findDoorByID(doorID: number){ 
        for (var door of this.objects.doors) {
            if(door.door.doorID == doorID){
                return door;
            }
        }
        return undefined;
    }

    updateWindow(windowID: number, window: {
        window: {
            windowID: number;
            centerPoint: {
                coordX: number;
                coordY: number;
            };
            partOfWall: number;
        };
    }) {
        let oldWindow = this.findWindowByID(windowID);
        if(oldWindow) {
            oldWindow = window;
        }
    }

    updateDoor(doorID: number, door: {
        door: {
            doorID: number;
            centerPoint: {
                coordX: number;
                coordY: number;
            };
            partOfWall: number;
        };
    }) {
        let oldDoor = this.findDoorByID(doorID);
        if(oldDoor) {
            oldDoor = door;
        }
    }

    getWallsFromRoom(roomID: number) {
        let walls: {
            wall: {
                wallID: number,
                startPoint :{
                    coordX: number,
                    coordY: number
                },
                endPoint: {
                    coordX: number,
                    coordY: number
                },
                wallHeight: number,
                linked: {
                    startPoint: {
                        wallID: number,
                        roomID: number
                    }[],
                    endPoint: {
                        wallID: number,
                        roomID: number
                    }[]
                },
            }
        }[] = [];
        for(var room of this.rooms) {
            if(room.room.roomID == roomID) {
                for(var id of room.room.wallsID) {
                    let wall = this.findWallByID(id);
                    if(wall) walls.push(wall);
                }
            }
        }
        return walls;
    }

    findWallByID(wallID: number){ 
        for (var wall of this.walls) {
            if(wall.wall.wallID == wallID){
                return wall;
            }
        }
        return undefined;
    }

    checkWallInRooms(wallID: number) {
        let ids: number[] = [];
        for(var room of this.rooms) {
            for(var id of room.room.wallsID) {
                if(id == wallID) {
                    ids.push(room.room.roomID);
                }
            }
        }
        return ids;
    }

    updateWall(wallID: number, newWall: { 
        wall: {
            wallID: number,
            startPoint: {
                coordX: number,
                coordY:number
            }; 
            endPoint: {
                coordX: number, 
                coordY:number
            }; 
            wallHeight: number,
            linked: {
                startPoint: {
                    wallID: number,
                    roomID: number
                }[],
                endPoint: {
                    wallID: number,
                    roomID: number
                }[]
            },
            roomID: number[]
        }
    }) {
        let wall = this.findWallByID(wallID);
        if(wall) {
            this.walls[this.walls.indexOf(wall)] = newWall;
        }
        
        // this.rooms.forEach(room => {
        //     new Wall().createRoom(this.roomToCoords(room));
        // })
    }

    // updateWallStartPoint(wallID: number, startPointX: number, startPointY: number) {
    //     let wall = this.findWallByID(wallID);
    //     if(wall) {
    //         this.updateWall(wallID, {
    //             wall: {
    //                 wallID: wallID,
    //                 startPoint:{
    //                     coordX: startPointX,
    //                     coordY: startPointY
    //                 },
    //                 endPoint: {
    //                     coordX: wall.wall.endPoint.coordX,
    //                     coordY: wall.wall.endPoint.coordY
    //                 },
    //                 wallHeight: wall.wall.wallHeight,
    //                 linked: {
    //                     startPoint: wall.wall.linked.startPoint,
    //                     endPoint: wall.wall.linked.endPoint
    //                 },
    //                 roomID: wall.wall.roomID
    //             }
    //         })
    //     }
    // }

    // updateWallEndPoint(wallID: number, endPointX: number, endPointY: number) {
    //     let wall = this.findWallByID(wallID);
    //     if(wall) {
    //         this.updateWall(wallID, {
    //             wall: {
    //                 wallID: wallID,
    //                 startPoint:{
    //                     coordX: wall.wall.startPoint.coordX,
    //                     coordY: wall.wall.endPoint.coordY
    //                 },
    //                 endPoint: {
    //                     coordX: endPointX,
    //                     coordY: endPointY
    //                 },
    //                 wallHeight: wall.wall.wallHeight,
    //                 linked: {
    //                     startPoint: wall.wall.linked.startPoint,
    //                     endPoint: wall.wall.linked.endPoint
    //                 },
    //                 roomID: wall.wall.roomID
    //             }
    //         })
    //     }
        
    // }


    // dfs_cycle(point1: number, point2: number)
    // {
    //     // already (completely)
    //     // visited vertex.
    //     // console.log("-----------------");
    //     // console.log("point: " + point1);
    //     // console.log("parent: " + point2);
    //     // console.log("point rels: " + this.plan[point1]);
    //     // console.log("parent rels: " + this.plan[point2]);
    //     // console.log("type: " + this.type[point1]);
    //     // console.log("parent: " + this.parent[point1]);
    //     if (this.type[point1] == 2)
    //     {
    //         return;
    //     }
        
    //     // seen vertex, but was not 
    //     // completely visited -> cycle 
    //     // detected. backtrack based on 
    //     // parents to find the complete
    //     // cycle.


    //     if (this.type[point1] == 1)
    //     {
    //         let polygon : number[] = [];
    //         let currentPoint = point2;
    //         polygon.push(currentPoint);
        
    //         // backtrack the vertex which 
    //         // are in the current cycle 
    //         // thats found
    //         while (currentPoint != point1)
    //         {
    //             let parent = this.parent[currentPoint];
    //            // console.log("parent----------: " + this.parent[currentPoint]);
    //             if(parent == 0) {
    //                 polygon.push(0);
    //                 currentPoint = point1; 
    //                 polygon.push(point1);      
    //             } else {
    //                 if(parent) currentPoint = parent;
                
    //                 polygon.push(currentPoint);
    //             }
                
    //         }
    //         this.polygons[this.polygonNumber] =  polygon;
    //         this.polygonNumber++;
    //         return;
    //     }
    //     this.parent[point1] = point2;
    //    // console.log("parent after: " + this.parent[point1]);
    //     // partially visited.
    //     this.type[point1] =  1;
    //   //  console.log("type after: " + this.type[point1]);
    //     // simple dfs on graph
    //     this.plan[point1].forEach(point => {
    //         // if it has not been 
    //         // visited previously
    //         if (point != this.parent[point1]) {
    //             this.dfs_cycle(point, point1);
    //         }
            
    //     })
        
    //     // completely visited.
    //     this.type[point1] = 2;
    // }
 
    // getPolygons()
    // {
    //     // print all the vertex with 
    //     // same cycle
    //     for (var i = 0; i < this.polygonNumber; i++)
    //     {
    //         // Print the i-th cycle
    //         //console.log("Cycle Number " + (i+1) + ":");
    //         let point= this.polygons[i];
    //         let wallsID: number[] = [];
    //         if(point) {
    //             for(var x of point){
    //                // console.log(" " + x);
    //                // this.type[x] = 2;
    //                let wallID = this.pointsInfo[x].wallID;
    //                wallsID.push(wallID);
    //             }
    //         }
    //         this.addToRooms(this.polygons[i]);
    //     }
    // }

    checkLinkage(coords: number[]){
        for (var wall of this.walls) {
            if(wall.wall.startPoint.coordX == coords[0] && wall.wall.startPoint.coordY == coords[1]
                || wall.wall.endPoint.coordX == coords[0] && wall.wall.endPoint.coordY == coords[1]
            ){
                return true;
            }
        }
        return false;
    }

    getLinkage(coords: number[]){
        let linkedWalls : {
            linkedPoint: string,
            wall: {
                wall: {
                    wallID: number,
                    startPoint: {
                        coordX: number,
                        coordY:number
                    }; 
                    endPoint: {
                        coordX: number, 
                        coordY:number
                    }; 
                    wallHeight: number,
                    linked: {
                        startPoint: {
                            wallID: number,
                            roomID: number
                        }[],
                        endPoint: {
                            wallID: number,
                            roomID: number
                        }[]
                    }
                }
            }
        }[] = [];
        for (var wall of this.walls) {
            if(wall.wall.startPoint.coordX == coords[0] && wall.wall.startPoint.coordY == coords[1]){
                linkedWalls.push({
                    linkedPoint: "start",
                    wall: wall
                });
            } else if(wall.wall.endPoint.coordX == coords[0] && wall.wall.endPoint.coordY == coords[1]) {
                linkedWalls.push({
                    linkedPoint: "end",
                    wall: wall
                });
            }
        }
        return linkedWalls;
    }

    wallsToCoords(wallsToConvert : {
        wall: {
            wallID: number,
            startPoint: {
                coordX: number,
                coordY:number
            }; 
            endPoint: {
                coordX: number, 
                coordY:number
            }; 
            wallHeight: number,
            linked: {
                startPoint: number,
                endPoint: number
            }
        }
    }[]) {
        let walls: {startPoint: {coordX: number, coordY:number}; endPoint: {coordX: number, coordY:number};}[] = [];
        wallsToConvert.map(function(wall){
            walls.push({
                startPoint:{
                    coordX: wall.wall.startPoint.coordX, 
                    coordY: wall.wall.startPoint.coordY
                },
                endPoint: {
                    coordX: wall.wall.endPoint.coordX, 
                    coordY: wall.wall.endPoint.coordY
                }
            });
        });
        return walls;
    }

    roomToCoords(roomID: number) {
        let walls: {startPoint: {coordX: number, coordY:number}; endPoint: {coordX: number, coordY:number};}[] = [];
        let roomWalls = this.getWallsFromRoom(roomID);
        for(var wall of roomWalls) {
            if(wall) {
                //console.log(wall.wall.wallID);
                walls.push({
                    startPoint:{
                        coordX: wall.wall.startPoint.coordX, 
                        coordY: wall.wall.startPoint.coordY
                    },
                    endPoint: {
                        coordX: wall.wall.endPoint.coordX, 
                        coordY: wall.wall.endPoint.coordY
                    }
                })
            }
        }
        return walls;
    }

    createRoom(polygonWalls : {
        wall: {
            wallID: number,
            startPoint: {
                coordX: number,
                coordY:number
            }; 
            endPoint: {
                coordX: number, 
                coordY:number
            }; 
            wallHeight: number,
            linked: {
                startPoint: {
                    wallID: number,
                    roomID: number
                }[],
                endPoint: {
                    wallID: number,
                    roomID: number
                }[]
            }
        }
    }[]) {
        let wallsID : number[] = [];
        polygonWalls.map(function(wall){
            wallsID.push(wall.wall.wallID);
        }); 
        let id = this.addToRooms(wallsID);
        this.walls.forEach(w1 => {
            polygonWalls.forEach(w2 => {
                if(w1.wall.wallID == w2.wall.wallID){
                    w1.wall.roomID.push(id);
                    console.log(w1.wall.roomID);
                }
            })
        });

        this.polygonWalls = [];
        return id;
    }

    getCoordsFromWall(wallID: number) {
        let wall = this.findWallByID(wallID);
        if(wall)
            return {
                startPoint: {
                    coordX: wall?.wall.startPoint.coordX,
                    coordY: wall?.wall.startPoint.coordY
                },
                endPoint: {
                    coordX: wall?.wall.endPoint.coordX,
                    coordY: wall?.wall.endPoint.coordY
                },
            }
    }

    // getRooms() {
    //     // let p1 = this.getCoordsFromWall(1);
        
    //     // if(p1) console.log("p1: " + p1.startPoint.coordX + " " + p1.startPoint.coordY)
    //     // if(p1) console.log("p1: " + p1.endPoint.coordX + " " + p1.endPoint.coordY)
    //     // let p2 = this.getCoordsFromWall(0);
    //     // if(p2) console.log("p2: " + p2.startPoint.coordX + " " + p2.startPoint.coordY)
    //     // if(p2) console.log("p2: " + p2.endPoint.coordX + " " + p2.endPoint.coordY)
    //     this.dfs_cycle(1, 0);
    //     console.log("Polygons: " + this.polygons);
    //    for(let i = 0; i < this.plan.length; i++) {
    //     for(let j=0;j < this.plan[i].length; j++) {
    //         console.log(i + ": " + this.plan[i][j])
    //     }
    //    }
    //     console.log("Polygon no: " + this.polygonNumber);
        
    //     this.getPolygons();
        
    //     //this.parent.forEach(v => v = 0);
    // }

    // reset() {
    //     this.type = Array(this.type.length).fill(0);
    //     this.parent = Array(this.type.length).fill(0);
    //     this.polygonNumber = 0;
    //     this.rooms
    // }

    checkClosedPolygon(firstWall: 
        {
            wall: {
                wallID: number,
                startPoint: {
                    coordX: number,
                    coordY:number
                }; 
                endPoint: {
                    coordX: number, 
                    coordY:number
                }; 
                wallHeight: number,
                linked: {
                    startPoint: {
                        wallID: number,
                        roomID: number
                    }[],
                    endPoint: {
                        wallID: number,
                        roomID: number
                    }[]
                },
                roomID: number[]
            }
        } | null)
    {

        console.log("-------------------------");
        
        // console.log("firstWall: " + firstWall?.wall.wallID + " - " + firstWall?.wall.startPoint.coordX + " " + firstWall?.wall.startPoint.coordY + ", "+ firstWall?.wall.endPoint.coordX + " " + firstWall?.wall.endPoint.coordY);
        this.polygonWalls = []; 
        let startPoints:{ coordX: number; coordY: number; }[] = [];
        let endPoints:{ coordX: number; coordY: number; }[] =[];
        if(firstWall) {
            startPoints.push(firstWall.wall.startPoint);
            endPoints.push(firstWall.wall.endPoint);
            //this.polygonWalls.push(firstWall);
            this.polygonWalls = [];
            this.checkWallsLinks(firstWall, startPoints, endPoints);
            if(firstWall.wall.linked.endPoint.length > 0 && firstWall.wall.linked.startPoint.length > 0) {
                
                // new Wall().createRoom(this.wallsToCoords());
                // console.log("polygon : " + this.polygonWalls);
                // this.polygonWalls.forEach(wall=> {
                //     console.log("Wall in final array: " + wall.wall.startPoint.coordX + " " + wall.wall.startPoint.coordY + ", " + wall.wall.endPoint.coordX + " " + wall.wall.endPoint.coordY)
                // })
                return this.createRoom(this.polygonWalls);
            } else {
                // console.log("not a polygon");
            }
        }
        return -1;
    }

    checkDegreeBetweenWalls(wall1: {wall: { wallID: number, startPoint: {coordX: number, coordY: number}; endPoint: {coordX: number, coordY: number}; wallHeight: number, linked: {startPoint: number, endPoint: number}, roomID: number[]}},
        wall2: {wall: { wallID: number, startPoint: {coordX: number, coordY: number}; endPoint: {coordX: number, coordY: number}; wallHeight: number, linked: {startPoint: number, endPoint: number}}}
    ) {
        //distance
        var wall1X = wall1.wall.endPoint.coordX - wall1.wall.startPoint.coordX;
        var wall1Y = wall1.wall.endPoint.coordY - wall1.wall.startPoint.coordY;
        var wall2X = wall2.wall.endPoint.coordX - wall2.wall.startPoint.coordX;
        var wall2Y = wall2.wall.endPoint.coordY - wall2.wall.startPoint.coordY;
        var angle = Math.atan2(wall1X * wall2Y - wall1Y * wall2X, wall1X * wall2X + wall1Y * wall2Y);
        if(angle < 0) {angle = angle * -1;}
        var degree_angle = 180 - angle * (180 / Math.PI);
        return degree_angle;
        //if(degree_angle > 90) return false;
        //return true;
    }

    checkWallsLinks(wall: {wall: { wallID: number, startPoint: {coordX: number, coordY: number}; endPoint: {coordX: number, coordY: number}; wallHeight: number, linked: {startPoint: {wallID: number,roomID: number}[], endPoint: {wallID: number,roomID: number}[]}, roomID: number[]}}, 
        startPoints: { coordX: number; coordY: number; }[], 
        endPoints: { coordX: number; coordY: number; }[]) 
        {
             //console.log("current wall is: " + wall?.wall.startPoint.coordX + " " + wall?.wall.startPoint.coordY + ", "+ wall?.wall.endPoint.coordX + " " + wall?.wall.endPoint.coordY);

            if(wall.wall.linked.endPoint.length == 0) {
                this.walls.forEach(wall2 => {
                    console.log("-checking " +  + wall2.wall.wallID + " - " + wall2?.wall.startPoint.coordX + " " + wall2?.wall.startPoint.coordY + ", "+ wall2?.wall.endPoint.coordX + " " + wall2?.wall.endPoint.coordY);
        
                    if(!this.identicWalls(wall, wall2)) {
                        if(wall.wall.endPoint.coordX == wall2.wall.startPoint.coordX && wall.wall.endPoint.coordY == wall2.wall.startPoint.coordY){ 
                            //console.log("Angle is: " + this.checkDegreeBetweenWalls(wall, wall2));
                            //if(this.checkDegreeBetweenWalls(wall, wall2) <= 90) {
                            if(wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID)).length > 0) {// perete comun
                                endPoints.pop();
                                wall.wall.linked.endPoint.push({wallID: wall2.wall.wallID, roomID: wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID))[0]});
                                wall2.wall.linked.startPoint.push({wallID: wall.wall.wallID, roomID: wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID))[0]});
                                if(wall2.wall.linked.endPoint.length == 0) endPoints.push(wall2.wall.endPoint);
                                this.polygonWalls.push(wall2);
                                this.checkWallsLinks(wall2, startPoints, endPoints);
                            } else if(wall2.wall.linked.startPoint.length > 2 && wall2.wall.linked.endPoint.length > 2) {
                                endPoints.pop();
                                wall.wall.linked.endPoint.push({wallID: wall2.wall.wallID, roomID:wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID))[0]});
                                wall2.wall.linked.startPoint.push({wallID: wall.wall.wallID, roomID:wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID))[0]});
                                if(wall2.wall.linked.endPoint.length == 0) endPoints.push(wall2.wall.endPoint);
                                this.polygonWalls.push(wall2);
                                wall2.wall.roomID.push(wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]);
                                wall.wall.linked.endPoint.push({wallID: wall2.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
                                wall2.wall.linked.startPoint.push({wallID: wall.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})

                                this.checkWallsLinks(wall2, startPoints, endPoints);
                            }
                        } else if (wall.wall.endPoint.coordX == wall2.wall.endPoint.coordX && wall.wall.endPoint.coordY == wall2.wall.endPoint.coordY) {
                           // console.log("Angle is: " + this.checkDegreeBetweenWalls(wall, wall2));
                            //if(this.checkDegreeBetweenWalls(wall, wall2) <= 90) {
                                if(wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID)).length > 0) {// perete comun
                                    endPoints.pop();
                                    wall.wall.linked.endPoint.push({wallID: wall2.wall.wallID, roomID:this.roomIndex});
                                    wall2.wall.linked.endPoint.push({wallID: wall.wall.wallID, roomID: this.roomIndex});
                                    if(!wall2.wall.linked.startPoint) startPoints.push(wall2.wall.startPoint);
                                    this.polygonWalls.push(wall2);
                                    this.checkWallsLinks(wall2, startPoints, endPoints);
                                } else if(wall2.wall.linked.startPoint.length > 2 && wall2.wall.linked.endPoint.length > 2) {
                                    endPoints.pop();
                                    wall.wall.linked.endPoint.push({wallID: wall2.wall.wallID, roomID:this.roomIndex});
                                    wall2.wall.linked.endPoint.push({wallID: wall.wall.wallID, roomID: this.roomIndex});
                                    if(!wall2.wall.linked.startPoint) startPoints.push(wall2.wall.startPoint);
                                    this.polygonWalls.push(wall2);
                                    wall2.wall.roomID.push(wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]);
                                    wall.wall.linked.endPoint.push({wallID: wall2.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
                                    wall2.wall.linked.startPoint.push({wallID: wall.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
                                    this.checkWallsLinks(wall2, startPoints, endPoints);
                                }
                            //}
                        } else {
                            // console.log("---not a match1");
                        }
                    } else {
                        // console.log("--same wall1");
                    }
                });
            } else {
                wall.wall.linked.endPoint.forEach(endPoint=> {
                    let wall2 = this.findWallByID(endPoint.wallID);
                    if(wall2 && !this.identicWalls(wall, wall2)) {
                        if(wall.wall.roomID.includes(endPoint.roomID)) {
                            // console.log("existent wall " + wall2?.wall.startPoint.coordX + " " + wall2?.wall.startPoint.coordY + ", " + wall2?.wall.endPoint.coordX + " " + wall2?.wall.endPoint.coordY)
                            if(this.polygonWalls.indexOf(wall2) < 0) {
                                this.polygonWalls.push(wall2);
                                this.checkWallsLinks(wall2, startPoints, endPoints);
                            }
                        }else if(wall2.wall.linked.startPoint.length > 2 && wall2.wall.linked.endPoint.length > 2){
                            if(this.polygonWalls.indexOf(wall2) < 0) {
                                this.polygonWalls.push(wall2);
                                wall.wall.linked.endPoint.push({wallID: wall2.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
                                wall2.wall.roomID.push(wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0])
                                this.checkWallsLinks(wall2, startPoints, endPoints);
                            }
                        } 

                    }   
                
                })
                
            }
            if(wall.wall.linked.startPoint.length == 0) {
                this.walls.forEach(wall2 => {
                    // console.log("-checking " +  + wall2.wall.wallID + " - " + wall2?.wall.startPoint.coordX + " " + wall2?.wall.startPoint.coordY + ", "+ wall2?.wall.endPoint.coordX + " " + wall2?.wall.endPoint.coordY);
            
                    if(!this.identicWalls(wall, wall2)) {
                      //  console.log("--now checking " + wall2?.wall.startPoint.coordX + " " + wall2?.wall.startPoint.coordY + ", "+ wall2?.wall.endPoint.coordX + " " + wall2?.wall.endPoint.coordY+ " === "+ wall?.wall.startPoint.coordX + " " + wall?.wall.startPoint.coordY + ", "+ wall?.wall.endPoint.coordX + " " + wall?.wall.endPoint.coordY)

                        if(wall.wall.startPoint.coordX == wall2.wall.startPoint.coordX && wall.wall.startPoint.coordY == wall2.wall.startPoint.coordY){ 
                                if(wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID)).length > 0) {// perete comun
                                    startPoints.pop();
                                    wall.wall.linked.startPoint.push({wallID: wall2.wall.wallID, roomID: wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID))[0]});
                                    wall2.wall.linked.startPoint.push({wallID: wall.wall.wallID, roomID: wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID))[0]});
                                    if(wall2.wall.linked.endPoint.length == 0) startPoints.push(wall2.wall.endPoint);
                                    this.polygonWalls.push(wall2);
                                    this.checkWallsLinks(wall2, startPoints, endPoints);
                                } else if(wall2.wall.linked.startPoint.length > 2 && wall2.wall.linked.endPoint.length > 2) {
                                    startPoints.pop();
                                    wall.wall.linked.startPoint.push({wallID: wall2.wall.wallID, roomID:wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID))[0]});
                                    wall2.wall.linked.startPoint.push({wallID: wall.wall.wallID, roomID:wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID))[0]});
                                    if(wall2.wall.linked.endPoint.length == 0) startPoints.push(wall2.wall.endPoint);
                                    this.polygonWalls.push(wall2);
                                    wall2.wall.roomID.push(wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]);
                                    wall.wall.linked.startPoint.push({wallID: wall2.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
                                    wall2.wall.linked.startPoint.push({wallID: wall.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
    
                                    this.checkWallsLinks(wall2, startPoints, endPoints);
                                }
                        } else if (wall.wall.startPoint.coordX == wall2.wall.endPoint.coordX && wall.wall.startPoint.coordY == wall2.wall.endPoint.coordY) {
                                if(wall.wall.roomID.filter(roomID => wall2.wall.roomID.includes(roomID)).length > 0) {// perete comun
                                    startPoints.pop();
                                    wall.wall.linked.startPoint.push({wallID: wall2.wall.wallID, roomID:this.roomIndex});
                                    wall2.wall.linked.endPoint.push({wallID: wall.wall.wallID, roomID: this.roomIndex});
                                    if(wall2.wall.linked.startPoint.length == 0) startPoints.push(wall2.wall.startPoint);
                                    this.polygonWalls.push(wall2);
                                    this.checkWallsLinks(wall2, startPoints, endPoints);
                                } else if(wall2.wall.linked.startPoint.length > 2 && wall2.wall.linked.endPoint.length > 2) {
                                    startPoints.pop();
                                    wall.wall.linked.startPoint.push({wallID: wall2.wall.wallID, roomID:this.roomIndex});
                                    wall2.wall.linked.endPoint.push({wallID: wall.wall.wallID, roomID: this.roomIndex});
                                    if(wall2.wall.linked.startPoint.length == 0) startPoints.push(wall2.wall.startPoint);
                                    this.polygonWalls.push(wall2);
                                    wall2.wall.roomID.push(wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]);
                                    wall.wall.linked.startPoint.push({wallID: wall2.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
                                    wall2.wall.linked.endPoint.push({wallID: wall.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
                                    this.checkWallsLinks(wall2, startPoints, endPoints);
                                }
                        }else {
                            // console.log("---not a match2");
                        }
                    }
                    else {
                        // console.log("--same wall2");
                    }
                })
            } else {
                wall.wall.linked.endPoint.forEach(startPoint => {
                    let wall2 = this.findWallByID(startPoint.wallID);
                    if(wall2 && !this.identicWalls(wall, wall2)) {
                        if(wall.wall.roomID.includes(startPoint.roomID)) {
                            // console.log("existent wall " + wall2?.wall.startPoint.coordX + " " + wall2?.wall.startPoint.coordY + ", " + wall2?.wall.endPoint.coordX + " " + wall2?.wall.endPoint.coordY)
                            if(this.polygonWalls.indexOf(wall2) < 0) {
                                this.polygonWalls.push(wall2);
                                this.checkWallsLinks(wall2, startPoints, endPoints);
                            }
                        }else if(wall2.wall.linked.startPoint.length > 2 && wall2.wall.linked.endPoint.length > 2){
                            if(this.polygonWalls.indexOf(wall2) < 0) {
                                this.polygonWalls.push(wall2);
                                wall.wall.linked.endPoint.push({wallID: wall2.wall.wallID, roomID: wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0]})
                                wall2.wall.roomID.push(wall.wall.roomID.filter(roomID => !wall2.wall.roomID.includes(roomID))[0])
                                this.checkWallsLinks(wall2, startPoints, endPoints);
                            }
                        } 

                    }   
                
                })
                
            }
        }

    identicWalls(wall1: { 
        wall: {
            wallID: number,
            startPoint: {
                coordX: number,
                coordY:number
            }; 
            endPoint: {
                coordX: number, 
                coordY:number
            }; 
            wallHeight: number
        }
    }, wall2: { 
        wall: {
            wallID: number,
            startPoint: {
                coordX: number,
                coordY:number
            }; 
            endPoint: {
                coordX: number, 
                coordY:number
            }; 
            wallHeight: number
        }
    }) {
        if((wall1.wall.startPoint.coordX == wall2.wall.startPoint.coordX && wall1.wall.startPoint.coordY == wall2.wall.startPoint.coordY 
            && wall1.wall.endPoint.coordX == wall2.wall.endPoint.coordX && wall1.wall.endPoint.coordY == wall2.wall.endPoint.coordY)
        || (wall1.wall.startPoint.coordX == wall2.wall.endPoint.coordX && wall1.wall.startPoint.coordY == wall2.wall.endPoint.coordY
            && wall1.wall.endPoint.coordX == wall2.wall.startPoint.coordX && wall1.wall.endPoint.coordY == wall2.wall.startPoint.coordY)) {
            // console.log("identical: " +  wall2?.wall.startPoint.coordX + " " + wall2?.wall.startPoint.coordY + ", "+ wall2?.wall.endPoint.coordX + " " + wall2?.wall.endPoint.coordY+ " === "+ wall1?.wall.startPoint.coordX + " " + wall1?.wall.startPoint.coordY + ", "+ wall1?.wall.endPoint.coordX + " " + wall1?.wall.endPoint.coordY);
            return true;
        }
        return false;
    }

    toJSON(): string {
        let model = {
            rooms: this.rooms,
            walls: this.walls,
            objects: this.objects
        };
        return JSON.stringify(model);
    }
}