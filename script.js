const numberOfPlayers = document.querySelector('.players');
const numberOfMafias = document.querySelector('.mafias');
const generateButton = document.querySelector('.main-block__btn');
const resultBlock = document.querySelector('.result-block');
const commissar = 1;
let players = 0;
let mafias = 0;

function generateRoles() {
    if(players === 0 || mafias === 0) return;
    
    if(resultBlock.childNodes.length > 1) removeAllChildNodes(resultBlock);

    const allPlayers = [];
    const activeRole = getRandom(players);
    
    for (let i = 1; i < players + commissar; i++) {
        allPlayers.push(i);        
    }

    const citizens = allPlayers.filter(e => activeRole.indexOf(e) < 0);
    
    const createCitizenTitle = document.createElement('p');
    createCitizenTitle.textContent = 'Citizens';
    createCitizenTitle.classList.add('result-block__title');
    resultBlock.append(createCitizenTitle);

    const createCitizenList = document.createElement('ul');
    createCitizenList.classList.add('result-block__list');
    
    citizens.forEach( e => {
        let createLi = document.createElement('li');
        createLi.classList.add('result-block__item');
        createLi.textContent = `${e} - citizen`;
        createCitizenList.append(createLi);
    });

    resultBlock.append(createCitizenList);

    // active role 
    const activeCitizenTitle = document.createElement('p');
    activeCitizenTitle.textContent = 'Active';
    activeCitizenTitle.classList.add('result-block__title');
    resultBlock.append(activeCitizenTitle);
    
    const activeCitizenList = document.createElement('ul');
    activeCitizenList.classList.add('result-block__list-active');

    activeRole.forEach((e, index) => {
        let createLi = document.createElement('li');
        createLi.classList.add('result-block__item');
        
        switch (index) {
            case 0:
                createLi.textContent = `${e} - commissar`;
                break;
            case 1:
                createLi.textContent = `${e} - godfather`;
                break;
            case 2:
                createLi.textContent = `${e} - mafia`;
                break;
            case 3:
                if(activeRole.length > 3) {
                    createLi.textContent = `${e} - mafia`;
                } else {
                    break;
                }

            default:
                break;
        }

        activeCitizenList.append(createLi);
    })

    resultBlock.append(activeCitizenList);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getRandom(max) {
    const min = 1;
    let length = mafias + commissar;
    const activeRole = []

    // generate unique numbers
    for (let i = 0; i < length; i++) {
        let getRandomNumber = Math.floor(Math.random() * ( (max + 0.5) - (min - 0.5))) + min;

        if (activeRole.includes(getRandomNumber)) {
            // console.log('duplicate ' + getRandomNumber);
            // add +1 to loop and re-random number again
            length++;
        } else {
            //add unique number
            // console.log('new ' + getRandomNumber);
            activeRole.push(getRandomNumber);
        }
    }

    return activeRole;
}

numberOfPlayers.addEventListener('blur', e => {
    let et = parseInt(e.target.value);
    
    if(et < 5 || et > 11) {
        // alert('Enter 6 to 10 players');
        numberOfPlayers.value = '';
        return;
    }
    
    if(isNaN(et)) {
        // alert('Enter 6 to 10 players');
        numberOfPlayers.value = '';
        return;
    }

    players = et;
});
numberOfMafias.addEventListener('blur', e => {
    let et = parseInt(e.target.value);
    
    if(et > 3 || et < 2) {
        numberOfMafias.value = '';
        return;
    }
    
    if(isNaN(et)) {
        numberOfMafias.value = '';
        return;
    }

    mafias = et;
});
generateButton.addEventListener('click', generateRoles);