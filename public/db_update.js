//FOR CITY
//updates the selected state to the passed id. 
function selectState(id) {
    $("#State").val(id);
}

function selectCity(id) {
    $("#City").val(id);
}

function selectZipCode(id) {
    $("#ZipCode").val(id);
}

function selectPropertyType(id) {
    $("#PropertyType").val(id);
}

function selectByOwner (byowner) {
    $("#ByOwner").prop("checked", byowner);

}

//shows the passed message in a dialog to the user.
function showError(msg) {
    msg = typeof msg === "undefined" || msg == "" ? "An unexpected error occurred." : msg;
    $("#alertmsg").find(".modal-body").html(msg);
    $("#alertmsg").modal('show');
}

////////////////////////////////////////////////////////////////////////
//INSERTS
////////////////////////////////////////////////////////////////////////

//submits an add for a new city and adds a new row to the table if successfull.
function addCity() {
    var form = document.getElementById("addCity");
    var name = form.elements.Name.value;
    var state = form.elements.State.value;

    if (name.trim() == "") {
        showError("City cannot be blank");
    } else {
        var req = new XMLHttpRequest();
        var queryString = `/insertCity?Name=${name}&State=${state}`
        req.open("GET", queryString, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        req.addEventListener('load', function () {
            $('#addForm').modal('hide');

            if (req.status >= 200 && req.status < 400) {

                //Response and id from server
                var response = JSON.parse(req.responseText);
                var id = response.inserted;

                if (id <= 0) {
                    var msg = response.msg && response.msg != "" ? response.msg : "An unexpected error has occurred.";
                    showError(msg)
                } else {
                    //Get the lower table on City page
                    var table = document.getElementById("cityTable");

                    var row = table.insertRow(-1);
                    row.id = "row-" + id;

                    //Populates table based on user submitted values for each field in the form
                    var name = document.createElement('td');
                    name.textContent = form.elements.Name.value;
                    row.appendChild(name);

                    var state = document.createElement('td');
                    state.textContent = form.elements.State[form.elements.State.selectedIndex].text;
                    row.appendChild(state);

                    //Adds Update button to table
                    var updateData = document.createElement('td');
                    updateData.className = "actionCell";

                    var updateDataLink = document.createElement('a');
                    updateDataLink.setAttribute('href', '/updateCity?id=' + id);

                    var updateButton = document.createElement('input');
                    updateButton.setAttribute('value', 'Update');
                    updateButton.setAttribute('type', 'button');
                    updateButton.className = "btn btn-sm btn-primary";


                    updateDataLink.appendChild(updateButton);

                    updateData.appendChild(updateDataLink);

                    row.appendChild(updateData);

                    //Adds Delete button to table
                    var deleteCell = document.createElement('td');
                    deleteCell.className = "actionCell";

                    var deleteButton = document.createElement('input');
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.setAttribute('name', 'delete');
                    deleteButton.setAttribute('value', 'Delete');
                    deleteButton.setAttribute('onClick', 'deleteCity("cityTable",' + id + ')');
                    deleteButton.className = "btn btn-sm btn-secondary";

                    deleteCell.appendChild(deleteButton);
                    row.appendChild(deleteCell);
                }

            } else {
                showError();
            }
        });
        req.send(queryString);
    }
};

//submits an add for a new feature and adds a new row to the table if successfull.
function addFeature() {
    var form = document.getElementById("addFeature");
    var name = form.elements.Name.value;

    if (name.trim() == "") {
        showError("Feature cannot be blank");
    } else {
        var req = new XMLHttpRequest();
        var queryString = `/insertFeature?Name=${name}`
        req.open("GET", queryString, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


        req.addEventListener('load', function () {
            $('#addForm').modal('hide');

            if (req.status >= 200 && req.status < 400) {

                //Response and id from server
                var response = JSON.parse(req.responseText);
                var id = response.inserted;

                if (id <= 0) {
                    var msg = response.msg && response.msg != "" ? response.msg : "An unexpected error has occurred.";
                    showError(msg)
                } else {
                    //Get the lower table on Feature page
                    var table = document.getElementById("featureTable");

                    var row = table.insertRow(-1);
                    row.id = "row-" + id;

                    //Populates table based on user submitted values for each field in the form
                    var name = document.createElement('td');
                    name.textContent = form.elements.Name.value;
                    row.appendChild(name);

                    //Adds Update button to table
                    var updateData = document.createElement('td');
                    updateData.className = "actionCell";

                    var updateDataLink = document.createElement('a');
                    updateDataLink.setAttribute('href', '/updateFeature?id=' + id);

                    var updateButton = document.createElement('input');
                    updateButton.setAttribute('value', 'Update');
                    updateButton.setAttribute('type', 'button');
                    updateButton.className = "btn btn-sm btn-primary";

                    updateDataLink.appendChild(updateButton);

                    updateData.appendChild(updateDataLink);

                    row.appendChild(updateData);

                    //Adds Delete button to table
                    var deleteCell = document.createElement('td');
                    deleteCell.className = "actionCell";

                    var deleteButton = document.createElement('input');
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.setAttribute('name', 'delete');
                    deleteButton.setAttribute('value', 'Delete');
                    deleteButton.setAttribute('onClick', 'deleteFeature("featureTable",' + id + ')');
                    deleteButton.className = "btn btn-sm btn-secondary";

                    deleteCell.appendChild(deleteButton);
                    row.appendChild(deleteCell);
                }

            } else {
                showError();
            }
        });
        req.send(queryString); 
    }

      
};

//submits an add for a new listing and adds a new row to the table if successfull.
function addListing() {
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

    if (address.trim() == "") {
        showError("Address cannot be blank");
    } else if (city < 1) {
        showError("Please select a city");
    } else if (zip < 1) {
        showError("Please select a zip code");
    } else if (property < 1) {
        showError("Please select a property-type");
    } else if (listPrice <= 0) {
        showError("Please enter a listing price");
    } else if (dateListed == "" || !dateListed) {
        showError("Please enter a date listed");

    } else if ((dateSold == "" || !dateSold) && sellPrice > 0) {
        showError("Please enter a date sold");
    } else if (sellPrice <= 0 && dateSold != "") {
        showError("Please enter a sell price");

    } else {


        var req = new XMLHttpRequest();

        var queryString = `/insertListing?Address=${address}&City=${city}&ZipCode=${zip}&PropertyType=${property}&ByOwner=${byOwner}&DateListed=${dateListed}
	&ListPrice=${listPrice}&DateSold=${dateSold}&SellPrice=${sellPrice}`
        req.open("GET", queryString, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


        req.addEventListener('load', function () {
            $('#addForm').modal('hide');

            if (req.status >= 200 && req.status < 400) {
                //Response and id from server
                var response = JSON.parse(req.responseText);
                var id = response.inserted;

                if (id <= 0) {
                    var msg = response.msg && response.msg != "" ? response.msg : "An unexpected error has occurred.";
                    showError(msg)
                } else {
                    //Get the lower table on Listing page
                    var table = document.getElementById("listingTable");

                    var row = document.createElement('tr');
                    row.id = "row-" + id;


                    //Populates table based on user submitted values for each field in the form
                    var address = document.createElement('td');
                    address.textContent = response.Address;
                    row.appendChild(address);

                    var city = document.createElement('td');
                    city.textContent = response.City;
                    row.appendChild(city);

                    var zip = document.createElement('td');
                    zip.textContent = response.ZipCode;
                    row.appendChild(zip);

                    var property = document.createElement('td');
                    property.textContent = response.PropertyType;
                    row.appendChild(property);

                    var byOwner = document.createElement('td');
                    byOwner.textContent = response.ByOwner;
                    row.appendChild(byOwner);

                    var dateListed = document.createElement('td');
                    dateListed.textContent = response.DateListed;
                    row.appendChild(dateListed);

                    var listPrice = document.createElement('td');
                    listPrice.textContent = response.ListPrice;
                    row.appendChild(listPrice);

                    var dateSold = document.createElement('td');
                    dateSold.textContent = response.DateSold;
                    row.appendChild(dateSold);

                    var sellPrice = document.createElement('td');
                    sellPrice.textContent = response.SellPrice;
                    row.appendChild(sellPrice);

                    //Adds view features button to table
                    var viewlisting = document.createElement('td');
                    viewlisting.className = "actionCell";

                    var viewlistingLink = document.createElement('a');
                    viewlistingLink.setAttribute('href', '/listingFeature?id=' + id);

                    var viewlistingbtn = document.createElement('input');
                    viewlistingbtn.setAttribute('value', 'View Features');
                    viewlistingbtn.setAttribute('type', 'button');
                    viewlistingbtn.className = "btn btn-sm btn-primary";

                    viewlistingLink.appendChild(viewlistingbtn);

                    viewlisting.appendChild(viewlistingLink);

                    row.appendChild(viewlisting);

                    //Adds Update button to table
                    var updateData = document.createElement('td');
                    updateData.className = "actionCell";

                    var updateDataLink = document.createElement('a');
                    updateDataLink.setAttribute('href', '/updateListing?id=' + id);

                    var updateButton = document.createElement('input');
                    updateButton.setAttribute('value', 'Update');
                    updateButton.setAttribute('type', 'button');
                    updateButton.className = "btn btn-sm btn-primary";

                    updateDataLink.appendChild(updateButton);

                    updateData.appendChild(updateDataLink);

                    row.appendChild(updateData);

                    //Adds Delete button to table
                    var deleteCell = document.createElement('td');
                    deleteCell.className = "actionCell";

                    var deleteButton = document.createElement('input');
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.setAttribute('name', 'delete');
                    deleteButton.setAttribute('value', 'Delete');
                    deleteButton.setAttribute('onClick', 'deleteListing("listingTable",' + id + ')');
                    deleteButton.className = "btn btn-sm btn-secondary";

                    deleteCell.appendChild(deleteButton);

                    row.appendChild(deleteCell);
                    $("#listingTable").DataTable().row.add(row);
                    $("#listingTable").DataTable().draw();
                }
            } else {
                showError();
            }
        });
        req.send(queryString);
    }
};

//submits an add for a listing feature. adds row to the table on the page
function addListingFeature() {
    var form = document.getElementById("addListingFeature");
    var listing = form.elements.Listing.value;
    var feature = form.elements.Feature.value;

    if (feature < 1) {
        showError("Please select a feature");

    } else {



        var req = new XMLHttpRequest();
        var queryString = `/insertListingFeature?Listing=${listing}&Feature=${feature}`
        req.open("GET", queryString, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


        req.addEventListener('load', function () {
            $('#addForm').modal('hide');

            if (req.status >= 200 && req.status < 400) {

                //Response and id from server
                var response = JSON.parse(req.responseText);
                var listingid = response.insertedListing;
                var featureid = response.insertedFeature;

                if (listingid <= 0 || featureid <= 0) {
                    var msg = response.msg && response.msg != "" ? response.msg : "An unexpected error has occurred.";
                    showError(msg)
                } else {
                    //Get the lower table on Property-Type page
                    var table = document.getElementById("listingFeatureTable");

                    var row = table.insertRow(-1);
                    row.id = "row-" + listingid + "-" + featureid;

                    //Populates table based on user submitted values for each field in the form
                    var name = document.createElement('td');
                    name.textContent = form.elements.Feature[form.elements.Feature.selectedIndex].text;
                    row.appendChild(name);


                    //Adds Delete button to table
                    var deleteCell = document.createElement('td');
                    deleteCell.className = "actionCell";


                    var deleteButton = document.createElement('input');
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.setAttribute('name', 'delete');
                    deleteButton.setAttribute('value', 'Delete');
                    deleteButton.setAttribute('onClick', 'deleteListingFeature("listingFeatureTable",' + listingid + ', ' + featureid + ')');
                    deleteButton.className = "btn btn-sm btn-secondary";
                    deleteCell.appendChild(deleteButton);

                    row.appendChild(deleteCell);
                }
            } else {
                showError();
            }
        });
        req.send(queryString);
    }
};

//submits an add for a property-type. adds row to the table on the page
function addProperty() {
    var form = document.getElementById("addPropertyType");
    var name = form.elements.Name.value;

    if (name.trim() == "") {
        showError("Property-type cannot be blank");
    } else {

        var req = new XMLHttpRequest();
        var queryString = `/insertPropertyType?Name=${name}`

        req.open("GET", queryString, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        req.addEventListener('load', function () {
            $('#addForm').modal('hide');

            if (req.status >= 200 && req.status < 400) {

                //Response and id from server
                var response = JSON.parse(req.responseText);
                var id = response.inserted;

                if (id <= 0) {
                    var msg = response.msg && response.msg != "" ? response.msg : "An unexpected error has occurred.";
                    showError(msg)
                } else {
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
                    updateDataLink.setAttribute('href', '/updateProperty?id=' + id);

                    var updateButton = document.createElement('input');
                    updateButton.setAttribute('value', 'Update');
                    updateButton.setAttribute('type', 'button');
                    updateButton.className = "btn btn-sm btn-primary";

                    updateDataLink.appendChild(updateButton);

                    updateData.appendChild(updateDataLink);

                    row.appendChild(updateData);

                    //Adds Delete button to table
                    var deleteCell = document.createElement('td');
                    deleteCell.className = "actionCell";


                    var deleteButton = document.createElement('input');
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.setAttribute('name', 'delete');
                    deleteButton.setAttribute('value', 'Delete');
                    deleteButton.setAttribute('onClick', 'deleteProperty("propertyTypeTable",' + id + ')');
                    deleteButton.className = "btn btn-sm btn-secondary";

                    deleteCell.appendChild(deleteButton);
                    row.appendChild(deleteCell);

                }

            } else {
                showError();
            }
        });
        req.send(queryString);
    }
};

//submits an add for a state. adds row to the table on the page
function addState() {
    var form = document.getElementById("addState");
    var name = form.elements.Name.value;

    if (name.trim() == "") {
        showError("State name cannot be blank");

    } else {

        var req = new XMLHttpRequest();

        var queryString = `/insertState?Name=${name}`
        req.open("GET", queryString, true);

        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        req.addEventListener('load', function () {
            $('#addForm').modal('hide');

            if (req.status >= 200 && req.status < 400) {
                //Response and id from server
                var response = JSON.parse(req.responseText);
                var id = response.inserted;

                if (id <= 0) {
                    var msg = response.msg && response.msg != "" ? response.msg : "An unexpected error has occurred.";
                    showError(msg)
                } else {
                    //Get the lower table on Property-Type page
                    var table = document.getElementById("stateTable");

                    var row = table.insertRow(-1);
                    row.id = "row-" + id;

                    //Populates table based on user submitted values for each field in the form
                    var name = document.createElement('td');
                    name.textContent = form.elements.Name.value;
                    row.appendChild(name);

                    //Adds Update button to table
                    var updateData = document.createElement('td');
                    updateData.className = "actionCell";

                    var updateDataLink = document.createElement('a');
                    updateDataLink.setAttribute('href', '/updateState?id=' + id);

                    var updateButton = document.createElement('input');
                    updateButton.setAttribute('value', 'Update');
                    updateButton.setAttribute('type', 'button');
                    updateButton.className = "btn btn-sm btn-primary";

                    updateDataLink.appendChild(updateButton);

                    updateData.appendChild(updateDataLink);

                    row.appendChild(updateData);

                    //Adds Delete button to table
                    var deleteCell = document.createElement('td');
                    deleteCell.className = "actionCell";

                    var deleteButton = document.createElement('input');
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.setAttribute('name', 'delete');
                    deleteButton.setAttribute('value', 'Delete');
                    deleteButton.setAttribute('onClick', 'deleteState("stateTable",' + id + ')');
                    deleteButton.className = "btn btn-sm btn-secondary";

                    deleteCell.appendChild(deleteButton);
                    row.appendChild(deleteCell);
                }


            } else {
                showError();

            }
        });
        req.send(queryString);
    }
};

//submits an add for a zip code. adds row to the table on the page
function addZip() {
    var form = document.getElementById("addZip");
    var name = form.elements.Code.value;

    if (name.trim() == "") {
        showError("Zip-Code cannot be blank");

    } else if (name.trim().length > 5) {
        showError("Zip-Code cannot be longer than 5 characters");

    } else {


        var req = new XMLHttpRequest();
        var queryString = `/insertZip?Code=${name}`
        req.open("GET", queryString, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        req.addEventListener('load', function () {

            if (req.status >= 200 && req.status < 400) {
                $('#addForm').modal('hide');

                //Response and id from server
                var response = JSON.parse(req.responseText);
                var id = response.Code;

                if (id <= 0) {
                    var msg = response.msg && response.msg != "" ? response.msg : "An unexpected error has occurred.";
                    showError(msg)
                } else {
                    //Get the lower table on Property-Type page
                    var table = document.getElementById("zipTable");

                    var row = table.insertRow(-1);
                    row.id = "row-" + id;

                    //Populates table based on user submitted values for each field in the form
                    var name = document.createElement('td');
                    name.textContent = form.elements.Code.value;
                    row.appendChild(name);

                    //Adds Delete button to table
                    var deleteCell = document.createElement('td');
                    deleteCell.className = "actionCell";

                    var deleteButton = document.createElement('input');
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.setAttribute('name', 'delete');
                    deleteButton.setAttribute('value', 'Delete');
                    deleteButton.setAttribute('onClick', 'deleteZip("zipTable",' + id + ')');
                    deleteButton.className = "btn btn-sm btn-secondary";

                    deleteCell.appendChild(deleteButton);
                    row.appendChild(deleteCell);
                }


            } else {
                showError();
            }
        });
        req.send(queryString);
    }
};


////////////////////////////////////////////////////////////////////////
//UPDATES
////////////////////////////////////////////////////////////////////////
//submits form with updated City info
function updateCity(id) {
    var form = document.getElementById("updateCity");
    var name = form.elements.Name.value;
    var state = form.elements.State.value;

    if (name.trim() == "") {
        showError("City cannot be blank");
    } else {
        $.ajax({
            url: '/updateCity/' + id,
            type: 'PUT',
            data: $('#updateCity').serialize(),
            dataType: 'json',
            success: function (result) {
                if (result.success > 0) {
                    window.location.href = "/city";
                } else {
                    showError(result.msg);
                }
            },
            error: function (result) {
                showError();
            }
        })
    }
};


//submits a form with updated State
function updateState(id) {
    var form = document.getElementById("updateState");
    var name = form.elements.Name.value;

    if (name.trim() == "") {
        showError("State name cannot be blank");

    } else {

        $.ajax({
            url: '/updateState/' + id,
            type: 'PUT',
            data: $('#updateState').serialize(),
            dataType: 'json',
            success: function (result) {
                if (result.success > 0) {
                    window.location.href = "/state";
                } else {
                    showError(result.msg);
                }
            },
            error: function (result) {
                showError();
            }
        })
    }
};

//submits a form with updated feature
function updateFeature(id) {
    var form = document.getElementById("updateFeature");
    var name = form.elements.Name.value;

    if (name.trim() == "") {
        showError("Feature cannot be blank");
    } else {
        $.ajax({
            url: '/updateFeature/' + id,
            type: 'PUT',
            data: $('#updateFeature').serialize(),
            dataType: 'json',
            success: function (result) {
                if (result.success > 0) {
                    window.location.href = "/feature";
                } else {
                    showError(result.msg);
                }
            },
            error: function (result) {
                showError();
            }
        })
    }
};

//submits a form with updated property-type
function updateProperty(id) {
    var form = document.getElementById("updateProperty");
    var name = form.elements.Name.value;

    if (name.trim() == "") {
        showError("Property-type cannot be blank");
    } else {
        $.ajax({
            url: '/updateProperty/' + id,
            type: 'PUT',
            data: $('#updateProperty').serialize(),
            dataType: 'json',
            success: function (result) {
                if (result.success > 0) {
                    window.location.href = "/property";
                } else {
                    console.log(result);
                    showError(result.msg);
                }
            },
            error: function (result) {
                showError();
            }
        })
    }
};

//submits a form with updated listing
function updateListing(id) {
    var form = document.getElementById("updateListing");
    var address = form.elements.Address.value;
    var city = form.elements.City.value;
    var zip = form.elements.ZipCode.value;
    var property = form.elements.PropertyType.value;
    var byOwner = form.elements.ByOwner.value;
    var dateListed = form.elements.DateListed.value;
    var listPrice = form.elements.ListPrice.value;
    var dateSold = form.elements.DateSold.value;
    var sellPrice = form.elements.SellPrice.value;

    if (address.trim() == "") {
        showError("Address cannot be blank");
    } else if (city < 1) {
        showError("Please select a city");
    } else if (zip < 1) {
        showError("Please select a zip code");
    } else if (property < 1) {
        showError("Please select a property-type");
    } else if (listPrice <= 0) {
        showError("Please enter a listing price");
    } else if (dateListed == "" || !dateListed) {
        showError("Please enter a date listed");

    } else if ((dateSold == "" || !dateSold) && sellPrice > 0) {
        showError("Please enter a date sold");
    } else if (sellPrice <= 0 && dateSold != "") {
        showError("Please enter a sell price");

    } else {
        $.ajax({
            url: '/updateListing/' + id,
            type: 'PUT',
            data: $('#updateListing').serialize(),
            dataType: 'json',
            success: function (result) {
                if (result.success > 0) {
                    window.location.href = "/listing";
                } else {
                    showError(result.msg);
                }
            },
            error: function (result) {
                showError();
            }
        })
    }
};

//submits a form with updated listing-feature
function updateListingFeature(id) {
    var form = document.getElementById("addListingFeature");
    var listing = form.elements.Listing.value;
    var feature = form.elements.Feature.value;

    if (feature < 1) {
        showError("Please select a feature");

    } else {
        $.ajax({
            url: '/updateListingFeature/' + id,
            type: 'PUT',
            data: $('#updateListingFeature').serialize(),
            dataType: 'json',
            success: function (result) {
                if (result.success > 0) {
                    window.location.href = "/listingFeature";
                } else {
                    showError(result.msg);
                }
            },
            error: function (result) {
                showError();
            }
        })
    }
};


////////////////////////////////////////////////////////////////////////
//DELETE
////////////////////////////////////////////////////////////////////////

//submits a delete request for the city with the passed id.
function deleteCity(tableId, id) {
    $.ajax({
        url: '/deleteCity/' + id,
        type: 'DELETE',
        success: function (result) {
            $("#" + tableId).find("#row-" + id).remove();
        },
        error: function (result) {
            showError();
        }
    })
};

//submits a delete request for the feature with the passed id.
function deleteFeature(tableId, id) {
    $.ajax({
        url: '/deleteFeature/' + id,
        type: 'DELETE',
        success: function (result) {
            $("#" + tableId).find("#row-" + id).remove();
        },
        error: function (result) {
            showError();
        }
    })
};

//submits a delete request for the listing with the passed id.
function deleteListing(tableId, id) {
    $.ajax({
        url: '/deleteListing/' + id,
        type: 'DELETE',
        success: function (result) {
            $("#" + tableId).find("#row-" + id).remove();
        },
        error: function (result) {
            showError();
        }
    })
};

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
        },
        error: function (result) {
            showError();
        }
    })
};

//submits a delete request for the property-type with the passed id.
function deleteProperty(tableId, id) {
    $.ajax({
        url: '/deleteProperty/' + id,
        type: 'DELETE',
        success: function (result) {
            $("#" + tableId).find("#row-" + id).remove();
        },
        error: function (result) {
            showError();
        }
    })
};

//submits a delete request for the state with the passed id.
function deleteState(tableId, id) {
    $.ajax({
        url: '/deleteState/' + id,
        type: 'DELETE',
        success: function (result) {
            $("#" + tableId).find("#row-" + id).remove();
        },
        error: function (result) {
            showError();
        }
    })
};

//submits a delete request for the zip code with the passed code.
function deleteZip(tableId, id) {
    $.ajax({
        url: '/deleteZip/' + id,
        type: 'DELETE',
        success: function (result) {
            $("#" + tableId).find("#row-" + id).remove();
        },
        error: function (result) {
            showError();
        }
    })
};



$(function () {

    $("#addStateButton").click(function () {
        event.preventDefault();
        addState();
    });

    $("#addCityButton").click(function () {
        event.preventDefault();
        addCity();
    });

    $("#addZipButton").click(function () {
        event.preventDefault();
        addZip();
    });


    $("#addFeatureButton").click(function () {
        event.preventDefault();
        addFeature();
    });

    $("#addListingButton").click(function () {
        event.preventDefault();
        addListing();
    });

    $("#addListingFeatureButton").click(function () {
        event.preventDefault();
        addListingFeature();
    });

    $("#addPropertyTypeButton").click(function () {
        event.preventDefault();
        addProperty();
    });

    $("#listingTable").DataTable({ "pageLength": 50, "lengthChange": false });
});