function showMass1(newMass1) {
    //get the element
    var display = document.getElementById("initialMass1Value");
    //show the amount
    display.innerHTML = newMass1;
    mass1 = Number(newMass1);
    reset();
}

function showMass2(newMass2) {
    //get the element
    var display = document.getElementById("initialMass2Value");
    //show the amount
    display.innerHTML = newMass2;
    mass2 = Number(newMass2);
    reset();
}

function setMode(newMode) {
    //get the element
    mode = Number(newMode);
    reset();
}

function play() {
    window.clearTimeout(timer);
    runFlag = 1;
    runMotion();

}

function pause() {
    window.clearTimeout(timer);
    runFlag = 0;

}

function stepForward() {
    window.clearTimeout(timer);
    runFlag = 1;
    drawMotion();

}

function stepBack() {
    window.clearTimeout(timer);
    index = index - 2;
    if (index < -1) index = -1;
    //        time = index/20;
    //        xPos = xBase;
    runFlag = 1;
    drawMotion();

}


function reset() {
    window.clearTimeout(timer);
    index = -1;
    time = 0;
    a = g * (mass1 - mass2) / (mass1 + mass2);
    runFlag = 1;
    drawMotion();

}


var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var index = -1;

var xBase = 70 + canvas.width / 2; // for the motion
var yBase = 90; // for the motion
var xInit = 37;
var graphType = 1;
var graphTitle = "Atwood's machine";
var graph2Title = 'Acceleration is up';
var yAxisTitle = 'y (m)';
var xAxisTitle = 'x (m)';
var yAxis2Title = 'y (m)';
var xAxis2Title = 't (s)';
var yAxis2Pos = 0;
var xIncrement = 30;
var xNumDecimals = 0;
var yIncrement = 30;
var yNumDecimals = 0;
var graphY = 4;
var graphX = 10;
var yStart = yBase + 120;
var plotColor = '#ff00ff';
var scenario = 1;
var vxInit = 40;
var vyFactor = 0.33;
var vyInit = vyFactor * vxInit;
var xPos = 0.0;
var y1PosInit = 3.2;
var y2PosInit = 3.2;
var scaleFactor = 40;
var mass1 = 1.2;
var mass2 = 1.0;
var vy = 0;
var g = 10;
var a = g * (mass1 - mass2) / (mass1 + mass2);
var mode = 1;
var radius = 40;
var time = -0.5;
var deltat = 1 / 20.0;
var timer;
var runFlag = 1;
var graphDistance = 0.0;
var graphTime = 0.0;
var graphX1 = 0.0;
var graphY1 = 0.0;
var graphSpeed = 0.0;
var theta = 0.0;

reset();

function drawMotion() {

    //    console.log("In the drawMotion function, with runFlag = " + runFlag );

    if ((index >= 1000) || (Math.abs(0.5 * a * time * time) >= 2.4)) runFlag = 0;

    //    console.log("In the drawMotion function, with runFlag = " + runFlag + " Fx = " + Fx);

    if (runFlag == 1) { //      run if runFlag equal 1, not if equal 0
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        index = index + 1;

        // set background color for the entire thing
        context.fillStyle = "#ffd";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var axisLabel = '';
        var axisValue = 0;

        // set line color
        context.strokeStyle = '#999';
        context.lineWidth = 2;

        time = index / 100.0;
        graph2Title = 'Accelerating';
        var y1Pos = y1PosInit + 0.5 * a * time * time;
        var y2Pos = y2PosInit - 0.5 * a * time * time;
        theta = 0.5 * a * time * time * scaleFactor / radius;


        //          console.log(time + ' ' + y1Pos);


        // draw the pulley
        context.strokeStyle = 'black';
        context.fillStyle = 'gray';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(xBase, yBase, radius, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
        //           context.beginPath();
        //           context.arc(xBase+240, yBase, radius, 0, 2 * Math.PI, false);
        //           context.fill();
        //           context.stroke();

        // draw a line on the pulley
        context.strokeStyle = 'white';
        context.beginPath();
        context.moveTo(xBase, yBase);
        context.lineTo(xBase + radius * Math.cos(theta), yBase - radius * Math.sin(theta));
        context.stroke();

        // draw the strings
        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(xBase - radius, yBase);
        context.lineTo(xBase - radius, yBase + scaleFactor * y1Pos);
        context.stroke();
        context.beginPath();
        context.moveTo(xBase + radius, yBase);
        context.lineTo(xBase + radius, yBase + scaleFactor * y2Pos);
        context.stroke();

        // draw block 1
        context.strokeStyle = 'black';
        context.fillStyle = '#77f';
        context.lineWidth = 2;
        context.beginPath();
        context.fillRect(xBase - radius - 20, yBase + scaleFactor * y1Pos, 40, 40 * mass1);
        context.strokeRect(xBase - radius - 20, yBase + scaleFactor * y1Pos, 40, 40 * mass1);

        if (mode == 2) {
            context.beginPath();
            context.fillRect(xBase - radius - 20 - 100, yBase + scaleFactor * y1PosInit, 40, 40 * mass1);
            context.strokeRect(xBase - radius - 20 - 100, yBase + scaleFactor * y1PosInit, 40, 40 * mass1);
        }

        // draw block 2
        context.strokeStyle = 'black';
        context.fillStyle = '#f77';
        context.lineWidth = 2;
        context.beginPath();
        if (mass2 > 0.0) {
            context.fillRect(xBase + radius - 20, yBase + scaleFactor * y2Pos, 40, 40 * mass2);
            context.strokeRect(xBase + radius - 20, yBase + scaleFactor * y2Pos, 40, 40 * mass2);
        }

        if ((mode == 2) && (mass2 > 0.0)) {
            context.beginPath();
            context.fillRect(xBase + radius - 20 + 100, yBase + scaleFactor * y2PosInit, 40, 40 * mass2);
            context.strokeRect(xBase + radius - 20 + 100, yBase + scaleFactor * y2PosInit, 40, 40 * mass2);
        }

        var fT1 = mass1 * (g - a);
        var fT2 = mass2 * (g + a);

        if (mode == 2) {

            // draw the free-body diagram of block 1
            drawArrow(0, -0.8 * mass1 * g, xBase - radius - 100, yBase + scaleFactor * y1PosInit + 40 * mass1, "green"); // Mg
            drawArrow(0, 0.8 * fT1, xBase - radius - 100, yBase + scaleFactor * y1PosInit, "purple"); // tension1

            // draw the free-body diagram of block 2
            drawArrow(0, -0.8 * mass2 * g, xBase + radius + 100, yBase + scaleFactor * y2PosInit + 40 * mass2, "green"); // mg
            drawArrow(0, 0.8 * fT2, xBase + radius + 100, yBase + scaleFactor * y2PosInit, "purple"); // tension2

        }

        //     console.log("In the drawMotion function, with runFlag = " + runFlag + " x2 = " + x2);


        // graph titles
        context.font = 'bold 16pt Calibri';
        context.fillStyle = 'purple';
        context.textAlign = 'center';
        context.fillText(graphTitle, canvas.width / 2, 35);
        //           context.fillText(graph2Title, xBase+180, 65);

        context.font = '16pt Calibri';
        context.fillStyle = 'black';
        var aLabel = 'a = ';
        aLabel = aLabel + (a).toFixed(2) + ' m/s/s';
        context.textAlign = 'left';
        context.fillText(aLabel, 30, 80);

        var mg1Label = 'Mg = ';
        mg1Label = mg1Label + (mass1 * g).toFixed(2) + ' N';
        context.textAlign = 'left';
        context.fillText(mg1Label, 30, 110);

        var fT1Label = 'F    = ';
        fT1Label = fT1Label + (fT1).toFixed(2) + ' N';
        context.textAlign = 'left';
        context.fillText(fT1Label, 30, 140);
        context.font = '12pt Calibri';
        context.fillStyle = 'black';
        fT1Label = 'T1';
        context.fillText(fT1Label, 30 + 8, 140 + 8);

        context.font = '16pt Calibri';
        var mg2Label = 'mg = ';
        mg2Label = mg2Label + (mass2 * g).toFixed(2) + ' N';
        context.textAlign = 'left';
        context.fillText(mg2Label, 30, 170);

        var fT2Label = 'F    = ';
        fT2Label = fT2Label + (fT2).toFixed(2) + ' N';
        context.textAlign = 'left';
        context.fillText(fT2Label, 30, 200);
        context.font = '12pt Calibri';
        context.fillStyle = 'black';
        fT2Label = 'T2';
        context.fillText(fT2Label, 30 + 8, 200 + 8);


        if (mode == 2) {
            context.font = '16pt Calibri';
            context.fillStyle = 'green';
            context.textAlign = 'left';
            forceLabel = "Mg";
            context.fillText(forceLabel, xBase - radius - 100 + 10, yBase + scaleFactor * y1PosInit + 40 * mass1 + 30);

            if (mass2 > 0.0) {
                var forceLabel = 'mg';
                context.fillText(forceLabel, xBase + radius + 100 + 10, yBase + scaleFactor * y2PosInit + 40 * mass2 + 30);

                context.fillStyle = 'purple';
                forceLabel = "F";
                context.fillText(forceLabel, xBase - radius - 100 + 10, yBase + scaleFactor * y1PosInit - 30);
                context.font = 'bold 12pt Calibri';
                forceLabel = "T1";
                context.fillText(forceLabel, xBase - radius - 100 + 10 + 8, yBase + scaleFactor * y1PosInit - 30 + 9);

                context.font = 'bold 16pt Calibri';
                context.fillStyle = 'purple';
                forceLabel = "F";
                context.fillText(forceLabel, xBase + radius + 100 + 10, yBase + scaleFactor * y2PosInit - 30);
                context.font = 'bold 12pt Calibri';
                forceLabel = "T2";
                context.fillText(forceLabel, xBase + radius + 100 + 10 + 8, yBase + scaleFactor * y2PosInit - 30 + 9);
            }
        }


    }
}

function runMotion() {
    drawMotion();
    if (runFlag == 1) {
        timer = window.setTimeout(runMotion, 1000 / 60);
    }
}


function drawArrow(Fx, Fy, Px, Py, arrowColor) {
    var theta = Math.atan2(Fy, Fx);
    context.strokeStyle = arrowColor;
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(Px, Py);
    context.lineTo(Px + 5.0 * Fx, Py - 5.0 * Fy);
    context.stroke();

    context.lineWidth = 2;

    var Fmag = Math.sqrt(Fx * Fx + Fy * Fy);
    if (Fmag > 5) Fmag = 5;

    context.fillStyle = arrowColor;
    context.beginPath();
    context.moveTo(Px + 5.0 * Fx - 3 * Fmag * Math.cos(theta + 0.25 * (Math.PI / 2)), Py - 5.0 * Fy + 3 * Fmag * Math.sin(theta + 0.25 * (Math.PI / 2)));
    context.lineTo(Px + 5.0 * Fx, Py - 5.0 * Fy);
    context.lineTo(Px + 5.0 * Fx - 3 * Fmag * Math.cos(theta - 0.25 * (Math.PI / 2)), Py - 5.0 * Fy + 3 * Fmag * Math.sin(theta - 0.25 * (Math.PI / 2)));

    context.stroke();
    context.fill();

}