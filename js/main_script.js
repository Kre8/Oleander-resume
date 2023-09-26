jQuery(document).ready(function() {

  // store filter for each group
  var buttonFilters = {};
  var buttonFilter;
  // quick search regex
  var qsRegex;
  
  // init Isotope
  var $grid = $('.grid').isotope({
  itemSelector: '.item',
  filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  },
  });
  
  // bind filter button click
  $filters = $('.filters').on( 'click', 'button', function() {
  
  var $this = $(this);
  // get group key
  var $buttonGroup = $this.parents('.button-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  
  var attr = $('.button-group').attr('data-filter-group');
  // set filter for group
  buttonFilters[ filterGroup ] = $this.attr('data-filter');
  
  // combine filters
  buttonFilter = concatValues( buttonFilters );
   
  // Isotope arrange
  var filterValue;
  if ( $this.is('.is-checked') ) {
    // uncheck
    filterValue = '*';
  } else {
    filterValue = $this.attr('data-filter');
    $filters.find('.is-checked').removeClass('is-checked');
  }
  $this.toggleClass('is-checked');
  
  $grid.isotope({ filter: filterValue });
  });
  
  // use value of search field to filter
  var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
  }) );
  
  // flatten object by concatting values
  function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
  }
  
  // debounce so filtering doesn't happen every millisecond
  function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
  }
  
  });