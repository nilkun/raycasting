'use strict';

import Viewport from "../shared/engine/Viewport.js/index.js";
import Vector from "../shared/engine/Vector.js/index.js";

class Map {
    constructor() {
        this.width = 16;
        this.height = 16;
        this.layout = [];
        
        this.init();
    }

    init() {
        this.layout = [   1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                          1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                          1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ];
    }
}

class Player {
    constructor() {
        this.speed = 0;
        this.position = new Vector(8, 8); 
        this.heading = new Vector(0, -1);  // up
        this.perpendicular = this.heading.perpendicularCounterClockwise();  // left
        this.rotate(Math.PI/4)
    }
    rotate(value) {
        const x = this.heading.x;
        this.heading.x = x * Math.cos(value) - this.heading.y * Math.sin(value);
        this.heading.y = x * Math.sin(value) + this.heading.y * Math.cos(value);
        this.perpendicular = this.heading.perpendicularCounterClockwise();
    }
    update() {
        this.position.x += this.heading.x * this.speed;
        this.position.y += this.heading.y * this.speed;

        if(map.layout[Math.floor(this.position.x) + Math.floor(this.position.y) * map.width] === 1) {
            this.position.x -= this.heading.x * this.speed;
            this.position.y -= this.heading.y * this.speed;
        }
    }

    // MOVE!!!
    render(renderer) {
        const size = 5;
        renderer.fillStyle = "red";
        renderer.beginPath();
        renderer.arc(this.position.x * size, this.position.y * size, size/2, 0, Math.PI * 2);
        renderer.fill();
        renderer.beginPath();
        renderer.strokeStyle = "black";
        renderer.moveTo(this.position.x* size, this.position.y* size);
        renderer.lineTo(this.position.x* size + this.heading.x * 6, this.position.y* size + this.heading.y * 6)
        renderer.stroke();
    }
}

class Cube {
    constructor(point1, point2, point3, size1, size2, size3, mapIndex) {

        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;

        this.size1 = size1;
        this.size2 = size2;
        this.size3 = size3;

        this.index = mapIndex;
    }
}
 

const ray = () => {
    // MOVE OUT OF HERE!!!
    const screenWidth = 640;

    const fieldOfView = Math.PI / 2;
    const movementVector = player.heading.cloned();
    movementVector.rotate(-fieldOfView / 2);

    let rotation = fieldOfView / screenWidth;
    const alreadyInQueue = {};


    let cubes = [];

    for(let x = 0; x < screenWidth; x++) {

        // Variables for running the loop
        let distance = 0;
        let maxDistance = 50;
        let found = false;

        // Start from player position
        const currentPosition = player.position.cloned();

        while(!found && distance++ < maxDistance) {  

            // convert to index values
            const indexX = Math.floor(currentPosition.x);
            const indexY = Math.floor(currentPosition.y);

            // check if out of bounds
            if(indexX < 0 || indexX >= map.width || indexY < 0 || indexY >= map.height) {
                console.log("ERROR")
                found = true;
            }
            else if(map.layout[indexY*map.width + indexX] === 1) {

                // ignore if already handled IMPLEMENT

                // Make distance more precise
                // let tries = 0;
                // let dist = 1;
                // while(tries++ < 10) {
                //     if(Math.abs(currentPosition.x) === indexX && Math.abs(currentPosition.y) === indexY) {
                //         currentPosition.subtract(movementVector.scaled(dist));
                //         distance -= dist;
                //     }
                //     else {
                //         currentPosition.add(movementVector.scaled(dist));
                //         distance += dist;
                //     }
                //     dist /= 2;
                // }
            
                found = true;

                if(alreadyInQueue[indexX + indexY * 16]) {

                }
                else {

                    let point1 = false;
                    let point2 = false;
                    let point3 = false;

                    const yDirection = player.position.y - indexY;
                    const xDirection = player.position.x - indexX;

                    if(yDirection > 0) {
                        if(xDirection > 0) {
                            // FACING NORTHWEST
                            if(map.layout[(indexX) + (indexY + 1) * map.width] !== 1) {
                                point1 = getLocalCoords(new Vector(indexX, indexY));
                            } 
                            if(map.layout[(indexX + 1) + (indexY) * map.width] !== 1) {
                                point1 
                                    ? point3 = getLocalCoords(new Vector(indexX + 1, indexY - 1))
                                    : point1 = getLocalCoords(new Vector(indexX + 1, indexY - 1))
                            }
                            if(point1) point2 = getLocalCoords(new Vector(indexX + 1, indexY));  
                        }
                        else {
                            // NORTHEAST
                            if(map.layout[(indexX) + (indexY + 1) * map.width] !== 1) {
                                point1 = getLocalCoords(new Vector(indexX + 1, indexY));
                            }
                            if(map.layout[(indexX - 1) + (indexY) * map.width] !== 1) {
                                point1 
                                    ? point3 = getLocalCoords(new Vector(indexX, indexY - 1))
                                    : point1 = getLocalCoords(new Vector(indexX, indexY - 1))
                            }                            
                            if(point1) point2 = getLocalCoords(new Vector(indexX, indexY)); 
                        }
                    }
                    else { 
                        if(xDirection < 0) {
                            // SOUTHEAST 
                            if(map.layout[(indexX) + (indexY - 1) * map.width] !== 1) {
                                point1 = getLocalCoords(new Vector(indexX + 1, indexY - 1));
                            }
                            if(map.layout[(indexX - 1) + (indexY) * map.width] !== 1) {
                                point1 
                                    ? point3 = getLocalCoords(new Vector(indexX, indexY))
                                    : point1 = getLocalCoords(new Vector(indexX, indexY))
                            }                            
                            if(point1) point2 = getLocalCoords(new Vector(indexX, indexY - 1));
                        }
                        else {     
                            // SOUTHWEST 
                            if(map.layout[(indexX) + (indexY - 1) * map.width] !== 1) {
                                point1 = getLocalCoords(new Vector(indexX, indexY - 1));
                            }
                            if(map.layout[(indexX + 1) + (indexY) * map.width] !== 1) {
                                point1 
                                    ? point3 = getLocalCoords(new Vector(indexX + 1, indexY))
                                    : point1 = getLocalCoords(new Vector(indexX + 1, indexY))
                            }                            
                            if(point1) point2 = getLocalCoords(new Vector(indexX + 1, indexY - 1));
                        }
                    }

                    const scale1 = 320 / -point1.y;
                    const scale2 = 320 / -point2.y;
                    const scale3 = 320 / -point3.y;

                    if(point1) {
                        cubes.push(new Cube(point1, point2, point3,
                            scale1, scale2, scale3,
                            new Vector(indexX, indexY)));                        
                    }

                    alreadyInQueue[indexX + indexY * 16] = true;
                }
            }
            else {
                currentPosition.add(movementVector); 
                
                // ADD TO Line of sight QUEUE
                renderer.beginPath();
                renderer.strokeStyle =  "pink";
                renderer.rect(indexX * 5, indexY * 5, 1, 1)
                renderer.stroke(); 
            }
        }
        movementVector.rotate(rotation);
    }

    // RENDER LOGIC MOVE OUT OF HERE!!!
    const center = 160;
    renderer.beginPath();
    renderer.strokeStyle =  "black";
    renderer.fillStyle = "red";

    renderer.save();
    cubes.sort((a, b) => (a.point1.x - a.point2.x) < (b.point1.x - b.point2.x));

    renderer.translate(center + 160, 160);

    cubes.forEach(cube => {

        renderer.beginPath();
        const zoom = 1;

        cube.point1.y = zoom - cube.size1;
        cube.point2.y = zoom - cube.size2;

        renderer.moveTo(cube.point1.x * cube.size1, cube.point1.y);
        renderer.lineTo(cube.point1.x * cube.size1, -cube.point1.y);
        renderer.lineTo(cube.point2.x * cube.size2, -cube.point2.y);
        renderer.lineTo(cube.point2.x* cube.size2, cube.point2.y);
        renderer.lineTo(cube.point1.x * cube.size1, cube.point1.y)

        if(cube.point3) {
            cube.point3.y = zoom - cube.size3;
            renderer.moveTo(cube.point2.x * cube.size2, cube.point2.y);
            renderer.lineTo(cube.point2.x * cube.size2, -cube.point2.y);
            renderer.lineTo(cube.point3.x* cube.size3, -cube.point3.y);
            renderer.lineTo(cube.point3.x* cube.size3, cube.point3.y);
            renderer.lineTo(cube.point2.x * cube.size2, cube.point2.y);
        }
        renderer.fill();
        renderer.stroke();
    })
    renderer.restore();
}

const getLocalCoords = (data) => {
    const newCoords = data.subtracted(player.position);
    newCoords.rotate(-player.perpendicular.angle());
    return newCoords;
}

const move = (e) => {
    switch(e.key) {
        case "ArrowUp": {
            player.speed+= .01;
            break;
        }
        case "ArrowDown": {
            player.speed = 0;
            break;
        }
        case "ArrowLeft": {
            player.rotate(-.05);
            break;
        }
        case "ArrowRight": {
            player.rotate(.05);
            break;
        }
    }
}

window.addEventListener("keydown", (e) => move(e));

const renderMap = () => {
    const width = map.length / 16;
    const size = 5;
    map.layout.forEach((square, index) => {
        square===1 ? renderer.fillStyle = "green" : renderer.fillStyle = "white";
        renderer.beginPath();
        const x =  index % width;
        const y = Math.floor(index / width);
        renderer.rect(x * size, y * size, size, size);
        renderer.fill();
        square===1 ? renderer.stroke() : false;
    })
}

const viewport = new Viewport(640, 400);
const renderer = viewport.context;

const map = new Map();
const player = new Player();
const loop = () => {
    viewport.clear();
    const gradient = renderer.createLinearGradient(0,0, 0, 200);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "blue");
    renderer.fillStyle = gradient;
    renderer.fillRect(0,0, 640, 160);
    const gradient2 = renderer.createLinearGradient(0,180, 0, 400);
    gradient2.addColorStop(0, "green");
    gradient2.addColorStop(1, "white");
    renderer.fillStyle = gradient2;
    renderer.fillRect(0, 160, 640, 400)
    player.update();

    renderMap();
    player.render(renderer);
    ray();
    renderer.fillStyle = "orange";
    renderer.fillRect(0,0, 80, 400);

    renderer.fillRect(560,0, 80, 400);
    window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);



