import * as Viewer2D from '../planner/viewer2d/Viewer2D';
import * as Wall from '../planner/viewer2d/Wall';
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
    console.log(planner.ticker);
    
    
})();
planner.stage.eventMode = 'dynamic';
