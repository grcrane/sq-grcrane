/* ------------------------------------------------------------------- */
/* Home page flip boxes                                                */
/* ------------------------------------------------------------------- */

var columnIndex = 1; 
function flip_carousel() {
  var i;
  var numColumns = $('.newcolumn').length;
  if (columnIndex > numColumns) { columnIndex = 1;}
  var background = $('.newcolumn:nth-child(' + +columnIndex + ') .flip-card-front');
  columnIndex++;
  var t = background.find('img.active').index();
  myIndex =  t + 1;
  var x = background.find('img');
  if (myIndex >= x.length) {
    myIndex = 0
  }
  x.removeClass("active");
  background.find('img').eq(myIndex).addClass("active");
  myIndex++;
  setTimeout(flip_carousel, 5000);
}

function resizeFlipBoxes() {
  var boxwidth = ($('#flexbox').width());
  var parentwidth = ($('html').width());
  if (parentwidth >= 801) {
    var f = ($('#flexbox').width());
    var c = $('.newcolumn').length; 
    var pwidth = (100/c)-5;
    $('.newcolumn').width(pwidth + '%');
    var w = $('.f1_container').width();
    w = f/c;
    $('.f1_container').height(w + 'px').width(w +'px');
  }
  else {
    $('.flip-card').width(boxwidth + 'px').height(boxwidth + 'px');
  }
  var lineh = $("#flexbox .flip-card-back .backContent").css('line-height').replace('px', '');
  var lines = (w-100)/lineh >> 0; // round down with sign-propogation
  $('#flexbox.v2 .backContent').css("-webkit-line-clamp", lines.toString());
}

function setup_flipboxes() {
  $('.newcolumn .flip-card-front img:first-child')
    .addClass("active");
  resizeFlipBoxes();
  setTimeout(flip_carousel, 5000);

  $( window ).resize(function() {
    resizeFlipBoxes();
  }); 
  
}

/* ----------------------------------------------------------- */
/* Process the ajax request to get spreadsheet data            */
/* ----------------------------------------------------------- */

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

function process_card_info(images, caption, label, message) {
    var str = 
    '  <div class=newcolumn>\n' +
    '   <div class="f1_container flip-card">\n' +
    '    <div class="f1_card flip-card-inner" class="shadow">\n' +
    '     <div class="front face flip-card-front">\n';
    images.forEach(function(img, key) {
      str = str + 
    '      <img src="' + img + '"/>\n';
    })
    str = str + 
    '      <div class="labelText">' + caption + '</div>\n' +
    '     </div>\n' +
    '     <div class="back face center flip-card-back">\n' +
    '      <a href="#">\n' +
    '      <div>\n' +
    '        <div class=centerBack>\n' +
    '          <div class="labelText">' + caption + '</div>\n' +
    '          <div class="dividerBack"></div>\n' +
    '          <div class="backContent">\n' + message + 
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      </a>\n' +
    '     </div>\n' +
    '   </div>\n' +
    '  </div>\n';
  $('.flex-container').append(str);
}

/* ----------------------------------------------------------- */
/* Get data from spreadsheet a build flipcards html            */
/* ----------------------------------------------------------- */

function build_flipcards(file_id = null) {


  if (!file_id) {
    // default to the Unity flipcard spreadsheet
    var file_id = '1wEfSb4Dnjz-eNEayaNiiws3ta1ZEueiQyG5-BTWSXag';
  }
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=&tq=' + escape('SELECT * ORDER BY A, B');
  
  var cardlist = get_spreadsheet(url);
  var cards = cardlist.table.rows;

  var prevcard = ''; 
  var images = [];
  var cardnumber = '';
  var label = 'More Info';
  var message = 'See more info';
  var caption = 'VISIT'; 
  var link = '#'; 
  cards.forEach(function(item, key) {
    cardnumber = item.c[0].v;
    itemtype = item.c[1].v;
    itemtype = itemtype.toLowerCase();
    if (Number.isInteger(cardnumber)) { 
      if (prevcard != cardnumber) {
        if (prevcard != '') {
          process_card_info(images, caption, label, message); 
        }
        images = [];
        caption = 'TEST';
        label = 'More Info';
        link = '#';
        message = 'See more info';
        prevcard = cardnumber;
      }
      if (itemtype == 'image') {
        images.push(item.c[2].v);
      }
      if (itemtype == 'caption') {
        caption = item.c[2].v;
      }
      if (itemtype == 'message') {
        message = item.c[2].v;
      }
      if (itemtype == 'label') {
        label = item.c[2].v;
      }
      if (itemtype == 'link') {
        link = item.c[2].v;
      }
    }
  })
  if (cardnumber != '') {
    process_card_info(images, caption, label, message);
  }
}