/* ----------------------------------------------------------- */
/* Flipbox3 - Home page flip boxes                             */
/*    04/10/2021 - initial                                     */
/* ----------------------------------------------------------- */

var columnIndex = 1; 

function flip_carousel3() {
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

function process_card_info3(link,images, caption, label, message) {
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
    '      <a href="' + link + '">\n' +
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

function build_flipcards3(file_id = null, sheet = null) {


  if (!file_id) {
    return;
  }
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=sheet=' + sheet + 
    '&headers=1&tq=' + escape('SELECT * ORDER BY A, B');
  
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
          process_card_info3(link,images, caption, label, message); 
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
    process_card_info3(link,images, caption, label, message);
  }
}

function flipCardResize() {
	var fontsize = parseInt($('#flexbox.v3 .backContent').css('font-size'));
	var height = parseInt($('#flexbox.v3 div.newcolumn .flip-card').css('height'));
	var lineheight = fontsize * 1.2;
	var lines = parseInt(height / lineheight);
	//alert(fontsize + ' ' + height + ' ' + lineheight + ' ' + lines); 
	$('#flexbox.v3 .backContent').css("-webkit-line-clamp", lines.toString());
	$('#flexbox.v3 .backContent').css("line-height", lineheight + 'px');
}