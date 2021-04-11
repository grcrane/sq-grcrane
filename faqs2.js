/*-------------------------------------------------------------*/
/* Frequently Asked Questions, FAQS2                           */
/*    04/11/2021 - initial                                     */
/*-------------------------------------------------------------*/

function do_faqs2(museums, file_id = null, sheet = null) {

    var listCol = 0;
    var catCol = 1;
    var hideCol = 2;
    var questionCol = 3;
    var answerCol = 4;
    var tabLinks = ''; 
    var out = '';
    var activeli = 0;
    var tabs = []; 

    if (!file_id) {
      file_id = '1f3G-ECzjt8p-czZNPyUQGXG8NND016Nue5QypQTf6PQ';
    }
    if (!sheet) {
      var sheet = 'FAQS';
    }

    if ($(window).width() < 960) {
      activeli = 'none';
    }
    // define which museums to display
    tabs.push(['Unity','Unity in Learning']);
    tabs.push(['aahom','Ann Arbor Hands-On']);
    tabs.push(['Leslie','Leslie Center']);
    tabs.push(['Yankee','Yankee Air Museum']);
    tabs.push(['Experience','Experience Center']);
    tabs.push(['Challenger','Challenger Cetner']);

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
    if(tabs.length == 0) {
        $('.faq_container').append('<br>Ooops.. No lists name provided</br>');
        return;
    }

    // Loop for each tab 
    var faqs = faqlist.table.rows;
    tabs.forEach(function(item, key) {
     
      var val = item[0];
      // camelcase css tag for background
      var background = 'color' + item[0].charAt(0).toUpperCase() + item[0].slice(1).toLowerCase();
      if (item.length>1) { val = item[1];}
      tabLinks = tabLinks + '<li class="' + background + '"><a href="#tabs-' + +(key+1) + '">' + val + '</a></li>\n'; 
      var lookfor = item[0].toLowerCase();
      
      // Loop for the questions/answers in each tab 
      out = out + '<div id="tabs-' + +(key+1) + '">\n<div class="accordian">\n'; 
      faqs.forEach(function(item2, key2) {
        if (item2.c[listCol] != null && item2.c[listCol].v.toLowerCase() == lookfor) {
          out = out + '<h3 class="' + background + '">' + item2.c[questionCol].v + '</h3><div>\n';
          out = out + '<p>' + item2.c[answerCol].v + '</p></div>\n';
        }
      });
      out = out + '</div>\n</div>\n';

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