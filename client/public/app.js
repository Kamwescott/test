console.log("test hello")



$(function (){
    $.ajax({
        headers: { "Accept": "application/javascript"},
        type:'GET', 
        url:'localhost:3000/todos', 
        crossDomain: true,
        success: function(data){
            console.log("ajax get req sent")
        }
    })
})