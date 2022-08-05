// SUBMIT BUTTON ADD TO SERVER
function loadServerData() {
  $.get("/todos", function (data) {
    data = JSON.parse(data);
    $.each(data, (id, desc) => {
      console.log(desc);
      let tableIDAndDesc = `<tr>
                        <td>${desc.description}</td>
                    </tr>`;
      $("tbody").append(tableIDAndDesc);
    });
  });
}

// add task to table //

function addUserInput() {
  let userData = $("#task-desc-input").val();
  let dataToSend = {};
  dataToSend.description = userData;

  let tableIDAndDesc = `<tr>
                <td>${userData}</td>
            </tr>`;
  tableBody = $("table tbody");
  tableRow = $("tr");
  tableBody.append(tableIDAndDesc);
  $("form")[0].reset();
  $.ajax({
    type: "POST",
    url: "/todos",
    data: JSON.stringify(dataToSend),
    success: () => {
      console.log("added to server");
    },
    dataType: "json",
    contentType: "application/json; charset=utf-8",
  });
}

function resetData(){
    $.ajax({
        url: '/todos',
        type: 'DELETE',
        success: function (result) {
            console.log(result)
        }
    });
}
$("#load-btn").click(() => {
  event.preventDefault();
  loadServerData();
});

$("#add-btn").click(() => {
  event.preventDefault();
  addUserInput();
});

$("#delete-btn").click(()=>{
    
})
// function deleteUserInput(){

// }

// $("delete-btn").click(()=>{
//     deleteUserInput()
// })
