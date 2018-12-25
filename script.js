var defaultSettings = '&encoding=json&pretty=1&action=search_listings';
var chekedValue = 'buy';
var sort = 'relevancy';
var priseMin;
var priseMax;
var roomsMin;
var roomsMax;
var bedroomsMin;
var bedroomsMax;
var bathroomsMin;
var bathroomsMax;
var pageNum = '1';
var pageNam = '1';
var pc = document.getElementById("result-serch");
var numPgn = document.getElementById('pagination');
var hrefAPI;
var loadJSONP = function (url, callback) {
    var ref = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');
    script.src = url + (url.indexOf('?') + 1 ? '&' : '?') + 'callback=' + callback;
    ref.parentNode.insertBefore(script, ref);
    script.onload = function () {
        this.remove();
    };

};
var elementsGood;
var favorites = document.getElementById('favorites');
var y = localStorage.getItem('kolElem');
var x = 0;
for (var b = 1; b <= y; b++) {
    favorites.innerHTML += localStorage.getItem(b);
}

function saveLokal() {
    x++;
    y = x;
    localStorage.setItem(x, elementsGood);
    localStorage.setItem('kolElem', y);
    elementsGood;
    favorites.innerHTML += localStorage.getItem(y);
}

var logAPI = function (data) {
    var newObject = data;
    console.log(newObject);
    var pc = document.getElementById("result-serch");
    var j = newObject.response.listings;
    var totalPages = newObject.response.total_pages;
    var numPgn = document.getElementById('pagination');
    var pagesOf = document.getElementById('pages-of');
    pagesOf.innerHTML = ('Page: ' + '' + pageNam + ' of: ' + totalPages);
    for (var i = 1; i < totalPages + 1; i++) {
        numPgn.innerHTML += ('<p>' + i + '</p>');
    }

    var pgnNumber = document.querySelectorAll('#pagination p');
    var indexPage;
    for (var g = 0; g < pgnNumber.length; g++) {

        pgnNumber[g].onclick = function (e) {
            indexPage = Array.prototype.indexOf.call(pgnNumber, this);
            pageNum = ('&page=' + e.toElement.innerHTML);
            pageNam = e.toElement.innerHTML;
            pc.innerHTML = "";
            numPgn.innerHTML = "";
            loadJSONP(hrefAPI + pageNum + hrefApiSort, 'logAPI');


        }
    }
    for (var i = 0; i < j.length; i++) {
        var title = newObject.response.listings[i].title;
        var imgSrc = newObject.response.listings[i].img_url;
        var listName = newObject.response.listings[i].lister_name;
        var price = newObject.response.listings[i].price_formatted;
        var priceCurrency = newObject.response.listings[i].price_currency;
        var keywords = newObject.response.listings[i].keywords;
        var discription = newObject.response.listings[i].summary;
        var latitude = newObject.response.listings[i].latitude;
        var longitude = newObject.response.listings[i].longitude;
        var locationAccuracy = newObject.response.listings[i].location_accuracy
        var size = newObject.response.listings[i].size;
        var sizeUnit = newObject.response.listings[i].size_unit;
        var propertyType = newObject.response.listings[i].property_type;
        var original = newObject.response.listings[i].lister_url;
        propertyType = ('Property type:' + propertyType);
        var square = ('Floor area:' + size + sizeUnit);
        var bathroomNumber = newObject.response.listings[i].bathroom_number;
        bathroomNumber = ('Bathroom number:' + bathroomNumber);
        var bedroomNumber = newObject.response.listings[i].bedroom_number;
        bedroomNumber = ('Bedroom number:' + bedroomNumber);
        var roomNumber = newObject.response.listings[i].room_number;
        roomNumber = ('Room number:' + roomNumber);
        var thumbHeight = newObject.response.listings[i].thumb_height;
        thumbHeight = ('Thumb height' + thumbHeight);
        var thumbWidth = newObject.response.listings[i].thumb_width;
        thumbWidth = ('Thumb width' + thumbWidth);
        pc.innerHTML += ('<div class="card  mb-4 mx-auto card-serch object-serch">' +
            '<div class="preview">' +
            '<div class="card-header bg-dark text-white card-price">' +
            price +
            '</div>' +
            '<img class="card-img" src =' + imgSrc + '>' +
            '<div class="card-body">' +
            '<h3 class="card-title">' + title + '</h3>' +
            '<p>' + discription + '</p>' +
            '</div>' +
            '<a href="' + original + '" class="btn btn-dark col-sm-12 col-lg-5 mr-2 my-2">' + 'Source link</a>' +
            '<a class="btn btn-dark click-object col-sm-12 col-lg-5 my-2">' + 'More</a>' + '</div>' +
            '<div class="details row">' +
            '<div class="col-sm-12 col-lg-6">' +
            '<div class="img col-12">' + '<img class="card-img" src =' + imgSrc + '>' + '</div>' +
            '<div class="col-11 mx-auto bg-dark text-center"><h2 class="prise">' + price + '</h2></div>' +
            '</div> ' +
            '<div class="col-sm-12 col-lg-6">' +
            '<div class="col-12">' + '<h2 class="card-title">' + title + '</h2>' + '</div>' +
            '<div class="col-12">' + '<p>' + discription + '</p>' + '</div>' +
            '<div class="col-12">' + '<p>' + propertyType + '</p>' + '</div>' +
            '<div class="col-12">' + '<p>' + bathroomNumber + '</p>' + '</div>' +
            '<div class="col-12">' + '<p>' + bedroomNumber + '</p>' + '</div>' +
            '<div class="col-12">' + '<p>' + roomNumber + '</p>' + '</div>' +
            '<div class="row">' +
            '<div class="col-6">' + '<a href="' + original + '" class="btn btn-dark col-12">' + 'Source link</a>' + '</div>' +
            '<div class="col-6">' + '<a class="btn btn-dark col-12" onclick="saveLokal()">' + 'Add to favorites</a>' + '</div>' +
            '</div>' + '</div>' + '</div>' +
            '<div class="local-storage card text-white bg-warning mb-3">' +
            '<img class="card-img" src =' + imgSrc + '>' +
            '<p>' + discription + '</p>' +
            '<div class="card-header text-white card-price">' +
            price + '</div>' + '<div class="row mx-1">' +
            '<a href="' + original + '" class="btn btn-dark col-sm-12 col-lg-5 my-2 mx-1">' + 'Source link</a>' +
            '<a class="btn btn-dark col-sm-12 col-lg-5 my-2 mx-1 object-lokal">' + 'Remove</a>' +
            '</div>' + '</div>' +
            '<div class="googl-Coordinats">' +
            '<p class="latitude">' + latitude + '</p>' +
            '<p class="longitude">' + longitude + '</p>' +
            '<p class="locationAccuracy">' + locationAccuracy + '</p>' +
            '</div>'
        );
    }

    var w;
    var h;
    var myLatlng;
    var elements = document.getElementsByClassName("click-object");
    for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function (event) {
            var index = Array.prototype.indexOf.call(elements, this);
            var elementsDeteils = document.getElementById('elements-deteils');
            elementsDeteils.style.display = "block";
            elementsGood = event.path[2].innerHTML;
            var contentModal = document.getElementById('content-modal');
            contentModal.innerHTML = elementsGood;
            var latitude = document.getElementsByClassName('latitude')[index];
            var longitude = document.getElementsByClassName('longitude')[index];
            w = latitude.innerHTML;
            h = longitude.innerHTML;
            myLatlng = new google.maps.LatLng(w, h);
            var myOptions = {
                zoom: 14,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById("map"), myOptions);
        };
    }
}

var hrefApiSort = "";
function sortBtn() {
    pc.innerHTML = "";
    numPgn.innerHTML = ("");
    sort = document.getElementById('sort').value;
    priseMin = document.getElementById('prise-min').value;
    priseMax = document.getElementById('prise-max').value;
    roomsMin = document.getElementById('rooms-min').value;
    roomsMin = '&room_min=' + roomsMin;
    roomsMax = document.getElementById('rooms-max').value;
    roomsMax = '&room_max=' + roomsMax;
    bedroomsMin = document.getElementById('bedrooms-min').value;
    bedroomsMax = document.getElementById('bedrooms-max').value;
    bathroomsMin = document.getElementById('bathrooms-min').value;
    bathroomsMin = '&bathroom_min=' + bathroomsMin;
    bathroomsMax = document.getElementById('bathrooms-max').value;
    bathroomsMax = '&bathroom_max=' + bathroomsMax;
    loadJSONP(hrefAPI + '&sort=' + sort + '&price_min=' + priseMin + '&price_max=' + priseMax + roomsMin + roomsMax + '&bedroom_min=' + bedroomsMin + '&bedroom_max=' + bedroomsMax + bathroomsMin + bathroomsMax, 'logAPI');
    hrefApiSort = ('&sort=' + sort + '&price_min=' + priseMin + '&price_max=' + priseMax + roomsMin + roomsMax + '&bedroom_min=' + bedroomsMin + '&bedroom_max=' + bedroomsMax + bathroomsMin + bathroomsMax);
}

function serchBtn() {
    hrefApiSort = "";
    pageNum = 1;
    var chekedAtributs = document.querySelectorAll('.form-serch input');
    for (var k = 0; k < chekedAtributs.length; k++) {
        if (chekedAtributs[k].checked == true) {
            chekedValue = chekedAtributs[k].value;

        }
    }
    pc.innerHTML = "";
    numPgn.innerHTML = ("");
    var country = document.getElementById('country').value;
    var cityValue = document.getElementById('serch').value;
    city = '&place_name=' + cityValue;
    if (cityValue == "") {
        alert("Select a country and enter a city");

    } else {
// Run request
        loadJSONP("https://api.nestoria." + country + defaultSettings + city + '&listing_type=' + chekedValue + '&page=' + pageNum, 'logAPI');
        hrefAPI = "https://api.nestoria." + country + defaultSettings + city + '&listing_type=' + chekedValue;
    }
}


var close = document.getElementsByClassName("close")[0];
close.onclick = function () {
    elementsDeteils.style.display = "none";
}

var elementsDeteils = document.getElementById("elements-deteils");
window.onclick = function (event) {
    if (event.target == elementsDeteils) {
        elementsDeteils.style.display = "none";
    }
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

var clikBtnLokal = document.querySelectorAll('.object-lokal');
var remuvObject = document.querySelectorAll('#favorites .local-storage')

for (var i = 0; i < clikBtnLokal.length; i++) {
    clikBtnLokal[i].onclick = function (event) {
        clikBtnLokal = document.getElementsByClassName('object-lokal');
        var index = Array.prototype.indexOf.call(clikBtnLokal, this);
        localStorage.removeItem(index + 1);
        remuvObject[index].style.display = 'none';
    };
}




