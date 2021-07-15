const fs = require('fs');
const readline = require('readline');
let list = [];

const interface = readline.createInterface(
    {
    input: process.stdin,
    output: process.stdout,
    prompt: ''
    } 
);

console.log('Welcome to Todo CLI!')
console.log('-----------------------------')
console.log('(v) View * (n) New * (cX) Complete * (dX) Delete * (s) Save * (q) Quit')

const navigation = ('(v) View * (n) New * (cX) Complete * (dX) Delete * (s) Save * (q) Quit')

interface.prompt()
interface.on('line', line => {

//------view button----------------->
    
    if(line === 'v') {
        if (list === undefined || list.length == 0) {
            console.log('The list is empty!');
            console.log(navigation);
        }
        else {
            list.forEach((item, i) => {
            console.log(i + item);
        })
        console.log(navigation);
    }
    } 

//------new button------------------>

    else if(line === 'n') {
        let box = '[ ]'
        interface.question('What would you like to add?\n', (answer) => {
            list.push(box + answer)
            console.log(`${answer} has been added!`);
            console.log(navigation);
        })
    }

//------complete button------------->

    else if(line[0] === 'c') {
        let task = line[1]
        let element = list[task].slice(2)
        list[task] = `[✓${element}`
        console.log(`Task ${task} completed!`);
        console.log(navigation);
    }

//------delete button--------------->

    else if(line[0] === 'd') {
        let task = line[1]
        let element = list[task]
        list.splice(task, 1)
        console.log(`${element} has been deleted!`);
        console.log(navigation);
    }

//------quit button----------------->

    else if(line === 'q') {
        console.log('See you soon! :)');
        process.exit();
    }

//------save file------------------->

    else if(line === 's') {
        interface.question('Where would you like to save it? myToDo.json?\n', (answer) => {

            let newList = list.toString().replace(',', '\n')

            if (!answer) {
                fs.appendFile('myToDo.json', newList, (error) => {
                    if (error) {
                        console.log(error)
                    }
                    else {
                        console.log("List saved to 'myToDo.json'!");
                    }
                })
            }

            else {
                fs.writeFile(answer, newList, (error) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("List saved to '${answer}!`");
                    }
                })
            }
        })
    }

//------invalid--------------------->

    else {
        console.log('invalid input')
        console.log(navigation);
        interface.prompt()
    }
})