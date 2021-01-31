/* ------------------------------------------------------------------- */
/* Donor Wall                                                          */
/* ------------------------------------------------------------------- */

//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
var formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  style: 'currency',
  currency: 'USD',
});

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

function do_donor_wall_new(file_id) {

    var colMin = 0;
    var colDonor = 1;
    var colDonors = 2;
    var colEndowment = 3;
    var colRecent = 4; 
    var footone = '';
    var foottwo = ''; 
    var notes = ''; 
    var sheet = 'DonorWall';

    var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?sheet=' + sheet + '&tqx=out:json&tq=' + escape('SELECT A, B, C, D, E ORDER BY A DESC');

    var spreadSheetLink = 'https://docs.google.com/spreadsheets/d/' + file_id + '/edit';

    var donorlist = get_spreadsheet(url);
    console.log(donorlist);
    if(donorlist.length == 0) {
        $('#donorWall').append('<br>Ooops.. unable to read spreadsheet</br>');
        return;
    }
    var donors = donorlist.table.rows;
    //donors.shift(); // remove header row

    var data = ''; 
    var foot = '';
    var donorcount = '';
    var donor = '';
    var heading = '';
    var prevMin = ''; 
    var maxval = ' & Above'; 
    donors.forEach(function(item, key) {
        if (item.c[colMin] != null && item.c[colDonor] != null) {
            var donorname = item.c[colDonor].v; 
            var minval = item.c[colMin].v;
            if (prevMin != minval && minval) {
              // new group
              if (prevMin) {
                maxval = ' - ' + formatter.format(prevMin - 1); 
              }
              var heading = formatter.format(minval);
              data = data + '<div class="heading">' + heading + maxval + '</div>\n';
              prevMin = minval;
            }   
            if (donorname == 'Anonymous') {
              if (item.c[colDonors] != null) {
                donorcount = '<span class="donorCount">(' + item.c[colDonors].v + ')</span>';
              }
              else {
                donorcount = '<span class="donorCount">(1)</span>';
              }
            }
            else {
              donorcount = ''; 
            }
            if (item.c[colEndowment] != null && item.c[colEndowment].v == 'Yes') {
              foot = '<sup>E</sup>';
              footone = '<div class="footnote"><sup>E</sup>&nbsp;Endowment contributor</div>\n';
            }
            else {
              foot = '';
            }
            if (item.c[colMin].v) {
              data  = data + '<div class="donor">' + donorname + donorcount + foot + '</div>';
            }
            else {
              notes  = notes + '<div class="note">' + donorname + '</div>';
            }
            
        }
    })
    var link = '<p><a href="' + spreadSheetLink + '" target="_blank">(Edit/View spreadsheet data)</a></p>';
    $('#donorWall').append(footone).append(notes).append(data).append(link);

}