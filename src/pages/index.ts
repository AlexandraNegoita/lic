// Import our custom CSS
import '/css/styles.css'
// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'

import * as Viewer2D from '../planner/viewer2d/Viewer2D';
import * as Viewer3D from '../planner/viewer3d/Viewer3D';
import { TextureManager } from '../planner/viewer3d/TextureManager';
import './menu';
import './loader';
import './designer';
import { SpriteManager } from '../planner/viewer2d/SpriteManager';
import { Parser } from '../planner/model/Parser';
import { Designer } from '../planner/model/Designer';




const textureManager = new TextureManager(
    [{ id: "0", for: "GROUND", path: "./assets/textures/ground/GroundGrassGreen002_COL_2K.jpg", type: "COL" },
    { id: "0", for: "GROUND", path: "./assets/textures/ground/GroundGrassGreen002_NRM_2K.jpg", type: "NRM" },

    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_THUMB.png", type: "THUMB" },
    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Base_Color.jpg", type: "COL" },
    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Normal.jpg", type: "NRM" },
    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Height.png", type: "HGT" },

    { id: "4954", for: "WALL", path: "./assets/textures/walls/wall_4954/Plaster_Rough_001_THUMB.jpg", type: "THUMB" },
    { id: "4954", for: "WALL", path: "./assets/textures/walls/wall_4954/Plaster_Rough_001_COLOR.jpg", type: "COL" },
    { id: "4954", for: "WALL", path: "./assets/textures/walls/wall_4954/Plaster_Rough_001_NORM.jpg", type: "NRM" },
    { id: "4954", for: "WALL", path: "./assets/textures/walls/wall_4954/Plaster_Rough_001_DISP.png", type: "HGT" },

    { id: "2050", for: "WALL", path: "./assets/textures/walls/wall_2050/Material_2050.jpg", type: "THUMB" },
    { id: "2050", for: "WALL", path: "./assets/textures/walls/wall_2050/Concrete_019_BaseColor.jpg", type: "COL" },
    { id: "2050", for: "WALL", path: "./assets/textures/walls/wall_2050/Concrete_019_Normal.jpg", type: "NRM" },
    { id: "2050", for: "WALL", path: "./assets/textures/walls/wall_2050/Concrete_019_Height.png", type: "HGT" },

    { id: "3959", for: "WALL", path: "./assets/textures/walls/wall_3959/Material_2051.jpg", type: "THUMB" },
    { id: "3959", for: "WALL", path: "./assets/textures/walls/wall_3959/Wall_Plaster_002_BaseColor.jpg", type: "COL" },
    { id: "3959", for: "WALL", path: "./assets/textures/walls/wall_3959/Wall_Plaster_002_Normal.jpg", type: "NRM" },
    { id: "3959", for: "WALL", path: "./assets/textures/walls/wall_3959/Wall_Plaster_002_Height.png", type: "HGT" },

    { id: "4359", for: "WALL", path: "./assets/textures/walls/wall_4359/Material_1952.jpg", type: "THUMB" },
    { id: "4359", for: "WALL", path: "./assets/textures/walls/wall_4359/Wall_Plaster_001_basecolor.jpg", type: "COL" },
    { id: "4359", for: "WALL", path: "./assets/textures/walls/wall_4359/Wall_Plaster_001_normal.jpg", type: "NRM" },
    { id: "4359", for: "WALL", path: "./assets/textures/walls/wall_4359/Wall_Plaster_001_height.png", type: "HGT" },

    { id: "6060", for: "WALL", path: "./assets/textures/walls/wall_6060/Material_606.png", type: "THUMB" },
    { id: "6060", for: "WALL", path: "./assets/textures/walls/wall_6060/Concrete_014_4K_COLOR.jpg", type: "COL" },
    { id: "6060", for: "WALL", path: "./assets/textures/walls/wall_6060/Concrete_014_4K_NORM.jpg", type: "NRM" },
    { id: "6060", for: "WALL", path: "./assets/textures/walls/wall_6060/Concrete_014_4K_DISP.png", type: "HGT" },

    { id: "4683", for: "ROOF", path: "./assets/textures/roof/Material_1903.jpg", type: "THUMB" },
    { id: "4683", for: "ROOF", path: "./assets/textures/roof/Tiles_Stone_001_basecolor.jpg", type: "COL" },
    { id: "4683", for: "ROOF", path: "./assets/textures/roof/Tiles_Stone_001_normal.jpg", type: "NRM" },
    { id: "4683", for: "ROOF", path: "./assets/textures/roof/Tiles_Stone_001_height.png", type: "HGT" },

    { id: "2734", for: "WINDOW", path: "./assets/textures/windows/window_2734/Plastic_003_basecolor.jpg", type: "COL" },
    { id: "2734", for: "WINDOW", path: "./assets/textures/windows/window_2734/Plastic_003_normal.jpg", type: "NRM" },
    { id: "2734", for: "WINDOW", path: "./assets/textures/windows/window_2734/Plastic_003_height.jpg", type: "HGT" },
    
],
'./assets/textures/HDRI/lonely_road_afternoon_puresky_4k.hdr');



document.addEventListener('contextmenu', event => event.preventDefault());
const planner2D = new Viewer2D.Viewer2D();
const planner3D = new Viewer3D.Viewer3D(planner2D.getModel(), planner2D.getBoard(), textureManager);
const designer = new Designer();

(async () => {
    await planner2D.init({
        resizeTo: window,
        backgroundColor: 0xFAEBD7
    });
    let spriteManager = new SpriteManager();
    await spriteManager.setWindowPath('./assets/symbols/window.jpg');
    await spriteManager.setDoorPath('./assets/symbols/door.svg');

    const canvas2D = planner2D.canvas;
    document.getElementById('content')?.appendChild(canvas2D);
    canvas2D.setAttribute('id', 'canvas2D');
    document.getElementById('canvas2D')?.style.setProperty('display', 'block');
    document.getElementById('canvas2D')?.style.setProperty('position', 'absolute');
   // document.getElementById('canvas2D')?.style.setProperty('pointer-events', 'none');
    planner2D.setup(spriteManager);
   // window.addEventListener("mousemove", e => wall.drawTemporaryWall([0, 0, e.clientX, e.clientY]), false);
    
})();

const buttonExportJSON = document.getElementById('buttonExportJSON');
if(buttonExportJSON) {
   // document.getElementById('configurationMenu')?.appendChild(buttonExportJSON);
   // buttonExportJSON.textContent = 'Export To JSON';
//    buttonExportJSON.innerHTML = `<i class="fa-solid fa-file-export fa-2xl"></i>`;
buttonExportJSON.innerHTML = `Export to JSON  <i class="fa-solid fa-file-export fa-2xl fa-fw" style="margin-left: 1em;"></i>`;

    buttonExportJSON.addEventListener('click', () => {
        buttonExportJSON.setAttribute('href', 
        'data:application/json;charset=utf-8,' + encodeURIComponent(planner2D.toJSON())
        );
        buttonExportJSON.setAttribute('download', 'export' + '.json');
    });
}


const buttonDrawMode = document.getElementById('buttonDrawMode');
if(buttonDrawMode) {
    //document.getElementById('configurationMenu')?.appendChild(buttonDrawMode);
    buttonDrawMode.textContent = 'Switch to Room Mode';
    buttonDrawMode.setAttribute('data-drawmode', 'wall');
    buttonDrawMode.addEventListener('click', () => {
        //console.log(buttonDrawMode.getAttribute('data-drawmode') );
        if(buttonDrawMode.getAttribute('data-drawmode') == 'wall') {
            
            buttonDrawMode.textContent = 'Switch to Wall Mode';
            buttonDrawMode.setAttribute('data-drawMode', 'room');
            planner2D.setDrawMode('room');

        } else {
            buttonDrawMode.textContent = 'Switch to Room Mode';
            buttonDrawMode.setAttribute('data-drawmode', 'wall');
            planner2D.setDrawMode('wall');
        }
    });
}

const buttonEditMode = document.getElementById('buttonEditMode');
const editMenu = document.getElementById('editMenu');
if(buttonEditMode && editMenu) {
    //document.getElementById('configurationMenu')?.appendChild(buttonDrawMode);
    //buttonEditMode.textContent = 'Build Mode';
    // buttonEditMode.innerHTML = `<i class="fa-solid fa-draw-polygon fa-2xl"></i>`;
    buttonEditMode.innerHTML = `Edit Mode  <i class="fa-solid fa-draw-polygon fa-2xl fa-fw" style="margin-left: 1em;"></i>`;

    buttonEditMode.setAttribute('data-editmode', 'build');
    buttonEditMode.addEventListener('click', () => {
        //console.log(buttonDrawMode.getAttribute('data-drawmode') );
        if(buttonEditMode.getAttribute('data-editmode') == 'build') {
            // buttonEditMode.innerHTML = `<i class="fa-solid fa-pen fa-2xl"></i>`;
            buttonEditMode.innerHTML = `Edit Mode  <i class="fa-solid fa-pen fa-2xl fa-fw" style="margin-left: 1em;"></i>`;

            //buttonEditMode.textContent = 'Edit Mode';
            buttonEditMode.setAttribute('data-editMode', 'edit');
            editMenu.style.setProperty('display', 'block');
            buttonEditMode.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
            planner2D.setEditMode(Viewer2D.editMode.EDIT);
        } else {
            //buttonEditMode.textContent = 'Build Mode';
            // buttonEditMode.innerHTML = `<i class="fa-solid fa-draw-polygon fa-2xl"></i>`;
            buttonEditMode.innerHTML = `Build Mode  <i class="fa-solid fa-draw-polygon fa-2xl fa-fw" style="margin-left: 1em;"></i>`;

            buttonEditMode.setAttribute('data-editmode', 'build');
            buttonEditMode.style.setProperty('background', 'rgba(255, 255, 255, 0.05)');
            editMenu.style.setProperty('display', 'none');
            planner2D.setEditMode(Viewer2D.editMode.NONE);
        }
    });
}


const buttonEditGripPoint = document.getElementById('buttonEditGripPoint'); 
if(buttonEditGripPoint) 
{
    //buttonEditGripPoint.textContent = 'GripPoint';
    // buttonEditGripPoint.innerHTML = `<i class="fa-solid fa-circle-dot fa-2xl"></i>`;
    buttonEditGripPoint.innerHTML = `Grip Point  <i class="fa-solid fa-circle-dot fa-2xl fa-fw" style="margin-left: 2em;"></i>`;

    buttonEditGripPoint.addEventListener('click', () => {
        //console.log(buttonDrawMode.getAttribute('data-drawmode') );
        if(buttonEditGripPoint.getAttribute('data-grip') == 'true') {
            buttonEditGripPoint.style.setProperty('background', 'rgba(255, 255, 255, 0.05)')
            buttonEditGripPoint.setAttribute('data-grip', 'false');
            planner2D.setEditMode(Viewer2D.editMode.EDIT);
    
        } else {
            buttonEditGripPoint.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
            buttonEditGripPoint.setAttribute('data-grip', 'true');
            planner2D.setEditMode(Viewer2D.editMode.GRIPPOINT);
        }
    });
}

const buttonEditRoof = document.getElementById('buttonEditRoof'); 
if(buttonEditRoof) 
{
    buttonEditRoof.innerHTML = `Roof  <i class="fa-solid fa-people-roof fa-2xl fa-fw" style="margin-left: 2em;"></i>`;

    buttonEditRoof.addEventListener('click', () => {
        if(buttonEditRoof.getAttribute('data-roof') == 'true') {
            buttonEditRoof.style.setProperty('background', 'rgba(255, 255, 255, 0.05)')
            buttonEditRoof.setAttribute('data-roof', 'false');
            planner2D.setEditMode(Viewer2D.editMode.EDIT);
    
        } else {
            buttonEditRoof.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
            buttonEditRoof.setAttribute('data-roof', 'true');
            planner2D.setEditMode(Viewer2D.editMode.ROOF);
        }
    });
}


function addEvents() {
    const buttonShowRoof = document.getElementById('buttonShowRoof'); 
    if(buttonShowRoof) 
    {
        buttonShowRoof.innerHTML = `Show Roof  <i class="fa-solid fa-circle-dot fa-2xl fa-fw" style="margin-left: 2em;"></i>`;

        buttonShowRoof.addEventListener('click', () => {
            //console.log(buttonDrawMode.getAttribute('data-drawmode') );
            if(buttonShowRoof.getAttribute('data-roof') == 'true') {
                buttonShowRoof.style.setProperty('background', 'rgba(255, 255, 255, 0.05)')
                buttonShowRoof.setAttribute('data-roof', 'false');
                planner3D.setShowRoof(false);
        
            } else {
                buttonShowRoof.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
                buttonShowRoof.setAttribute('data-roof', 'true');
                planner3D.setShowRoof(true);
            }
        });
    }

    const buttonClearAll = document.getElementById('buttonClearAll'); 
    if(buttonClearAll) 
    {
        buttonClearAll.innerHTML = `Clear All  <i class="fa-solid fa-circle-dot fa-2xl fa-fw" style="margin-left: 2em;"></i>`;

        buttonClearAll.addEventListener('click', () => {
            //console.log(buttonDrawMode.getAttribute('data-drawmode') );

        planner2D.clearBoard();
        
        });
    }
}


const buttonEditWindow = document.getElementById('buttonEditWindow');
if(buttonEditWindow) 
    {
        //buttonEditWindow.textContent = 'Window';
        // buttonEditWindow.innerHTML = `<i class="fa-solid fa-border-all fa-2xl"></i>`;
        buttonEditWindow.innerHTML = `Window  <i class="fa-solid fa-border-all fa-2xl fa-fw" style="margin-left: 2em;"></i>`;

        buttonEditWindow.addEventListener('click', () => {
            //console.log(buttonDrawMode.getAttribute('data-drawmode') );
            if(buttonEditWindow.getAttribute('data-window') == 'true') {
                buttonEditWindow.style.setProperty('background', 'rgba(255, 255, 255, 0.05)')
                buttonEditWindow.setAttribute('data-window', 'false');
                planner2D.setEditMode(Viewer2D.editMode.EDIT);
        
            } else {
                buttonEditWindow.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
                buttonEditWindow.setAttribute('data-window', 'true');
                planner2D.setEditMode(Viewer2D.editMode.WINDOW);
            }
        });
    }
    
const buttonEditDoor = document.getElementById('buttonEditDoor');
if(buttonEditDoor) 
    {
        // buttonEditDoor.textContent = 'Door';
        // buttonEditDoor.innerHTML = `<i class="fa-solid fa-door-open fa-2xl"></i>`;
        buttonEditDoor.innerHTML = `Door  <i class="fa-solid fa-door-open fa-2xl fa-fw" style="margin-left: 2em;"></i>`;

        buttonEditDoor.addEventListener('click', () => {
            //console.log(buttonDrawMode.getAttribute('data-drawmode') );
            if(buttonEditDoor.getAttribute('data-door') == 'true') {
                buttonEditDoor.style.setProperty('background', 'rgba(255, 255, 255, 0.05)')
                buttonEditDoor.setAttribute('data-door', 'false');
                planner2D.setEditMode(Viewer2D.editMode.EDIT);
        
            } else {
                buttonEditDoor.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
                buttonEditDoor.setAttribute('data-door', 'true');
                planner2D.setEditMode(Viewer2D.editMode.DOOR);
            }
        });
    }


    const buttonMaterials = document.getElementById('buttonMaterials');
    const materialMenu = document.getElementById('materialMenu');

    if(buttonMaterials && materialMenu) {
        //document.getElementById('configurationMenu')?.appendChild(buttonDrawMode);
        //buttonMaterials.textContent = 'Build Mode';
        // buttonMaterials.innerHTML = `<i class="fa-solid fa-draw-polygon fa-2xl"></i>`;
        buttonMaterials.innerHTML = `Materials  <i class="fa-solid fa-palette fa-2xl fa-fw" style="margin-left: 1em;"></i>`;
    
        buttonMaterials.setAttribute('data-materialmenu', 'closed');
        buttonMaterials.addEventListener('click', () => {
            //console.log(buttonDrawMode.getAttribute('data-drawmode') );
            if(buttonMaterials.getAttribute('data-materialmenu') == 'closed') {
                // buttonMaterials.innerHTML = `<i class="fa-solid fa-pen fa-2xl"></i>`;
    
                //buttonMaterials.textContent = 'Edit Mode';
                buttonMaterials.setAttribute('data-materialmenu', 'open');
                materialMenu.style.setProperty('display', 'block');
                buttonMaterials.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
                //planner2D.setEditMode(Viewer2D.editMode.EDIT);
    
    
            } else {
                //buttonMaterials.textContent = 'Build Mode';
                // buttonMaterials.innerHTML = `<i class="fa-solid fa-draw-polygon fa-2xl"></i>`;
    
                buttonMaterials.setAttribute('data-materialmenu', 'closed');
                buttonMaterials.style.setProperty('background', 'rgba(255, 255, 255, 0.05)');
                materialMenu.style.setProperty('display', 'none');
               // planner2D.setEditMode(Viewer2D.editMode.NONE);
            }
        });
    }
    
    
    const buttonMatWalls = document.getElementById('buttonMatWalls'); 
    if(buttonMatWalls) 
    {
        //buttonMatWalls.textContent = 'GripPoint';
        // buttonMatWalls.innerHTML = `<i class="fa-solid fa-circle-dot fa-2xl"></i>`;
        buttonMatWalls.innerHTML = `Walls  <i class="fa-solid fa-building fa-2xl fa-fw" style="margin-left: 2em;"></i>`;
    
        buttonMatWalls.addEventListener('click', () => {
            //console.log(buttonDrawMode.getAttribute('data-drawmode') );
            if(buttonMatWalls.getAttribute('data-walls') == 'true') {
                buttonMatWalls.style.setProperty('background', 'rgba(255, 255, 255, 0.05)')
                buttonMatWalls.setAttribute('data-walls', 'false');
               // planner2D.setEditMode(Viewer2D.editMode.EDIT);
        
            } else {
                buttonMatWalls.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
                buttonMatWalls.setAttribute('data-walls', 'true');
              //  planner2D.setEditMode(Viewer2D.editMode.GRIPPOINT);
            }
        });
    }
    
    const buttonMatFloor = document.getElementById('buttonMatFloor');
    if(buttonMatFloor) 
        {
            //buttonMatFloor.textContent = 'Window';
            // buttonMatFloor.innerHTML = `<i class="fa-solid fa-border-all fa-2xl"></i>`;
            buttonMatFloor.innerHTML = `Floors  <i class="fa-solid fa-person-arrow-down-to-line fa-2xl fa-fw" style="margin-left: 2em;"></i>`;
    
            buttonMatFloor.addEventListener('click', () => {
                //console.log(buttonDrawMode.getAttribute('data-drawmode') );
                if(buttonMatFloor.getAttribute('data-floor') == 'true') {
                    buttonMatFloor.style.setProperty('background', 'rgba(255, 255, 255, 0.05)')
                    buttonMatFloor.setAttribute('data-floor', 'false');
                 //   planner2D.setEditMode(Viewer2D.editMode.EDIT);
            
                } else {
                    buttonMatFloor.style.setProperty('background', 'rgba(255, 255, 255, 0.25)');
                    buttonMatFloor.setAttribute('data-floor', 'true');
                 //   planner2D.setEditMode(Viewer2D.editMode.WINDOW);
                }
            });
        }
    const optionsMenu = document.getElementById('optionsMenu');
    
    if(optionsMenu) {
        if(buttonMatWalls) 
        {
            buttonMatWalls.addEventListener('click', () => {
               
                if(buttonMatWalls.getAttribute('data-toggleopt') == 'closed') {
                    addPhotosToMenu("WALL");
                    buttonMatWalls.setAttribute('data-toggleopt', 'open');
                    optionsMenu.classList.toggle("is-active");
                    
                } else {
                    buttonMatWalls.setAttribute('data-toggleopt', 'closed');
                    clearMenu();
                    optionsMenu.classList.toggle("is-active");
                }
            });
        }
        if(buttonMatFloor) 
            {
                buttonMatFloor.addEventListener('click', () => {
                    if(buttonMatFloor.getAttribute('data-toggeopt') == 'closed') {
                        buttonMatFloor.setAttribute('data-toggleopt', 'open');
                        optionsMenu.classList.toggle("is-active");
                    } else {
                        buttonMatFloor.setAttribute('data-toggleopt', 'closed');
                        optionsMenu.classList.toggle("is-active");
                    }
                });
            }
    }


function addPhotosToMenu(type: string) {
    if(optionsMenu){
        let showRoof = document.createElement('div');
        showRoof.className = 'btn btn-block btn-lg confButton';
        let aRoof = document.createElement('a');
        aRoof.id = "buttonShowRoof";
        aRoof.role = "button";
        showRoof.appendChild(aRoof);
        optionsMenu.appendChild(showRoof);
        
        let clearAll = document.createElement('div');
        clearAll.className = 'btn btn-block btn-lg confButton';
        let aClear = document.createElement('a');
        aClear.id = "buttonClearAll";
        aClear.role = "button";
        clearAll.appendChild(aClear);
        optionsMenu.appendChild(clearAll);
        addEvents();

        let row: HTMLDivElement;
        let index = 0;
        textureManager.readPaths.forEach((photo) => {
            if(photo.for == type && photo.type == "THUMB") {
                if (index % 2 === 0) {
                    row = document.createElement('div');
                    row.className = 'row mb-4 align-right';
                    optionsMenu.appendChild(row);
                }
                const col = document.createElement('div');
                col.className = 'col-md-6 photo-wrapper';
                const img = document.createElement('img');
                img.src = photo.path;
                img.addEventListener('click', () => {
                    textureManager.selectWallTexture(photo.id);
                });
                img.className = 'img-fluid photo';
               img.style.padding = '2vh';
                col.appendChild(img);
                row.appendChild(col);
                index++;
            }
        });
        
    }
    
}

function clearMenu() {
    if(optionsMenu){
        while (optionsMenu.firstChild) {
            optionsMenu.removeChild(optionsMenu.firstChild);
        }
    }
}

const buttonSwitchView = document.getElementById('buttonSwitchView');
if(buttonSwitchView) {
    //document.getElementById('configurationMenu')?.appendChild(buttonSwitchView);
    let x = document.getElementById('content');
    if(x != null) planner3D.setup(75, window.innerWidth, window.innerHeight, 0.1, 1000, x);
    const canvas3D = planner3D.getRendererCanvas();
    document.getElementById('content')?.appendChild(canvas3D);

    canvas3D.setAttribute('id', 'canvas3D');
    document.getElementById('canvas3D')?.style.setProperty('position', 'absolutey');
    document.getElementById('canvas3D')?.style.setProperty('display', 'none');
    document.getElementById('canvas3D')?.style.setProperty('z-index', '10');

    //buttonSwitchView.textContent = 'Switch View';
    //buttonSwitchView.innerHTML = `<p>Switch View</p>`;
    buttonSwitchView.innerHTML = `Switch 3D View  <i class="fa-solid fa-cube fa-2xl fa-fw" style="margin-left: 1em;"></i>`;
    buttonSwitchView.setAttribute('data-viewMode', '2D');
    buttonSwitchView.addEventListener('click', () => {
        if(buttonSwitchView.getAttribute('data-viewMode') == '2D') {
            // buttonSwitchView.innerHTML = `<i class="fa-solid fa-vector-square fa-2xl"></i>`;
            buttonSwitchView.innerHTML = `Switch 3D View  <i class="fa-solid fa-vector-square fa-2xl fa-fw" style="margin-left: 1em;"></i>`;

            document.getElementById('canvas2D')?.style.setProperty('display', 'none');
            document.getElementById('canvas3D')?.style.setProperty('display', 'block');
            planner3D.run();
            buttonSwitchView.setAttribute('data-viewMode', '3D');
        } else {
            buttonSwitchView.innerHTML = `Switch 2D View  <i class="fa-solid fa-cube fa-2xl fa-fw" style="margin-left: 1em;"></i>`;

            // buttonSwitchView.innerHTML = `<i class="fa-solid fa-cube fa-2xl"></i>`;
            document.getElementById('canvas2D')?.style.setProperty('display', 'block');
            document.getElementById('canvas3D')?.style.setProperty('display', 'none');
            planner3D.stop();
            buttonSwitchView.setAttribute('data-viewMode', '2D');
        }
       
    });
}


const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const buttonImportFile = document.getElementById('buttonImportFile');

if(buttonImportFile) buttonImportFile.addEventListener('click', () =>{
    fileInput.click();
    
});
fileInput.addEventListener('change', handleFileSelect);
if(buttonImportFile) buttonImportFile.innerHTML = `Import File  <i class="fa-solid fa-file-import fa-2xl fa-fw" style="margin-left: 1em;"></i>`;

let parser = new Parser();

function handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const file = input.files[0];
    const reader = new FileReader();
    console.log("upload");
    reader.onload = (e) => {
        try {
            const jsonString = e.target?.result as string;
            //const jsonObject = JSON.parse(jsonString);
            parser.readJSON(jsonString);
            parser.printJSON();
            parser.buildModel(planner2D);
            console.log("citit");
            //console.log(JSON.stringify(jsonObject, null, 2));
        } catch (err) {
            console.log(`Error parsing JSON: ${err}`);
        }
    };
    
    reader.readAsText(file);
}


let length: string | number;
let width: string | number;
let openSpace: boolean = false;
let hallway: boolean = false;
let noBathrooms: number = 1;
let noBedrooms: number = 1;
let totalRooms = 0;



// let designerLength = document.getElementById("designerLength") as HTMLInputElement;
// if(designerLength) length = designerLength.value

// let designerWidth = document.getElementById("designerWidth") as HTMLInputElement;
// if(designerWidth) width = designerWidth.value

let buttonOpenSpace = document.getElementById("buttonOpenSpace");
if(buttonOpenSpace) 
    {  
        buttonOpenSpace.style.setProperty('background', 'rgba(25, 25, 112, 1)')
        buttonOpenSpace.addEventListener('click', () => {
            if(openSpace == false) {
                openSpace = true;
                buttonOpenSpace.innerHTML = 'Open Space: ON';

                buttonOpenSpace.style.setProperty('background', 'rgba(16, 16, 72, 1)')
            }
            else {
                openSpace = false;
                buttonOpenSpace.innerHTML = 'Open Space: OFF';

                buttonOpenSpace.style.setProperty('background', 'rgba(25, 25, 112, 1)')
            }
        });
    }

let buttonHallway = document.getElementById("buttonHallway");
if(buttonHallway) 
    {  
        buttonHallway.style.setProperty('background', 'rgba(25, 25, 112, 1)')
        buttonHallway.addEventListener('click', () => {
            if(hallway == false) {
                hallway = true;
                buttonHallway.innerHTML = 'Add Hallway: ON';

                buttonHallway.style.setProperty('background', 'rgba(16, 16, 72, 1)')
            }
            else {
                hallway = false;
                buttonHallway.innerHTML = 'Add Hallway: OFF';
                buttonHallway.style.setProperty('background', 'rgba(25, 25, 112, 1)')
            }
        });
    }    

let button1Bed = document.getElementById("button1Bed");
let button2Bed = document.getElementById("button2Bed");
let button3Bed = document.getElementById("button3Bed");
let button4Bed = document.getElementById("button4Bed");
if(button1Bed && button2Bed && button3Bed && button4Bed) 
    {  
        button1Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
        button2Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
        button3Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
        button4Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
        button1Bed.addEventListener('click', () => {
            noBedrooms = 1;
            button1Bed.style.setProperty('background', 'rgba(48, 0, 83, 1)');
            button2Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
            button3Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
            button4Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
        });
        button2Bed.addEventListener('click', () => {
            noBedrooms = 2;
            button2Bed.style.setProperty('background', 'rgba(48, 0, 83, 1)');
            button1Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
            button3Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
            button4Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
        });
        button3Bed.addEventListener('click', () => {
            noBedrooms = 3;
            button3Bed.style.setProperty('background', 'rgba(48, 0, 83, 1)');
            button1Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
            button2Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
            button4Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
        });
        button4Bed.addEventListener('click', () => {
            noBedrooms = 4;
            button4Bed.style.setProperty('background', 'rgba(48, 0, 83, 1)');
            button1Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
            button2Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
            button3Bed.style.setProperty('background', 'rgba(75, 0, 130, 1)');
        });
    }

let button1Bath = document.getElementById("button1Bath");
let button2Bath = document.getElementById("button2Bath");
if(button1Bath && button2Bath) 
    {  
        button1Bath.style.setProperty('background', 'rgba(0, 104, 60, 1)');
        button2Bath.style.setProperty('background', 'rgba(0, 104, 60, 1)');
        
        button1Bath.addEventListener('click', () => {
            noBathrooms = 1;
            button1Bath.style.setProperty('background', 'rgba(0, 66, 38, 1)');
            button2Bath.style.setProperty('background', 'rgba(0, 104, 60, 1)');
        });
        button2Bath.addEventListener('click', () => {
            noBathrooms = 2;
            button2Bath.style.setProperty('background', 'rgba(0, 66, 38, 1)');
            button1Bath.style.setProperty('background', 'rgba(0, 104, 60, 1)');
        });
    }

let buttonGenerate = document.getElementById("buttonGenerate");
if(buttonGenerate) 
    {  
        buttonGenerate.addEventListener('click', () => {
           // planner2D.clearBoard();
            length = parseInt((<HTMLInputElement>document.getElementById("designerLength")).value);
            width = parseInt((<HTMLInputElement>document.getElementById("designerWidth")).value);

            totalRooms = noBathrooms + noBedrooms;
            if(hallway) totalRooms += 1;
            if(openSpace) totalRooms += 1;
            else totalRooms += 2;
            console.log(openSpace + " " + noBedrooms + " " + noBathrooms + " " +totalRooms + " ; length: " + length + " ; width: " + width);
            designer.createHousePlan(length, width, totalRooms);
            designer.buildModel(planner2D);
        });
    }


