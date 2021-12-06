const numberOfPlayers = document.querySelector('.players');
const numberOfMafias = document.querySelector('.mafias');
const generateButton = document.querySelector('.main-block__btn');
const resultBlock = document.querySelector('.result-block');
const commissar = 1;
let players = 0;
let mafias = 0;

// it's fantastic
const roleGenerator = (players) => (...functions) => functions.reduce((previousValue, currentFunction) => currentFunction(previousValue), players);

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) parent.removeChild(parent.firstChild);
}

const generatePlayers = (players) => {
    const arr = [];

    for (let i = 1; i <= players; i++) {
        arr.push(i);
    }

    return arr;
};

const setRole = (arr) => {
    const result = arr.map((elem, index, arr) => {

    if(index === 0) return elem = {commissar: elem};
    if(index === 1) return elem = {godfather: elem};
    // add 3 mafias if more 9 players and mafias variable equal 3
    if(mafias > 2 && arr.length > 8) {
        if (index === 2) return elem = {mafia: elem};
        if (index === 3) return elem = {mafia: elem};
    } else {
        if (index === 2) return elem = {mafia: elem};
    }
    
    return {citizen: elem};
    });

    return result;
}

const shaker = (arr) => {
    arr.sort(() => 0.5 - Math.random());
    
    return arr;
};

const generateRoles = () => {
    if(players === 0 || mafias === 0) return;
    
    if(resultBlock.childNodes.length > 1) removeAllChildNodes(resultBlock);

    const displayRoles = roleGenerator(players)(generatePlayers,shaker,setRole);
    
    const createCitizenTitle = document.createElement('p');

    createCitizenTitle.textContent = 'Citizens';
    createCitizenTitle.classList.add('result-block__title');
    resultBlock.append(createCitizenTitle);

    const citizenList = document.createElement('ul');

    citizenList.classList.add('result-block__list');

    resultBlock.append(citizenList);

    const activeCitizenTitle = document.createElement('p');

    activeCitizenTitle.textContent = 'Active';
    activeCitizenTitle.classList.add('result-block__title');
    resultBlock.append(activeCitizenTitle);
    
    const activeCitizenList = document.createElement('ul');

    activeCitizenList.classList.add('result-block__list-active');
    
    displayRoles.map((e, index, arr) => {
        let createLi = document.createElement('li');
        createLi.classList.add('result-block__item');

        switch (index) {
            case 0:
                createLi.textContent = `${e.commissar} - commissar`;
                activeCitizenList.append(createLi);

                break;
            case 1:
                createLi.textContent = `${e.godfather} - godfather`;
                activeCitizenList.append(createLi);

                break;
            case 2:
                createLi.textContent = `${e.mafia} - mafia`;
                activeCitizenList.append(createLi);

                break;
            case 3:
                if (mafias > 2 && arr.length > 8) {
                    createLi.textContent = `${e.mafia} - mafia`,
                    activeCitizenList.append(createLi);
                } else {
                    createLi.textContent = `${e.citizen} - citizen`;
                    citizenList.append(createLi);
                }
                
                break;

            default:
                
                break;
        }

        if(index > 3) {
            createLi.textContent = `${e.citizen} - citizen`;
            citizenList.append(createLi);
        }
    })

    resultBlock.append(activeCitizenList);
};

numberOfPlayers.addEventListener('blur', e => {
    let et = parseInt(e.target.value);
    
    if(et < 6 || et > 12) {
        numberOfPlayers.value = '';
        return;
    }

    if(e.target.value.length > 2) {
        numberOfPlayers.value = '';
        return;
    }

    if(isNaN(et)) {
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
    
    if(e.target.value.length > 1) {
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