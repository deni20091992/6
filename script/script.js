var defaultSettings = '&encoding=json&pretty=1&action=search_listings';
var chekedValue = 'buy';
var sort = 'relevancy';
var priseMin, priseMax, roomsMin, roomsMax, bedroomsMin, bedroomsMax, bathroomsMin, bathroomsMax;
var localList = [];
if (localStorage.getItem('key') != undefined) {
    localList = JSON.parse(localStorage.getItem('key'));
}
var keyDeleted = 0;
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

var logAPI = function (data) {
    var pc = document.getElementById("result-serch");
    var totalPages = data.response.total_pages;
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
    for (var i = 0; i < data.response.listings.length; i++) {
        var card = document.createElement('div');
        card.className = 'card  mb-4 mx-auto card-serch object-serch';
        card.id = i + 1;
        var preview = document.createElement('div');
        preview.className = 'preview';

        var prise = document.createElement('div');
        prise.className = 'ard-header bg-dark text-white card-price';
        prise.innerText = data.response.listings[i].price_formatted;
        card.appendChild(prise);

        var img = document.createElement('img');
        img.src = data.response.listings[i].img_url;
        img.className = 'card-img';
        card.appendChild(img);

        var card_info = document.createElement('div');
        card_info.className = 'card_info';

        var p = document.createElement('p');
        p.innerText = data.response.listings[i].title;
        card_info.appendChild(p);

        var original = document.createElement('a');
        original.className = 'btn btn-dark col-sm-12 col-lg-5 mr-2 my-2';
        original.href = data.response.listings[i].lister_url;
        original.innerText = 'Source link';
        card_info.appendChild(original);

        var btn = document.createElement('a');
        btn.className = 'btn btn-dark click-object col-sm-12 col-lg-5 my-2';
        btn.innerText = 'More';
        card_info.appendChild(btn);
        card.appendChild(card_info);
        document.getElementById('result-serch').appendChild(card);

        var indexElem = document.getElementsByClassName('click-object');
        for (var i = 0; i < indexElem.length; i++) {
            indexElem[i].onclick = function (event) {
                document.getElementById('content-modal').innerHTML = ('');
                var index = Array.prototype.indexOf.call(indexElem, this);
                var elementsDeteils = document.getElementById('elements-deteils');
                elementsDeteils.style.display = "block";

                var details = document.createElement('div');
                details.className = 'details row';

                var detailsImg = document.createElement('div');
                detailsImg.className = 'col-sm-12 col-lg-6';
                details.appendChild(detailsImg);

                var imgDetails = document.createElement('div');
                imgDetails.className = 'img col-12';
                detailsImg.appendChild(imgDetails);

                var img = document.createElement('img');
                img.src = data.response.listings[index + 1].img_url;
                img.className = 'card-img';
                imgDetails.appendChild(img);

                var priceDetails = document.createElement('div');
                priceDetails.className = 'col-11 mx-auto bg-dark text-center';
                detailsImg.appendChild(priceDetails);

                var h2 = document.createElement('h2');
                h2.className = 'prise';
                h2.innerText = data.response.listings[index + 1].price_formatted;
                priceDetails.appendChild(h2);

                var detailsInfo = document.createElement('div')
                detailsInfo.className = 'col-sm-12 col-lg-6';
                details.appendChild(detailsInfo);

                var p = document.createElement('h2');
                p.innerText = data.response.listings[index + 1].title;
                detailsInfo.appendChild(p);

                var discription = document.createElement('p');
                discription.className = 'col-12';
                discription.innerText = data.response.listings[index + 1].summary;
                detailsInfo.appendChild(discription);

                var propertyType = document.createElement('p');
                propertyType.className = 'col-12';
                propertyType.innerText = 'Property type: ' + data.response.listings[index + 1].property_type;
                detailsInfo.appendChild(propertyType);

                var bathroomNumber = document.createElement('p');
                bathroomNumber.className = 'col-12';
                bathroomNumber.innerText = 'Bathroom number: ' + data.response.listings[index + 1].bathroom_number;
                detailsInfo.appendChild(bathroomNumber);

                var bedroomNumber = document.createElement('p');
                bedroomNumber.className = 'col-12';
                bedroomNumber.innerText = 'Bedroom number: ' + data.response.listings[index + 1].bedroom_number;
                detailsInfo.appendChild(bedroomNumber);

                var roomNumber = document.createElement('p');
                roomNumber.className = 'col-12';
                roomNumber.innerText = 'Room number: ' + data.response.listings[index + 1].room_number;
                detailsInfo.appendChild(roomNumber);

                var original = document.createElement('a');
                original.className = 'btn btn-dark col-sm-12 col-lg-5 mr-2 my-2';
                original.href = data.response.listings[index + 1].lister_url;
                original.innerText = 'Source link';
                detailsInfo.appendChild(original);

                var btn = document.createElement('a');
                btn.className = 'btn btn-dark col-sm-12 col-lg-5 my-2 saveLokal';
                btn.innerText = 'Add to favorites';
                detailsInfo.appendChild(btn);
                var saveLokalBtn = document.getElementsByClassName('saveLokal');
                btn.addEventListener('click', function (event) {
                    btn.style.background = '#ffc107';
                    var favorits = document.createElement('div');
                    favorits.id = data.response.listings[index + 1].latitude;
                    favorits.className = 'local-storage card text-white bg-warning mx-2 mb-2 col-sm-5 col-lg-12';

                    var imgStorage = document.createElement('img');
                    imgStorage.src = data.response.listings[index + 1].img_url;
                    var imgSrc = data.response.listings[index + 1].img_url;
                    favorits.appendChild(imgStorage);

                    var discriptionStorage = document.createElement('p');
                    discriptionStorage.innerText = data.response.listings[index + 1].summary;
                    var disStorage = data.response.listings[index + 1].summary;
                    favorits.appendChild(discriptionStorage);

                    var priceStorage = document.createElement('div');
                    priceStorage.className = 'card-header text-white card-price';
                    priceStorage.innerText = data.response.listings[index + 1].price_formatted;
                    favorits.appendChild(priceStorage);
                    var p = data.response.listings[index + 1].price_formatted;
                    document.getElementById('favorites').appendChild(favorits);

                    var btnPanel = document.createElement('div');
                    btnPanel.className = 'row mx-1';
                    favorits.appendChild(btnPanel);

                    var original = document.createElement('a');
                    original.className = 'btn btn-dark col-sm-12 col-lg-5 my-2 mx-1';
                    original.href = data.response.listings[index + 1].lister_url;
                    var lister_url = data.response.listings[index + 1].lister_url;
                    original.innerText = 'Original';
                    btnPanel.appendChild(original);

                    var remove = document.createElement('a');
                    remove.className = 'btn btn-dark col-sm-12 col-lg-5 my-2 mx-1';
                    ;
                    remove.innerText = 'Remove';
                    btnPanel.appendChild(remove);

                    var key = data.response.listings[index + 1].latitude;

                    localList.push({
                        'id': key,
                        'img_src': imgSrc,
                        'summary': disStorage,
                        'prise': p,
                        'lister_url': lister_url
                    });
                    localStorage.setItem('key', JSON.stringify(localList));

                    remove.addEventListener('click', function (event) {
                        for (var i = 0; i < localList.length; i++) {
                            if (localList[i].id == event.path[2].id) {
                                keyDeleted = i;
                            }
                        }
                        localList.splice(keyDeleted, 1);
                        document.getElementsByClassName('local-storage')[keyDeleted].style.display = 'none';
                        localStorage.setItem("key", JSON.stringify(localList));
                    })
                })
                var w = data.response.listings[index + 1].latitude;
                var h = data.response.listings[index + 1].longitude;
                var myLatlng = new google.maps.LatLng(w, h);
                var myOptions = {
                    zoom: 14,
                    center: myLatlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                var map = new google.maps.Map(document.getElementById("map"), myOptions);
                document.getElementById('content-modal').appendChild(details);
            };
        }
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

for (var i = 0; i < localList.length; i++) {
    var favorits = document.createElement('div');
    favorits.id = localList[i].id;
    favorits.className = 'local-storage card text-white bg-warning mx-2 mb-2 col-sm-5 col-lg-12';

    var imgStorage = document.createElement('img');
    imgStorage.src = localList[i].img_src;
    favorits.appendChild(imgStorage);

    var discriptionStorage = document.createElement('p');
    discriptionStorage.innerText = localList[i].summary;
    favorits.appendChild(discriptionStorage);

    var priceStorage = document.createElement('div');
    priceStorage.className = 'card-header text-white card-price';
    priceStorage.innerText = localList[i].prise;
    favorits.appendChild(priceStorage);
    var btnPanel = document.createElement('div');
    btnPanel.className = 'row mx-1';
    favorits.appendChild(btnPanel);

    var original = document.createElement('a');
    original.className = 'btn btn-dark col-sm-12 col-lg-5 my-2 mx-1';
    original.href = localList[i].lister_url;
    original.innerText = 'Original';
    btnPanel.appendChild(original);
    var removeCard = document.createElement('a');
    removeCard.className = 'btn btn-dark col-sm-12 col-lg-5 my-2 mx-1 ';
    removeCard.innerText = 'Remove';
    btnPanel.appendChild(removeCard);
    document.getElementById('favorites').appendChild(favorits);

    removeCard.addEventListener('click', function (click) {
        for (var i = 0; i < localList.length; i++) {
            if (localList[i].id == click.path[2].id) {
                keyDeleted = i;
            }
        }
        localList.splice(keyDeleted, 1);
        document.getElementsByClassName('local-storage')[keyDeleted].style.display = 'none';
        localStorage.setItem("key", JSON.stringify(localList));
    })
}






