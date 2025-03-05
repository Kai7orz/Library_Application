const config = {
    url: "https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:"
}

let headerCon = document.getElementById("inic")
let myButton = document.getElementById("mbutton")
let bodyContainer = document.getElementById("desc")

function generateCard(answer,isbn){

    let card 
    let names 
    let targetIsbn = "ISBN:"+isbn

    for(a in answer){
        names = answer[a].subjects.map(subject => subject.name)
    }
    for( n of names){
        console.log(n)
    }
    card = `
    <div class="d-flex mr-2 w-100">    
        <img src="${answer[targetIsbn].cover.medium}" class="card-img p-3" alt="">
        <div class="mt-2 w-100">
            <h2> ${answer[targetIsbn].title} </h2>
            <p> ${answer[targetIsbn].by_statement}</p>
        </div>    
    </div>

    <div class="container myColor mt-2">
        <div class="row ">        
            <div class="col-3"><strong>Page</strong></div>
            <div class="col-9">${answer[targetIsbn].number_of_pages} </div>
        </div>
     </div>
    
     <div class="container mt-2">
        <div class="row">        
            <div class="col-3"><strong>Publisher</strong></div>
            <div class="col-9">${answer[targetIsbn].authors[0].name} </div>
        </div>
     </div>

    <div class="container myColor mt-2">
        <div class="row">        
            <div class="col-3"><strong>PublishDate</strong></div>
           
            <div class="col-9">${answer[targetIsbn].publish_date} </div>
        </div>
     </div>

     <div class="container mt-2">
        <div class="row">        
            <div class="col-3">
            <strong>Categories
            </strong></div>            
            <div class="col-9">${names} </div>
        </div>
     </div>
        `
    return card
}


function getInfo(){
    let isbn = document.getElementById("search").value
    fetch(config.url+isbn).then(response=>{
        return response.json()
    }).then(
        answer=>{
//        console.log(JSON.stringify(answer))
        bodyContainer.innerHTML = generateCard(answer,isbn)
    })
}

fetch(config.url).then(response=>{
    return response.json()}).then(
        answer=>{
   
})

myButton.addEventListener("click",getInfo)
