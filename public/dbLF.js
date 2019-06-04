document.getElementById("addListingFeatureButton").addEventListener("click", function(event){
  
    var form = document.getElementById("addListingFeature");
    var listing = form.elements.Listing.value;
    var feature = form.elements.Feature.value;
      
    var req = new XMLHttpRequest();

    var queryString = `/insertListingFeature?Listing=${listing}&Feature=${feature}`
  
    req.open("GET",  queryString , true);
	
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  

    req.addEventListener('load', function() {
  
        if(req.status >= 200 && req.status < 400) {
            $('#addForm').modal('hide');

            //Response and id from server
            var response = JSON.parse(req.responseText);
            var listingid = response.insertedListing;
            var featureid = response.insertedFeature;

    
            //Get the lower table on Property-Type page
            var table = document.getElementById("listingFeatureTable");

            var row = table.insertRow(-1);
            row.id = "row-" + listingid + "-" + featureid;

            //Populates table based on user submitted values for each field in the form
            var name = document.createElement('td');
            name.textContent = addListingFeature.elements.Feature[addListingFeature.elements.Feature.selectedIndex].text;
            row.appendChild(name);


			//Adds Delete button to table
            var deleteCell = document.createElement('td');  
            deleteCell.className = "actionCell";

			
			var deleteButton = document.createElement('input');    
			deleteButton.setAttribute('type','button');
			deleteButton.setAttribute('name','delete');             
			deleteButton.setAttribute('value','Delete');
            deleteButton.setAttribute('onClick', 'deleteListingFeature("listingFeatureTable",' + listingid + ', ' + featureid +')');
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


//submits a delete request for the listing with the passed listing id and feature id.
function deleteListingFeature(tableId, lid, fid) {
    $.ajax({
        url: '/deleteListingFeature/' + lid,
        type: 'DELETE',
        data: {
            lid: lid, fid: fid
        },
        success: function (result) {
            $("#" + tableId).find("#row-" + lid + "-" + fid).remove();
            console.log("Deleted ID - " + lid + "-" + fid);
        },
        error: function (result) {
            console.log(result);
        }
    })
};