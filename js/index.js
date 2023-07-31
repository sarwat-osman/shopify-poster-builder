
/**
 * 
 * App Name             : Shopify Poster Builder
 * Author               : Sarwat Osman
 * Technologies used    : Tailwind CSS, Vanilla JS
 * Date                 : July 30, 2023
 * 
 */


// -----------------------------------     POSTER SCRIPTS     -----------------------------------

const maxWidth = 800;
const maxHeight = 400;

// Get image width & height using fileReader() API.
function readImageFile(file) {
    var reader = new FileReader();    

    reader.onload = function (e) {
      var img = new Image();      
      img.src = e.target.result;

      img.onload = function () {
        var imgWidth = this.width;
        var imgHeight = this.height;
        var imgType = file.type;

        if( !imgType.match("image/jpeg|image/png|image/svg|image/gif") ) {
            alert("Selected Poster Image type is Unsupported! Please try uploading SVG/JPG/GIF/PNG.");
            return false;
        }

        if( imgWidth > maxWidth || imgHeight > maxHeight ) {
            alert("Uploaded Poster is too Big! Please choose one with maximum dimensions of 800px x 400px.");
            return false;
        }
      }
    };
    reader.readAsDataURL(file);

    return file;
}

//Check for Type & Size Validity
function validatePoster() {

    var posterImgFile = document.getElementById('poster-image');

    //Check if file present
    if (posterImgFile.files.length > 0) {      

    //   for (var i = 0; i <= posterImgFile.files.length - 1; i++) {
        // var fileName, fileExtension, fileSize, fileType, dateModified;

        // Get file name and extension
        // fileName = posterImgFile.files.item(i).name;
        // fileExtension = fileName.replace(/^.*\./, '');

        // Get image info using fileReader()
    //     readImageFile(posterImgFile.files.item(i));
    //   }      

        var imgFile = readImageFile(posterImgFile.files.item(0));        
        return imgFile;
    }
    else {
        alert("No file is found! Please try again.");
        return false;
    }
}

//Load Poster
function displayPoster(file) {
    var output = document.getElementById('poster-display');
    output.src = URL.createObjectURL(file);
    output.width = 500;
    output.height = 300;
    output.onload = function() {
      URL.revokeObjectURL(output.src);
    }
}

//Show preview of Poster
function previewPoster() {
    //Check for Type & Size Validity
    var posterFile = validatePoster();
    if(!posterFile) {
        return false;
    }
    else {
        //Load Image
        displayPoster(posterFile);
    }
}

// Download Poster

function downloadPoster() {
    var canvas = document.createElement('canvas');
    canvas.innerHTML = document.getElementById('whole-poster').innerHTML;

    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 300;    

    if(document.getElementById('heading-display').value) {
        ctx.fillStyle = 'black';
        ctx.font = '95px Inter';
        ctx.fillText(document.getElementById('heading-display').value, 250, 700);
    }

    if(document.getElementById('poster-display').src) {
        ctx.drawImage(document.getElementById('poster-display'), 124, 33, 323, 42, 246, 22, 186, 106);
    }

    if(document.getElementById('description-display').value) {
        ctx.fillStyle = 'black';
        ctx.font = '50px Inter';
        ctx.fillText(document.getElementById('description-display').value, 85, 700);
    }    

    var dlLink = document.createElement('a');
    dlLink.href = canvas.toDataURL('image/png', 1.0); 
    dlLink.download = 'poster.png';               
    dlLink.click();
}



// ----------------------------------- HEADING SCRIPTS -----------------------------------

function previewHeading() {
    var title = document.getElementById('heading');

    document.getElementById('heading-display').innerHTML = title.value;
}


function changeHeadingStyles(styleBtnId) {

    var title = document.getElementById('heading-display');

    if( styleBtnId.startsWith("align") ) {
        title.style.textAlign = styleBtnId.split("-")[1];
    } else {
        title.style.color = styleBtnId.split("-")[1];
    }
}



// --------------------------------- DESCRIPTION SCRIPTS ---------------------------------

function previewDescription() {
    var description = document.getElementById('description').value;
    var description = description.replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');

    document.getElementById('description-display').innerHTML = description;
}



// ----------------------------------- SECTION SCRIPTS -----------------------------------

function createHeadingSection() {

    var headingSecHtmlString = 
        '<fieldset id="section-heading" class="invisible relative border border-solid border-gray-300 p-3 m-3 rounded">' +
            '<legend class="text-sm font-medium bg-gray-200 rounded-full mr-2 px-4 py-1">' +
                'Heading' +
            '</legend>' +

            '<button id="close-heading" ' +
                'onclick=deleteSection(this.id) ' +
                'class="absolute right-2 -top-7 flex justify-center items-center text-xl bg-white cursor-pointer alert-del text-red-600 border border-solid border-gray-200 rounded-full w-6 h-6"' +
            '>' +
                '&times;' +
            '</button>' +

            '<div class="mb-2">' +
                '<input type="text"' + 
                    'id="heading" ' +
                    'class="bg-white border border-gray-100 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" ' + 
                    'placeholder="Dashboard" ' +
                    'required ' +
                    'oninput=previewHeading()' +   
                '>' +
            '</div>' +

            '<div class="flex justify-between">' +        
                '<div class="inline-flex rounded-md shadow-sm" role="group">' +
                    '<button type="button" id="align-left" onclick=changeHeadingStyles(this.id) class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">' +
                        '<svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">' +
                            '<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>' +
                        '</svg>' +
                        'Left' +
                    '</button>' +
                    '<button type="button" id="align-center" onclick=changeHeadingStyles(this.id) class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">' +
                        '<svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">' +
                            '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>' +
                        '</svg>' +
                        'Center' +
                    '</button>' +
                    '<button type="button" id="align-right" onclick=changeHeadingStyles(this.id) class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">' +
                        '<svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">' +
                            '<path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>' +
                            '<path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>' +
                        '</svg>' +
                        'Right' +
                    '</button>' +
                '</div>' +

                '<div class="inline-flex rounded-md shadow-sm" role="group">' +
                    '<button type="button" id="color-blue" onclick=changeHeadingStyles(this.id) class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">' +
                        '<svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">' +
                            '<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>' +
                        '</svg>' +
                        'Blue' + 
                    '</button>' +
                    '<button type="button" id="color-black" onclick=changeHeadingStyles(this.id) class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">' +
                        '<svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">' +
                            '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>' +
                        '</svg>' +
                        'Black' +
                    '</button>' +
                    '<button type="button" id="color-green" onclick=changeHeadingStyles(this.id) class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">' +
                        '<svg class="w-3 h-3 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">' +
                            '<path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>' +
                            '<path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>' +
                        '</svg>' +
                        'Green' +
                    '</button>' +
                '</div>' +
            '</div>' +

        '</fieldset>';

    return headingSecHtmlString;
}

function createPosterSection() {

    var posterSecHtmlString = 
        '<fieldset id="section-poster" for="cover-photo" class="invisible relative border border-solid border-gray-300 p-3 m-3 rounded">' +
            '<legend class="text-sm font-medium bg-gray-200 rounded-full mr-2 px-4 py-1">' +
                'Poster Image' +
            '</legend>' +

            '<button id="close-poster" ' +
                'onclick=deleteSection(this.id) ' +
                'class="absolute right-2 -top-7 flex justify-center items-center text-xl bg-white cursor-pointer alert-del text-red-600 border border-solid border-gray-200 rounded-full w-6 h-6"' +
            '>' +
                '&times;' +
            '</button>' +
  
    
            '<div class="flex items-center justify-center w-full">' +
                '<label for="poster-image" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">' +
                    '<div class="flex flex-col items-center justify-center pt-2 pb-2">' +
                        '<svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">' +
                            '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>' +
                        '</svg>' +
                        '<p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>' +
                        '<p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>' +
                    '</div>' +
                    '<input id="poster-image"' + 
                        'type="file" ' + 
                        'class="hidden" ' + 
                        'accept="image/png, image/gif, image/jpg, image/svg" ' + 
                        'onchange="previewPoster()" ' +
                    '/>' +
                '</label>' +
            '</div>' +
        '</fieldset>';

    return posterSecHtmlString;
}

function createDescriptionSection() {

    var descriptionSecHtmlString = 
        '<fieldset id="section-description" class="invisible relative border border-solid border-gray-300 p-3 m-3 rounded">' +
            '<legend class="text-sm font-medium bg-gray-200 rounded-full mr-2 px-4 py-1">' +
                'Description' +
            '</legend>' +

            '<button id="close-description" ' +
                'onclick=deleteSection(this.id) ' +
                'class="absolute right-2 -top-7 flex justify-center items-center text-xl bg-white cursor-pointer alert-del text-red-600 border border-solid border-gray-200 rounded-full w-6 h-6" ' +
            '>' +
                '&times;' +
            '</button>' +
        
            '<textarea id="description" ' + 
                'rows="4" ' + 
                'class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" ' + 
                'placeholder="Write your thoughts here..." ' +
                'oninput=previewDescription()' +
            '>' +
            '</textarea>' +

        '</fieldset>';

    return descriptionSecHtmlString;
}

function displaySection(sectionBtn) {    

    var sectionName = sectionBtn.split("-")[1];

    var openSectionBtnELement = document.getElementById(sectionBtn); 
    if( openSectionBtnELement.classList.contains('block') ) {
        openSectionBtnELement.classList.replace('block', 'hidden');
    } else {
        openSectionBtnELement.classList.add('hidden');
    }

    var sectionElement = document.getElementById('section-' + sectionName);
    if( sectionElement.classList.contains('hidden') ) {
        sectionElement.classList.replace('hidden', 'block');
    } else {
        sectionElement.classList.add('block');
    }

    // var preElement = document.getElementById('input-legend');
    // var endElement = document.getElementById('items');

    // if(section === "heading") {
    //     document.getElementById('open-heading').style.display = "none";
    //     preElement.insertAdjacentHTML('afterend', createHeadingSection());
    // } else if(section === "description") {
    //     document.getElementById('open-description').style.display = "none";
    //     endElement.insertAdjacentElement('beforebegin', createDescriptionSection());
    // } else {
    //     document.getElementById('open-poster').style.display = "none";

    //     if (document.getElementById('section-heading') !== null) {
    //         var headingSection = document.getElementById('section-heading');
    //         headingSection.insertAdjacentElement('afterend', createPosterSection());
    //     } else {
    //         preElement.insertAdjacentHTML('afterend', createPosterSection());
    //     }
    // }
}

function deleteSection(sectionBtnId) {
    var sectionName = sectionBtnId.split("-")[1];
    var section = document.getElementById('section-' + sectionName);
    section.classList.add('hidden');
    document.getElementById('open-' + sectionName).classList.replace('hidden', 'block');

    if(sectionName === "poster") {
        document.getElementById(sectionName + "-display").src="";
    } else {
        document.getElementById(sectionName + "-display").innerHTML="";
        document.getElementById(sectionName).value="";
    }
}


// on document ready 
// var alert_del = document.querySelectorAll('.alert-del');
// alert_del.forEach((x) =>
//     x.addEventListener('click', function () {
//         x.parentElement.classList.add('hidden');
//     })
// );
