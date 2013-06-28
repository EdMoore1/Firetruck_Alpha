//Rocky 1
var levels = new Array();

levels[0] = {
    level: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,3,10,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,2,1,1,1,1,1,1,1,10,10,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
    trucks: 2,
    maxDamage: 50000
};

levels[1] = {
    level: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,1,2,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,4,4,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,4,4,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,2,0,0,0,0,0,0,0,
                    0,0,0,0,1,0,2,0,0,2,0,0,0,0,3,10,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,1,1,1,1,1,1,1,1,1,10,10,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
    trucks: 3,
    maxDamage: 60000
};



levels[2] = {
    level: new Array(0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,
                    0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,
                    0,0,8,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,2,8,0,0,0,0,0,0,
                    0,8,8,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,1,1,1,0,0,0,
                    0,8,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,2,0,0,0,2,0,8,0,0,1,0,0,0,
                    0,8,0,0,0,0,0,0,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,8,8,8,9,8,8,8,
                    0,8,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                    0,8,8,0,0,0,0,0,0,0,0,2,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,1,2,0,0,
                    0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                    0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,0,2,1,0,0,0,
                    0,0,8,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,3,10,0,0,0,0,0,0,0,0,1,0,0,0,
                    0,0,8,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,1,0,0,0,
                    0,0,8,8,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,
                    0,0,0,8,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                    0,0,0,8,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                    0,0,0,8,8,8,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                    0,0,0,0,0,8,8,8,8,9,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,
                    0,0,0,0,0,0,0,0,0,1,8,8,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,1,0,0,0,
                    0,0,0,0,0,0,0,0,0,1,1,9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0),
    trucks: 2,
    maxDamage: 70000
};

levels[3] = {
    level: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,
                    0,0,0,0,1,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,
                    0,0,0,2,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,
                    0,0,0,0,1,2,0,0,1,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,2,0,0,0,0,0,
                    0,0,0,2,1,0,0,0,1,0,0,2,0,0,0,0,0,0,2,0,1,0,0,0,0,1,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,8,9,8,8,8,8,8,8,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,0,
                    0,0,0,2,1,0,0,0,0,0,0,0,0,0,1,0,0,0,8,8,8,8,8,8,8,1,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,2,1,0,0,0,8,0,0,0,0,0,8,1,0,0,0,0,0,0,
                    0,0,0,0,1,2,0,0,0,0,0,0,0,0,1,0,0,0,8,0,0,0,0,0,8,9,8,8,8,8,8,8,
                    0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,8,8,8,0,0,0,0,1,0,0,0,0,0,0,
                    0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,8,0,0,0,0,1,0,0,0,0,0,0,
                    0,0,0,2,1,0,0,2,2,0,0,1,0,0,0,0,3,10,1,0,8,0,2,0,0,1,2,0,0,0,0,0,
                    0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,10,10,1,1,9,1,1,1,1,1,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0),
    trucks: 2,
    maxDamage: 100000
};


levels[4] = {
    level: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,2,1,0,0,2,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,
                    0,0,0,0,0,0,3,10,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,
                    0,0,0,0,0,0,10,10,1,1,1,1,1,0,0,0,0,4,4,0,0,0,0,0,0,0,1,0,0,0,1,2,
                    0,0,0,0,0,0,2,2,0,0,0,0,1,0,0,0,0,4,4,0,0,0,2,0,0,0,1,2,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
    trucks: 3,
    maxDamage: 100000
};

levels[5] = {
    level: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,3,10,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,0,2,1,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,1,2,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,1,0,0,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,
                    0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,
                    0,0,0,0,0,1,0,0,0,0,0,0,2,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,2,0,0,0,4,4,0,0,
                    0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,4,4,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
    trucks: 3,
    maxDamage: 100000
};


levels[6] = {
    level: new Array(3,10,0,0,8,8,8,8,8,8,8,8,8,8,8,8,8,0,0,0,0,0,8,9,8,8,8,8,8,8,8,8,
                     10,10,1,1,9,1,1,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,8,1,2,2,0,0,0,0,0,0,
                     0,0,8,8,8,0,1,7,0,0,0,0,0,2,2,2,8,8,8,8,8,8,8,1,2,2,0,0,0,0,0,0,
                     8,8,8,0,0,0,1,7,7,7,7,7,7,2,2,2,7,7,7,7,7,7,7,1,2,2,0,0,0,0,0,0,
                     1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                     7,7,7,7,1,1,1,1,1,7,7,7,7,7,7,7,7,1,7,7,7,7,7,7,7,7,7,7,1,0,0,0,
                     0,0,0,0,1,2,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                     0,0,0,0,1,2,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,
                     0,0,0,0,1,2,2,0,0,0,0,7,0,0,0,0,0,1,0,0,0,7,0,0,0,0,0,0,1,0,0,0,
                     0,0,0,0,1,0,0,0,7,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,
                     0,0,0,0,1,0,0,0,0,0,0,7,0,0,0,0,2,2,2,1,0,0,0,0,7,0,0,0,1,0,0,0,
                     0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,2,2,2,1,0,0,0,0,0,0,0,0,1,0,0,0,
                     0,2,2,1,0,0,0,7,0,0,7,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,
                     0,2,2,1,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,1,0,0,7,0,0,0,0,0,1,2,2,2,
                     0,2,2,1,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,1,0,0,0,0,0,0,0,0,1,2,2,2,
                     1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                     0,0,7,7,7,7,7,1,7,7,2,2,2,2,2,2,7,7,7,1,0,0,7,0,0,0,0,0,0,0,0,0,
                     0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,7,0,0,0,0,0,0,
                     0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,7,0,0,0,
                     0,0,0,0,0,2,2,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,7,0,0,0,0,0,0,0,0,0),
    trucks: 3,
    maxDamage: 120000
};


levels[7] = {
    level: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
                    0,1,0,0,0,1,0,0,2,2,1,0,2,2,1,0,0,0,2,0,1,0,0,0,0,1,0,0,4,4,1,0,
                    0,1,4,4,0,1,0,0,2,2,1,0,2,2,1,0,0,0,0,0,1,0,0,0,0,1,0,0,4,4,1,0,
                    0,1,4,4,0,1,2,0,0,0,1,0,0,0,1,0,0,0,0,2,1,2,0,0,2,1,1,1,1,1,1,0,
                    0,1,1,1,1,1,0,0,0,0,1,2,2,0,1,2,0,0,0,0,1,0,0,0,0,1,0,0,2,2,1,0,
                    0,1,0,0,0,1,0,0,0,0,1,2,2,0,1,2,0,0,0,0,1,0,0,0,0,1,0,0,2,2,1,0,
                    0,1,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,2,0,0,0,1,0,0,0,0,1,0,
                    0,1,0,0,0,1,2,2,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,2,1,2,2,0,0,1,0,
                    0,1,0,0,0,1,2,2,0,0,1,0,0,0,1,4,4,0,0,2,1,0,0,0,0,1,2,2,0,0,1,0,
                    0,1,0,2,2,1,0,0,0,0,1,0,0,0,1,4,4,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,
                    0,1,0,2,2,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,2,1,0,0,0,0,1,0,
                    0,1,0,2,2,1,0,0,2,2,1,0,0,0,1,0,0,0,2,2,1,2,0,0,0,1,2,2,0,0,1,0,
                    0,1,0,2,2,1,0,0,2,2,1,0,0,0,1,0,0,0,2,2,1,0,0,0,0,1,0,0,0,0,1,0,
                    0,1,0,0,0,1,1,1,1,1,1,0,0,0,1,2,0,0,0,0,1,0,0,0,0,1,0,0,2,2,1,0,
                    0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,2,2,1,0,
                    0,1,0,4,4,1,0,0,0,0,1,0,0,0,1,2,0,0,0,0,1,1,1,1,1,1,3,10,0,0,1,0,
                    0,1,0,4,4,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,4,4,0,0,1,10,10,0,0,1,0,
                    0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
    trucks: 3,
    maxDamage: 200000
};

levels[8] = {
    level: new Array(3,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                    10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,2,2,0,0,2,2,0,0,2,2,1,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,4,1,0,0,1,0,2,2,0,0,2,2,0,0,2,2,1,0,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,0,4,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,2,2,
                    0,0,0,0,2,0,0,0,2,0,2,0,0,0,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,1,2,2,
                    0,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,2,2,1,0,0,0,0,0,0,0,1,0,0,
                    0,1,0,0,2,0,0,0,2,0,0,1,0,0,1,0,0,0,0,2,2,1,2,2,0,2,0,2,2,1,0,0,
                    2,1,2,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,2,2,0,2,0,2,2,1,2,2,
                    0,1,0,0,0,0,0,0,0,0,2,1,2,0,1,0,4,4,0,0,0,1,1,1,1,1,1,1,1,1,2,2,
                    0,1,0,2,0,2,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,
                    2,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,4,4,0,0,0,0,1,0,0,0,0,0,0,
                    0,1,0,2,0,2,0,1,0,2,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
                    0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
                    2,1,2,0,0,0,2,1,2,0,2,1,0,2,0,0,2,0,0,0,0,0,2,0,0,1,0,0,2,0,2,0,
                    0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
                    0,1,0,0,0,0,0,1,2,0,0,0,0,2,0,0,2,0,0,1,0,0,2,0,0,1,0,0,2,0,2,0,
                    2,1,0,2,0,2,0,1,0,0,0,0,0,0,0,0,0,0,2,1,2,0,0,0,2,1,2,0,0,0,0,0,
                    0,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,
                    0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,2,0,2,0,0,0,0,0),
    trucks: 3,
    maxDamage: 200000
};

levels[9] = {
    level: new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,
                    4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
                    4,4,0,0,0,0,0,1,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,1,0,
                    4,4,0,0,0,0,0,1,2,2,2,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,4,4,1,0,
                    0,0,0,0,0,0,0,1,2,2,2,0,0,0,0,2,0,0,0,0,0,2,2,0,0,0,2,0,0,0,1,0,
                    0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
                    0,0,0,0,0,0,2,1,0,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,1,0,0,0,2,1,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,0,
                    0,0,0,0,0,0,0,1,2,0,0,0,1,0,2,0,0,0,0,0,0,2,2,0,0,0,0,0,2,0,1,0,
                    0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
                    0,0,0,0,0,0,0,1,0,0,0,0,1,2,2,0,0,2,0,0,0,4,4,0,0,0,0,0,0,0,0,0,
                    0,0,0,0,0,0,2,1,0,0,0,0,1,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,
                    0,0,0,0,0,0,0,1,0,0,0,0,1,2,2,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,
                    0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,3,10,2,2,1,0,
                    0,0,0,0,0,2,0,1,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,10,10,2,2,1,0,
                    3,10,0,0,0,0,0,1,0,0,0,0,1,0,0,2,0,0,0,2,0,0,0,0,0,1,0,0,0,0,1,0,
                    10,10,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
                    0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0),
    trucks: 3,
    maxDamage: 150000
};


levels[10] = {
    level: new Array(0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,2,0,0,4,0,0,2,2,0,0,2,2,
                    0,3,3,0,0,0,2,2,1,1,1,2,2,2,1,0,0,1,1,1,1,1,1,4,0,0,2,2,0,0,2,2,
                    0,3,3,0,0,0,2,2,1,0,0,0,2,2,1,0,0,1,2,0,0,0,0,0,0,1,1,1,1,1,1,0,
                    0,1,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,1,0,
                    0,1,0,0,0,0,1,0,2,0,0,0,0,0,1,2,0,1,0,0,0,2,0,0,2,1,0,2,1,2,1,0,
                    1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,
                    1,2,0,0,2,0,1,0,0,0,1,0,2,0,2,0,0,2,0,1,0,0,0,2,2,1,2,0,4,0,1,2,
                    1,2,0,1,1,1,1,2,2,0,1,0,0,0,0,0,0,0,0,1,2,0,0,2,2,0,0,0,4,0,1,0,
                    1,1,1,1,2,2,1,0,2,0,1,0,1,1,1,1,0,0,2,1,0,0,1,1,1,1,1,1,1,1,1,0,
                    0,4,4,1,2,2,1,0,2,0,1,2,0,0,2,1,0,0,0,1,2,0,1,3,10,0,0,2,0,0,1,0,
                    0,4,4,1,0,0,1,0,2,0,1,0,0,2,2,1,0,0,0,1,0,0,1,10,10,0,0,0,0,0,1,2,
                    0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,2,0,2,0,1,1,1,1,1,1,1,0,1,0,
                    0,0,0,0,0,0,0,0,0,0,0,0,1,4,4,0,1,0,0,0,0,0,0,0,0,2,2,2,1,0,2,0,
                    0,0,0,0,2,0,0,2,0,0,2,0,1,4,4,0,1,2,0,0,0,0,0,0,0,2,2,2,1,2,2,2,
                    2,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,2,2,0,0,0,2,2,2,1,2,2,2,
                    2,2,1,0,0,0,2,2,0,0,0,0,2,0,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,
                    2,2,1,0,0,0,2,2,0,0,0,0,0,0,2,0,0,0,2,0,0,2,2,0,0,0,2,0,0,0,0,0,
                    2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,0,
                    0,0,0,0,2,0,0,0,2,2,0,0,2,0,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,4,4,0,
                    0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
    trucks: 4,
    maxDamage: 300000
};