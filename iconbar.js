/*-------------------------------------------------------------*/
/* Icon Bar                                                    */
/*    04/17/2021 - initial                                     */
/*-------------------------------------------------------------*/

var iconsFor = ['aahom','leslie','unity','yankee']; 
var icons = [
'https://static1.squarespace.com/static/5f73ca8db43a982332ef42a7/60316dbd7dd52d12ad920e7f/605f4857363da23de8d99653/1616857176038/aahom.png?format=2500w',
'https://static1.squarespace.com/static/5f73ca8db43a982332ef42a7/60316dbd7dd52d12ad920e7f/605f48565689961a0425d469/1616857174314/lsnc.png',
'https://static1.squarespace.com/static/5f73ca8db43a982332ef42a7/60316dbd7dd52d12ad920e7f/605f48578926120327029e3f/1616857176069/uil.png',
'https://static1.squarespace.com/static/5f73ca8db43a982332ef42a7/60316dbd7dd52d12ad920e7f/605f485760b0890b8760c9d1/1616857176070/yam.png'
]
function showIconBar(sticky = true) {
	var temp = '<ul class="iconBarFlex">';
	icons.forEach(function(item,key) {
		temp += '<li class="flex-item"><img src="' + item + '"></li>\n';
	})
	temp += '</ul>\n';
	$('#iconBar').html(temp); 
	if (sticky) {
		$('#iconBar').addClass('sticky');
		$('#iconBar').appendTo('#page section:first-of-type div.section-background');
        $('div.mySlides div.slideCaption').css('bottom','100px');
	} 
}