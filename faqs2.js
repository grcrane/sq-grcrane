/*-------------------------------------------------------------*/
/* Frequently Asked Questions, FAQS2                           */
/*    04/11/2021 - initial                                     */
/*-------------------------------------------------------------*/

function do_faqs2(museums, collapsed = true, file_id = null, sheet = null) {

    var listCol = 0;
    var catCol = 1;
    var hideCol = 2;
    var questionCol = 3;
    var answerCol = 4;
    var tabLinks = ''; 
    var out = '';
    var activeli = 0;
    var tabs = []; 
    var mtabs = [
      'unity',
      'aahom',
      'leslie',
      'yankee',
      'experience',
      'challenger'];
    var mtitles = [
      'Unity in Learning','Ann Arbor Hands-On',
      'Leslie Center','Yankee air Museum','Experience Center',
      'Challenger Center'];

    if (!file_id) {
      file_id = '1f3G-ECzjt8p-czZNPyUQGXG8NND016Nue5QypQTf6PQ';
    }
    if (!sheet) {
      var sheet = 'FAQS';
    }

    if (collapsed == true) {activeli = 'none';}

    if ($(window).width() < 960) {
      activeli = 'none';
    }
    if (!museums) {
      museums = mtabs.join();
    }
    var theMuseums = museums.split(",");
    theMuseums.forEach(function(item) {
      console.log('museum=' + item.toLowerCase());
      var i = mtabs.indexOf(item.toLowerCase());
      console.log('index=' + i + ' title=' + mtitles[i]); 
    });

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&headers=1&tq=' + 
    escape("SELECT A, B, C, D, E WHERE C != 'Yes'");
    var spreadSheetLink = 'https://docs.google.com/spreadsheets/d/' + file_id + '/edit';
    var faqlist = get_spreadsheet(url);
    // Test for some error conditions 
    if(faqlist.length == 0) {
        $('.faq_container').append('<br>Ooops.. unable to read spreadsheet</br>');
        return;
    }
    if(theMuseums.length == 0) {
        $('.faq_container').append('<br>Ooops.. No lists name provided</br>');
        return;
    }

    // Loop for each tab 
    var faqs = faqlist.table.rows;
    theMuseums.forEach(function(item, key) {
      var i = mtabs.indexOf(item.toLowerCase());
      if (i) {
        var val = item;
        // camelcase css tag for background
        var background = 'color' + item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
        if (item.length>1) { val = mtitles[i];}
        tabLinks = tabLinks + '<li class="' + background + '"><a href="#tabs-' + +(key+1) + '">' + val + '</a></li>\n'; 
        var lookfor = item.toLowerCase();
        
        // Loop for the questions/answers in each tab 
        out = out + '<div id="tabs-' + +(key+1) + '">\n<div class="accordian">\n'; 
        faqs.forEach(function(item2, key2) {
          if (item2.c[listCol] != null && item2.c[listCol].v.toLowerCase() == lookfor) {
            out = out + '<h3 class="' + background + '">' + item2.c[questionCol].v + '</h3><div>\n';
            out = out + '<p>' + item2.c[answerCol].v + '</p></div>\n';
          }
        });
        out = out + '</div>\n</div>\n';
      }

      });
      
      out = '<div id="tabs"><ul>' + tabLinks + '</ul>' + out + '</div></div>\n';

      $(out).appendTo('.faq_container');

      // Initialize the accordian styles
      $( ".accordian" ).accordion({
        collapsible: true, active : activeli,
        heightStyle: "content"
      });

      // Display the faqs
      $( "#tabs" ).tabs();

}