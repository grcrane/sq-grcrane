/* ------------------------------------------------------------------- */
/* Team boxes                                                          */
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

function do_team_members(file_id) {

    var firstCol = 0;
    var lastCol = 1;
    var orgCol = 2;
    var groupCol = 3;
    var titleCol = 4;
    var hideCol = 5;
    var imageCol = 6;
    var bioCol = 7;
    var linkCol = 8;
     
    var sheet = 'Members';

    //https://docs.google.com/spreadsheets/d/1hiPd3cJMf_JOr3Z4RnR3XA6-Z927OSJhxJJgYXix448/edit?usp=sharing

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&headers=1&tq=' + escape("SELECT A, B, C, D, E, F, G, H, I WHERE F = 'No' ORDER BY B, A");

    var spreadSheetLink = 'https://docs.google.com/spreadsheets/d/' + file_id + '/edit';

    var teamlist = get_spreadsheet(url);
    console.log(teamlist);
    if(teamlist.length == 0) {
        $('.team_container').append('<br>Ooops.. unable to read spreadsheet</br>');
        return;
    }
    var out = ''; 
    var teams = teamlist.table.rows;
    var prevgroup = ''; 
    teams.forEach(function(item, key) {
        if (item.c[groupCol] != null) { // ignore blank lines
            if (prevgroup != item.c[groupCol] || prevgroup == '') {
              prevgroup = item.c[groupCol].v;
            }
            out = out + '<div class="item_box">';
            out = out + '<div class="item_front">';
            if (item.c[imageCol] != null) {
              var imgsrc = 'https://drive.google.com/uc?export=view&id=1VxokDflhs9p1sIYDYBX7HertCAcP4887';
             
              out = out + '<img class="item_img" src="' + item.c[imageCol].v + '" alt="Example image">';
            }
            if (item.c[lastCol] != null && item.c[firstCol] != null) {
              out = out + '<div class="item_name">' + 
                item.c[firstCol].v + ' ' + item.c[lastCol].v;
              if (item.c[titleCol] != null) {
                out = out + '<div class="item_title">' + item.c[titleCol].v + '</div>';
              }
              out = out + '</div>';
            }
            out = out + '</div>'; // end front
            out = out + '<div class="item_back">';
            var biotext = 'No bio';
            if (item.c[bioCol] != null) {
              biotext = item.c[bioCol].v; }
            out = out + '<div class="item_bio">' + biotext + '</div>';
            out = out + '</div>'; // end back
          out = out + '</div>';     
        }
    })
    $('.team_container').append(out); 
    var link = '<p><a href="' + spreadSheetLink + '" target="_blank">(Edit/View spreadsheet data)</a></p>';

}