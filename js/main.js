// Controller module


    // Functions call
    function callFunctions(){
        inputToObject();
        inputToUI();
        clearFields();
        values();
        totalVal();
        percentCalc()
        percentCalcToUI()
    }
    
    // Click event
    document.querySelector(".hozzaad__gomb").addEventListener("click" , callFunctions);

    // Keyboard event
    document.onkeydown = function(event){
        if(event.key === "Enter"){
            callFunctions
        }
    };

    // Remove event
    document.querySelector(".kontener").addEventListener("click" , removeItems);

    // Date event
    months();

//--------------------------------------------------------------------------------//
// Data module

    // Constructor objectum
    let ConstObject = function(type , text , price , id, percent){
        this.type = type,
        this.text = text,
        this.price = price,
        this.id = id,
        this.percent = percent
    };

    // Array for objects
    let objArrays = [];

    // Array for total values
    let valuesArray = [0 , 0];

//--------------------------------------------------------------------------------//
// Functions module

    // Date function
    function months(){
        let month = new Date().getMonth();
        let monthAsName = ["Január", "Február" , "Március" , "Április",
        "Május", "Június", "Július", "Augusztus", "Szeptember" , "Október",
        "November", "December"]
        document.querySelector(".koltsegvetes__cim--honap").innerHTML = monthAsName[month];
    };


    // Input values to object
    function inputToObject(){
        let inputValues = {
            typeValue : document.querySelector(".hozzaad__tipus").value,
            textValue : document.querySelector(".hozzaad__leiras").value,
            priceValue : Number(document.querySelector(".hozzaad__ertek").value),
            id : "id" + Math.random().toString(16).slice(2),
            percent: "test",
        };


        if(inputValues.textValue !== "" && !isNaN(inputValues.priceValue)){
            let newObj = new ConstObject(inputValues.typeValue , inputValues.textValue , inputValues.priceValue, inputValues.id, inputValues.percent)
            objArrays.push(newObj);    
        }else{
            return;
        }
        
    };


    // Input values to UI
    function inputToUI(){
        let number = objArrays[objArrays.length - 1].price;
        if(objArrays[objArrays.length - 1].type === "plusz"){
            document.querySelector(".bevetelek__lista").insertAdjacentHTML("afterbegin",
            `<div class="tetel clearfix" id="${objArrays[objArrays.length - 1].id}">
                <div class="tetel__leiras">${objArrays[objArrays.length - 1].text}</div>
                <div class="right clearfix">
                    <div class="tetel__ertek">+ ${new Intl.NumberFormat().format(number)} Ft</div>
                    <div class="tetel__torol">
                        <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`)
    
        }else{
            document.querySelector(".kiadasok__lista").insertAdjacentHTML("afterbegin",
            `<div class="tetel clearfix" id="${objArrays[objArrays.length - 1].id}">
                <div class="tetel__leiras">${objArrays[objArrays.length - 1].text}</div>
                <div class="right clearfix">
                    <div class="tetel__ertek">- ${new Intl.NumberFormat().format(number)} Ft</div>
                    <div class="tetel__szazalek"> </div>
                    <div class="tetel__torol">
                        <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`)
        };
    };


    // Percent by item
    let s = [];
    function percentCalc(){
        for(let i = 0; i < objArrays.length; i++){
            if(objArrays[i].type === "minusz"){
            objArrays[i].percent = Math.round((objArrays[i].price / valuesArray[0]) * 100);
            }
        } 
    };

    // Percent to UI
    let allLengthMinus = 1;
    function percentCalcToUI(){
        let all = document.querySelectorAll(".tetel__szazalek");
        for(let i = 0; i < objArrays.length; i++){
            if(objArrays[i].type === "minusz"){
                all[[all.length] - allLengthMinus].innerHTML = objArrays[i].percent + "%";
                allLengthMinus++
            }
        }
        allLengthMinus = 1;
    }

    // totalValue function to totalValues array
    let values = function(){
        valuesArray[0] = 0;
        valuesArray[1] = 0;
        for(let i = 0; i < objArrays.length; i++){
            if(objArrays[i].type === "plusz"){
                valuesArray[0] += objArrays[i].price
            }else{
                valuesArray[1] += objArrays[i].price
            }
        }
    };
 

    // Total values
    function totalVal(){
        document.querySelector(".koltsegvetes__ertek").innerHTML = new Intl.NumberFormat().format(valuesArray[0] - valuesArray[1]) + "Ft";
        document.querySelector(".koltsegvetes__bevetelek--ertek").innerHTML = new Intl.NumberFormat().format(valuesArray[0]) + "Ft";
        document.querySelector(".koltsegvetes__kiadasok--ertek").innerHTML = "-" + new Intl.NumberFormat().format(valuesArray[1]) + "Ft";
            if(valuesArray[0] > 0){
                document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = 
                Math.round(valuesArray[1] / valuesArray[0] * 100) + "%";
            }else{
                document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = "0%"; 
            }  
    };


    // Clear input fields
    function clearFields(){
        let fields = document.querySelectorAll(".hozzaad__leiras , .hozzaad__ertek");
        fields.forEach(function(input){
            input.value = "";
        });
    };


    // Remove items
    function removeItems(event){
        let itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        document.getElementById(itemID).remove();
        let foundIndex;
        for(let i = 0; i < objArrays.length; i++){
            if(objArrays[i].id === itemID && objArrays[i].type === "minusz"){
                foundIndex = i;
                objArrays.splice(foundIndex, 1);
                break;
            }else if(objArrays[i].id === itemID){
                foundIndex = i;
                objArrays.splice(foundIndex, 1);
                break;
            };
        };
        values();
        totalVal();
        percentCalc()
        percentCalcToUI()
    };
 