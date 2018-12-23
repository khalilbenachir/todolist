const itemForm=document.getElementById("itemForm");
const itemInput=document.getElementById("itemInput");
const itemList=document.querySelector(".item-list");
const clearList=document.getElementById("clear-list");
const feedback=document.querySelector(".feedback");

let itemData=[]; 

itemForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    const textValue=itemInput.value;
    if(textValue === ""){
        showfeedback("please enter valid value","danger");
    }
    else{
        additem(textValue);
        itemInput.value='';
        itemData.push(textValue);
        handleItem(textValue);
    }
    
});

const showfeedback=(text,action)=>{
    feedback.classList.add("showItem",`alert-${action}`);
    feedback.innerHTML= `<p>${text}</p>`;
    

    setTimeout(() => {
        feedback.classList.remove("showItem",`alert-${action}`)

    }, 3000);
};

const additem =(text)=>{
    const div=document.createElement('div');
    div.classList.add('item','my-3');
    div.innerHTML=`<h5 class="item-name text-capitalize">${text}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;
    itemList.appendChild(div);


};
const handleItem =(text)=>{
    const items=itemList.querySelectorAll(".item");
    items.forEach((item)=>{
        if(item.querySelector(".item-name").textContent===text){
            item.querySelector(".complete-item").addEventListener("click",()=>{
                item.querySelector(".item-name").classList.toggle("completed");
            });

            item.querySelector(".edit-item").addEventListener('click',()=>{
                itemInput.value=text;
                itemList.removeChild(item);
                itemData=itemData.filter((item)=>{
                    return item !== text;
                });
            });

            item.querySelector(".delete-item").addEventListener('click',()=>{
                itemList.removeChild(item);
                itemData=itemData.filter((item)=>{
                    return item !== text;
                });
                showfeedback("item deleted","success");
            });
        }
    })
}

clearList.addEventListener("click",()=>{
    itemData=[];
    const items=document.querySelectorAll(".item");
    if(items.length>0){
        items.forEach((item)=>{
            itemList.removeChild(item);
            showfeedback("items removed","warning");
        });
    }
})