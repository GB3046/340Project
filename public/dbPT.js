document.getElementById("addPropertyTypeButton").addEventListener("click", function(event){
  
    var form = document.getElementById("addPropertyType");
    var name = form.elements.Name.value;
      
    var req = new XMLHttpRequest();

    var queryString = `/insertPropertyType?Name=${name}`
    console.log(queryString);
  
    req.open("GET",  queryString , true);
	
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  

    req.addEventListener('load', function() {
  
        if(req.status >= 200 && req.status < 400) {
            $('#addForm').modal('hide');

            //Response and id from server
            var response = JSON.parse(req.responseText);
            var id = response.inserted;
    
            //Get the lower table on Property-Type page
            var table = document.getElementById("propertyTypeTable");

            var row = table.insertRow(-1);
            row.id = "row-" + id;

            //Populates table based on user submitted values for each field in the form
            var name = document.createElement('td');
            name.textContent = addPropertyType.elements.Name.value;
            row.appendChild(name);

			//Adds Update button to table
			var updateData = document.createElement('td');
            updateData.className = "actionCell";

			var updateDataLink = document.createElement('a');
			updateDataLink.setAttribute('href','/updateProperty?id=' + id);
			
			var updateButton = document.createElement('input');    
			updateButton.setAttribute('value','Update'); 
			updateButton.setAttribute('type','button');
            updateButton.className = "btn btn-sm btn-primary";

			updateDataLink.appendChild(updateButton);
			
			updateData.appendChild(updateDataLink);
			
			row.appendChild(updateData);

			//Adds Delete button to table
            var deleteCell = document.createElement('td');  
            deleteCell.className = "actionCell";

			
			var deleteButton = document.createElement('input');    
			deleteButton.setAttribute('type','button');
			deleteButton.setAttribute('name','delete');             
			deleteButton.setAttribute('value','Delete');
            deleteButton.setAttribute('onClick', 'deleteProperty("propertyTypeTable",' + id +')');
            deleteButton.className = "btn btn-sm btn-secondary";

			deleteCell.appendChild(deleteButton);                    			
			row.appendChild(deleteCell);               

        } else {
			
            console.log("error");
        }
    });
    req.send(queryString);                              
    event.preventDefault();                                    
});


//submits a delete request for the property-type with the passed id.
function deleteProperty(tableId, id) {
    $.ajax({
        url: '/deleteProperty/' + id,
        type: 'DELETE',
        success: function (result) {
            $("#" + tableId).find("#row-" + id).remove();
            console.log("Deleted ID - " + id);
        },
        error: function (result) {
            console.log(result);
        }
    })
};