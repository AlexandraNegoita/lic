// Import our custom CSS
import '/css/styles.css'
// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'

import * as Viewer2D from '../planner/viewer2d/Viewer2D';
import * as Viewer3D from '../planner/viewer3d/Viewer3D';
import { TextureManager } from '../planner/viewer3d/TextureManager';

import './menu';
import { SpriteManager } from '../planner/viewer2d/SpriteManager';




const textureManager = new TextureManager(
    [{ id: "0", for: "GROUND", path: "./assets/textures/ground/GroundGrassGreen002_COL_2K.jpg", type: "COL" },
    { id: "0", for: "GROUND", path: "./assets/textures/ground/GroundGrassGreen002_NRM_2K.jpg", type: "NRM" },

    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Base_Color.jpg", type: "COL" },
    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Normal.jpg", type: "NRM" },
    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Height.png", type: "HGT" },

    { id: "4954", for: "WALL", path: "./assets/textures/walls/wall_4954/Plaster_Rough_001_COLOR.jpg", type: "COL" },
    { id: "4954", for: "WALL", path: "./assets/textures/walls/wall_4954/Plaster_Rough_001_NORM.jpg", type: "NRM" },
    { id: "4954", for: "WALL", path: "./assets/textures/walls/wall_4954/Plaster_Rough_001_DISP.png", type: "HGT" },

    { id: "2734", for: "WINDOW", path: "./assets/textures/windows/window_2734/Plastic_003_basecolor.jpg", type: "COL" },
    { id: "2734", for: "WINDOW", path: "./assets/textures/windows/window_2734/Plastic_003_normal.jpg", type: "NRM" },
    { id: "2734", for: "WINDOW", path: "./assets/textures/windows/window_2734/Plastic_003_height.jpg", type: "HGT" },
    
],
'./assets/textures/HDRI/lonely_road_afternoon_puresky_4k.hdr');



document.addEventListener('contextmenu', event => event.preventDefault());
const planner2D = new Viewer2D.Viewer2D();
const planner3D = new Viewer3D.Viewer3D(planner2D.getModel(), planner2D.getBoard(), textureManager);

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
