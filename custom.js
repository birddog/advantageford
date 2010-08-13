jQuery(function($) {

  $.fn.log = function(msg) {
    console.log("%s: %o", msg, this);
    return this;
  };

  /* Setup vars */
  var newDivs = Array();

  /* functions */
  $.fn.makeBumpUpMenu = function(remove) {
    return this.each(function() {
      var el = $(this);
      var parent = el.children('.header').attr('rel');
      el.unbind('hover');
      var name = el.attr('id');
      if (remove) {
	newDivs[name].remove();
	return;
      }

      if (newDivs[name] == null) {
	var pos = el.position();
	var elTop = pos.top;
	var elLeft = pos.left;
	var elWidth = el.width() + 1;
	var elHeight = el.height() + 2;
	newDivs[name] = el.clone().insertAfter(el);
	newDivs[name].attr('id', name + '_clone').css({
	  position: "absolute",
	  cursor: "pointer",
	  top: elTop,
	  left: elLeft,
	  width: elWidth,
	  height: elHeight,
	  zIndex: 10000,
	  opacity: 0.0,
	  background: '#eee url(/wp-content/uploads/whatsInStore.jpg) bottom left no-repeat'
	}).children('ul.menu').css('display', 'block');

	el.hover(function() {
	  cPos = $('.bumpupmenuwidget#' + name).position().top;
	  newDivs[name].stop().css({
	    top: cPos,
	    height: '140px'
	  });
	});
	newDivs[name].hover(function() {
	  cPos = $('.bumpupmenuwidget#' + name).position().top;
	  $(this).stop().css('top', cPos).animate({
	    opacity: 1.0,
	    top: cPos - 160,
	    height: '300px'
	  },
	  "fast");
	},
	function() {
	  cPos = $('.bumpupmenuwidget#' + name).position().top;
	  $(this).stop().animate({
	    top: cPos,
	    height: '140px',
	    opacity: 0.0
	  },
	  "fast");
	});
      }
    });
  }

  $.fn.makeBumpUpButton = function(remove) {
    return this.each(function() {
      var el = $(this);
      el.unbind('hover');
      var name = el.attr('id');
      if (remove) {
	newDivs[name].remove();
	return;
      }

      if (newDivs[name] == null) {
	var pos = el.position();
	var elTop = pos.top;
	var elLeft = pos.left;
	var elWidth = el.width() + 1;
	var elHeight = el.height() + 2;
	newDivs[name] = el.clone().insertAfter(el);
	newDivs[name].attr('id', name + '_clone').css({
	  position: "absolute",
	  cursor: "pointer",
	  opacity: 0,
	  top: elTop,
	  left: elLeft,
	  width: elWidth,
	  height: elHeight,
	  zIndex: 10000
	}).click(function() {
	  if ($('#' + this.id + ' a').attr('target') == '_blank') window.open($('#' + this.id + ' a').attr('href'), $('#' + this.id + ' a').html());
	  else document.location = ($('#' + this.id + ' a').attr('href'));
	});

	el.hover(function() {
	  cPos = $('.bumpupbuttonwidget#' + name).position().top;
	  newDivs[name].css({
	    top: cPos,
	    height: '140px'
	  });
	});
	newDivs[name].hover(function() {
	  cPos = $('.bumpupbuttonwidget#' + name).position().top;
	  $(this).stop().css('top', cPos).animate({
	    opacity: 1.0,
	    top: cPos - 70,
	    height: '210px'
	  },
	  "fast");
	},
	function() {
	  cPos = $('.bumpupbuttonwidget#' + name).position().top;
	  $(this).stop().animate({
	    top: cPos,
	    height: '140px'
	  },
	  "fast",
	  function() {
	    $(this).css('opacity', 0)
	  });
	});
      }
    });
  }

  jQuery.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this;
  }

  $(window).load(function() {
    /* Bumpup boxes on homepages */
    if ($('.bumpupbuttonwidget').length) $(".bumpupbuttonwidget").makeBumpUpButton();

    /* Popup Dropdown Lists */
    if ($('.bumpupmenuwidget').length) $(".bumpupmenuwidget").makeBumpUpMenu();
  });

  /* Inventory Search */
  $("#quick-find #inventory-search").focus(function() {
    if ($(this).attr('value') == 'Inventory Search...') {
      $(this).attr('value', '').css('color', '#999999');
    }
  });

  /* Quick Find bar links */
  $('#quick-find a.jump-to-tab').click(function() {
    var the_clicked_link = $(this).attr('href');
    if ($('#slideout').css('display') != 'block') $('#quick-find-button').click();
    $('#slideout .tabbox-tabs').tabs('#slideout > .tabbox-pane').click(the_clicked_link);
    return false;
  });

  /* Quick Find Slideout */
  $('#quick-find-button').click(function() {
    if ($('#slideout').css('display') == 'none') {
      $('#quick-find-button').find("img").attr('src', '/wp-content/uploads/blue-arrow-up.jpg');
      $('#slideout').show();
    } else {
      $('#slideout').hide();
      $('#quick-find-button').find("img").attr('src', '/wp-content/uploads/blue-arrow.jpg');
    }
    return false;
  });

  /* Light box for Staff pages */
  if ($('.staff .person').length) {
    $('.staff .person').each(function() {
      var current = $(this);
      current.children().children('.email').click(function() {
	name = current.children().children('.name').html();
	email = current.children().children('.email').attr('href').replace(/mailto:/, '');
	$('#emailWindow').css('top', '120px').center();
	$('#emailWindow #send-to-name').html(name);
	$('#emailWindow #staff-name').attr('value', name);
	$('#emailWindow #staff-email').attr('value', email);
	$('body').append('<div id="jquery-overlay"></div>');
	$('#jquery-overlay').css({
	  zIndex: 200,
	  background: 'black',
	  opacity: 0.85,
	  height: $(document).height()
	}).fadeIn();
	$('#emailWindow').fadeIn();
	$('div#jquery-overlay').click(function() {
	  $('body #jquery-overlay').remove();
	  $('#emailWindow').hide();
	});
	return false;
      });
      current.children().children('.toggle-bio').click(function() {
	var location = $(this).position();

	current.children('p.bio-text').css({
	  top: location.top + 12,
	  left: location.left
	}).toggle();
	return false;
      });
    });
  }

  $('#emailWindow .close').click(function() {
    $('body #jquery-overlay').remove();
    $('#emailWindow').hide();
  });

  $(".close").click(function() {
    $(this).parent().hide();
  });
  /***
   * New Vehicle flyout slider
  */
  if ($('.page-item-151').length) {
    if (!$('#showcase-flyout').length && $('.dt-showcase').length) {
      $('#slideout .dt-showcase').clone().insertAfter('#submenu').attr('id', 'showcase-flyout').attr('class', 'showcase-flyout').center().css({
	top: '92px'
      }).hide();
      $('#showcase-flyout .showcase-pane').wrapInner('<div class="items"/>');
      $('#showcase-flyout .showcase-pane').prepend('<div class="showcase-prev"></div>');
      $('#showcase-flyout .showcase-pane').append('<div class="showcase-next"></div>');
      $('#showcase-flyout .showcase-pane').scrollable({
	speed: 100,
	size: 5,
	clickable: false,
	items: '.items',
	next: '.showcase-next',
	prev: '.showcase-prev',
	item: '.vehicle'
      });
      $('#showcase-flyout .showcase-pane .vehicle').hover(function() {
	$(this).children('.trims').show();
      },
      function() {
	$(this).children('.trims').hide();
      });
      $('#showcase-flyout .showcase-tabs').tabs('#showcase-flyout > .showcase-pane');
    }
    $('.page-item-151').hover(function() {
      $('#showcase-flyout').show();
    });
    $('#menubar .page_item').hover(function() {
      if ($(this).attr('class') != 'page_item page-item-151') $('#showcase-flyout').hide();
    });
    $('#showcase-flyout').hover(function() {},
    function() {
      $('#showcase-flyout').hide();
    });
  }

  //========================
  // new-used-vehicles/new-vehicles/sync/
  // - Chad M.17.10
  // COMMENT: probably should have made a function for popups that can take flash video arguements...
  //
  $("#sync-wrap .video a").click(function() {
    $("#sync-wrap .videoplayer").show();
    $("#sync-wrap .videoplayer .frame").append("<object width='480' height='300'><param name='movie' value='http://www.youtube.com/v/9renvWel9cY&hl=en_US&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/9renvWel9cY&hl=en_US&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='480' height='300'></embed></object>");
  });

  $("#sync-wrap a.vidClose").click(function() {
    $(".videoplayer").hide();
    $(".videoplayer .frame").empty();
  });

  $("#sync-wrap #sync-nav a.about").click(function() {
    var shown = $("#sync-nav-content #sync-availability").css("display");
    if (shown == "none") {
      $("#sync-nav-content #sync-about").show();
    } else {
      $("#sync-nav-content #sync-availability").hide();
      $("#sync-nav-content #sync-about").show();
    }
  });

  $("#sync-wrap #sync-nav a.availability").click(function() {
    var shown = $("#sync-nav-content #sync-about").css("display");
    if (shown == "none") {
      $("#sync-nav-content #sync-availability").show();
    } else {
      $("#sync-nav-content #sync-about").hide();
      $("#sync-nav-content #sync-availability").show();
    }
  });

  /* quick find test drive */
  $(".frm-btn-new-test-drive").click(function() {
    $(this).addClass("active");
    $(this).parent().find(".frm-btn-used-test-drive").removeClass("active");
    $(this).parent().find(".used-test-drive").hide();
    $(this).parent().find(".new-test-drive").show();
  });

  $(".frm-btn-used-test-drive").click(function() {
    $(this).addClass("active");
    $(this).parent().find(".frm-btn-new-test-drive").removeClass("active");
    $(this).parent().find(".new-test-drive").hide();
    $(this).parent().find(".used-test-drive").show();
  });

  //***
  // Sidebar Navigation
  initMenu();

  //****
  //  Billboard
  billboardArrowHover();

  //****
  //  Specials arrow toggle
  specialsArrowToggle();

  //***
  //  Wizard
  formwizard();

  function initMenu() {
    if ($("#sidebar .accordionmenuwidget-pages").length) {
      var sidebarMenu = $("#sidebar .accordionmenuwidget-pages");
      var sidebarParent = sidebarMenu.children("li");

      //sidebarParent.find("a").toggle(function() {
      $(".accordionmenuwidget-pages > li > a").toggle(function() {
	$(this).parent().find("ul").show();
      },
      function() {
	$(this).parent().find("ul").hide();
      });

      if ($("#sidebar .accordionmenuwidget .current_page_item").length) {
	var current = $("#sidebar li.current_page_item");
	// show current sub menu
	current.parent().show();

	var currentPosition = $("#sidebar .accordionmenuwidget-pages li > ul > li.current_page_item").position().top;
	//var sidebarMenuHeight = sidebarMenu.height();
	//var sidebarSubMenuHeight = sidebarParent.height();
	var bgOffset = -297; // Backgroung image height. Positions background bottom at the top of the list
	bgOffset += currentPosition + 12;

	// Set background of active list
	current.parent().parent().find("a").addClass("activeParent");
	current.parent().css({
	  "background-color": "#F4F4F4",
	  "background-image": "url(/wp-content/uploads/sidebar-current-page-arrow.png)",
	  "background-position": "left" + " " + bgOffset + "px",
	  "background-repeat": "no-repeat"
	});
      } else {
	sidebarMenu.find("li:first ul").show().addClass("activeParent");
      }
    }
  }

  function checkPos(num) {
    if (parseInt(num) > 0) {
      return true;
    } else {
      return false;
    }
  }

  function billboardArrowHover() {
    if ($(".slideshowwidget").length) {
      var slideshow = $(".slideshowwidget");
      var next = slideshow.find("div.next");
      var prev = slideshow.find("div.prev");
      var pager = slideshow.find(".pager");

      prev.hover(function() {
	$(this).css({
	  "background-position": "-172px top"
	});
      },
      function() {
	$(this).css({
	  "background-position": "-42px top"
	});
      });
      next.hover(function() {
	$(this).css({
	  "background-position": "-95px top"
	});
      },
      function() {
	$(this).css({
	  "background-position": "20px top"
	});
      });

      pager.find("a").css({
	"color": "#555"
      });
    }
  }

  function specialsArrowToggle() {
    if ($(".containerSpecials").length) {
      $("h2.trigger:first").next(".toggle_container").slideToggle("slow");

      $('h2.trigger').toggle(function() {
	$(this).css({
	  "background": "url(/wp-content/uploads/h2_trigger_a.gif) no-repeat scroll 0 bottom transparent"
	}).next(".toggle_container").slideToggle("slow")
      },
      function() {
	$(this).css({
	  "background": "url(/wp-content/uploads/h2_trigger_a.gif) no-repeat scroll 0 top transparent"
	}).next(".toggle_container").slideToggle("fast");
      });

    }
  }
  if ($("#scNav").length) {
    $("#scNav .navItem:first").next(".section").slideToggle("slow");
    $("#scNav .navItem").toggle(function() {
      $(this).next(".section").slideToggle("slow")
    },
    function() {
      $(this).next(".section").slideToggle("fast");
    });
  }
  //*************************
  //* wizard for forms
  //*************************
  function formwizard() {
    if ($("#tradeEstimate").length) {
      var steps = $("#tradeEstimate fieldset");
      var count = steps.size();

      var submitbtn = $("input[type=submit]");
      submitbtn.hide();

      $("#tradeEstimate").before("<ul id='steps'></ul><div class='clear'></div>");
      steps.append("<div class='clear'></div>");

      steps.each(function(i) {
	var name = $(this).find("legend").html();
	$("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");

	$(this).wrap("<div id='step-" + i + "' class='step'></div>");
	$(this).append("<div id='step-" + i + "commands'></div>");

	if (i == 0) {
	  createNextButton(i);
	  selectStep(i);
	} else if (i == count - 1) {
	  $("#step-" + i).hide();
	  createPrevButton(i);

	} else {
	  $("#step-" + i).hide();
	  createPrevButton(i);
	  createNextButton(i);
	}

      });

      if ($(".mmf-checkbox").length) {
	var checkboxes = $(".mmf-checkbox");
	checkboxes.append("<div class='clear'></div>");
      }

      $("#steps").append("<div class='clear'></div>");

    }
  }

  function createPrevButton(i) {
    var stepName = "step-" + i;
    $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>&laquo; Back</a>");
    $("#" + stepName + "Prev").bind("click",
    function(e) {
      $("#" + stepName).hide();
      $("#step-" + (i - 1)).show();
      selectStep(i - 1);
      $("input[type=submit]").hide();
    });

  }

  function createNextButton(i) {
    var stepName = "step-" + i;
    var count = $("#tradeEstimate fieldset").size();
    $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next &raquo;</a>");
    $("#" + stepName + "Next").bind("click",
    function(e) {
      $("#" + stepName).hide();
      $("#step-" + (i + 1)).show();
      selectStep(i + 1);
      if (i + 2 == count) {
	$("input[type=submit]").show();
      }
    });
  }

  function selectStep(i) {
    $("#steps li").removeClass("current");
    $("#stepDesc" + i).addClass("current");
  }

  $("#pikame").PikaChoose({
    thumb_height: 30,
    thumb_width: 30
  });

  if ($("#scnav").length) {
    $('#scNav .navItem').bind('click',
    function() {
      var fuckingIndex = $(this).index(this);
      $(this).parent().find('open').removeClass('open');
      if (fuckingIndex == 1) {
	$('.section:has(a1)').addClass('open');
      } else if (fuckingIndex == 2) {
	$('.section:has(a2)').addClass('open');
      } else if (fuckingIndex == 3) {
	$('.section:has(a3)').addClass('open');
      } else if (fuckingIndex == 4) {
	$('.section:has(a4)').addClass('open');
      } else if (fuckingIndex == 5) {
	$('.section:has(a5)').addClass('open');
      } else if (fuckingIndex == 6) {
	$('.section:has(a6)').addClass('open');
      } else if (fuckingIndex == 7) {
	$('.section:has(a7)').addClass('open');
      }
    });
  }
  if ($(".accessories").length) {
    $("ul.accessoriesWrap li").hover(function(e) {
      $(this).css({
	'z-index': 10
      }).find('img').addClass("hover").stop().animate({
	width: '140px'
      },
      {
	duration: 100
      });

      var ulWidth = $(this).parent().width();
      var thisOffset = $(this).offset();
      var diff = ulWidth - thisOffset.left;

      if (diff >= 100) {
	$(this).find(".description").stop().addClass('pright').show().css({
	  left: '120px'
	});
      } else {
	$(this).find(".description").stop().addClass('pleft').show().css({
	  right: '70px'
	});
      }

    },
    function() {
      $(this).css({
	'z-index': 0
      }).find('img').removeClass("hover").stop().animate({
	width: '80px'
      },
      {
	duration: 100
      });
      $(this).find('.description').hide();
    });
  }

  if ($("#post-94").length) {
    var ribbon = $("#post-94 .ribbon");
    var collisionform = $("#post-94 .collisionform");

    ribbon.hover(function() {
      $(this).css({
	opacity: 0.85
      });
    },
    function() {
      $(this).css({
	opacity: 1
      });
    });

    ribbon.bind('click',
    function() {

      $("body").append("<div id='jquery-overlay'></div>");
      $("#jquery-overlay").css({
	zIndex: 200,
	background: "black",
	opacity: 0.85,
	height: $(document).height()
      }).fadeIn();
      collisionform.css({
	zIndex: 250
      }).center().fadeIn();

      $("div#jquery-overlay, .close").click(function() {
	$("body #jquery-overlay").remove();
	collisionform.hide();
      });
      return false;
    });
  }

  /* Detail page Lightbox */
  if ($('.detail .photos a.photo').length) {
    $('.bird_dog .detail .photos .photo').attr('rel', 'lightbox');
  }


  /* Ford Explorer 2011 feature gallery */
  if ($('#explorer2011').length) {

    // set general variables for elements
    var primaryMenu = $('#explorer2011 .nav li a');
    var subMenu = $('#explorer2011 .nav li .sub li');
    var thumbs = $('#explorer2011 #gallery .thumbs img');
    var enlarge = $('#explorer2011 #gallery .enlarge');
    var parentMenuIndex = 1;

    // Bind actions to primay menu item
    primaryMenu.bind('click', function() {
      parentMenuIndex = primaryMenu.index(this) + 1;

      // swap to correct gallery
      if ($('#gallery.active').index('#gallery.active') != parentMenuIndex) {
	$('#gallery.active').removeClass('active').hide();
	$('.g' + parentMenuIndex + '-1').addClass('active').show();
      }
      //deactivate previous active menu item
      $('#explorer2011 .nav .active').find('.sub').hide();
      $('#explorer2011 .nav').find('.active').removeClass('active');

      // set active menu and submenu
      $(this).parent().addClass('active').find('.sub').toggle('fast');
      $(this).parent().find('.sub li:first').addClass('active');

      // reset main image to first of this gallery
      $('#gallery.active .thumbs img.active').removeClass('active');
      var smSrc = $('#gallery.active .thumbs img:first').addClass('active').attr('src');
      var splitSrc = smSrc.split('/');
      var medSrc = splitSrc[0] + '/' + splitSrc[1] + '/' + splitSrc[2] + '/med/' + splitSrc[4];
      $('#explorer2011 #gallery.active .main .image img').attr('src', medSrc);

      return false;
    });

    subMenu.bind('click', function() {
      var subIndex = $(this).parent().find('li').index($(this)) + 1;

      $('#gallery.active').removeClass('active').hide();
      $('.g' + parentMenuIndex + '-' + subIndex).addClass('active').show();

      // set active menu and submenu
      $(this).parent().find('.active').removeClass('active');
      $(this).addClass('active');

      // reset main image to first of this gallery
      $('#gallery.active .thumbs img.active').removeClass('active');
      var smSrc = $('#gallery.active .thumbs img:first').attr('src');
      var splitSrc = smSrc.split('/');
      var medSrc = splitSrc[0] + '/' + splitSrc[1] + '/' + splitSrc[2] + '/med/' + splitSrc[4];
      $('#explorer2011 #gallery.active .main .image img').attr('src', medSrc);

      return false;
    })

    thumbs.bind('click', function() {
      var src = $(this).attr('src');
      var splitSrc = src.split('/');
      var medSrc = splitSrc[0] + '/' + splitSrc[1] + '/' + splitSrc[2] + '/med/' + splitSrc[4];
      var lrgSrc = splitSrc[0] + '/' + splitSrc[1] + '/' + splitSrc[2] + '/lrg/' + splitSrc[4];
      $(this).parent().find('.active').removeClass('active');
      $(this).addClass('active');
      enlarge.parent().attr('href', lrgSrc);
      $('#explorer2011 #gallery .main .image img').attr('src', medSrc);
    });
  }

});

/*
	Lightbox JS: Fullsize Image Overlays 
	by Lokesh Dhakar - http://www.huddletogether.com

	For more information on this script, visit:
	http://huddletogether.com/projects/lightbox/

	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	(basically, do anything you want, just leave my name and link)
	
*/
var loadingImage = '/wp-content/themes/dt-bird-dog/javascripts/lightbox/loading.gif';
var closeButton = '/wp-content/themes/dt-bird-dog/javascripts/lightbox/close.gif';
function getPageScroll() {
  var yScroll;
  if (self.pageYOffset) {
    yScroll = self.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
    yScroll = document.documentElement.scrollTop;
  } else if (document.body) { // all other Explorers
    yScroll = document.body.scrollTop;
  }
  arrayPageScroll = new Array('', yScroll) return arrayPageScroll;
}

function getPageSize() {
  var xScroll, yScroll;
  if (window.innerHeight && window.scrollMaxY) {
    xScroll = document.body.scrollWidth;
    yScroll = window.innerHeight + window.scrollMaxY;
  } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
    xScroll = document.body.scrollWidth;
    yScroll = document.body.scrollHeight;
  } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
    xScroll = document.body.offsetWidth;
    yScroll = document.body.offsetHeight;
  }

  var windowWidth, windowHeight;
  if (self.innerHeight) { // all except Explorer
    windowWidth = self.innerWidth;
    windowHeight = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
  } else if (document.body) { // other Explorers
    windowWidth = document.body.clientWidth;
    windowHeight = document.body.clientHeight;
  }

  // for small pages with total height less then height of the viewport
  if (yScroll < windowHeight) {
    pageHeight = windowHeight;
  } else {
    pageHeight = yScroll;
  }

  // for small pages with total width less then width of the viewport
  if (xScroll < windowWidth) {
    pageWidth = windowWidth;
  } else {
    pageWidth = xScroll;
  }

  arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight) return arrayPageSize;
}

function pause(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime) return;
  }
}

function getKey(e) {
  if (e == null) { // ie
    keycode = event.keyCode;
  } else { // mozilla
    keycode = e.which;
  }
  key = String.fromCharCode(keycode).toLowerCase();

  if (key == 'x') {
    hideLightbox();
  }
}

function listenKey() {
  document.onkeypress = getKey;
}

function showLightbox(objLink) {
  // prep objects
  var objOverlay = document.getElementById('overlay');
  var objLightbox = document.getElementById('lightbox');
  var objCaption = document.getElementById('lightboxCaption');
  var objImage = document.getElementById('lightboxImage');
  var objLoadingImage = document.getElementById('loadingImage');
  var objLightboxDetails = document.getElementById('lightboxDetails');

  var arrayPageSize = getPageSize();
  var arrayPageScroll = getPageScroll();

  // center loadingImage if it exists
  if (objLoadingImage) {
    objLoadingImage.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLoadingImage.height) / 2) + 'px');
    objLoadingImage.style.left = (((arrayPageSize[0] - 20 - objLoadingImage.width) / 2) + 'px');
    objLoadingImage.style.display = 'block';
  }

  // set height of Overlay to take up whole page and show
  objOverlay.style.height = (arrayPageSize[1] + 'px');
  objOverlay.style.display = 'block';

  // preload image
  imgPreload = new Image();

  imgPreload.onload = function() {
    objImage.src = objLink.href;

    // center lightbox and make sure that the top and left values are not negative
    // and the image placed outside the viewport
    var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - imgPreload.height) / 2);
    var lightboxLeft = ((arrayPageSize[0] - 20 - imgPreload.width) / 2);

    objLightbox.style.top = (lightboxTop < 0) ? "0px": lightboxTop + "px";
    objLightbox.style.left = (lightboxLeft < 0) ? "0px": lightboxLeft + "px";

    objLightboxDetails.style.width = imgPreload.width + 'px';

    if (objLink.getAttribute('title')) {
      objCaption.style.display = 'block';
      //objCaption.style.width = imgPreload.width + 'px';
      objCaption.innerHTML = objLink.getAttribute('title');
    } else {
      objCaption.style.display = 'none';
    }

    // A small pause between the image loading and displaying is required with IE,
    // this prevents the previous image displaying for a short burst causing flicker.
    if (navigator.appVersion.indexOf("MSIE") != -1) {
      pause(250);
    }

    if (objLoadingImage) {
      objLoadingImage.style.display = 'none';
    }

    // Hide select boxes as they will 'peek' through the image in IE
    selects = document.getElementsByTagName("select");
    for (i = 0; i != selects.length; i++) {
      selects[i].style.visibility = "hidden";
    }

    objLightbox.style.display = 'block';

    // After image is loaded, update the overlay height as the new image might have
    // increased the overall page height.
    arrayPageSize = getPageSize();
    objOverlay.style.height = (arrayPageSize[1] + 'px');

    // Check for 'x' keypress
    listenKey();

    return false;
  }

  imgPreload.src = objLink.href;

}

function hideLightbox() {
  // get objects
  objOverlay = document.getElementById('overlay');
  objLightbox = document.getElementById('lightbox');

  // hide lightbox and overlay
  objOverlay.style.display = 'none';
  objLightbox.style.display = 'none';

  // make select boxes visible
  selects = document.getElementsByTagName("select");
  for (i = 0; i != selects.length; i++) {
    selects[i].style.visibility = "visible";
  }

  // disable keypress listener
  document.onkeypress = '';
}

function initLightbox() {
  if (!document.getElementsByTagName) {
    return;
  }
  var anchors = document.getElementsByTagName("a");

  // loop through all anchor tags
  for (var i = 0; i < anchors.length; i++) {
    var anchor = anchors[i];

    if (anchor.getAttribute("href") && (anchor.getAttribute("rel") == "lightbox")) {
      anchor.onclick = function() {
	showLightbox(this);
	return false;
      }
    }
  }

  var objBody = document.getElementsByTagName("body").item(0);
  var objOverlay = document.createElement("div");
  objOverlay.setAttribute('id', 'overlay');
  objOverlay.onclick = function() {
    hideLightbox();
    return false;
  }
  objOverlay.style.display = 'none';
  objOverlay.style.position = 'absolute';
  objOverlay.style.top = '0';
  objOverlay.style.left = '0';
  objOverlay.style.zIndex = '90';
  objOverlay.style.width = '100%';
  objBody.insertBefore(objOverlay, objBody.firstChild);

  var arrayPageSize = getPageSize();
  var arrayPageScroll = getPageScroll();

  // preload and create loader image
  var imgPreloader = new Image();

  // if loader image found, create link to hide lightbox and create loadingimage
  imgPreloader.onload = function() {

    var objLoadingImageLink = document.createElement("a");
    objLoadingImageLink.setAttribute('href', '#');
    objLoadingImageLink.onclick = function() {
      hideLightbox();
      return false;
    }
    objOverlay.appendChild(objLoadingImageLink);

    var objLoadingImage = document.createElement("img");
    objLoadingImage.src = loadingImage;
    objLoadingImage.setAttribute('id', 'loadingImage');
    objLoadingImage.style.position = 'absolute';
    objLoadingImage.style.zIndex = '150';
    objLoadingImageLink.appendChild(objLoadingImage);

    imgPreloader.onload = function() {}; //	clear onLoad, as IE will flip out w/animated gifs

    return false;
  }

  imgPreloader.src = loadingImage;

  // create lightbox div, same note about styles as above
  var objLightbox = document.createElement("div");
  objLightbox.setAttribute('id', 'lightbox');
  objLightbox.style.display = 'none';
  objLightbox.style.position = 'absolute';
  objLightbox.style.zIndex = '100';
  objBody.insertBefore(objLightbox, objOverlay.nextSibling);

  // create link
  var objLink = document.createElement("a");
  objLink.setAttribute('href', '#');
  objLink.setAttribute('title', 'Click to close');
  objLink.onclick = function() {
    hideLightbox();
    return false;
  }
  objLightbox.appendChild(objLink);

  // preload and create close button image
  var imgPreloadCloseButton = new Image();

  // if close button image found, 
  imgPreloadCloseButton.onload = function() {

    var objCloseButton = document.createElement("img");
    objCloseButton.src = closeButton;
    objCloseButton.setAttribute('id', 'closeButton');
    objCloseButton.style.position = 'absolute';
    objCloseButton.style.zIndex = '200';
    objLink.appendChild(objCloseButton);

    return false;
  }

  imgPreloadCloseButton.src = closeButton;

  // create image
  var objImage = document.createElement("img");
  objImage.setAttribute('id', 'lightboxImage');
  objLink.appendChild(objImage);

  // create details div, a container for the caption and keyboard message
  var objLightboxDetails = document.createElement("div");
  objLightboxDetails.setAttribute('id', 'lightboxDetails');
  objLightbox.appendChild(objLightboxDetails);

  // create caption
  var objCaption = document.createElement("div");
  objCaption.setAttribute('id', 'lightboxCaption');
  objCaption.style.display = 'none';
  objLightboxDetails.appendChild(objCaption);

  // create keyboard message
  var objKeyboardMsg = document.createElement("div");
  objKeyboardMsg.setAttribute('id', 'keyboardMsg');
  objKeyboardMsg.innerHTML = 'press <a href="#" onclick="hideLightbox(); return false;"><kbd>x</kbd></a> to close';
  objLightboxDetails.appendChild(objKeyboardMsg);
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }

}
addLoadEvent(initLightbox); // run initLightbox onLoad
