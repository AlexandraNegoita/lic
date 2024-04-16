import * as Viewer2D from '../planner/viewer2d/Viewer2D';
import * as Viewer3D from '../planner/viewer3d/Viewer3D';
import { TextureManager } from '../planner/viewer3d/TextureManager';

const textureManager = new TextureManager(
    [{ id: "0", for: "GROUND", path: "./assets/textures/ground/GroundGrassGreen002_COL_2K.jpg", type: "COL" },
    { id: "0", for: "GROUND", path: "./assets/textures/ground/GroundGrassGreen002_NRM_2K.jpg", type: "NRM" },
    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Base_Color.jpg", type: "COL" },
    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Normal.jpg", type: "NRM" },
    { id: "1634", for: "WALL", path: "./assets/textures/walls/wall_1634/Terracotta_Tiles_002_Height.png", type: "HGT" },
],
'./assets/textures/HDRI/lonely_road_afternoon_puresky_4k.hdr');

const planner2D = new Viewer2D.Viewer2D();
const planner3D = new Viewer3D.Viewer3D(planner2D.getModel(), planner2D.getBoard(), textureManager);

(async () => {
    await planner2D.init({
        resizeTo: window,
        backgroundColor: 0xFAEBD7
    });
    const canvas2D = planner2D.canvas;
    document.body.appendChild(canvas2D);
    canvas2D.setAttribute('id', 'canvas2D');
    document.getElementById('canvas2D')?.style.setProperty('display', 'block');
    planner2D.setup();
   // window.addEventListener("mousemove", e => wall.drawTemporaryWall([0, 0, e.clientX, e.clientY]), false);
    
})();
planner2D.stage.eventMode = 'dynamic';

const buttonExportJSON = document.createElement('a');
document.body.appendChild(buttonExportJSON);
buttonExportJSON.textContent = 'Export To JSON';
buttonExportJSON.style.backgroundColor = 'red';
buttonExportJSON.style.color = 'white';
buttonExportJSON.addEventListener('click', () => {
    buttonExportJSON.setAttribute('href', 
    'data:application/json;charset=utf-8,' + encodeURIComponent(planner2D.toJSON())
    );
    buttonExportJSON.setAttribute('download', 'export' + '.json');
});

const buttonDrawMode = document.createElement('button');
document.body.appendChild(buttonDrawMode);
buttonDrawMode.textContent = 'Switch to Room Mode';
buttonDrawMode.setAttribute('data-drawmode', 'wall');
buttonDrawMode.style.backgroundColor = 'red';
buttonDrawMode.style.color = 'white';
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
    console.log(planner2D.getDrawMode());
});


const buttonSwitchView = document.createElement('button');
document.body.appendChild(buttonSwitchView);
planner3D.setup(75, window.innerWidth, window.innerHeight, 0.1, 1000);
const canvas3D = planner3D.getRendererCanvas();
document.body.appendChild(canvas3D);

canvas3D.setAttribute('id', 'canvas3D');
document.getElementById('canvas3D')?.style.setProperty('display', 'none');
document.getElementById('canvas3D')?.style.setProperty('z-index', '10');

buttonSwitchView.textContent = 'Switch View';
buttonSwitchView.setAttribute('data-viewMode', '2D');
buttonSwitchView.addEventListener('click', () => {
    if(buttonSwitchView.getAttribute('data-viewMode') == '2D') {
        document.getElementById('canvas2D')?.style.setProperty('display', 'none');
        document.getElementById('canvas3D')?.style.setProperty('display', 'block');
        planner3D.run();
        buttonSwitchView.setAttribute('data-viewMode', '3D');
    } else {
        document.getElementById('canvas2D')?.style.setProperty('display', 'block');
        document.getElementById('canvas3D')?.style.setProperty('display', 'none');
        planner3D.stop();
        buttonSwitchView.setAttribute('data-viewMode', '2D');
    }
    
});
