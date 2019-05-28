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

//submits form with updated City info
function updateCity(id) {
    $.ajax({
        url: '/updateCity/' + id,
        type: 'PUT',
        data: $('#updateCity').serialize(),
        success: function (result) {
            window.location.href = "/city";
        }
    })
};


//submits a form with updated State
function updateState(id) {
    $.ajax({
        url: '/updateState/' + id,
        type: 'PUT',
        data: $('#updateState').serialize(),
        success: function (result) {
            window.location.href = "/state";
        }, 
        error: function (result) {
            console.log(result);
        }
    })
};


//submits a form with updated Zip-Code
function updateZip(id) {
    $.ajax({
        url: '/updateZip/' + id,
        type: 'PUT',
        data: $('#updateZip').serialize(),
        success: function (result) {
            window.location.href = "/zip";
        }
    })
};

//submits a form with updated feature
function updateFeature(id) {
    $.ajax({
        url: '/updateFeature/' + id,
        type: 'PUT',
        data: $('#updateFeature').serialize(),
        success: function (result) {
            window.location.href = "/feature";
        },
        error: function (result) {
            console.log(result);
        }
    })
};

//submits a form with updated property-type
function updateProperty(id) {
    $.ajax({
        url: '/updateProperty/' + id,
        type: 'PUT',
        data: $('#updateProperty').serialize(),
        success: function (result) {
            window.location.href = "/property";
        },
        error: function (result) {
            console.log(result);
        }
    })
};

//submits a form with updated listing
function updateListing(id) {
    $.ajax({
        url: '/updateListing/' + id,
        type: 'PUT',
        data: $('#updateListing').serialize(),
        success: function (result) {
            window.location.href = "/listing";
        },
        error: function (result) {
            console.log(result);
        }
    })
};

//submits a form with updated listing-feature
function updateListingFeature(id) {
    $.ajax({
        url: '/updateListingFeature/' + id,
        type: 'PUT',
        data: $('#updateListingFeature').serialize(),
        success: function (result) {
            window.location.href = "/listingFeature";
        },
        error: function (result) {
            console.log(result);
        }
    })
};