/* ----------------------------------------------------------- */
/* Flipbox3 - Home page flip boxes                             */
/*    04/10/2021 - initial                                     */
/* ----------------------------------------------------------- */

var columnIndex = 1; 

function flipCardResize3() {
  var fontsize = parseInt($('#flexbox.v3 .backContent').css('font-size'));
  var height = parseInt($('#flexbox.v3 div.newcolumn .flip-card').css('height'));
  var lineheight = fontsize * 1.2;
  var lines = parseInt(height / lineheight);
  //alert(fontsize + ' ' + height + ' ' + lineheight + ' ' + lines); 
  $('#flexbox.v3 .backContent').css("-webkit-line-clamp", lines.toString());
  $('#flexbox.v3 .backContent').css("line-height", lineheight + 'px');
}

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
  setTimeout(flip_carousel3, 5000);
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

function build_flipcards3(boxNumber = 1, file_id = null, sheet = null) {


  if (!file_id) {
    file_id = '1wEfSb4Dnjz-eNEayaNiiws3ta1ZEueiQyG5-BTWSXag';
  }
  if (!sheet) {
    sheet = 'Cards2';
  }
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=&sheet=' + sheet + 
    '&headers=1&tq=' + escape('SELECT * WHERE A = "' + boxNumber + '" ORDER BY A, B');
  //alert(url);
  var cardlist = get_spreadsheet(url);
  var cards = cardlist.table.rows;
  console.log(cards);

  var prevcard = ''; 
  cards.forEach(function(item, key) {
    var images = [];
    var cardnumber = '';
    var label = 'More Info';
    var message = 'See more info';
    var caption = 'VISIT'; 
    var link = '#'; 
    var background = 'rgb(102,102,102)';
    var color = 'white'; 
  
    if (item.c[1] != null) {cardnumber = item.c[1].v;}
    if (item.c[2] != null) {caption = item.c[2].v;}
    if (item.c[3] != null) {label = item.c[3].v;}
    if (item.c[4] != null) {link = item.c[4].v;}
    if (item.c[5] != null) {background = item.c[5].v;}
    if (item.c[6] != null) {color = item.c[6].v;}
    if (item.c[7] != null) {message = item.c[7].v;}
    for (var i = 8; i < 15; i++) {
      if (item.c[i] != null) { images.push(item.c[i].v); }
    };
    process_card_info3(link,images, caption, label, message);
  })   

  $('div.front.face img:first-child')
    .addClass("active");
    $('')
  setTimeout(flip_carousel3, 5000);

  flipCardResize3();

  $( window ).resize(function() {
    flipCardResize3();
  });
}