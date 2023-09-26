/* ISOTOPE */

var $grid = $(".grid").isotope({
  itemSelector: ".item",
  percentPosition: true,
  masonry: {
    columnWidth: ".grid-sizer"
  } 
});
$grid.imagesLoaded({ background: ".item" }, function() {
  //console.log('imagesLoaded');
  $grid.isotope("layout");
  /*TweenMax.delayedCall(0, setGridCategory);  changed 8.5.23 throwing probs in chrome*/
});
$grid.on("arrangeComplete", function() {

 /* TweenMax.delayedCall(0.1, updateSwipers);  changed 8.5.23 throwing probs in chrome*/
});
function setGridCategory() {
  //console.log('setGridCategory');
  //swiper.update();
  var filterValue = $(".filtersul li:nth-child(1) a").attr("data-filter");
  var text = $(".filtersul li:nth-child(1) a").html();
  $(".filters div a span").html(text);
  $(".item").removeClass("open");
  $(".grid").isotope({ filter: filterValue });
  
}
function updateSwipers() {
  //console.log('updateSwipers');
  $("#grid .tilterymain").each(function(index) {
    var $el = $(this);
    if ($el.find(".item").length > 1) {
      swiper[index].onResize();
      //$(window).trigger('resize');
    }
  });
}

var $quicksearch = $(".quicksearch").keyup(
  debounce(function() {
    //console.log('keyup');
    $(".item").removeClass("open");
    qsRegex = new RegExp($quicksearch.val(), "gi");
    
    $grid.isotope({
      filter: function() {
        return qsRegex ? $(this).text().match(qsRegex) : true;
      }
    });
    $(".quicksearch ").html("search again");
    
    // Find the first visible item after filtering
    var $firstVisibleItem = $grid.find(".item:visible:first");

    // Scroll to the first visible item
    if ($firstVisibleItem.length > 0) {
      $firstVisibleItem[0].scrollIntoView({ behavior: "smooth" });
    }
  }, 200)
);

function debounce(fn, threshold) {
  var timeout;
  return function debounced() {
    if (timeout) {
      clearTimeout(timeout);
    }

    function delayed() {
      fn();
      timeout = false;
    }
    timeout = setTimeout(delayed, threshold || 10);
  };
}

$(".filters div div").click(function(e) {
  $(".filtersdiv").toggle();
  e.preventDefault();
});
/*$('#top-menu .opt a[href="#produtos"]').click(function(e) {
        $(".filtersul").show();
        e.preventDefault();
      });*/

$(".filters a").click(function(e) {
  console.log("filterValue");
  e.preventDefault();
  $(".item").removeClass("open");
  var text = $(this).html();
  $(".filters div a span").html(text);
  $(".filtersul").hide();
  var filterValue = $(this).attr("data-filter");
  $grid.isotope({
    filter: filterValue
  });
  $(".search input").val("");
});

$(document).bind("click", function(e) {
  var $clicked = $(e.target);
  if (
    !$clicked.parents().hasClass("filters") &&
    !$clicked.parents().hasClass("opts")
  )
    $(".filtersul").hide();
});

/* END ISOTOPE */