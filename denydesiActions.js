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
        $('header .search-wrap input.search-input:first').addClass('searchBoost4T').attr('autocomplete',"off").removeClass('search-input');
        
        var searchButton = $('<div class="searchImage"></div>');
        var recWrapper = $('<div class="searchBoostRecWrapper4T"></div>');
        var categoryListWrapper = $('<div class="categoryListWrapper"></div>');
        var categoryUL = $('<ul class="categoryList"></ul>');
        var categoryULTitle = $('<span class="ul-title category">Categories</span>');
        
        var noResults = $('<span class="noResults">No results found. Check the spelling, try a more general term or look up a specific product or designer.</span>');
        
        var productListWrapper = $('<div class="productListWrapper"></div>');
        var productUL = $('<ul class="productList"></ul>');
        var productULTitle = $('<span class="ul-title product">Products</span>');
        var divSelect = $('<div class="tout1_searchBoost_4T"></div>');
        var loadingGIF = $('<img class="loading4T" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>');
        var closeButton = $('<span class="closeButton">X</span>');
        var expandButton = $('<label class="expandSearch">SEE ALL RESULTS ></label>');
        var caption = $('<label class="searchCaption">SEARCH RESULTS</label>');

        _4TellBoost.dataAvailable = false;
        
        //append them
        productListWrapper.append(productULTitle, productUL);
        categoryListWrapper.append(categoryULTitle, categoryUL);
        recWrapper.append(loadingGIF, caption, closeButton, productListWrapper, divSelect, expandButton, noResults); 
        
        //removing categoryListWrapper, from above list after closebutton
        
        //searchBarWrapper.append(searchBar, searchButton); 
        $('header .search-wrap:first').wrap( searchBarWrapper );
        $('header .search-wrap:first').append( recWrapper );
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
            $( 'header .search-wrap:first form' ).submit();
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
        //setup before functions
        var typingTimer;                //timer identifier
        var doneTypingInterval = 200;  //time in ms, .5 second for example
        
        //on keydown, clear the countdown 
        $('.searchBoost4T').on('keydown', function () {
          clearTimeout(typingTimer);
        });
        
        //user is "finished typing," do something
        function doneTyping () {
          //do something
          if (count > 2) {
                
                var inputValue = $('.searchBoost4T').val();
 
                //send events when some one types in the input
                ga('send', 'event', '4TellSearch' , 'keyStroke', inputValue);
                
                if (inputValue.length < 3) {
                    count = inputValue.length;
                    $('.searchBoostRecWrapper4T').hide();
                }else {
                    
                    //CUSTOM CODE TO ALLOW PLURAL SEARCHES LIKE "THROW PILLOWS"
                    if (inputValue.endsWith('s')) {
                        inputValue = inputValue.slice(0, -1);
                    }
                    
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
                          + "&searchTerm=" + inputValue + "&format=json&numResults=8",
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
        }
        $('.searchBoost4T').keyup(function (e)  {
            
            //on keyup, start the countdown
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
                
            count = count + 1; 
            $('.SB4T').remove();
            $('.SB4T2').remove();
            
            $('.ul-title').css('display','none');
            $('.noResults').css('display','none');
             
            //remove old results
            $('ul.categoryList li.category4T').remove();
            $('ul.productList li.searchProduct4T').remove();

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
                          $('.noResults').css('display','block');
                          //$('.searchBoostRecWrapper4T').fadeOut();
                          $('.ul-title').css('display','none');
                          
                     }
                     
                 } 
                 
                //ADD CLICK FUNCTIONALITY TO OTHER CATEGORIES
                $('li.searchProduct4T').click(function(){
                    
                    var id = $(this).attr('id');
                    var index = $(this).index();
                    
                    var name = $(this).html();

                    //add new name to input
                    //$('input.searchBoost4T').val( name );
                    
                    //send events when some one types in the input
                    ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName, 'SearchResult-ProductList', id, index);
                    
                    //remove old selected class
                    
                    $('li.category4T.selected').removeClass('selected');
                    $('li.searchProduct4T.selected').removeClass('selected');
                    
                    //add new selected class
                    
                    $(this).addClass('selected');
                    
                    //remove old recs
                    //$('.SB4T').remove();
                    $('.SB4T2').remove();
                    
                    setTimeout(function(){
                    //make the call to our service again
                    
                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
            	        _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchBoostProd2Only");
                        _4TellBoost.getRecommendations("SearchBoostProd2Only", "");
                    
                    }, 100);
                });
            }
        }, 100);
        
        
    }
    
    
    _4TellBoost.detectCartPage = function () {

        //product detail page
        var shibboleth = $(".template-product, .product_name, div.product_slider, #productImage, #product, #product-photos, .product-thumbnails, .product-big-image");
        if (shibboleth && shibboleth.length) {
            _4TellBoost.setPageType("ProductDetail");
            var id = __st.rid.toString();            
            if (id && id.length) {
                _4TellBoost.addProductID(id);
            }
            
            $('.submit-wrapper input.submit').click(function() {
                _4TellBoost.addCartItem(id);
            });
            return;
        }
        //view-cart page
        shibboleth = $(".template-cart, #shopping-cart-table, .continue_shopping, #cartform, .cart-products, #cart_form, .cart-products-div1");
        if (shibboleth && shibboleth.length) {
           _4TellBoost.setPageType("AddToCart");
            /*for (i = 0; i < _4TellBoost.UserData.cart.length; i++) {
                var cartId = _4TellBoost.UserData.cart[i];
                if (cartId) {
                    _4TellBoost.addCartItem(cartId);
                }
            }*/
            return;
        }

        //home page
        shibboleth = $(".template-index, .homepage_content, .homepage-container, #home-promos, #homepage_slider, #homePagePromo");
        if (shibboleth && shibboleth.length) {
            _4TellBoost.setPageType("Home");
            return;
        }
        //category page
        shibboleth = jQuery(".template-collection ul.product-list li.product");
        if (shibboleth && shibboleth.length) {
            _4TellBoost.setPageType("Category");
            //var CATID = __st.rid.toString();
            
            var url = window.location.href;
            var array = url.split('/');
            
            var lastsegment = array[array.length-1];
            
            CATID = 'pmg:' + lastsegment + ',psc:' + lastsegment + ',pro:' + lastsegment;
            
            if(CATID && CATID.length){
                _4TellBoost.setCatId(CATID);
            }
            return;
        }
        //404 Error Page
        shibboleth = jQuery("#error-page");
        if (shibboleth && shibboleth.length) {
            _4TellBoost.setPageType("E404");
            return;
        }
		//search page
        var results = $("div.results-view");
        if (results && results.length) {
            var resultImg = results.find("span[id*='product-price']");
            if (resultImg && resultImg.length) {
                _4TellBoost.setPageType("Search");
                $.each(resultImg, function () {
                    var id = $(this).attr("id").match(/\d+/);
                    if (id) {
                        _4TellBoost.addProductID(id);
                    }
                });
                $("p.sku").each(function () {
                    console.log($(this).text().match(/(?:\s+)(\w+)/));
                });
                return;
            }
        }
        _4TellBoost.setPageType("Auto");
        return;
    };
    if (_4TellBoost.CONFIG.SiteInfo.personalRecPageEnable === true){

        // find and create all our variables
        var body = $('body');
        var overlay = $('<div class="fprPopUpOverlay4T" style="display:none;"></div>');
        
        //create the logo src here 
        var logo = $('<img src="http://cdn.shopify.com/s/files/1/0265/0083/t/32/assets/new-logo.png?932110994649985776" class="logo4T"/>');
           
        
        //Create the title here
        var title = $('<h2 class="title4T">We found some products we think you will like.</h2>');
    
        //create the subtitle here
        var subtitle = $('<span class="subtitle4T">The more you browse the better these will become!</span>');
    
        var Wrapper = $('<div class="popUpWrapper4T"></div>');
        var closeButton = $('<label class="closeButton">Continue Shopping ></label>');
        var closeButton2 = $('<label class="closeButton2">Continue Shopping ></label>');
         //start appending everything to create the layout
        Wrapper.append(closeButton, logo, title, subtitle, closeButton2); 
        overlay.append(Wrapper);
        body.append(overlay);
    
        
        overlay.fadeOut(1);
        
        
        //add the close functionality
        $( closeButton ).click(function() {
            overlay.fadeOut().removeClass('selected');
        });
        $( closeButton2 ).click(function() {
            overlay.fadeOut().removeClass('selected');
        });
        
        $('.fprPopUpOverlay4T').click(function (e) {
            var clicked = '#' + e.target.id;
            if (clicked === '#') {
                var clicked = '.' + e.target.className;
            }
            if($('.fprPopUpOverlay4T').find(clicked).length !== 0) {
                return;
            } else {
                overlay.fadeOut();
            }
        });
        
        
        //append the button here
        _4TellBoost.CONFIG.SiteInfo.personalRecPageButtonSelect.append("<a title='Recommendations For You.' class='clickMe4T' id='clickMe4T' href='#'>My Recommendations</a>");
        if (_4TellBoost.UserData.cart &&_4TellBoost.UserData.cart.length){
        } else if(_4TellBoost.UserData.data.Viewed && _4TellBoost.UserData.data.Viewed.length) {
        }else {
            $('.clickMe4T').html('Best Sellers');
            $('.clickMe4T').css('right','-38px');
        }
        
        var clickMe = $('.clickMe4T');
        clickMe.click(function(){
            $('.fprPopUpOverlay4T').fadeIn().addClass('selected');
            
        });
    }
    var personalRecTimer = setInterval(function () {
        var personalRecPage = $(".fprPopUpOverlay4T.selected");
        if (personalRecPage && personalRecPage.length) {
            _4TellBoost.Service.called = false;
            _4TellBoost.Service.lastDivIDs = [];
	    _4TellBoost.Touts = [];
	        clearInterval(personalRecTimer);
            _4TellBoost.setPageType("PersonalRecPage");
            _4TellBoost.getRecommendations("PersonalRecPage", "");
            
        }
    }, 100);
    _4TellBoost.getProdImg = function (tout, itemdata) {
        var frameTarget = "";
        if (tout.inFrame) {
            frameTarget = "target='_parent' ";
        }
        var itemType = _4TellBoost.resultTypes[itemdata.resultType] || itemdata.resultType;
        var trackFunc = itemdata.trackFunc || 'onclick="_4TellBoost.TrackGA(' + "'0','" + _4TellBoost.Service.pageType + "-" + itemType + "','" + itemdata.productID +
                          "','" + itemdata.pageLink + "');return false;" + '"';
        var pageLink = "";
        if (_4TellBoost.SiteInfo.includeBase) {
            pageLink = "http://" + _4TellBoost.SiteInfo.baseURL;
        }
        pageLink += itemdata.pageLink;
        var prodImage = $("<div class='" + tout.productImageStyle + "' />");
        if (tout.carousel.lazyLoad != true) {
            var imgClass = "productImageImg";
        } else {
            var imgClass = _4TellBoost.CONFIG.SiteInfo.lazyOwl ? "lazyOwl" : "productImageImg";
        }
        var img = $('<img class="' + imgClass + '" onerror="_4TellBoost.ImgError(this);"/>');
        img.attr("src", _4TellBoost.SiteInfo.emptyImage);
        img.attr("data-src", itemdata.imageLink);
        img.attr("alt", itemdata.title);
        img.appendTo(prodImage);
        img.wrap("<a href='" + pageLink + "' " + frameTarget + trackFunc + " ></a>");
        var productType = itemdata.productType.replace(/-/g, ' ');
        var $prodTypeDiv = $("<div class='pType4T'>"+ productType +"</div>");
        var brand = itemdata.brand.replace('DENY','By');
        var $brandDiv = $("<div class='brand4T' prodId='"+ itemdata.productID +"' >"+ brand +"</div>");
        $prodTypeDiv.appendTo(prodImage);
        $brandDiv.appendTo(prodImage);
        //$prodTypeDiv.wrap("<a href='" + pageLink + "' " + frameTarget + trackFunc + " ></a>");
        //$brandDiv.wrap("<a href='" + pageLink + "' " + frameTarget + trackFunc + " ></a>");

        
        return prodImage;
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