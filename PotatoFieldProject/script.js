// Variables
const mainContainer = document.querySelector('.table-container')
const table = document.querySelector('#drawtable') 
const currentElement = document.querySelector('#currentElementTable')
const rotateButton = document.querySelector('#rotateButton')
const mirrorButton = document.querySelector('#mirrorButton')
const missionTable = document.querySelector('#missionsTable')
const mission1Label = document.querySelector('#mission1')
const mission2Label = document.querySelector('#mission2')
const mission3Label = document.querySelector('#mission3')
const mission4Label = document.querySelector('#mission4')
const restOfTimeLabel = document.querySelector('#restOfTime') 
const currentSeasonLabel = document.querySelector('#currentSeason')
const missionCounter1 = document.querySelector('#missionCounter1')
const missionCounter2 = document.querySelector('#missionCounter2')
const missionCounter3 = document.querySelector('#missionCounter3')
const missionCounter4 = document.querySelector('#missionCounter4')
const springLabel = document.querySelector('#spring')
const summerLabel = document.querySelector('#summer')
const fallLabel = document.querySelector('#fall')
const winterLabel = document.querySelector('#winter')
const scoreLabel = document.querySelector('#score')
const currentElementTimeLabel = document.querySelector('#currentElementTime')



let nSizeNum = 11;
let GameTable = [];
let elementCounter = 0;
let shuffledElements = []
let timer = 0;
let seasonCounter = 0;
let playerMissions = []
let score = 0

const mountains = [
    {
        x: 2,
        y: 2
    },
    {
        x: 4,
        y: 9
    },
    {
        x: 6,
        y: 4
    },
    {
        x: 9,
        y: 10
    },
    {
        x: 10,
        y: 6
    }
]

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

function choosingMissions()
{
    while(playerMissions.length != 4)
    {
        let randIndex = Math.floor(Math.random() * 12); //ha 12re allitom beszarik a counting
        if(!playerMissions.includes(randIndex))
        {
            playerMissions.push(randIndex)
        }
    }
    console.log(playerMissions)

    let missionLabels = [mission1Label, mission2Label, mission3Label, mission4Label]
    
    for(let i = 0; i < playerMissions.length; i++)
    {
        //missionLabels[i].innerHTML = missions.basic[playerMissions[i]].title;

        missionLabels[i].style.backgroundImage = `url(${missions.basic[playerMissions[i]].url})` 
        
        missionLabels[i].style.backgroundSize = "contain"
        missionLabels[i].style.backgroundRepeat = "no-repeat";
        missionLabels[i].style.backgroundPosition = "right";
    }
    
}


function erdoszeleValue()
{
    let points = 0;
    for(let i = 0; i < nSizeNum; i++)
    {
        if(i == 0 || i == nSizeNum-1)
        {
            for(let j = 0; j < nSizeNum; j++)
            {
                if(GameTable[i][j] == "forest")
                {
                    points++;
                }
                
            }
        }
    }

    for(let j = 0; j < nSizeNum; j++)
    {
        if(j == 0 || j == nSizeNum-1)
        {
            for(let i = 1; i < nSizeNum-1; i++)
            {
                if(GameTable[i][j] == "forest")
                {
                    points++;
                }
            }
        }
    }  
    
    
    

    return points;
}

function almosvolgyValue()
{
    let points = 0;
    let tempCounter = 0;
    for(let i = 0; i < nSizeNum; i++)
    {
        for(let j = 0; j < nSizeNum; j++)
        {
            if(GameTable[i][j] == "forest")
            {
                tempCounter++;
            }
        }

        if(tempCounter == 3)
        {
            points += 3;
        }
        tempCounter = 0;
    }
    return points;
}

function krumpliontozesValue()
{
    
    let points = 0;
    for(let i = 0; i < nSizeNum; i++)
    {
        let kapottMar = false
        for(let j = 0; j < nSizeNum; j++)
        {
            if(GameTable[i][j] == "water")
            {
                if(i-1 >= 0)
                {
                    if(GameTable[i-1][j] == "farm" && !kapottMar)
                    {
                        points += 2;
                        kapottMar = true
                    }
                }

                if(j-1 >= 0)
                {
                    if(GameTable[i][j-1] == "farm" && !kapottMar)
                    {
                        points += 2;
                        kapottMar = true
                    }
                }

                if(i+1 < nSizeNum)
                {
                    if(GameTable[i+1][j] == "farm" && !kapottMar)
                    {
                        points += 2;
                        kapottMar = true
                    }
                }

                if(j+1 < nSizeNum)
                {
                    if(GameTable[i][j+1] == "farm" && !kapottMar)
                    {
                        points += 2;
                        kapottMar = true
                    }
                }
            }
            kapottMar = false;
        }
    }

    return points;
}

function hatarvidekValue()
{
    let points = 0;
    isThereBlank = false;

    for(let i = 0; i < nSizeNum; i++)
    {
        for(let j = 0; j < nSizeNum; j++)
        {
            if(GameTable[i][j] == "blank")
            {
                isThereBlank = true;
            }
        }
        if(!isThereBlank)
        {
            points += 6;
        }
        isThereBlank = false
    }

    for(let j = 0; j < nSizeNum; j++)
    {
        for(let i = 0; i < nSizeNum; i++)
        {
            if(GameTable[i][j] == "blank")
            {
                isThereBlank = true;
            }
        }

        if(!isThereBlank)
        {
            points += 6;
        }
        isThereBlank = false
    }
    return points;
}

function fasorValue()
{
    let longestForest = 0;
    let partCounter = 0;

    for(let j = 0; j < nSizeNum; j++)
    {
        for(let i = 0; i < nSizeNum; i++)
        {
            if(GameTable[i][j] == "forest")
            {
                partCounter++;
            }
            else
            {
                if(partCounter > longestForest)
                {
                    longestForest = partCounter;
                }
                partCounter = 0;
            }
        }
        partCounter = 0;
    }

    return (longestForest * 2)
}

function ontozocsatornaValue()
{
    let points = 0;
    

    for(let j = 0; j < nSizeNum; j++)
    {
        let farmCounter = 0;
        let waterCounter = 0;

        for(let i = 0; i < nSizeNum; i++)
        {
            if(GameTable[i][j] == "farm")
            {
                farmCounter++;
            }
            if(GameTable[i][j] == "water")
            {
                waterCounter++;
            }
        }

        if(farmCounter == waterCounter && farmCounter >= 1 && waterCounter >= 1)
        {
            points += 4;
        }
    }

    return points;
}

function urestelekValue()
{
    let points = 0;
    for(let i = 0; i < nSizeNum; i++)
    {
        let kapottMar = false
        for(let j = 0; j < nSizeNum; j++)
        {
            if(GameTable[i][j] == "blank")
            {
                if(i-1 >= 0)
                {
                    if(GameTable[i-1][j] == "town" && !kapottMar)
                    {
                        points += 2;
                        kapottMar = true
                    }
                }

                if(j-1 >= 0)
                {
                    if(GameTable[i][j-1] == "town" && !kapottMar)
                    {
                        points += 2;
                        kapottMar = true
                    }
                }

                if(i+1 < nSizeNum)
                {
                    if(GameTable[i+1][j] == "town" && !kapottMar)
                    {
                        points += 2;
                        kapottMar = true
                    }
                }

                if(j+1 < nSizeNum)
                {
                    if(GameTable[i][j+1] == "town" && !kapottMar)
                    {
                        points += 2;
                        kapottMar = true
                    }
                }
            }
            kapottMar = false;
        }
    }

    return points;
}

function paratlansilokValue()
{
    let points = 0;

    for(let j = 0; j < nSizeNum; j++)
    {
        let noBlank = true;
        for(let i = 0; i < nSizeNum; i++)
        {
            if(GameTable[i][j] == "blank")
            {
                noBlank = false;
            }
        }

        if((j+1) % 2 == 1 && noBlank)
        {
            points += 10
        }
    }

    return points;
}

function gazdagvarosValue()
{
    let points = 0;

    for(let i = 0; i < nSizeNum; i++)
    {
        for(let j = 0; j < nSizeNum; j++)
        {
            let types = [];

            if(GameTable[i][j] == "town")
            {
                if(i-1 >= 0)
                {
                    if(!(types.includes(GameTable[i-1][j])) && GameTable[i-1][j] != "blank")
                    {
                        types.push(GameTable[i-1][j])
                    }
                }

                if(j-1 >= 0)
                {
                    if(!(types.includes(GameTable[i][j-1])) && GameTable[i][j-1] != "blank")
                    {
                        types.push(GameTable[i][j-1])
                    }
                }

                if(i+1 < nSizeNum)
                {
                    if(!(types.includes(GameTable[i+1][j])) && GameTable[i+1][j] != "blank")
                    {
                        types.push(GameTable[i+1][j])
                    }
                }

                if(j+1 < nSizeNum)
                {
                    if(!(types.includes(GameTable[i][j+1])) && GameTable[i][j+1] != "blank")
                    {
                        types.push(GameTable[i][j+1])
                    }
                }

                if(types.length >= 3)
                {
                    points += 3
                }
            }            
        }
    }

    return points;
}

function magusokvolgyeValue()
{
    let points = 0
    mountains.forEach(e =>
        {
            if(e.x-2 >= 0)
            {
                if(GameTable[e.x-2][e.y-1] == "water")
                {
                    points += 3;
                }                       
            }
            
            if(e.y-2 >= 0)
            {
                if(GameTable[e.x-1][e.y-2] == "water")
                {
                    points += 3;
                }
            }
            
            if(e.x < nSizeNum)
            {
                if(GameTable[e.x][e.y-1] == "water")
                {
                    points += 3;
                }                       
            }
            
            if(e.y < nSizeNum)
            {
                if(GameTable[e.x-1][e.y] == "water")
                {
                    points += 3;
                }
            }
        })

    return points
}

function sorhazValue()
{
    let longestTown = 0;
    let partCounter = 0;

    for(let i = 0; i < nSizeNum; i++)
    {
        for(let j = 0; j < nSizeNum; j++)
        {
            if(GameTable[i][j] == "town")
            {
                partCounter++;
            }
            else
            {
                if(partCounter > longestTown)
                {
                    longestTown = partCounter;
                }
                partCounter = 0;
            }
        }
        partCounter = 0;
    }

    return (longestTown * 2)
}
    
function gazdagvidekValue()
{
    let points = 0
    for(let i = 0; i < nSizeNum; i++)
    {
        let types = []

        for(let j = 0; j < nSizeNum; j++)
        {
            if(GameTable[i][j] != "blank" && !types.includes(GameTable[i][j]))
            {
                types.push(GameTable[i][j])
            }
        }

        if(types.length >= 5)
        {
            points += 4;
        }
    }

    return points
}

function surroundedMountains()
{
    let points = 0;
    mountains.forEach(e =>
        {
            let isThereEmpty = false;
            if(e.x-2 >= 0)
            {
                if(GameTable[e.x-2][e.y-1] == "blank")
                {
                    isThereEmpty = true;
                }                       
            }
            
            if(e.y-2 >= 0)
            {
                if(GameTable[e.x-1][e.y-2] == "blank")
                {
                    isThereEmpty = true;
                }
            }
            
            if(e.x < nSizeNum)
            {
                if(GameTable[e.x][e.y-1] == "blank")
                {
                    isThereEmpty = true;
                }                       
            }
            
            if(e.y < nSizeNum)
            {
                if(GameTable[e.x-1][e.y] == "blank")
                {
                    isThereEmpty = true;
                }
            }
            if(!isThereEmpty)
            {
                points++;  
            }
        })
    return points;
}

const missions = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
      "url" : "pictures/missions_hun/erdoszele.png",
      "function" : erdoszeleValue
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
      "url": "pictures/missions_hun/almosvolgy.png", 
      "function" : almosvolgyValue
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
      "url" : "pictures/missions_hun/krumpliont.png",
      "function" : krumpliontozesValue
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
      "url" : "pictures/missions_hun/hatarvidek.png",
      "function" : hatarvidekValue
    },

    {
        "title": "Öntözőcsatorna",
        "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
        "url" : "pictures/missions_hun/ontozocsatorna.png",
        "function" : ontozocsatornaValue
    },
    {
        "title": "Üres telek",
        "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
        "url" : "pictures/missions_hun/urestelek.png",
        "function" : urestelekValue
    },

    {
        "title": "Páratlan silók",
        "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
        "url" : "pictures/missions_hun/paratlansilok.png",
        "function" : paratlansilokValue
    },

    {
        "title": "Gazdag város",
        "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
        "url" : "pictures/missions_hun/gazdagvaros.png",
        "function" : gazdagvarosValue
    
    },

    {
        "title": "Mágusok völgye",
        "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
        "url" : "pictures/missions_hun/magusokvolgye.png",
        "function" : magusokvolgyeValue
    },


    { 
        "title": "Fasor",
        "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
        "url" : "pictures/missions_hun/Fasor.png",
        "function" : fasorValue
    },

    {
        "title": "Sorház",
        "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
        "url" : "pictures/missions_hun/sorhaz.png",
        "function" : sorhazValue
    },

    {
        "title": "Gazdag vidék",
        "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
        "url" : "pictures/missions_hun/gazdagvidek.png",
        "function" : gazdagvidekValue
    } 

  ]
}

// Functions
function initializeMap()
{
    for(let i = 0; i < 11; i++)
    {
        let varArray = [];
        for(let j = 0; j < 11; j++)
        {
            varArray.push("blank");
        }
        GameTable.push(varArray);
    }

    mountains.forEach(e => {
        GameTable[e.x-1][e.y-1] = "mountain";
    })
}

function DrawTable()
{
    table.innerHTML = ""
    for(let i = 0; i < 11; i++)
    {
        let tr = document.createElement('tr')
        for(let j = 0; j < 11; j++)
        {
            let td = document.createElement('td')
            td.dataset.rowIndex = i;
            td.dataset.colIndex = j;
            if(GameTable[i][j] != 'blank')
            {
                td.classList.add(GameTable[i][j]);
            }
                
            tr.append(td)
        }
        table.append(tr)
    }
}

function shuffle() {
    shuffledElements = [...elements]; 
    for (let i = shuffledElements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledElements[i], shuffledElements[j]] = [shuffledElements[j], shuffledElements[i]]; 
    }
}

function DrawElement(firstElement)
{
    currentElement.innerHTML = "";
    currentElementTimeLabel.innerHTML = firstElement.time
    for(let i = 0; i < 3; i++)
    {
        let tr = document.createElement('tr')
        for(let j = 0; j < 3; j++)
        {
            let td = document.createElement('td')
            if(firstElement.shape[i][j] == 1)
            {
                td.classList.add(firstElement.type)
                
            }
            tr.append(td)
        }
        currentElement.append(tr)
    }
    
}

function putObject(e)
{
    if(e.target.matches('td'))
    {
        let r = parseInt(e.target.dataset.rowIndex);
        let c = parseInt(e.target.dataset.colIndex);
        if(checkStep(r, c, shuffledElements[elementCounter].shape))
        {
            for(let i = 0; i < 3; i++)
            {
                for(let j = 0; j < 3; j++)
                {
                    
                    if(shuffledElements[elementCounter].shape[i][j] == 1)
                    {
                        /*let correcttd = document.querySelector(`td[data-row-index="${r+i}"][data-col-index="${c+j}"]`);
                        correcttd.classList.add(elements[elementCounter].type)*/
                        GameTable[r+i][c+j] = shuffledElements[elementCounter].type
                    }
                }
            }
            timer += shuffledElements[elementCounter].time;
            elementCounter++;
            
            seasonChange();  
            restOfTimeDisplay();          
        }
    }
    DrawTable();
}


function locate(e)
{
    if(e.target && e.target.matches('td'))
    {
        let tempArr = document.querySelectorAll("." + shuffledElements[elementCounter].type + "-pre")

        if (tempArr !== null) {
            tempArr.forEach(e => {
                e.classList.remove(shuffledElements[elementCounter].type + "-pre");
            });
        }
        
        
        let r = e.target.dataset.rowIndex;
        let c = e.target.dataset.colIndex;
        


        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                
                if(shuffledElements[elementCounter].shape[i][j] == 1)
                {
                    let correcttd = document.querySelector(`td[data-row-index="${parseInt(r)+i}"][data-col-index="${parseInt(c)+j}"]`);
                    if (correcttd !== null) {
                        correcttd.classList.add(shuffledElements[elementCounter].type + "-pre");
                    }
                }
            }
        }
    }
}

function checkStep(row, col, shape)
{
    let stillRight = true
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(shape[i][j] == 1)
            {
                if(row + i >= 11 || col + j >= 11)
                {
                    stillRight = false;
                    return stillRight;
                }
                else if(GameTable[row+i][col+j] != "blank")
                {
                    stillRight = false;
                    return stillRight;
                }

            }
        }
    }
    return stillRight;
}

/*      [[1,0,0],
        [1,0,0],
        [1,0,0]]
        
        [[0,0,1],
        [0,0,1],
        [0,0,1]]
*/



function mirror()
{
    let mirrArr = [];
    for(let i = 0; i < 3; i++)
    {
        let tempMirrArr = [];
        for(let j = 2; j >= 0; j--)
        {
            tempMirrArr.push(shuffledElements[elementCounter].shape[i][j]);
        }
        mirrArr.push(tempMirrArr);
    }
    shuffledElements[elementCounter].shape = mirrArr;
    DrawElement(shuffledElements[elementCounter]);
}
        

function rotate()
{
    let rotArr = [];
    
    for(let j = 0; j < 3; j++)
    {
        let tempRotArr = [];
        for(let i = 2; i >= 0; i--)
        {
            tempRotArr.push(shuffledElements[elementCounter].shape[i][j]);
        }
        rotArr.push(tempRotArr);
    }

    shuffledElements[elementCounter].shape = rotArr;
    DrawElement(shuffledElements[elementCounter]);
}

function seasonChange()
{
    let timerDivSeason = Math.floor(timer / 7)
    


    if(timerDivSeason !== seasonCounter)
    {
        seasonCounter++;
        shuffle();
        elementCounter = 0; // nem az egyenloknel kene lennie?

        if(timerDivSeason == 1)
        {
            timer = 7
            let points1 = missions.basic[playerMissions[0]].function()
            let points2 = missions.basic[playerMissions[1]].function()
            let points3 = surroundedMountains()
            score += (points1 + points2 + points3)
            missionCounter1.innerHTML = points1
            missionCounter2.innerHTML = points2
            missionCounter3.innerHTML = "0"
            missionCounter4.innerHTML = "0"
            currentSeasonLabel.innerHTML = "Jelenlegi évszak: Nyár (BC)"
            springLabel.innerHTML = "Tavasz: " + (points1 + points2 + points3) + " pont" 
            mission1Label.classList.remove("missionhighlight")
            mission3Label.classList.add("missionhighlight")

        }
        else if(timerDivSeason == 2)
        {
            timer = 14
            let points1 = missions.basic[playerMissions[1]].function()
            let points2 = missions.basic[playerMissions[2]].function()
            let points3 = surroundedMountains()
            score += (points1 + points2 + points3)
            missionCounter2.innerHTML = points1
            missionCounter3.innerHTML = points2
            missionCounter1.innerHTML = "0"
            missionCounter4.innerHTML = "0"
            currentSeasonLabel.innerHTML = "Jelenlegi évszak: Ősz (CD)"
            summerLabel.innerHTML = "Nyár: " + (points1 + points2 + points3) + " pont" 
            mission2Label.classList.remove("missionhighlight")
            mission4Label.classList.add("missionhighlight")
        }
        else if(timerDivSeason == 3)
        {
            timer = 21
            let points1 = missions.basic[playerMissions[2]].function()
            let points2 = missions.basic[playerMissions[3]].function()
            let points3 = surroundedMountains()
            score += (points1 + points2 + points3)
            missionCounter3.innerHTML = points1
            missionCounter4.innerHTML = points2
            missionCounter1.innerHTML = "0"
            missionCounter2.innerHTML = "0"
            currentSeasonLabel.innerHTML = "Jelenlegi évszak: Tél (DA)"
            fallLabel.innerHTML = "Ősz: " + (points1 + points2 + points3) + " pont" 
            mission3Label.classList.remove("missionhighlight")
            mission1Label.classList.add("missionhighlight")
        }
        else if(timerDivSeason == 4)
        {
            let points1 = missions.basic[playerMissions[3]].function()
            let points2 = missions.basic[playerMissions[0]].function()
            let points3 = surroundedMountains()
            score += (points1 + points2 + points3)
            missionCounter4.innerHTML = points1
            missionCounter1.innerHTML = points2
            missionCounter2.innerHTML = "0"
            missionCounter3.innerHTML = "0"
            currentSeasonLabel.innerHTML = "Vége az évnek."
            winterLabel.innerHTML = "Tél: " + (points1 + points2 + points3) + " pont" 
            scoreLabel.innerHTML = "Összesen: " + score + " pont"
            alert("Game is over, thank you for playing my game, your score is: " + score)
            mission4Label.classList.remove("missionhighlight")
            mission1Label.classList.remove("missionhighlight")
            table.removeEventListener('mouseover', locate);
            table.removeEventListener('click', putObject);
            
        }
    }
}


function restOfTimeDisplay()
{
    if(Math.floor(timer / 7) == 4)
    {
        restOfTimeLabel.innerHTML = "Évszakból hátralévő idő: -"
    }
    else
    {
        restOfTimeLabel.innerHTML = "";
        restOfTimeLabel.innerHTML = "Évszakból hátralévő idő: " + (7 - (timer % 7)) + "/7";
    }
    
}

shuffle()
restOfTimeDisplay();
table.addEventListener('mouseover', locate);
table.addEventListener('click', putObject);
table.addEventListener('click', function() {
    DrawElement(shuffledElements[elementCounter]);
});

rotateButton.addEventListener('click', rotate);
mirrorButton.addEventListener('click', mirror);

mission1Label.classList.add("missionhighlight")
mission2Label.classList.add("missionhighlight")

initializeMap()
DrawTable()
DrawElement(shuffledElements[elementCounter])
choosingMissions()