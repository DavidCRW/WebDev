// Controller module

    // Click event
    document.querySelector(".hozzaad__gomb").addEventListener("click" , function(){
    inputToObject();
    inputToUI();
    clearFields()
    });

    // Keyboard event
    document.onkeydown = function(event){
        if(event.key === "Enter"){
            inputToObject();
            inputToUI();
            clearFields()
        }else {""}
    };

    // Remove event
    document.querySelector(".kontener").addEventListener("click" , removeItems);

    // Date event
    date();

//--------------------------------------------------------------------------------//
// Data module

    // Constructor objectum
    let ConstObject = function(type , text , price , id){
        this.type = type,
        this.text = text,
        this.price = price,
        this.id = id
    };

    // Array for objects
    let objArrays = [];

    // Index for arrays
    let index = 0;

    // Array for total values
    let totalValues = [0 , 0];

//--------------------------------------------------------------------------------//
// Functions module

    // Date function
    function date(){
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
            id : "id" + Math.random().toString(16).slice(2)
        };

        if(inputValues.textValue !== "" && !isNaN(inputValues.priceValue)){
            let newObj = new ConstObject(inputValues.typeValue , inputValues.textValue , inputValues.priceValue, inputValues.id)
            objArrays.push(newObj);    
        }else{
            ""
        }

        // totalValue function to totalValues array
        
        let totalValue = (function(){
            if(objArrays[index].type === "plusz"){
                totalValues[0] += inputValues.priceValue;
            } else{
                totalValues[1] += inputValues.priceValue;
            }
        })();
    };


    // Input values to UI
    function inputToUI(){
        
        if(objArrays[index].type === "plusz"){
            document.querySelector(".bevetelek__lista").insertAdjacentHTML("afterbegin",
            `<div class="tetel clearfix" id="${objArrays[index].id}">
                <div class="tetel__leiras">${objArrays[index].text}</div>
                <div class="right clearfix">
                    <div class="tetel__ertek">+ ${objArrays[index].price} Ft</div>
                    <div class="tetel__torol">
                        <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`)

        }else{
            document.querySelector(".kiadasok__lista").insertAdjacentHTML("afterbegin",
            `<div class="tetel clearfix" id="${objArrays[index].id}">
                <div class="tetel__leiras">${objArrays[index].text}</div>
                <div class="right clearfix">
                    <div class="tetel__ertek">- ${objArrays[index].price} Ft</div>
                    <div class="tetel__szazalek">0%</div>
                    <div class="tetel__torol">
                        <button class="tetel__torol--gomb"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`)
        }
        index++;

        // Total values
        document.querySelector(".koltsegvetes__ertek").innerHTML = totalValues[0] - totalValues[1] + "Ft";
        document.querySelector(".koltsegvetes__bevetelek--ertek").innerHTML = totalValues[0] + "Ft";
        document.querySelector(".koltsegvetes__kiadasok--ertek").innerHTML = "-" + totalValues[1] + "Ft";
        let percentage = (function(){
            if(totalValues[0] > 0){
                document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = 
                Math.round((totalValues[1] / totalValues[0]) * 100) + "%";
            }else{
                document.querySelector(".koltsegvetes__kiadasok--szazalek").innerHTML = "0%"; 
            }
        })(); 
    };


    // Clear input fields
    function clearFields(){
        let fields = document.querySelectorAll(".hozzaad__leiras , .hozzaad__ertek");
        let fieldsArray = Array.prototype.slice.call(fields);

        fieldsArray.forEach(function(input){
            input.value = "";
        });
    };

    
    // Remove items
    function removeItems(event){
        let itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        let foundIndex;
        for(let i = 0; i < objArrays.length; i++){
            if(objArrays[i].id === itemID){
                foundIndex = i;
                objArrays.splice(foundIndex, 1);
                console.log(foundIndex);
                break;
            };
        };
    };