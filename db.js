document.getElementById("addRecordButton").addEventListener("click", function(event){
  
    var form = document.getElementById("addRecord");
    var name = form.elements.name.value;
    var reps = form.elements.reps.value;
    var weight = form.elements.weight.value;
    var date = form.elements.date.value;
    var unitCheck = null;
    if(addRecord.elements.unitCheck.checked){
        var unitCheck = 1;                                 
    }
    else{
	var unitCheck = 0;
    }
  
    var req = new XMLHttpRequest();

    var queryString = `/insert?name=${name}&reps=${reps}&weight=${weight}&date=${date}&unit=${unitCheck}`
    console.log(queryString);
  
    req.open("GET",  queryString , true);
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  
    alert(`You entered: \nName: ${name}\nReps: ${reps}\nWeight: ${weight}\nDate: ${date}\nUnit: ${unitCheck}`);

    req.addEventListener('load', function() {
  
        if(req.status >= 200 && req.status < 400) {

            //Response and id from server
            var response = JSON.parse(req.responseText);
            var id = response.inserted;
    
            //Get the lower table on home page
            var table = document.getElementById("exerciseTable");

            var row = table.insertRow(-1);
   
            //Populates table based on user submitted values for each field in the form
            var name = document.createElement('td');
            name.textContent = addRecord.elements.name.value;
            row.appendChild(name);

            var reps = document.createElement('td');
            reps.textContent = addRecord.elements.reps.value;
            row.appendChild(reps);

            var weight = document.createElement('td');
            weight.textContent = addRecord.elements.weight.value;
            row.appendChild(weight);

            var date = document.createElement('td');
            date.textContent = addRecord.elements.date.value;
            row.appendChild(date);

            var unit = document.createElement('td');
	    if(addRecord.elements.unitCheck.checked) {

                unit.textContent = 'lbs';
	    }else{
                unit.textContent = 'kg';
            }
            row.appendChild(unit)

            //Adds Update button to table
            var updateData = document.createElement('td');
            var updateDataLink = document.createElement('a');
	    updateDataLink.setAttribute('href','/editRecord?id=' + id); 
	    var updateButton = document.createElement('input');    
	    updateButton.setAttribute('value','Update'); 
            updateButton.setAttribute('type','button');         
	    updateDataLink.appendChild(updateButton);
	    updateData.appendChild(updateDataLink);
	    row.appendChild(updateData);

            //Adds Delete button to table
  	    var deleteCell = document.createElement('td');       
	    var deleteButton = document.createElement('input');    
	    deleteButton.setAttribute('type','button');
	    deleteButton.setAttribute('name','delete');             
	    deleteButton.setAttribute('value','Delete');
	    deleteButton.setAttribute('onClick', 'deleteData("dataTable",' + id +')');
	    var deleteHidden = document.createElement('input');             
	    deleteHidden.setAttribute('type','hidden');
	    deleteHidden.setAttribute('id', 'delete' + id);
	    deleteCell.appendChild(deleteButton);                    
	    deleteCell.appendChild(deleteHidden);
	    row.appendChild(deleteCell);               

        } else {
            console.log("error");
        }
    });
    req.send(queryString);                              
    event.preventDefault();                                    
});

function deleteData(tableId, id){                               
    var deleteItem = "delete" + id;                             	
	var table = document.getElementById("exerciseTable");       
	var numRows = table.rows.length;

	
	for(var i = 1; i < numRows; i++){                          
		var row = table.rows[i];
		var findData = row.getElementsByTagName("td");		  
		var erase = findData[findData.length -1];		        
		if(erase.children[1].id === deleteItem){              
			table.deleteRow(i);
		}

	}

	var req = new XMLHttpRequest();
	

	req.open("GET", "/delete?id=" + id, true);             

	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){        
	    	console.log('delete was successful');
		} else {
		    console.log('error');
		}
	});

	req.send("/delete?id=" + id);                          

};
