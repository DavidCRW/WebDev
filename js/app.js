// init

    // Date Month as a name
    const Months = ["Január", "Február" , "Március" , "Április",
    "Május", "Június", "Július", "Augusztus", "Szeptember" , "Október",
    "November", "December"]
    document.querySelector(".koltsegvetes__cim--honap").innerHTML =
    Months[new Date().getMonth()];
//----------------------------------------------------------------------//

// Data module

    // Constructor object
    let Constr = function(type, descript, value, id){
        this.type = type,
        this.descript = descript,
        this.value = value,
        this.id = id
    };

    // Two different arrays and index
    let plusArray = [];
    let minusArray = [];
    
    let index = [0 , 0]
    let plusIndex = 0;
    let minusIndex = 1;

    // Income and Outcome
    let amount = [0 , 0]
//----------------------------------------------------------------------//


// Event/Controller module

    // Input values and item push to Arrays
    let eventInput = function(){
        // Input values
        let type = document.querySelector(".hozzaad__tipus").value;
        let descript = document.querySelector(".hozzaad__leiras").value;
        let value = Number(document.querySelector(".hozzaad__ertek").value);
        let id = "id" + Math.random().toString(16).slice(2);

        // Input field isNaN and empty
        if(descript !== "" && !isNaN(value) && value > 0){
        // New item push to Arrays
        if(type === "plusz"){
            let newItemPlus = new Constr(type, descript, value, id);
            plusArray.push(newItemPlus);
            let pont;
            amount[0] += newItemPlus.value;
        } else{
            let newItemMinus = new Constr(type, descript, value, id);
            minusArray.push(newItemMinus);
            amount[1] += newItemMinus.value;
        }

        //userInterface

        if(type === "plusz"){
        let htmlPlus = `
        <div class="tetel clearfix" id="${plusArray[plusIndex].id}">
            <div class="tetel__leiras">${plusArray[plusIndex].descript}</div>
            <div class="right clearfix">
                <div class="tetel__ertek">${plusArray[plusIndex].value} Ft</div>
                <div class="tetel__torol">
                    <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `
        document.querySelector(".koltsegvetes__bevetelek--ertek").innerHTML = amount[0] + "Ft";
        document.querySelector(".bevetelek__lista").insertAdjacentHTML("afterbegin", htmlPlus);
        plusIndex++;

        }else{
        let htmlMinus = `
        <div class="tetel clearfix" id="${minusArray[minusIndex].id}">
            <div class="tetel__leiras">${minusArray[minusIndex].descript}</div>
            <div class="right clearfix">
                <div class="tetel__ertek">${minusArray[minusIndex].value} Ft</div>
                <div class="tetel__torol">
                    <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `
        document.querySelector(".koltsegvetes__kiadasok--ertek").innerHTML = "-" + amount[1] + "Ft";
        document.querySelector(".kiadasok__lista").insertAdjacentHTML("afterbegin", htmlMinus);
        minusIndex++;
        }
        }

        // Amount calculate
        document.querySelector(".koltsegvetes__ertek").innerHTML = amount[0] - amount[1] + "Ft";

        // Percent calculate, Math floor round and calculate if the amount[0] is bigger than 0
        if(amount[0] > 0){
            document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = Math.round((amount[1] / amount[0]) * 100) + "%";
        } else{
            document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = "0%";
        };

        // Clear input field
        let fields = document.querySelectorAll(".hozzaad__ertek , .hozzaad__leiras");
        let fieldsArray = Array.prototype.slice.call(fields);

        fieldsArray.forEach(function(currentValue, index, array){
            currentValue.value = "";
        });
        fieldsArray[0].focus();
    }



    //Input values and item remove
    let RemoveInput = function(event){
        let itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        let foundIndex;
        for (let index = 0; index < plusArray.length; index++){
            if(plusArray[index].id === itemID){
                foundIndex = index;
                break;
            }
        }
        console.log(plusArray[foundIndex].id);
        plusArray.splice(foundIndex, 1);
    }

    
    // Onclick event
    document.querySelector(".hozzaad__gomb").onclick = eventInput;
    // Onkeyboard event
    document.onkeydown = function(event){
        event.key === "Enter" ? eventInput() : "";
    }
    // Remove click event
    document.querySelector(".kontener").onclick = RemoveInput;
