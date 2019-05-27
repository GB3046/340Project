//FOR CITY
//updates the selected state to the passed id. 
function selectState(id) {
    $("#State").val(id);
}

function updateCity(id) {
    $.ajax({
        url: '/editCity/' + id,
        type: 'PUT',
        data: $('#updateCity').serialize(),
        success: function (result) {
            window.location.href = "/city";
        }
    })
};