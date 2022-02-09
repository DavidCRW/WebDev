// init
(function () {
    document.querySelector(".koltsegvetes__ertek").innerHTML = 0;
    document.querySelector(".koltsegvetes__bevetelek--ertek").innerHTML = 0;
    document.querySelector(".koltsegvetes__kiadasok--ertek").innerHTML = 0;
    document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = 0 + "%";

    // Date Month as a name
    const Months = ["Január", "Február" , "Március" , "Április",
    "Május", "Június", "Július", "Augusztus", "Szeptember" , "Október",
    "November", "December"]
    document.querySelector(".koltsegvetes__cim--honap").innerHTML =
    Months[new Date().getMonth()];
})();

// Data module

    // Constructor object
    let Constr = function(type, descript, value, id){
        this.type = type,
        this.descript = descript,
        this.value = value,
        this.id = id
    };

    // Two different arrays and two different index
    let plusArray = [];
    let minusArray = [];
    let plusIndex = 0;
    let minusIndex = 0;

    // Income and Outcome
    let price = [0 , 0]
//----------------------------------------------------------------------//


// Event/Controller module

    // Input values and item push to Arrays
    let eventInput = function(){
        // Input values
        let type = document.querySelector(".hozzaad__tipus").value;
        let descript = document.querySelector(".hozzaad__leiras").value;
        let value = Number(document.querySelector(".hozzaad__ertek").value);
        let id = "id" + Math.random().toString(16).slice(2);

        // New item push to Arrays
        if(type === "plusz"){
            let newItemPlus = new Constr(type, descript, value, id);
            plusArray.push(newItemPlus);
            let pont;
            price[0] += newItemPlus.value;
        } else{
            let newItemMinus = new Constr(type, descript, value, id);
            minusArray.push(newItemMinus);
            price[1] += newItemMinus.value;
        }

        //userInterface

        if(type === "plusz"){
        let htmlPlus = `
        <div class="tetel clearfix" id="${plusArray[plusIndex].id}">
            <div class="tetel__leiras">${plusArray[plusIndex].descript}</div>
            <div class="right clearfix">
                <div class="tetel__ertek">${plusArray[plusIndex].value}</div>
                <div class="tetel__torol">
                    <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `
        document.querySelector(".koltsegvetes__bevetelek--ertek").innerHTML = price[0];
        document.querySelector(".bevetelek__lista").insertAdjacentHTML("afterbegin", htmlPlus);
        plusIndex++;

        }else{
        let htmlMinus = `
        <div class="tetel clearfix" id="${minusArray[minusIndex].id}">
            <div class="tetel__leiras">${minusArray[minusIndex].descript}</div>
            <div class="right clearfix">
                <div class="tetel__ertek">${minusArray[minusIndex].value}</div>
                <div class="tetel__torol">
                    <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `
        document.querySelector(".koltsegvetes__kiadasok--ertek").innerHTML = price[1];
        document.querySelector(".kiadasok__lista").insertAdjacentHTML("afterbegin", htmlMinus);
        minusIndex++;
        }
        
        // Price calculate
        document.querySelector(".koltsegvetes__ertek").innerHTML = price[0] - price[1];
    }

    // Onclick event
    document.querySelector(".hozzaad__gomb").onclick = eventInput;
    // Onkeyboard event
    document.onkeydown = function(event){
        event.key === "Enter" ? eventInput() : "";
    }

