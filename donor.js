/* ------------------------------------------------------------------- */
/* Donor Wall                                                          */
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

function do_donor_wall2(file_id) {

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=&tq=' + escape('SELECT A');

    var donorlist = get_spreadsheet(url);
    if(donorlist.length == 0) {
        $('#donorWall').append('<br>Ooops.. unable to read spreadsheet</br>');
        return;
    }
    var donors = donorlist.table.rows;
    donors.shift(); // remove header row

    var data = ''; 
    var heading = '';
    donors.forEach(function(item, key) {
        if (item.c[0] != null) {
            var val = item.c[0].v;
            val = val.trim(); 
            if (val.substr(0,1) == '#') {
                heading = val.substr(1).trim();
                data = data + '<div class="heading">' + heading + '</div>\n';
            }
            else {
                if (heading) {
                    data = data + '<div class="donor">' + val + '</div>\n';
                }
                else {
                    data = data + '<div class="note">' + val + '</div>\n';
                }
            }
        }
    })
    $('#donorWall').append(data);

}