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
//----------------------------------------------------------------------//


// Event/Controller module

    // Input values and item push to Arrays
    let eventInput = function(){
        // Input values
        let type = document.querySelector(".hozzaad__tipus").value;
        let descript = document.querySelector(".hozzaad__leiras").value;
        let value = document.querySelector(".hozzaad__ertek").value;
        let id = "id" + Math.random().toString(16).slice(2);


        // New item push to Arrays
        if(type === "plusz"){
            let newItemPlus = new Constr(type, descript, value, id);
            plusArray.push(newItemPlus);
        } else{
            let newItemMinus = new Constr(type, descript, value, id);
            minusArray.push(newItemMinus);
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
        `;
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
        `;
        document.querySelector(".kiadasok__lista").insertAdjacentHTML("afterbegin", htmlMinus);
        minusIndex++;
        }
        
    }

    // Onclick event
    document.querySelector(".hozzaad__gomb").onclick = eventInput;
    // Onkeyboard event
    document.onkeydown = function(event){
        event.key === "Enter" ? eventInput() : "";
    }

