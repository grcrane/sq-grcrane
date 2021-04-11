/*-------------------------------------------------------------*/
/* Address/Hours/Admissions flex boxes                         */
/*    04/10/2021 - initial                                     */
/*-------------------------------------------------------------*/

function showAddressInfo(museum = null,file_id = null, sheet = null) {
  if (!file_id) {
    file_id = '1eBU2TqbjAT0-PUkKVa0J9obsoyIBJ7ib_KJMQLNym8Y';
  }
  if (!sheet) {
    sheet = 'Hours';
  }
  var where = ''; 
  if (museum) {
    where = ' WHERE lower(A) = lower("' + museum + '") ';
  }
  var url = 'https://docs.google.com/spreadsheets/u/0/d/'
    + file_id + '/gviz/tq?tqx=out:json&sheet=' + sheet + 
    '&headers=1&tq=' + escape('SELECT * ' + where + ' ORDER BY A, B LIMIT 1');
  var colorClass = "museum" + museum.charAt(0).toUpperCase() + museum.slice(1);
  $('#hoursContainer').html(out).addClass(colorClass); 
  var addlist = get_spreadsheet(url);
  var adds = addlist.table.rows;
  var out = '<p>No data found</p>'; 
  if (adds[0]) {
    var item = adds[0];  
    var namd = item.c[0].v;
    
    var add1 = (item.c[1] != null) ? item.c[1].v : 'unknown';
    var text1 = (item.c[2] != null) ? item.c[2].v : 'unknown';
    var add2 = (item.c[3] != null) ? item.c[3].v : 'unknown';
    var text2 = (item.c[4] != null) ? item.c[4].v : 'unknown';
    var add3 = (item.c[5] != null) ? item.c[5].v : 'unknown';
    var text3 = (item.c[6] != null) ? item.c[6].v : 'unknown';
    out = '<div>\n<h3>' + add1 + '</h3>\n' + text1 + '</div>\n';
    out = out + '<div>\n<h3>' + add2 + '</h3>\n' + text2 + '</div>\n';
    out = out + '<div>\n<h3>' + add3 + '</h3>\n' + text3 + '</div>\n';
  } 
  $('#hoursContainer').html(out).css('display','flex'); 
  return; 
}