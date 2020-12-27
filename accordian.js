/* ------------------------------------------------------------------- */
/* Accordian                                                           */
/* ------------------------------------------------------------------- */

$( document ).ready(function() {
	$('p span.accordian').closest('.markdown-block').addClass('markdown-accordian');
	$('.markdown-accordian .sqs-block-content h4').addClass('ui-closed').css('cursor','pointer');
	$('.markdown-accordian .sqs-block-content h4').css('cursor','pointer');
	$(".markdown-accordian .sqs-block-content h4").nextUntil("h4").slideToggle();
	$(".markdown-accordian .sqs-block-content h4").click(function() {
		var status = $(this).hasClass("ui-open");
		$(".markdown-accordian .sqs-block-content h4").nextUntil("h4").slideUp();
		$(".markdown-accordian .sqs-block-content h4").removeClass('ui-open');
		$(".markdown-accordian .sqs-block-content h4").addClass('ui-closed');
		if (status == false) {
		   $(this).nextUntil("h4").slideDown();
		   $(this).toggleClass('ui-closed ui-open');
		}
	});
});