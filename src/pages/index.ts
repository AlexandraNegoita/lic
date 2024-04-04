import * as Viewer2D from '../planner/viewer2d/Viewer2D';
console.log("aaaaa");
const planner = new Viewer2D.Viewer2D();
(async () => {
    await planner.init({
        resizeTo: window,
        backgroundColor: 0xFAEBD7
    });
    document.body.appendChild(planner.canvas);
    planner.setup();
   // window.addEventListener("mousemove", e => wall.drawTemporaryWall([0, 0, e.clientX, e.clientY]), false);
    
})();
planner.stage.eventMode = 'dynamic';

const buttonExportJSON = document.createElement('a');
document.body.appendChild(buttonExportJSON);
buttonExportJSON.textContent = 'Export To JSON';
buttonExportJSON.style.backgroundColor = 'red';
buttonExportJSON.style.color = 'white';
buttonExportJSON.addEventListener('click', () => {
    buttonExportJSON.setAttribute('href', 
    'data:application/json;charset=utf-8,' + encodeURIComponent(planner.toJSON())
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
        planner.setDrawMode('room');

    } else {
        buttonDrawMode.textContent = 'Switch to Room Mode';
        buttonDrawMode.setAttribute('data-drawmode', 'wall');
    }
    console.log(planner.getDrawMode());

   
});