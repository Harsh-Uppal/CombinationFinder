let divs = 1, sum;

window.onload = () => {
    sum = document.querySelector('.InputContainer>#sumInput');
}

function GenerateDivs() {
    divs = document.querySelector('#noOfDivsInput').value;
    let divisionsContainer = document.querySelector('.divisions');

    //Delete old divisions
    while (divisionsContainer.children.length > 0)
        divisionsContainer.removeChild(divisionsContainer.children.item(0));

    //Create new divisions
    for (let i = 0; i < divs;) {
        let newDiv = document.createElement('div');
        let newInput = document.createElement('input');

        newDiv.id = `div${i}`;
        newInput.type = 'number';
        newInput.placeholder = `Division ${++i}`;

        newDiv.appendChild(newInput);
        divisionsContainer.appendChild(newDiv);
    }
}

function FindPossibleCombinations() {

    let divisions = [];

    for (let i = 0; i < divs;)
        divisions[i] = parseInt(document.querySelector(`#div${i++}>input`).value);

    ShowResults(Recursion([], divisions, 0, parseInt(sum.value), 0));
}

function Recursion(currentSet, divis, currentSetSum, desiredSum, startInd) {

    let newSetSum = 0;
    currentSet.forEach(element => {
        newSetSum += element;
    });

    if (currentSetSum > desiredSum || !Array.isArray(currentSet) || !Array.isArray(divis) || isNaN(currentSetSum) || isNaN(desiredSum))
        return;

    let foundCombinations = [];

    if (currentSetSum == desiredSum) {
        foundCombinations.push(currentSet);

        return foundCombinations;
    }

    for (let i = startInd; i < divis.length; i++) {
        //Arrays in js are reference values so, we are cloning it
        let newSet = [...currentSet];
        newSet.push(divis[i]);

        let newComb = Recursion(newSet, divis, parseInt(currentSetSum) + parseInt(divis[i]), desiredSum, i);

        if (Array.isArray(newComb))
            foundCombinations = foundCombinations.concat(newComb);
    }

    return foundCombinations;
}

function ShowResults(result) {

    HideResults();

    if (!Array.isArray(result)){
        console.error('Invalid argument passed into ShowResults');
        return;
    }

    document.querySelector('.combinationsDisplay').style.display = '';
    document.querySelector('.darkSheet').style.display = '';

    let combinationList = document.querySelector('.combinationsDisplay>.combinationsList');

    result.forEach(e => {
        if (!Array.isArray(e)){
            console.error('Invalid argument passed into ShowResults');
            return;
        }

        e = e.toString().trimEnd(']').trimStart('[');

        let newItem = document.createElement('li');
        newItem.textContent = e;
        combinationList.appendChild(newItem);
    });
}

function HideResults() {
    let resultList = document.querySelector('.combinationsDisplay>.combinationsList');

    while (resultList.children.length > 0)
        resultList.removeChild(resultList.children.item(0));
    
    document.querySelector('.combinationsDisplay').style.display = 'none';
    document.querySelector('.darkSheet').style.display = 'none';
}