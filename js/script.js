(function(global){
	var dc = {};
	var homeHtml = "snippet/home.html";
	var allCategoriesUrl = "data/menu-item.json";
	var categoriesTitleHtml = "snippet/menu-categories-title.html";
	var categoryHtml = "snippet/menu-categories.html";
	var contactUsHtml = "snippet/contactus.html";
	var aboutUsHtml = "snippet/aboutus.html";

    var insertHtml = function (selector, html) {
	  var targetElem = document.querySelector(selector);
	  targetElem.innerHTML = html;
	};
	var showLoading = function (selector) {
	  var html = "<div class='text-center'>";
	  html += "<img src='images/ajax-loader.gif'></div>";
	  insertHtml(selector, html);
	};
	var insertProperty = function (string, propName, propValue) {
	  var propToReplace = "{{" + propName + "}}";
	  string = string
	    .replace(new RegExp(propToReplace, "g"), propValue);
	  return string;
	}

	document.addEventListener("DOMContentLoaded", function (event) {
	showLoading("#main-content");
	$ajaxUtils.sendGetRequest(
	  homeHtml,
	  function (responseText) {
	    document.querySelector("#main-content")
	      .innerHTML = responseText;
	  },
	  false);
	});

	dc.loadMenu = function () {
	  //console.log("df"+appetizerUrl);
	  showLoading("#main-content");
	  $ajaxUtils.sendGetRequest(
	    allCategoriesUrl,
	    buildAndShowCategoriesHTML);
	  console.log("buildAndShowCategoriesHTML "+buildAndShowCategoriesHTML.value);
	};

	function buildAndShowCategoriesHTML (categories) {
	  $ajaxUtils.sendGetRequest(
	    categoriesTitleHtml,
	    function (categoriesTitleHtml) {
	      $ajaxUtils.sendGetRequest(
	        categoryHtml,
	        function (categoryHtml) {
	          var categoriesViewHtml =
	            buildCategoriesViewHtml(categories,
	                                    categoriesTitleHtml,
	                                    categoryHtml);
	          insertHtml("#main-content", categoriesViewHtml);
	        },
	        false);
	    },
	    false);
	}

    function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";
        for (var i = 0; i < categories.length; i++) {
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var id = categories[i].id;
            var short_name = categories[i].short_name;
            var price = categories[i].price;
            var description = categories[i].description;
            html =
                insertProperty(html, "name", name);
            html =
                insertProperty(html, "short_name", short_name);
            html =
                insertProperty(html, "price", price);
            html =
                insertProperty(html, "description", description);
            finalHtml += html;
        }
		finalHtml += "</section>";
  		return finalHtml;
	}
    dc.contactUs = function () {
	 showLoading("#main-content");
	 $ajaxUtils.sendGetRequest(
	    contactUsHtml,
	    function (responseText) {
	    document.querySelector("#main-content")
	      .innerHTML = responseText;
	  },
	  false);
	}
	dc.aboutUs = function () {
	showLoading("#main-content");
	$ajaxUtils.sendGetRequest(
	    aboutUsHtml,
	    function (responseText) {
	    document.querySelector("#main-content")
	      .innerHTML = responseText;
	  },
	  false);
	}
	global.$dc = dc;
})(window);	