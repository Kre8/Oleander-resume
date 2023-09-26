$(document).ready(function() {
  var $container = $(".grid"); // the container with all the elements to filter inside
  var filters = {}; //should be outside the scope of the filtering function

  /* --- read the documentation on isotope.metafizzy.co for more options --- */
  var $grid = $(".grid").isotope({
    itemSelector: ".item",
    
    filter: '.illus',/*this line filters what is shown onload */
    percentPosition: true,
    masonry: {
      columnWidth: ".grid-sizer"
    } /*,
          filter: filterValue*/
          
  });
  

  // save some classes for later usage
  /* ---
  activeClass: adds this class to filters that are selected (active)
  comboClass: the class that indicates that the filter group is a chain filter, i.e. if you select two filters, only items with BOTH filters will be shown
  exclClass: the class that indicates that the filter group is an exclusion filter, i.e. you can only select one filter from that group at a time
  resetClass: the class for the overall reset button
  --- */
  var activeClass = "selected",
    comboClass = "combine",
    exclClass = "exclusive",
    resetClass = "reset";

  var $defaults = $("a." + activeClass + '[data-filter-value=""]');
  $(".option-set a").click(function(e) {
    // insert your link selector where it says '.option-set a'
    var $this = $(this); // cache the clicked link
    var comboFilter,
      filterAttr = "data-filter-value";
    if (resetClass && !$this.hasClass(resetClass)) {
      // defining variables
      var filterValue = $this.attr(filterAttr); // cache the filter
      var $optionSet = $this.parents(".option-set"); // cache the parent element
      var group = $optionSet.attr("data-filter-group"); // cache the parent filter group
      var filterGroup = filters[group]; // make new variable for the property being filtered
      if (!filterGroup) {
        // if the property doesn't exist
        filterGroup = filters[group] = []; // make a new empty array
      }
      var $selectAll = $optionSet.find("a[" + filterAttr + '=""]'); // cache the 'select all' button in the current group
      $("." + resetClass).removeClass(activeClass);
      comboFiltering(
        $this,
        filters,
        filterAttr,
        filterValue,
        $optionSet,
        group,
        $selectAll,
        activeClass,
        comboClass,
        exclClass
      );
      comboFilter = getComboFilter(filters); // join all the filters
      if (!comboFilter.length) $("a." + resetClass).addClass(activeClass);
      $this.toggleClass(activeClass);
    } else {
      filters = {};
      comboFilter = ".illus"; /*makes sure reset only returns the pertinent results not ALL items  */
      $(".option-set a").removeClass(activeClass);
      $(this).addClass(activeClass);
      $defaults.addClass(activeClass);
    }
    $grid.isotope({
      filter: comboFilter
    });
    e.preventDefault();
  });
});
function comboFiltering(
  $this,
  filters,
  filterAttr,
  filterValue,
  $optionSet,
  group,
  $selectAll,
  activeClass,
  comboClass,
  exclClass
) {
  // for non-exclusive groups of filters
  if (!$optionSet.hasClass(exclClass)) {
    // replace 'exclusive' with the class of your exclusive filter groups
    // if link is a filter that isn't selected
    if (!$this.hasClass(activeClass) && filterValue.length) {
      filters[group].push(filterValue); // add filter to array
      $selectAll.removeClass(activeClass); // remove the selected class from the 'select all' button
    } else if (filterValue.length) {
      // if link is a selected filter
      // remove filter from array
      // check if the filter group we're concerned with is a combination filter (.one.two instead of .one,.two)
      if ($optionSet.hasClass(comboClass)) {
        filters[group][0] = filters[group][0].replace(filterValue, ""); // delete the filter from the combined string
        if (!filters[group][0].length)
          // check if there is anything left in the string after deletion
          filters[group].splice(0, 1); // if no, remove the empty string
      } else {
        // if filter group is not a combo filter
        var curIndex = filters[group].indexOf(filterValue); // get index of filter string in array
        if (curIndex > -1) filters[group].splice(curIndex, 1); // remove the filter
      }
      if (!$optionSet.find("a." + activeClass).not($this).length)
        // if there are no remaining filters
        $selectAll.addClass(activeClass); // add the active class to the 'select all' button
    } else {
      // if link is the show all button for that group
      $optionSet.find("a." + activeClass).removeClass(activeClass); // remove the active class from all other buttons
      filters[group] = []; // clear the array of all filters
    }
    // join everything to a single string for the combined filtering groups
    if ($optionSet.hasClass(comboClass) && filters[group].length)
      filters[group] = [filters[group].join("")];
  } else {
    // for exclusive groups
    // if link is a filter that isn't selected
    if (!$this.hasClass(activeClass) && filterValue.length) {
      // run a loop for all active filters
      $optionSet.find("a." + activeClass).each(function(k, filterLink) {
      
        var removeFilter = $(filterLink).attr(filterAttr);
        var removeIndex = filters[group].indexOf(removeFilter);
        filters[group].splice(removeIndex, 1);
      });
      filters[group].push(filterValue); 
      $optionSet.find("a." + activeClass).removeClass(activeClass); 
    } else if (filterValue.length) {
  
      var curIndex = filters[group].indexOf(filterValue);
      if (curIndex > -1) filters[group].splice(curIndex, 1);
      if (!$optionSet.find("a." + activeClass).not($this).length)
       
        $selectAll.addClass(activeClass); 
    } else {
     
      $optionSet.find("a." + activeClass).removeClass(activeClass); 
      filters[group] = []; 
    }
  }
}

function getComboFilter(filters) {

  var i = 0; 
  var comboFilters = []; 

  for (var prop in filters) {

    var filterGroup = filters[prop];
  
    if (!filterGroup.length) {
      continue; 
    }
    if (i === 0) {

      comboFilters = filterGroup.slice(0);
    } else {
      var filterSelectors = [];

      var groupCombo = comboFilters.slice(0);

      for (var k = 0, len3 = filterGroup.length; k < len3; k++) {
        for (var j = 0, len2 = groupCombo.length; j < len2; j++) {
          filterSelectors.push(groupCombo[j] + filterGroup[k]);
        }
      }

      comboFilters = filterSelectors;
    }
    i++; 
  }

  var comboFilter = comboFilters.join(", ");
  return comboFilter;
}