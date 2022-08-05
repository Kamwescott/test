


// SUBMIT BUTTON ADD TO SERVER
function AddInputToServer(){
    // $(document).ready(function () {
    //        let formData = {
    //         description: $("#task-desc-input").val(),
    //       };



          
        
    //           console.log(formData.description)
    //           $.ajax({
    //               type: "POST",
    //               url: "/todos",
    //               data: JSON.stringify(formData),
    //               contentType: "application/json; charset=utf-8",
    //               dataType: "json",
    //               encode:true, 
    //               success: function(msg) {
    //                   console.log(`${formData.description} added to server`);
    //               },
    //               done: (data)=>{
    //                 this.reset();
    //                 console.log(data)
    //               }
    //         });
    //        $("form")[0].reset();
            
        
    // })
console.log("test idea in effect")

$.get( "/todos", function( data ) {
    data = JSON.parse(data)
    $.each(data, (id, desc)=>{
        console.log(desc)
        let tableIDAndDesc = 
                `<tr>
                    <td>${desc.description}</td>
                </tr>`; 
        $("tbody").append(tableIDAndDesc)
    })
 
});
};



// add task to table // used function to increment id 
// let inputId = 1; 

function addUserInput(){
//     let userData = $("#task-desc-input").val()
//     let tableIDAndDesc = 
//         `<tr>
//             <td>${inputId}</td>
//             <td>${userData}</td>
//         </tr>`; 
    
//     tableBody = $("table tbody")
//     tableRow = $('tr')
    
//     tableBody.append(tableIDAndDesc)
//     return inputId++
let formData = {
     description: $("#task-desc-input").val(),
 };
 
$.post( "/todos", formData, (data)=>{
    console.log(data)
} )
}
$("#submit-btn").click (()=>{
    event.preventDefault()
    AddInputToServer()
    addUserInput()
});




// function deleteUserInput(){

// }

// $("delete-btn").click(()=>{
//     deleteUserInput()
// })











