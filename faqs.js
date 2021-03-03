/* ------------------------------------------------------------------- */
/* FAQs                                                                */
/* ------------------------------------------------------------------- */

function get_spreadsheet(theurl) {
  var result = "";
  $.ajax({
      url: theurl,
      dataType: 'text',
      async: false,
      success: function(data) {
          i = data.indexOf('(');
          j = data.lastIndexOf(')');
          data = data.substr(i + 1, j - 1 - i);
          var data = JSON.parse(data);
          result = data;
      }
  });
  return result;
}

function do_faqs(file_id, tabs) {

    var listCol = 0;
    var catCol = 1;
    var hideCol = 2;
    var questionCol = 3;
    var answerCol = 4;
    //var theList = lists.split(','); 

    // Get the spreadsheet data
    var sheet = 'FAQS';
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
    var tabLinks = ''; 
    var out = '';
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
    // use tabs if we have more than one 
    //if (tabs.length > 1) {
      out = '<div id="tabs"><ul>' + tabLinks + '</ul>' + out + '</div></div>\n';
    //}

    $(out).appendTo('.faq_container');
}