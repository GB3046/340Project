document.getElementById("addListingButton").addEventListener("click", function(event){
  
    var form = document.getElementById("addListing");
    var address = form.elements.Address.value;
	var city = form.elements.City.value;
	var zip = form.elements.ZipCode.value;
	var property = form.elements.PropertyType.value;
	var byOwner = form.elements.ByOwner.value;
	var dateListed = form.elements.DateListed.value;
	var listPrice = form.elements.ListPrice.value;
	var dateSold = form.elements.DateSold.value;
	var sellPrice = form.elements.SellPrice.value;
      
    var req = new XMLHttpRequest();

    var queryString = `/insertListing?Address=${address}&City=${city}&ZipCode=${zip}&PropertyType=${property}&ByOwner=${byOwner}&DateListed=${dateListed}
	&ListPrice=${listPrice}&DateSold=${dateSold}&SellPrice=${sellPrice}`
    //console.log(queryString);
  
    req.open("GET",  queryString , true);
	
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  

    req.addEventListener('load', function() {
  
        if (req.status >= 200 && req.status < 400) {
            $('#addForm').modal('hide');


            //Response and id from server
            var response = JSON.parse(req.responseText);
            var id = response.inserted;
    
            //Get the lower table on Listing page
            var table = document.getElementById("listingTable");

            var row = table.insertRow(-1);
            row.id = "row-" + id;

   
            //Populates table based on user submitted values for each field in the form
            var address = document.createElement('td');
            address.textContent = addListing.elements.Address.value;
            row.appendChild(address);
			
			var city = document.createElement('td');
			city.textContent = addListing.elements.City.value;
			row.appendChild(city);
			
			var zip = document.createElement('td');
			zip.textContent = addListing.elements.ZipCode.value;
			row.appendChild(zip);
			
			var property = document.createElement('td');
			property.textContent = addListing.elements.PropertyType.value;
			row.appendChild(property);
			
			var byOwner = document.createElement('td');
			byOwner.textContent = addListing.elements.ByOwner.value;
			row.appendChild(byOwner);
			
			var dateListed = document.createElement('td');
			dateListed.textContent = addListing.elements.DateListed.value;
			row.appendChild(dateListed);
			
			var listPrice = document.createElement('td');
			listPrice.textContent = addListing.elements.ListPrice.value;
			row.appendChild(listPrice);

			var dateSold = document.createElement('td');
			dateSold.textContent = addListing.elements.DateSold.value;
			row.appendChild(dateSold);
			
			var sellPrice = document.createElement('td');
			sellPrice.textContent = addListing.elements.SellPrice.value;
			row.appendChild(sellPrice);
			
			//Adds Update button to table
			var updateData = document.createElement('td');
            updateData.className = "actionCell";

			var updateDataLink = document.createElement('a');
			updateDataLink.setAttribute('href','/updateListing?id=' + id);
			
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
            deleteButton.setAttribute('onClick', 'deleteListing("listingTable",' + id +')');
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

//submits a delete request for the listing with the passed id.
function deleteListing(tableId, id) {
    $.ajax({
        url: '/deleteListing/' + id,
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


