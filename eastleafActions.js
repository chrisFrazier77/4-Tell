(function (_4TellBoost, $, undefined) {
    _4TellBoost.Service.customLoaded = true;
    
    if (_4TellBoost.CONFIG.SiteInfo.searchBoostEnable === true) {
         // find and create all our variable

        var searchBarWrapper = $('<div class="searchBoostWrapper4T"></div>');
    
        //USE THIS WHEN CREATING THE SEARCHBAR 
        //var placementDiv = $('#search_mini_form');
        //var searchBar = $('<input placeholder="  Search Products..." type="search" class="searchBoost4T"/>');
        //why isnt load running already?
        _4TellBoost.UserData.load();
    
        //USE THIS WHEN USING AN EXISTING SEARCH BAR      
        $('#search').addClass('searchBoost4T').attr('autocomplete',"off");
        
        var searchButton = $('<div class="searchImage"></div>');
        var recWrapper = $('<div class="searchBoostRecWrapper4T"></div>');
        var categoryListWrapper = $('<div class="categoryListWrapper"></div>');
        var categoryUL = $('<ul class="categoryList"></ul>');
        var categoryULTitle = $('<span class="ul-title category">Categories</span>');
        
        //var noResults = $('<span class="noResults">No results found. Check the spelling, try a more general term or look up a specific brand or designer.</span>');
        
        var productListWrapper = $('<div class="productListWrapper"></div>');
        var productUL = $('<ul class="productList"></ul>');
        var productULTitle = $('<span class="ul-title product">Products</span>');
        var divSelect = $('<div class="tout1_searchBoost_4T"></div>');
        var loadingGIF = $('<img class="loading4T" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>');
        var closeButton = $('<span class="closeButton">X</span>');
        var expandButton = $('<label class="expandSearch">+ Expand Search</label>');
        
        _4TellBoost.dataAvailable = false;
        
        //append them
        productListWrapper.append(productULTitle, productUL);
        categoryListWrapper.append(categoryULTitle, categoryUL);
        recWrapper.append(loadingGIF, closeButton, categoryListWrapper, productListWrapper, divSelect, expandButton); 
        
        //searchBarWrapper.append(searchBar, searchButton); 
        $('.header__bottom form.search').wrap( searchBarWrapper );
        $('.header__bottom form.search').append(recWrapper);
        //placementDiv.append(searchBarWrapper, recWrapper);
        
        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');

        
        //$('input#search:first').remove();
        $('.loading4T').css('display','none');
        $('.searchBoostRecWrapper4T').hide();
        $('.ul-title').css('display','none');
        //$('.noResults').css('display','none');
        
        $( closeButton ).click(function() {
            $('.searchBoostRecWrapper4T').fadeOut();
        });
        
        $( ".expandSearch" ).click(function() {
            $( 'form.search:first' ).submit();
        });
    
        
         $('body').click(function (e) {
            var clicked = '#' + e.target.id;
            if (clicked === '#') {
                var clicked = '.' + e.target.className;
            }
            if (clicked === '#search') {
                return;
            }
            if (clicked === '.searchBoostRecWrapper4T') {
                return;
            }
            if($('.searchBoostRecWrapper4T').find(clicked).length !== 0) {
                return;
            } else {
                $('.searchBoostRecWrapper4T').fadeOut();
            }
        });
        
        var count = 0;
        $('.searchBoost4T').keyup(function (e)  {
            
            count = count + 1; 
            $('.SB4T').remove();
            $('.SB4T2').remove();
            
            $('.ul-title').css('display','none');
            $('.noResults').css('display','none');
             
            //remove old results
            $('ul.categoryList li.category4T').remove();
            $('ul.productList li.searchProduct4T').remove();

            
            if (count > 2) {
                
                var inputValue = $('.searchBoost4T').val();
                
                //send events when some one types in the input
                ga('send', 'event', '4TellSearch' , 'keyStroke', inputValue);
                
                if (inputValue.length < 3) {
                    count = inputValue.length;
                    $('.searchBoostRecWrapper4T').hide();
                }else {
                    //activate loading GIF
                    $('.searchBoostRecWrapper4T').show();
                    $('.loading4T').css('display','block');
                    
                    //remove old results
                    $('.SB4T').remove();
                    $('.SB4T2').remove();
                    $('ul.categoryList li.category4T').remove();
                    $('ul.productList li.searchProduct4T').remove();
                  
                    $.ajax({
                       
                        url: "//" + _4TellBoost.Service.address + "rest/Search?clientAlias=" + _4TellBoost.SiteInfo.alias
                          + "&searchTerm=" + inputValue + "&format=json&numResults=5",
                        type: "GET",
                        data: JSON.stringify(),
                        contentType: "text/plain",
                        dataType: "json",
                        success: function (data) {
                            _4TellBoost.searchBoostResults = data;
                            _4TellBoost.dataAvailable = true;
                            
                        },
                        timeout: _4TellBoost.SiteInfo.timeOut
                    });
                }
            }
        });
        
        window.setInterval(function(){
            if(_4TellBoost.dataAvailable === true){
                _4TellBoost.dataAvailable = false,
                //DEACTIVATE LOADING GIF
                $('.loading4T').css('display','none');
                
                $('.ul-title').show();
                $('li.category4T').remove();

                //SET UP UL FOR CATEGORIES 
                var length = _4TellBoost.searchBoostResults.SearchResult.Categories.length;   
                for (var i = 0; i < length; i++) {
                    // Do something with yourArray[i].
                    var categoryName = _4TellBoost.searchBoostResults.SearchResult.Categories[i].Name;
                    var categoryID = _4TellBoost.searchBoostResults.SearchResult.Categories[i].Id;
                    
                    var categoryLi = $('<li class="category4T" id="' + categoryID + '">' + categoryName + '</li>');
                    categoryUL.append(categoryLi);
                    
                   
                    
                }
                
                
                //MAKE CALL TO OUR SERVICE TO GET TOP SELLERS FOR FIRST RESULT 
                 $('.SB4T').remove();
                 $('.SB4T2').remove();
                 
                 if ($('li.category4T:first-of-type').length > 0) {
                    //give the first li priority
                    $('li.category4T:first-of-type').addClass('selected');
                    
                     
                    _4TellBoost.Service.called = false;
                    _4TellBoost.Service.lastDivIDs = [];
    	            _4TellBoost.Touts = [];
                    _4TellBoost.setPageType("SearchBoostCat");
                    _4TellBoost.getRecommendations("SearchBoostCat", "");

                 } 
        
                //ADD CLICK FUNCTIONALITY TO OTHER CATEGORIES
                $('li.category4T').click(function(){
                    
                    var id = $(this).attr('id');
                    var name = $(this).html();
                    var index = $(this).index();
                    
                    //add new name to input
                    $('input.searchBoost4T').val( name );
                    
                    //send events when some one types in the input
                    ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName , 'SearchResult-CategoryList', id, index);
                    
                    //remove old selected class
                    
                    $('li.category4T.selected').removeClass('selected');
                    $('li.searchProduct4T.selected').removeClass('selected');
                    //add new selected class
                    
                    $(this).addClass('selected');
                    
                    //remove old recs
                    $('.SB4T').remove();
                    $('.SB4T2').remove();
                    
                    setTimeout(function(){
                    //make the call to our service again
                    
                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
            	        _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchBoostCat");
                        _4TellBoost.getRecommendations("SearchBoostCat", "");
                    
                    }, 100);
                });
                
                
                
                
                
                //SET UP UL PRODUCTS LIST
                $('.searchProduct4T').remove();
                
                var pLength = _4TellBoost.searchBoostResults.SearchResult.Items.length;   
                for (var i = 0; i < pLength; i++) {
                    
                    // Do something with yourArray[i].
                    var productName = _4TellBoost.searchBoostResults.SearchResult.Items[i].Name;
                    var productID = _4TellBoost.searchBoostResults.SearchResult.Items[i].Id;
                    
                    var productLi = $('<li class="searchProduct4T" id="' + productID + '">' + productName + '</li>');
                    productUL.append(productLi);
                    
                    
                    
                }
             
                 if ($('li.category4T:first-of-type').length < 1){
                    
                    $('.ul-title.category').css('display','none');
                    
                     if($('li.searchProduct4T:first-of-type').length > 0) {
                        //give the first li priority
                        $('li.searchProduct4T:first-of-type').addClass('selected');
                        
                         
                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
        	            _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchBoostProd");
                        _4TellBoost.getRecommendations("SearchBoostProd", "");
                     } else {
                          //$('.noResults').css('display','block');
                          $('.searchBoostRecWrapper4T').fadeOut();
                          $('.ul-title').css('display','none');
                          
                     }
                     
                 } 
                 
                //ADD CLICK FUNCTIONALITY TO OTHER CATEGORIES
                $('li.searchProduct4T').click(function(){
                    
                    var id = $(this).attr('id');
                    var index = $(this).index();
                    //send events when some one types in the input
                    ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName, 'SearchResult-ProductList', id, index);
                    
                    //remove old selected class
                    
                    $('li.category4T.selected').removeClass('selected');
                    $('li.searchProduct4T.selected').removeClass('selected');
                    
                    //add new selected class
                    
                    $(this).addClass('selected');
                    
                    //remove old recs
                    $('.SB4T').remove();
                    $('.SB4T2').remove();
                    
                    setTimeout(function(){
                    //make the call to our service again
                    
                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
            	        _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchBoostProd");
                        _4TellBoost.getRecommendations("SearchBoostProd", "");
                    
                    }, 100);
                });
            }
        }, 100);
        
        
    }
    
    _4TellBoost.detectCartPage = function () {
        //Search Results
        if(window.location.href.indexOf("easternleaf.com/searchresults.asp?") > -1) {
           
           _4TellBoost.UserData.load();
           if(_4TellBoost.UserData.session.recentSearchActive !== true) {
               return;
           } else {
               _4TellBoost.UserData.session.recentSearchActive = false;
               _4TellBoost.setPageType('SearchResults');
                var  CATID = _4TellBoost.UserData.session.recentSearchId;
                _4TellBoost.setCatId(CATID);
                _4TellBoost.UserData.save();
                return;
               
           }
        }
            

        //check for product page
        var productImg = $("img.vCSS_img_product_photo, img.vCSS_img_product_photo_small, img#product_photo");
        if (productImg && productImg.length) {
            _4TellBoost.setPageType('ProductDetail');
            $.each(productImg, function () {
                var imageSrc = $(this).attr("src");
                //ID from imageSrc is less than 100% reliable.
                var id = $("input[name=ProductCode]").val() || getProductIdFromImageSrc(imageSrc);
                if (id) {
                    _4TellBoost.addProductID(id);
                }
            });
            return;
        }

        //check for cart page
        productImg = $("td.v65-cart-detail-productimage").children("img");
        //the above does not work on Artisan Wine Depot.
        if (!(productImg && productImg.length)) {
            productImg = $('td:has(img[src*="btn_cart_remove.gif"]) ~ td:has(img)').children("img");
        }

        if (productImg && productImg.length) {
            _4TellBoost.setPageType('AddToCart');
            _4TellBoost.UserData.clearCart();
            $.each(productImg, function () {
                var imageSrc = $(this).attr("src");
                var id = getProductIdFromImageSrc(imageSrc);
                if (id && id.match("nophoto")) {
                    //No photo to scrape from, so we'll grab the ID from elsewhere.
                    var foo = $(this).closest("tr").find(".v65-cart-details-cell a.carttext");
                    id = foo && foo.attr("href");
                    id = id && id.match(/(?:ProductCode=)([\w%]+)&/);
                    id = id && id[1];
                }
                if (id) {
                    _4TellBoost.addCartItem(id);
                }
            });
            return;
        }

        //check for search and category results
        var results = $("form.search_results_section");
        if (results && results.length) {
            var CATID = $("input[name=Cat]").val();
            if (CATID && CATID.length) {
                _4TellBoost.setPageType("Category");
                _4TellBoost.setCatId(CATID);
            } else {
                _4TellBoost.setPageType('Search');

                resultLinks = results.find("a[title]:has(img)");
                if (resultLinks && resultLinks.length) {
                    $.each(resultLinks, function (index) {
                        if (index >= 20)
                            return false;

                        var imageSrc = $(this).children("img").attr("src");
                        //find product code. Images are unreliable, so they're just backup.
                        var id = $(this).attr("href").replace(/\S+\//, "").replace(/\.html?/, "");
                        id = id || getProductIdFromImageSrc(imageSrc);
                        if (id) {
                            _4TellBoost.addProductID(id);
                        }
                    });
                }
            }
            return;
        }

        //check for home page
        var featuredProds = $("table.v65-productDisplay");
        if (featuredProds && featuredProds.length) {
            _4TellBoost.setPageType('Home');
            //No products to interest us.
            return;
        }

        //From Volusion support.
        //Had to change the second check to fix case-sensitivity. Default != default.
        var onHomePage = (location.pathname == "/") || (location.pathname.match(/default.asp/i));
        if (onHomePage) {
            _4TellBoost.setPageType('Home');
            //Still no products to interest us.
            return;
        }

        //Check for invoice page.
        //Apparently casting UNDEF to boolean doesn't get false, it just gives REFERENCEERROR
        if (typeof (Order) != "undefined" && (Order.length > 9) && OrderDetails && OrderDetails.length) {
            _4TellBoost.reportSales();
        }

        _4TellBoost.setPageType('Auto');
        return;
    };

    function getProductIdFromImageSrc(imageSrc) {
        if (imageSrc.indexOf('clear1x1') > -1) return null;
        //find product code
        imageSrc = decodeURI(imageSrc);
        var index1 = imageSrc.lastIndexOf('/');
        if (index1 > -1) {
            index1 += 1;
            var id = '';
            //remove file extension
            var index2 = imageSrc.lastIndexOf(".");
            if (index2 > -1)
                id = imageSrc.substring(index1, index2);
            else
                id = imageSrc.substring(index1);
            //remove image id number
            var index3 = id.lastIndexOf('-');
            if (index3 > 0)
                id = id.substring(0, index3);
            return id;
        }
        return null;
    };

    _4TellBoost.getRatingImage = function (rating) {
        var rateVal = parseFloat(rating);
        if (isNaN(rateVal) || rateVal < 0) return $("<div class='ratingImage'/>");
        //ignore negative and NaN ratings.
        rateVal = Math.min(rateVal, 5);

        var imagePath = "";
        var star = String(Math.floor(rateVal));
        if (_4TellBoost.SiteInfo.ratings)
            imagePath = _4TellBoost.SiteInfo.ratings[star]; //Custom ratings images.
        else
            imagePath = _4TellBoost.loadpath + 'images/star' + star + '.png';

        var ratingImageLink = '';
        if (_4TellBoost.SiteInfo.includeBase)
            ratingImageLink = '//' + _4TellBoost.SiteInfo.baseURL + '/';
        ratingImageLink += imagePath;
        var rating = $("<div class='ratingImage'/>");
        var img = $("<img class='ratingImageImg'/>");
        img.attr("src", ratingImageLink);
        img.appendTo(rating);
        return rating;
    };


    _4TellBoost.getProdImg = function (tout, itemdata) {
        //Boilerplate. This will make things complicated if we need to refactor
        var frameTarget = '';
        if (tout.inFrame) frameTarget = "target='_parent' ";
        var itemType = _4TellBoost.resultTypes[itemdata.resultType] || itemdata.resultType;
        var trackFunc = itemdata.trackFunc || 'onclick="_4TellBoost.TrackGA(' + "'0','" + _4TellBoost.Service.pageType + "-" + itemType + "','" + itemdata.productID +
                          "','" + itemdata.pageLink + "');return false;" + '"';
        var pageLink = '';
        if (_4TellBoost.SiteInfo.includeBase)
            pageLink = 'http://' + _4TellBoost.SiteInfo.baseURL + '/'; //link to PDP should not be https
        pageLink += itemdata.pageLink;

        var prodImage = $("<div class='" + tout.productImageStyle + "' />");
        var img = $('<img class="productImageImg" onerror="_4TellBoost.ImgError(this);"/>');
        img.attr("src", _4TellBoost.SiteInfo.emptyImage);
        img.attr("data-src", itemdata.imageLink);
        img.attr("alt", itemdata.title);
        img.appendTo(prodImage);
        img.wrap("<a href='" + pageLink + "' " + frameTarget + trackFunc + ' ></a>');
        
        var description = itemdata.description;
        var descriptionDiv = $('<div class="description">' + description + '</div>');
        descriptionDiv.appendTo(prodImage);
        
        return prodImage;
    };

    _4TellBoost.ImgError = function (source) {
        var JPGSRC = source.src;
        if (JPGSRC.match(/jpg$/)) {
            //Let's try this with a GIF.
            JPGSRC = JPGSRC.replace(/jpg$/i, "gif");
            source.src = JPGSRC;
        } else {
            if (_4TellBoost.SiteInfo.hideIfNoImage) {
                var prodID = getProductIdFromImageSrc(JPGSRC);
                var containerDiv = $(source).parents("#" + _4TellBoost.FirstTout.newDivID + ", #" + _4TellBoost.SecondTout.newDivID);
                var foo = containerDiv.find("div.product4T:has(img[src*=" + prodID + "])");
                var newDiv = containerDiv.find("div.product4T:hidden:first");
                if (newDiv) {
                    if (foo.is(":visible"))
                        newDiv.css("display", "");
                    newDiv.replaceAll(foo);
                }
            } else {
                source.src = _4TellBoost.SiteInfo.emptyImage;
                source.onerror = "";
            }
        }
    };

    _4TellBoost.reportSales = function () {
        _4TellBoost.setPageType('OrderConfirmation');
        var operation = 'upload/singleSale';
        var orderID = OrderDetails[0][0];
        if (Order[9]) _4TellBoost.setCustomerID(Order[9]);
        var userID = _4TellBoost.getCustomerID();
        userID = hex_md5(userID);
        //Just an alias; saves checking those three flags later.
        var ourTracking = _4TellBoost.SiteInfo.autoTracking && "function" === typeof (_4TTracker) && "object" == typeof (Order);
        if (ourTracking) 
        {
            _4TTracker('require', 'ecommerce', 'ecommerce.js');
            _4TTracker('ecommerce:addTransaction', {
                'id': orderID,
                // Transaction ID. Required.
                'affiliation': _4TellBoost.SiteInfo.alias,
                // Affiliation or store name.
                'revenue': Order[2],
                // Grand Total.
                'shipping': Order[5],
                // Shipping.
                'tax': Order[4]// Tax.
            });
        }
        for (var i = 0; i < OrderDetails.length; i++) {
            if (OrderDetails[i].length > 6) {
                // Assemble the url to call
                var query = '?clientAlias=' + _4TellBoost.SiteInfo.alias +
                    '&customerID=' + userID +
                    '&productID=' + OrderDetails[i][2] +
                    '&quantity=' + OrderDetails[i][6] +
                    '&orderID=' + orderID;
                _4TellBoost.call4TellRest(operation, query);
                var reportImg = new Image();
                reportImg.src = "https://email.4-tell.net/Boost/o/report.gif?clientAlias=" + _4TellBoost.SiteInfo.alias 
                + "&customerID=" + userID + 
                "&productID=" + OrderDetails[i][2] + 
                "&quantity=" + OrderDetails[i][6] + 
                "&orderID=" + orderID
                if (ourTracking) 
                {
                    _4TTracker('ecommerce:addItem', {
                        'id': orderID,
                        // Transaction ID. Required.
                        'name': OrderDetails[i][3],
                        // Product name. Required.
                        'sku': OrderDetails[i][2],
                        // SKU/code.
                        'category': OrderDetails[i][4],
                        // Category or variation.
                        'price': OrderDetails[i][5],
                        // Unit price.
                        'quantity': OrderDetails[i][6]// Quantity.
                    });
                }
            }
        }
        if (ourTracking)
            _4TTracker('ecommerce:send');
    };

    function delayToGetItems(delayDiv) {
        var delayContainer = $(delayDiv);
        if (!delayContainer) {
            return
        }
        _4TellBoost.DelayHandler.callback = function() {
            var toutDiv = $(_4TellBoost.DelayHandler.toutDiv);
            if (!toutDiv || !(toutDiv.length)) {
                _4TellBoost.DelayHandler.ended = false
            }
        }
        ;
        _4TellBoost.SiteInfo.delay = true;
        _4TellBoost.delayUntilLoaded(delayContainer)
    }
    _4TellBoost.UserData = {
        data: {
            UID: '', //User ID in cart
            RID: "4T-" + Math.floor(Math.random() * 1000000), //semi-random anonymous ID.
            testGroup: null, //Persistent storage of whether a user's A or B.
            Viewed: new Array(),
            likes: new Array(),
            dislikes: new Array()
        },

        //Separate so they get saved separate from everything else.
        session: {
            sessionTest: null,
            recentSearchId: null,
            recentSearchActive: null,
            recentCatID: null
        },
        cart: new Array(),
        clearCart: function () {
            this.cart = new Array();
        },

        //Used to prune clickstream data for brevity.
        maxNumViewed: 5,

        // Load from cookie.
        load: function () {
            var the_cookie = document.cookie.split(';');
            for (var i = 0; i < the_cookie.length; i++) {
                var x = the_cookie[i].substr(0, the_cookie[i].indexOf("=")).replace(/^\s+|\s+$/g, "");
                var y = the_cookie[i].substr(the_cookie[i].indexOf("=") + 1);
                if (x === "4Tell") {
                    var foo = JSON.parse(unescape(y));
                    //To filter out bad cookies.
                    if (foo.Viewed && typeof (foo.Viewed) === "object")
                        this.data = foo;
                } else if (x === "4TellSession") {
                    var foo = JSON.parse(unescape(y));
                    if (typeof (foo) === "object") {
                        this.session = foo;
                        
                    }
                } else if (x === "4TellCart") {
                    var foo = JSON.parse(unescape(y));
                    if (typeof (foo) === "object")
                        this.cart = foo;
                }
            }
            //Block the dislikes when we load them.
            for (i = 0; i < this.data.dislikes.length; i++) {
                _4TellBoost.addBlockItem(this.data.dislikes[i]);
            }

            //Prune viewed data on load.
            var validItems = 0;
            var viewedIDs = new Array();
            for (i = 0; i < this.data.Viewed.length; i++) {
                var index = $.inArray(this.data.Viewed[i], this.data.Viewed)
                if (index === i) {
                    viewedIDs.push(this.data.Viewed[i]);
                    validItems++;
                    if (validItems === _4TellBoost.UserData.maxNumViewed) {
                        this.data.Viewed = viewedIDs;
                        break;
                    }
                }
            }
            _4TellBoost.UserData.setTestGroup();

            return this.data;
        },
        // Save to cookie. Put expires in the past to delete the cookie.
        save: function (expires, path) {
        	var x = false;
        	if (typeof Array.prototype.toJSON != "undefined") {
	            x = Array.prototype.toJSON;
	            delete Array.prototype.toJSON;
            }
            var date = expires;
            if (!date) {
            	date = new Date();
            	date.setFullYear(date.getFullYear() + 5);
            }
            var p = path || '/';
            //get domain, removing the subdomain (if any)
            var d = window.location.host.match(/([a-zA-Z\-0-9]{2,63})\.([a-zA-Z\.]{2,5})$/);
            if (typeof d == "undefined") return;
            d = d[0];
            document.cookie = '4Tell=' + escape(JSON.stringify(this.data))
                          + ';path=' + p
                          + ';domain=' + d
                          + ';expires=' + date.toUTCString();
            document.cookie = '4TellSession=' + escape(JSON.stringify(this.session))
                + ';path=' + p
                + ';domain=' + d;
            date = new Date();
            date.setMonth(date.getMonth() + 1);
            document.cookie = '4TellCart=' + escape(JSON.stringify(this.cart))
                          + ';path=' + p
                          + ';domain=' + d
                          + ';expires=' + date.toUTCString();
            if (x) {
                Array.prototype.toJSON = x;
            }
        },
        
        setTestGroup: function (AorB) {
            if (!_4TellBoost.SiteInfo.ABTesting) return false;
            if ("undefined" != typeof (AorB)) {
                //Check for numeric AorB. 0 is a valid setting and also false.
                //It also accepts "0" as a valid input. Bonus. 
                if ($.isNumeric(AorB))
                    this.data.testGroup = parseInt(AorB);
                    //String, for accepting "A", "b", and "Alpha" as inputs.
                else if (AorB && AorB.length)
                    //Converts ASCII character to number; "A" = 65 in ASCII, so we subtract that to get something useable.
                    this.data.testGroup = AorB.toUpperCase().charCodeAt(0) - 65;
            } else {
                //testGroup has been set and we're persistent
                if (window.top._4TellBoost.UserData.data.testGroup !== null && _4TellBoost.SiteInfo.persistentTesting)
                    this.data.testGroup = window.top._4TellBoost.UserData.data.testGroup;
                else {  //Testgroup is unset or we're not persistent
                    this.data.testGroup = (this.session.sessionTest != null) ? this.session.sessionTest :
                        Math.floor(_4TellBoost.SiteInfo.ABTesting * Math.random());
                }
            }
            //Bounding, to make sure testGroup is always between 0 and ABTesting.
            this.data.testGroup = Math.max(0, Math.min(_4TellBoost.SiteInfo.ABTesting - 1, this.data.testGroup));
            this.session.sessionTest = this.data.testGroup;

            _4TellBoost.TrackGA(3, "4Tell" + String.fromCharCode(65 + this.data.testGroup) + "Web", null, null, null, null, true)

            this.save();
            return this.data.testGroup;
        }
    };
    _4TellBoost.getBuyBtn = function (tout, itemdata) {
        var buyWrapper = $("<div class='productBuy' />");
        var buyBtn = $("<" + _4TellBoost.SiteInfo.addCartBtnAtts + " />");
        if (buyBtn)
            buyBtn.appendTo(buyWrapper);
        var newAddress = itemdata.pageLink;

        //can't wrap with a-href in IE so add new address to the onclick handler
        buyBtn.click(function () {
            _4TellBoost.TrackClick(tout.toutType, itemdata.productID, newAddress);
        });
        return buyWrapper;
    };
}(window._4TellBoost = window._4TellBoost || {}, jQuery));