// init
    document.querySelector(".koltsegvetes__ertek").innerHTML = 0 + "Ft";
    document.querySelector(".koltsegvetes__bevetelek--ertek").innerHTML = 0 + "Ft";
    document.querySelector(".koltsegvetes__kiadasok--ertek").innerHTML = 0 + "Ft";
    document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = 0 + "%";

    // Date Month as a name
    const Months = ["Január", "Február" , "Március" , "Április",
    "Május", "Június", "Július", "Augusztus", "Szeptember" , "Október",
    "November", "December"]
    document.querySelector(".koltsegvetes__cim--honap").innerHTML =
    Months[new Date().getMonth()];

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
    let index = [0 , 0]

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
        <div class="tetel clearfix" id="${plusArray[index[0]].id}">
            <div class="tetel__leiras">${plusArray[index[0]].descript}</div>
            <div class="right clearfix">
                <div class="tetel__ertek">${plusArray[index[0]].value} Ft</div>
                <div class="tetel__torol">
                    <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `
        document.querySelector(".koltsegvetes__bevetelek--ertek").innerHTML = amount[0] + "Ft";
        document.querySelector(".bevetelek__lista").insertAdjacentHTML("afterbegin", htmlPlus);
        index[0]++;

        }else{
        let htmlMinus = `
        <div class="tetel clearfix" id="${minusArray[index[1]].id}">
            <div class="tetel__leiras">${minusArray[index[1]].descript}</div>
            <div class="right clearfix">
                <div class="tetel__ertek">${minusArray[index[1]].value} Ft</div>
                <div class="tetel__torol">
                    <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
        `
        document.querySelector(".koltsegvetes__kiadasok--ertek").innerHTML = amount[1] + "Ft";
        document.querySelector(".kiadasok__lista").insertAdjacentHTML("afterbegin", htmlMinus);
        index[1]++;
        }
        
        // Amount calculate
        document.querySelector(".koltsegvetes__ertek").innerHTML = amount[0] - amount[1] + "Ft";
        // Percent calculate
        document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = (amount[1] / amount[0]) * 100 + "%";
    }

    // Onclick event
    document.querySelector(".hozzaad__gomb").onclick = eventInput;
    // Onkeyboard event
    document.onkeydown = function(event){
        event.key === "Enter" ? eventInput() : "";
    }
