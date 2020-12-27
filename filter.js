/* ------------------------------------------------------------------- */
/* Filter checklist values                                             */
/* ------------------------------------------------------------------- */ 

function filter_values () {

    // initialize based on current checkboxes
    filter_showvals();

    // Process a checkbox selection 
    $('#filterContainer input[type=checkbox]').on('change', function(e) {
        console.log('change=' + this.value);
        var name = $(this).attr('name');
        if (name) {
        $('#filterContainer input[type=checkbox][name=' + name + ']')
         .not(this).attr('checked',false);
        }
        filter_showvals();
    })

}

function filter_showvals () {

    // get an array of checked items
    var ids = [];
    var xidsx = [];
    $('#filterContainer input[type=checkbox]:checked')
      .each(function() {
        if(this.value) {ids.push(this.value); }
    });

    $('div.summary-content div.summary-metadata-container div.summary-metadata span.summary-metadata-item--cats a').removeClass('active');

    // if we have anything checked then start with everything hidden
    if (ids.length) {
        $('div.summary-item').css('display','none');
    }

    // make sure ids only has unique values
    var t = [];
    for(var x = 0; x < ids.length; x++){
        if(t.indexOf(ids[x]) == -1) {t.push(ids[x]);}
    }
    ids = t;

    $('div.summary-item').each(function(index, value) {
        xidsx = ids; // copy the array of checked items
        $(this).find('div.summary-content div.summary-metadata-container div.summary-metadata span.summary-metadata-item--cats a').filter(function (index2) {
            var t = this.href.indexOf('?category=');
            var i = xidsx.indexOf(this.href.substr(t+10));
            if ( i >= 0) {
                xidsx.splice(i, 1);  
            }
            var i = ids.indexOf(this.href.substr(t+10));
            if ( i >= 0) {
                $(this).addClass('active');   
            }
        })
        // if we have found all of the selected items the show
        if (xidsx.length == 0) {
            $(this).css('display','block');
        }
    });
}  