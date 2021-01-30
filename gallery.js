/* ------------------------------------------------------------------- */
/* Slideshow gallery                                                   */
/* ------------------------------------------------------------------- */


function doGalleryShow() {

    /* Don't do the fancy gallery if we are in IE 11 or earlier */
    /*
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE '); // IE 10 and older
    var trident = ua.indexOf('Trident/'); // IE 11
    if (msie > 0 || trident > 0) {
        var gallery = $('#page  article:first-child section.gallery-section').first().find('figure');
        gallery.closest('section').css('display', 'none'); 
        return;
    }
    */
    // get some selectors and data 
    var background = $('#page article:first-child section:first-child div.section-background');
    var gallery = $('#page  article:first-child section.gallery-section').first().find('figure');

    // If no gallery found so abort
    if (gallery.length == 0) {
        return false;
    } 

    // Hide the initial template, not needed.
    background.find('img').css('display','none');

    // https://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
    // See if we are editing the SquareSpace page, if so hide the gallery section
    var isEditor = window.frameElement ? true : false;
    if (isEditor == false) {
       gallery.closest('section').css('display', 'none'); 
    }

    // Loop through each figure and add to the list of slides 
    gallery.each(function() {

        var imgtemp = $(this).find('img');
        var imgcap = $(this).find('figcaption p.gallery-caption-content').text();
        var caplink = $(this).find('a').first().attr('href');
        if (caplink && imgcap) {
            imgcap = '<a href="' + caplink + '">' + imgcap + '</a>';
        }
        if (imgcap) { imgcap = '<div class="slideCaption">' + imgcap + '</div>';}
        var imgpos = imgtemp.attr('data-image-focal-point');

        imgpos = imgpos.split(",");
        var temp = "";
        for (var i = 0; i < imgpos.length; i++) {
            imgpos[i] = imgpos[i] * 100;
            temp = temp + " " + imgpos[i] + "%";
        }
        imgpos = temp.trim();
        var style = ' style="object-position:' + imgpos + ';';
        temp = '<div class="mySlides"><img src="' + imgtemp.attr('data-src') + '"' + style + '">' +
        imgcap + '</div>';
        background.append(temp);
    });

    // start the slideshow
    
    gallerycarousel();
}
  
  var myGalIndex = 0;
  function gallerycarousel() {
    var i;
    var background = $('#page article:first-child section:first-child div.section-background');
    var x = background.find('.mySlides');
    if (myGalIndex >= x.length) {
      myGalIndex = 0
    }
    x.removeClass("opaque");
    background.find('div.mySlides').eq(myGalIndex).addClass("opaque");
    myGalIndex++;
    setTimeout(gallerycarousel, 8000);
  }