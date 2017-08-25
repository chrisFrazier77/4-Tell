(function (_4TellBoost, $, undefined) {
    _4TellBoost.Service.customLoaded = true;
    
    //Start of search
    
    //Human-readable ID types, so we can distinguish web recs from email from eventually ads and other rec types.
    //old
    //_4TellBoost.trackIdTypes = ["4TellRecsWeb", "4TellRecsEmail", "4TellRecsAd", "4TellMVTesting"];
    //new
    _4TellBoost.trackIdTypes = ["4TellRecsWeb", "4TellRecsEmail", "4TellRecsAd", "4TellMVTesting", "4TellSearch", "4TellRecsSearch", ];

    //old 
    //_4TellBoost.resultTypes = ['CrossSell', 'Personal', 'Blended', 'Similar', 'TopSellers','CategoryTopSellers', 'ManualCrossSell', 'ManualSimilar'];
    //new 
    _4TellBoost.recResultTypes = ['CrossSell', 'Personal', 'Blended', 'Similar', 'TopSellers','CategoryTopSellers', 'FeaturedCrossSell','FeaturedSimilar', 'FeaturedTrending', 'FeaturedCategoryTopSellers', 'LastPurchase', 'CurrentCart', 'RecentlyViewed', 'Session'];
    
    //should rerout the old to the new 
    _4TellBoost.resultTypes = _4TellBoost.recResultTypes;

    //some new result types for search
    _4TellBoost.searchResultTypes = ['ProductList', 'Product', 'Similar', 'Cross-Sell', 'Personal', 'CategoryList', 'Category', 'CategoryTopSellers', 'Expand', 'Facet', 'SortOrder', 'PageChange','KeyStroke'];
    
    _4TellBoost.TrackGA = function (
	        //tracking type; desktop/web recs, email, ads, possibly some kind of telepathy, and any other future expansion.
	        trackId,
	        //Pagetype
	        sourceName,
	        //Result type
	        resultId,
	        //Obvious. For preference use product name. 
			productID,
	        //Position in email recs; first/third/ninth rec.
	        position,
	        //if we need to transition to a new address, like say the add-to-cart URL.
	        newAddress,
	        //Non-interaction; used so we don't mess up bounce rates.
	        noBounce
        ) {

        if (_4TellBoost.SiteInfo.GA_UA.length > 0) {

			if (isNaN(trackId) || trackId < 0) trackId = 0;
	        var trackName = _4TellBoost.trackIdTypes[trackId];
			if (!sourceName) sourceName = '';
			if (!productID) productID = '';
	        var itemName = sourceName;
	        if (resultId) {
	            
	            //If  trackIdTypes is 0 through 3, use recResultTypes. 
	            //If trackIDTypes is 4 or 5, use searchResultTypes.
	            if (trackId > 3) {
	                itemName += "-" + _4TellBoost.searchResultTypes[resultId];
	            } else {
	                itemName += "-" + _4TellBoost.recResultTypes[resultId];
	            }
	            //itemName += "-" + _4TellBoost.resultTypes[resultId];
	        } else {
	            resultId = '';
	        }
	        
	        //this tracking series is for email? 
	        var trackingSeries = location.search.match(/(?:4Tt1=)([\w+,?]+)[&\?]?/);
	        if (trackingSeries && trackingSeries[1]) {
	            itemName += "-" + trackingSeries[1];
	        }
	        trackingSeries = location.search.match(/(?:4Tt2=)([\w+,?]+)[&\?]?/);
	        if (trackingSeries && trackingSeries[1]) {
	            itemName += "-" + trackingSeries[1];
	        }
	        
	        //no bounce is important
	        noBounce = (noBounce != undefined) ? noBounce : false;
	        if (isNaN(position)) position = '0';
        
        	var trackingSent = false;
            if ("object" == typeof (dataLayer)) {
                dataLayer.push({
                    'event': '4Tell', 'eventCategory': trackName,
                    'eventAction': itemName, 'eventLabel': productID, 'eventValue': position
                });
                trackingSent = true;
            }
            if ("object" == typeof (_gaq)) {
                window._gaq = window._gaq || [];
                window._gaq.push(['_setAccount', _4TellBoost.SiteInfo.GA_UA],
                    ['_trackEvent', trackName, itemName, productID, parseInt(position), noBounce]);
                trackingSent = true;
            }
            if ("function" === typeof (ga)) {
                ga('send', "event", trackName, itemName, productID, position, { "nonInteraction": noBounce });
                trackingSent = true;
            }
            if ("function" === typeof (_4TTracker)) {
                _4TTracker('send', "event", trackName, itemName, productID, position, { "nonInteraction": noBounce });
                trackingSent = true;
            } 
            if (!trackingSent)
                console.log("GA tracking method not found");
            
        }else {
            console.log("GA-UA not set");
        }
        if (newAddress) {
	        var oneShot = setTimeout(function () {
	        	clearInterval(oneShot);
                window.top.location = newAddress;
        	}, 150);
        }
    };
    
    if (_4TellBoost.CONFIG.SiteInfo.searchBoostEnable === true) {
        
        // find and create all our variable
        var searchBarWrapper = $('<div class="searchBoostWrapper4T"></div>');
    
       //why isnt load running already?
        _4TellBoost.UserData.load();
    
        //USE THIS WHEN USING AN EXISTING SEARCH BAR      
        //_4TellBoost.CONFIG.SiteInfo.searchInput.addClass('searchBoost4T').attr('onsubmit',"event.preventDefault(); _4TellBoost.validateMyForm4T();");
       
        $('.container .actions').append($('<input type="text" class="searchBoost4T" onsubmit="event.preventDefault(); _4TellBoost.validateMyForm4T();"/>'));
        
        var recWrapper = $('<div class="searchBoostRecWrapper4T"></div>');
        var categoryListWrapper = $('<div class="categoryListWrapper"></div>');
        var categoryUL = $('<ul class="categoryList"></ul>');
        var categoryULTitle = '';
        
        if($(window).width() <= 1024){
            categoryULTitle = $('<span class="ul-title category">Select A Category</span>');
        }else {
            categoryULTitle = $('<span class="ul-title category">Categories</span>');
        }
        
        var noResults = $('<span class="noResults">No results found. Check the spelling, try a more general term or look up a specific brand or designer.</span>');
        
        var errorCounter = 0;
        var productListWrapper = $('<div class="productListWrapper"></div>');
        var productUL = $('<ul class="productList"></ul>');
        var productULTitle = $('<span class="ul-title product">Products</span>');
        var divSelect = $('<div class="tout1_searchBoost_4T"></div>');
        var loadingGIF = $('<div class="loading4T"><img class="loadingGIF4T" src="https://4tcdnstage.blob.core.windows.net/4tjs3/images/RingLoader.gif"/><p>Your personalized search results are loading...</p></div>');
        var closeButton = $('<span class="closeButton">X</span>');
        var expandButton = $('<label class="expandSearch">+ Expand Search</label>');
        
        //inline facet buttons
        var bbDakotaButton = $('<div class="inlineFacet" data_brand="bbdakota" onclick="_4TellBoost.inlineFacetButtonClick4T($(this))">bbdakota</div>');
        var JackButton = $('<div class="inlineFacet" data_brand="Jack by BB Dakota" onclick="_4TellBoost.inlineFacetButtonClick4T($(this))">Jack</div>');
        var inlineFacetWrapper = $('<div class="inlineFacetWrapper"></div>');
        inlineFacetWrapper.append(JackButton, bbDakotaButton);
        inlineFacetWrapper.hide();
        //look at the url to determine which is selected from the start. 
        if (window.location.href.indexOf('bbdakota') !== -1) {
            bbDakotaButton.addClass('selected');
        }else if ( window.location.href.indexOf('bbbyjack') !== -1) {
            JackButton.addClass('selected');
        }
        
        //add hammer
        $('head').append('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.js"/>');

        _4TellBoost.dataAvailable2pointO = false;
        _4TellBoost.categoryDataAvailable2pointO = false;
        _4TellBoost.searchErrorContinue = true;
        _4TellBoost.forceCatelog = false;
        _4TellBoost.newSearchStarted = false;
         
        //append them
        productListWrapper.append(productULTitle, productUL);
        categoryListWrapper.append(categoryULTitle, categoryUL);
        recWrapper.append(loadingGIF, closeButton, inlineFacetWrapper, categoryListWrapper, productListWrapper, divSelect, noResults, expandButton); 
        
        _4TellBoost.CONFIG.SiteInfo.searchWrapper.append(searchBarWrapper);
        searchBarWrapper.append(recWrapper);
        
        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');

        $('.loading4T').css('display','none');
        $('.searchBoostRecWrapper4T').hide();
        $('.ul-title').css('display','none');
        $('.noResults').css('display','none');
        
        $( closeButton ).click(function() {
            $('.searchBoostRecWrapper4T').fadeOut();
        });
        
        _4TellBoost.inlineFacetButtonClick4T = function(clickedButton) {
            if(clickedButton){
                $('.inlineFacet').removeClass('selected');
                clickedButton.addClass('selected');
                $('.searchBoost4T').keyup();
            }
        };
        
        function errorCountCheck() {
            if (errorCounter > 3) {
                 _4TellBoost.CONFIG.siteInfo.searchFormSubmit.submit();
                 _4TellBoost.searchErrorContinue = false;
                return false;
            }
        }
        
        $( ".expandSearch" ).click(function() {
            inputValue = $('.searchBoost4T').val();
            _4TellBoost.TrackGA(4,'SearchResults','8',inputValue,'0');
            _4TellBoost.CONFIG.siteInfo.searchFormSubmit.submit();
        });
    
        
        $('html').click(function (e) {
            var clicked = '#' + e.target.id;
            if (clicked === '#') {
                clicked = '.' + e.target.className;
            }
            clicked = clicked.split(" ")[0];
            
            if (clicked === '#search') {
                return;
            }
            if (clicked === '.searchBoost4T'){
                return;
            } 
            if (clicked === '.searchBoostRecWrapper4T') {
                return;
            }
            if (clicked === ".search-input searchBoost4T") {
                return;
            }
            if (clicked === ".highlightMe"){
                return;
            }
            if (clicked === ".searchCategory4T") {
                return;
            }
            if ($('.searchBoostRecWrapper4T').find(clicked).length !== 0) {
                return;
            } else {
                $('.searchBoostRecWrapper4T').fadeOut();
            }
        });

        var count = 0;
        //setup before functions
        var typingTimer;                //timer identifier
        var doneTypingInterval = 2000;  //time in ms, .5 second for example

        //on keydown, clear the countdown 
        $('.searchBoost4T').keydown(function () {
            clearTimeout(typingTimer);
        });

        //user is "finished typing," do something
        _4TellBoost.doneTyping = function() {
            //do something
            if($(window).width() <= 1024){
                $('.searchBoost4T').blur();
            }
        };
        
        $('.searchBoost4T').keyup(function (e) {
            
            //Disable keyupss
            var keys =[9,20,17,18,91,93,37,38,39,40,45];
            if($.inArray(e.keyCode,keys) >= 0){
                return;
            }
            if (e.keyCode === 27) {
                $('.searchBoostRecWrapper4T').fadeOut();
                return;
            }
            //abort all previous calls
            _4TellBoost.newSearchStarted = true;
            
            //on keyup, start the countdown
            clearTimeout(typingTimer);
            typingTimer = setTimeout(_4TellBoost.doneTyping, doneTypingInterval);

            count = count + 1;
            $('.SB4T').remove();
            $('.SB4T2').remove();

            $('.ul-title').css('display', 'none');
            $('.noResults').css('display', 'none');

            //remove old results
            $('ul.categoryList li.category4T').remove();
            $('ul.productList li.searchProduct4T').remove();
            $('ul.categoryList li').remove();
            
            $('.inlineFacetWrapper').hide();

            //on mobile reset the display back to select a category
            if($(window).width() <= 1025){
                $('.searchBoostRecWrapper4T').css('right','initial').css('left','0px');
            }
            
            var inputValue = '';
            //sometimes the mobile search bar and desktop search bar are different, and both available. 
            //we need to check both.
            $('.searchBoost4T').each(function() {
                var value = $(this).val();
                if (value !== ""){
                    inputValue = $(this).val();
                    return false;
                }
            });

            //send events when some one types in the input
            _4TellBoost.TrackGA(4,'InlineSearch','12',inputValue,'0');
               
               
            //start everything on the 3rd character 
            if (count > 2) {
        
                //did they press enter?
                if (e.keyCode === 13) {  
                    _4TellBoost.forceCatelog = true;
                    _4TellBoost.validateMyForm4T();
                }
                
                //we are now searching
                _4TellBoost.currentlySearching = true;
                
                //this is in case they hit backspace, it will reset the count
                if (inputValue.length < 3) {
                    count = inputValue.length;
                    $('.searchBoostRecWrapper4T').hide();
                } else {
                    
                    _4TellBoost.newSearchStarted = false;
                    
                    //activate loading GIF
                    $('.searchBoostRecWrapper4T').show();
                    
                    $('.loading4T').css('display', 'block');
            
                    $('.inlineFacetWrapper').hide();
                    $('.ul-title.category').hide();
                    
                    
                    //check if we need to force catelog 
                    if (_4TellBoost.forceCatelog === true) {
                        _4TellBoost.searchStartCatelog();
                    }else {
                        //on mobile we only do catelog searches now 
                        if($(window).width() <= 1024){ 
                            _4TellBoost.searchStartCatelog();
                        }else {
                            //if more than 2 words force a catelog search
                            if (inputValue.split(' ').length > 2) {
                                _4TellBoost.searchStartCatelog();
                                $('.tout1_searchBoost_4T').css('width','100%');
                            }else {
                                //check what we should do, catalog start or category start
                                if (_4TellBoost.CONFIG.SiteInfo.searchBoostCategoryResultsEnable === true) {
                                    _4TellBoost.searchStartCategory();
                                } else {
                                    _4TellBoost.searchStartCatelog();
                                    $('.tout1_searchBoost_4T').css('width','100%');
                                }
                            }
                        }
                    }
                }
            }
        }); 
        
        _4TellBoost.noSearchResults = function() {
            $('.noResults').css('display', 'block');
            $('.ul-title').css('display', 'none');
            $('.SB4T').remove();
            $('.SB4T2').remove();
            $('.loading4T').hide();
            
        }
        //Start a Catelog search, get a token
        _4TellBoost.searchStartCatelog = function() {
            
            if (_4TellBoost.newSearchStarted === true) {
                return;
            }
            
            var inputValue = '';
            //sometimes the mobile search bar and desktop search bar are different, and both available. 
            //we need to check both.
            
            inputValue = $('.searchBoost4T').val();
            
            $('.searchBoost4T').each(function() {
                
                var value = $(this).val();
                if (value !== ""){
                    inputValue = $(this).val();
                    return false;
                }
                
            });
            
            //allows for searches for plural searches
            if (inputValue.substr(inputValue.length-1) === "s") {
                inputValue = inputValue.slice(0, -1);
            } 
            
            //do any manual search term redirects here
            //inputValue = inputValue.replace('ka bar','ka-bar').replace('kabar','ka-bar').replace('tapestry','tapestr').replace('tapestries','tapestr').replace('teeshirt','t-shirt').replace('t shirt','t-shirt');
            
            //set up our variables 
            var UserID = _4TellBoost.getCustomerID();
            var table = 'catalog'; //We will always use catalog.
            var term = inputValue; //pillow or something
            var alias = _4TellBoost.CONFIG.SiteInfo.alias;

            // these are both only needed if you want something different than the default 
            var resultColumns = _4TellBoost.CONFIG.SiteInfo.resultColumns || ''; //default = "id,nm,pr,sp,ra,il,pl"; id, name, price, rating, imageLink, pageLink
            var searchColumns = _4TellBoost.CONFIG.SiteInfo.searchColumns || ''; //default = "nm,a1n,a2n,id,sc"; //name, category, brand, id, SKU

            //load the cookie
            _4TellBoost.UserData.load();

            //use search/start
            var JsonPreString = {
                "User": UserID,
                "Table": "Catalog",
                "SearchTerm": inputValue,
                "ResultColumns": resultColumns,
                "SearchColumns": searchColumns,
                "MaxResulSortCropping": "30000",
                "EnableFacets": "true",
                'UsePartialTermGroupings': 'false',
                "ForceExactTermMatch": "true",
                "ClickStreamIds": _4TellBoost.UserData.data.Viewed,
                "CartIds": _4TellBoost.Service.cartList,
            };

            var myJSON = JSON.stringify(JsonPreString);

            $.ajax({
                url: "//" + _4TellBoost.Service.address + "rest/Search/Start/2?clientAlias=" + _4TellBoost.SiteInfo.alias,
                type: "POST",
                xhrFields: {
                    withCredentials: false
                },
                data: myJSON,
                contentType: "text/plain",
                dataType: "json",
                success: function (data) {
                    if (_4TellBoost.newSearchStarted === true) {
                        return;
                    }
                    
                    _4TellBoost.UserData.session.mostRecentSearchTerm = inputValue;
                    _4TellBoost.UserData.save();
                    _4TellBoost.currentlySearching = false;
                    _4TellBoost.UserData.session.searchToken = data;
                    
                    if (_4TellBoost.submitAfterSuccess === true) {
                        _4TellBoost.CONFIG.siteInfo.searchFormSubmit.submit();
                        return;
                    }
                    _4TellBoost.myGetResultsInterval(data);
                },
                error: function () {
                    if (_4TellBoost.newSearchStarted !== true) {
                        console.log('failure at search/start');
                        errorCounter = errorCounter + 1;
                        errorCountCheck();
                        if (_4TellBoost.searchErrorContinue === true) {
                             $('.searchBoost4T').keyup();
                        }
                    }
                },
                timeout: _4TellBoost.SiteInfo.timeOut
            });
        }
        
        //start category search, get a token        
        _4TellBoost.searchStartCategory = function() {
            
            if (_4TellBoost.newSearchStarted === true) {
                return;
            }
            
            // these are both only needed if you want something different than the default 
            var resultCategoryColumns = _4TellBoost.CONFIG.SiteInfo.resultCategoryColumns || ''; //default = "id,nm,pr,sp,ra,il,pl"; id, name, price, rating, imageLink, pageLink
            var searchCategoryColumns = _4TellBoost.CONFIG.SiteInfo.searchCategoryColumns || ''; //default = "nm,a1n,a2n,id,sc"; //name, category, brand, id, SKU
            
            var inputValue = '';
            //sometimes the mobile search bar and desktop search bar are different, and both available. 
            //we need to check both.
            
            inputValue = $('.searchBoost4T').val();
            
            $('.searchBoost4T').each(function() {
                var value = $(this).val();
                if (value !== ""){
                    inputValue = $(this).val();
                    return false;
                }
            });
            
            //allows for searches for plural searches
            if (inputValue.substr(inputValue.length-1) === "s") {
                inputValue = inputValue.slice(0, -1);
            } 
            
            //do any manual search term redirects here
            //inputValue = inputValue.replace('ka bar','ka-bar').replace('kabar','ka-bar').replace('tapestry','tapestr').replace('tapestries','tapestr').replace('teeshirt','t-shirt').replace('t shirt','t-shirt')

            var JsonPreString = {
                "User": _4TellBoost.getCustomerID(),
                "Table": "Cats_g",
                "SearchTerm": inputValue,
                "ResultColumns": resultCategoryColumns,
                "SearchColumns": searchCategoryColumns || "Name,Id",
                "MaxResulSortCropping": "30000",
                //"CustomSortColumns":null,
                "ClickStreamIds": _4TellBoost.UserData.data.Viewed,
                "CartIds": _4TellBoost.Service.cartList,
                'UsePartialTermGroupings': 'true',
                'SkipMultiTermMatch': 'false',
                //"CategoryIds":null
            };

            var myJSON = JSON.stringify(JsonPreString);

            $.ajax({
                url: "//" + _4TellBoost.Service.address + "rest/Search/Start/2?clientAlias=" + _4TellBoost.SiteInfo.alias,
                type: "POST",
                xhrFields: {
                    withCredentials: false
                },
                data: myJSON,
                contentType: "text/plain",
                dataType: "json",
                success: function (data) {
                    if (_4TellBoost.newSearchStarted === true) {
                        return;
                    }
                    _4TellBoost.UserData.session.searchCategoryToken = data;
                    _4TellBoost.currentlySearching = false;
                    _4TellBoost.UserData.save();
                    _4TellBoost.myGetCategoryResultsInterval(data);
                },
                error: function () {
                    if (_4TellBoost.newSearchStarted !== true) {
                        console.log('failure at search/start/category');
                        errorCounter = errorCounter + 1;
                        errorCountCheck();
                        if (_4TellBoost.searchErrorContinue === true) {
                            $('.searchBoost4T').keyup();
                        }
                    }
                },
                timeout: _4TellBoost.SiteInfo.timeOut
            });
        }
        
        //get some results for a category search, using that token you just got
        _4TellBoost.myGetCategoryResultsInterval = function(token) {
            
            if (_4TellBoost.newSearchStarted === true) {
                return;
            }
            
            if(token && token.length) {
            
                //use getResults
                var JsonPreString = {
                    ResultPage: 1,
                    ResultsPerPage: 50,
                    //SortOrder: "Relevancy",
                    //SortOrder: "Custom",
                    //SortColumns:"Sales",
                    //SortDirections:"Descending",
                    SortOrder: "Custom",
                    SortColumns:"SearchScore,Activity",
                    SortDirections:"Ascending,Descending",
                };
                var myJSON = JSON.stringify(JsonPreString);

                $.ajax({
                    url: "//" + _4TellBoost.Service.address + "rest/Search/GetResults/2?clientAlias=" + _4TellBoost.SiteInfo.alias + "&token=" + token,
                    type: "POST",
                    xhrFields: {
                        withCredentials: false
                    },
                    data: myJSON,
                    contentType: "text/plain",
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (_4TellBoost.newSearchStarted === true) {
                            return;
                        }
                        if (data.Stats.Completed === true) {
                            
                            //if category data is 0 run the catelog results call
                            if (data.Results.length <= 1) {
                                if($(window).width() <= 1024){
                                    $('.searchBoostRecWrapper4T').animate({right: "0px"});
                                    $('.searchBoostRecWrapper4T').css('left','initial');
                                }
                                _4TellBoost.searchStartCatelog();
                                $('.tout1_searchBoost_4T').css('width','100%');
                            } else {
                                $('.tout1_searchBoost_4T').css('width','83%');

                            }
                            _4TellBoost.searchBoostCategoryResults = data;
                            _4TellBoost.categoryDataAvailable2pointO = true;
                            _4TellBoost.checkForCategoryDataAvailable(data);
                        } else {
                            setTimeout(_4TellBoost.myGetCategoryResultsInterval(token), 100);
                        }
                        
                    },
                    error: function () {
                        if (_4TellBoost.newSearchStarted !== true) {
                            console.log('failure at search/getResultsCategory');
                            errorCounter = errorCounter + 1;
                            errorCountCheck();
                            if (_4TellBoost.searchErrorContinue === true) {
                                $('.searchBoost4T').keyup();
                            }
                        }
                    },
                    timeout: _4TellBoost.SiteInfo.timeOut
                });
            }   
        }
        
        //get results for the catelog search, using that token you just got
        _4TellBoost.myGetResultsInterval = function (token) {
            
            if (_4TellBoost.newSearchStarted === true) {
                return;
            }
            
            if(token && token.length) {
               
                //use getResultsfull
                var selectedFacets = [];
                var name = "Brand"
                var optionArray = [];
                
                //get the current selected brand 
                var selectedBrand = $('.inlineFacetWrapper .inlineFacet.selected').attr('data_brand');
                optionArray.push(selectedBrand);
                if (optionArray.length > 0){
                    var pushMe = {
                        Options: optionArray,
                        Name: name
                    };
                    selectedFacets.push(pushMe);
                }
                //use getResults
                var JsonPreString = {
                    ResultPage: 1,
                    ResultsPerPage: 5,
                    SelectedFacets: selectedFacets,
                    SortOrder: "Relevancy",
                };
                var myJSON = JSON.stringify(JsonPreString);

                $.ajax({
                    url: "//" + _4TellBoost.Service.address + "rest/Search/GetResults/full/2?clientAlias=" + _4TellBoost.SiteInfo.alias + "&token=" + token,
                    type: "POST",
                    xhrFields: {
                        withCredentials: false
                    },
                    data: myJSON,
                    contentType: "text/plain",
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (_4TellBoost.newSearchStarted === true) {
                            return;
                        }
                        if (data.Stats.Completed === true) {
                            
                            if(data.Results.length === 1){
                                _4TellBoost.noSearchResults();
                            }
                            
                            _4TellBoost.searchBoostResults2pointO = data;
                            _4TellBoost.dataAvailable2pointO = true;
                            _4TellBoost.checkForCatalogDataAvailable(data);
                            
                        } else {
                            setTimeout(_4TellBoost.myGetResultsInterval(token), 100);
                        }
                        
                    },
                    error: function () {
                        if (_4TellBoost.newSearchStarted !== true) {
                            console.log('failure at search/getResults');
                            errorCounter = errorCounter + 1;
                            errorCountCheck();
                            if (_4TellBoost.searchErrorContinue === true) {
                                
                                $('.searchBoost4T').keyup();
                            }
                        }
                    },
                    timeout: _4TellBoost.SiteInfo.timeOut
                });
            }
        
        }
        
        _4TellBoost.checkForCatalogDataAvailable = function (data) {
            
            if (_4TellBoost.newSearchStarted === true) {
                return;
            }
            
            //Search Results data is in...
            if (_4TellBoost.dataAvailable2pointO === true) {
 
                //set it to false so its ready for next search..
                _4TellBoost.dataAvailable2pointO = false;

                //DEACTIVATE LOADING GIF
                $('.loading4T').css('display', 'none');

                $('.inlineFacetWrapper').show();

                $('.categoryListWrapper').show();
                //$('.ul-title').show();

                $('.SB4T').remove();
                //$('.SB4T2').remove();
                $('.searchProduct4T').remove();
                
                
                //SET UP UL PRODUCTS LIST
                var pLength = _4TellBoost.searchBoostResults2pointO.Results.length;
                for (var i = 0; i < pLength; i++) {

                    if (i === 0) {
                        continue;
                    }
                        
                    // Do something with yourArray[i].
                    var productName = _4TellBoost.searchBoostResults2pointO.Results[i][1];
                    var productID = _4TellBoost.searchBoostResults2pointO.Results[i][0];

                    var productLi = $('<li class="searchProduct4T" id="' + productID + '">' + productName + '</li>');
                    productUL.append(productLi);



                }

                if ($('li.searchProduct4T:first-of-type').length > 0) {
                    //give the first li priority
                    $('li.searchProduct4T:first-of-type').addClass('selected');

                    _4TellBoost.Service.called = false;
                    _4TellBoost.Service.lastDivIDs = [];
                    _4TellBoost.Touts = [];
                    _4TellBoost.setPageType("SearchBoostProd");
                    _4TellBoost.getRecommendations("SearchBoostProd", "");
                } else {
                    //if (_4TellBoost.searchBoostCategoryResults.Results.length - 1 < 1) {
                        _4TellBoost.noSearchResults();
                    //}
                }

                //ADD CLICK FUNCTIONALITY TO OTHER CATEGORIES
                $('li.searchProduct4T').click(function () {

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
                    //$('.SB4T2').remove();

                    setTimeout(function () {
                        //make the call to our service again

                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
                        _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchBoostProd2Only");
                        _4TellBoost.getRecommendations("SearchBoostProd2Only", "");

                    }, 100);
                });
                
            }
            
        }
        
        //get results returned data, now use it
        _4TellBoost.checkForCategoryDataAvailable = function (data) {
            
            //set it to false so its ready for next search..
            _4TellBoost.categoryDataAvailable2pointO = false;
            
            //DEACTIVATE LOADING GIF
            $('.loading4T').css('display', 'none');
            
            
            $('.inlineFacetWrapper').show();

            //remove any old results that may still be lingering
            $('.categoryList .searchCategory4T').remove();
            
            //SET UP CATEGORY LIST 
            if (_4TellBoost.searchBoostCategoryResults.Results.length - 1 === 0) {
                $('.ul-title.category').hide();
            } else {
                $('.ul-title.category').show();
            }
            $('.categoryListWrapper').show();
            
            var cLength = _4TellBoost.searchBoostCategoryResults.Results.length;
            var results = _4TellBoost.searchBoostCategoryResults.Results.slice(0);
            for (var i = 0; i < cLength; i++) {

                if (i === 0) {
                    continue;
                }
            
                // Do something with yourArray[i].
                
                //CATEGORY FULL NAME OR SHORT NAME??? 
                //TODO add a toggle for these may be a good idea?
                var categoryName = results[i][4];
                
                var categoryFullName = results[i][1];

                var categoryID = results[i][0];
                //normally the above is what you would use, but some times the categorys dont 
                //have ids, so we need to just use the category name as an id.
                //var categoryID = results[i][1];
                var categoryProductCount = results[i][2];
    
                var inputValue = '';
                //sometimes the mobile search bar and desktop search bar are different, and both available. 
                //we need to check both.
                $('.searchBoost4T').each(function() {
                    if ($(this).val() !== ""){
                        inputValue = $(this).val();
                    }
                });
                
                //categories need to have products or they dont make the cut
                if (categoryProductCount < 1) {
                    continue;
                }
                
                //check for duplicate categorys
                //get the name for each existing category
                var existingCat = $('.searchCategory4T')
                existingCat.each(function(){
                    if ($(this).attr('title') === categoryFullName){
                        categoryName = "continue4T";
                    }
                });
                if (categoryName === "continue4T") {
                    continue;
                }
                
                //SPECIAL CODE FOR NEXT ADVENTURE
                if (categoryFullName.startsWith("Outlet")) {
                    continue;
                }
                
                //highlighting to match your search term
                //TODO: this only highlights your first word
                var categoryNameHighlight = categoryName;
                var text = $(".searchBoost4T").val();
                var textArr = text.split(" ");
                for (index = 0; index < textArr.length; ++index) {
                    //console.log(textArr[index]);
                    var inputWord = textArr[index].toLowerCase();
                    var categoryLiLowercase = categoryName.toLowerCase();
                    if (categoryLiLowercase.indexOf(inputWord) != -1) {
                        categoryNameHighlight = categoryLiLowercase.replace(inputWord, "<span class='highlightMe'>" + inputWord + "</span>");
                        break;
                    }
                }
                
                //set the limit to the number of category results we show here
                //TODO: make this a variable?
                if ($('.searchCategory4T').length > 18) {
                     break;
                }
                
                //Use this one if you want to include the product count on the category li
                //TODO make a variable for this
                //var categoryLi = $('<li class="searchCategory4T" name="' + categoryName + '" id="' + categoryID + '">' + categoryNameHighlight + ' (' + categoryProductCount + ') </li>');
                var categoryLi = $('<li class="searchCategory4T" title="' + categoryFullName + '" name="' + categoryName + '" id="' + categoryID + '">' + categoryNameHighlight + '</li>');
                categoryUL.append(categoryLi);

            }
            
            //did any of the categorys have products? 
            //if not none were added to list and we need to run a catelog search
            if ($('.searchCategory4T') && $('.searchCategory4T').length) {
                //if desktop
                if($(window).width() >= 1024){
                    //give the first li priority
                    $('li.searchCategory4T:first-of-type').addClass('selected');
                    //TODO get the rec loading icon to work
                    $('.recLoading4T').show();
    
                    _4TellBoost.Service.called = false;
                    _4TellBoost.Service.lastDivIDs = [];
                    _4TellBoost.Touts = [];
                    _4TellBoost.setPageType("SearchBoostCategory");
                    _4TellBoost.getRecommendations("SearchBoostCategory", "");
                } else {
                    
                    //mobile
                    
                    //select a category funcionality
                    $('.searchCategory4T').click(function() {
                        
                        var li = $(this);
                        var id = $(this).attr('id');
                        $('.searchCategory4T').removeClass('selected');
                        $(this).addClass('selected');
                        
                        $('.SB4T').remove();
                        $('.SB4T2').remove();
                        $('.expandBlogSearch').remove();
                        $('.expandSearch').remove();
                        
                        //get some tracking on the hover
                        _4TellBoost.TrackGA(4,'InlineSearch','5',id,'0');
                        //make the call to our service again
    
                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
                        _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchBoostCategory");
                        _4TellBoost.getRecommendations("SearchBoostCategory", "");
                        
                        $('.searchBoostRecWrapper4T').css('left','initial').animate({right: "0px"},1000);
    
                    });
                    
                    //if there is only one category result, auto select it and scroll over to results
                    if (_4TellBoost.searchBoostCategoryResults.Results.length === 2) {
                        var li = $('.searchCategory4T');
                        var id = li.attr('id');
                        $('.searchCategory4T').removeClass('selected');
                        li.addClass('selected');
                        
                        $('.SB4T').remove();
                        $('.SB4T2').remove();
                        $('.expandBlogSearch').remove();
                        $('.expandSearch').remove();
     
                        //get some tracking on the hover
                        _4TellBoost.TrackGA(4,'InlineSearch','5',id,'0');
                        //make the call to our service again
    
                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
                        _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchBoostCategory");
                        _4TellBoost.getRecommendations("SearchBoostCategory", "");
                        
                        $('.searchBoostRecWrapper4T').css('right','0px').css('left','initial');
                    }
                    
                    
                    //set up hammer to allow dragging back and forth
                    var myElement = document.getElementsByClassName('searchBoostRecWrapper4T');
    
                    // create a simple instance
                    // by default, it only adds horizontal recognizers
                    var mc = new Hammer(myElement[0]);
                    
                    // let the pan gesture support all directions.
                    // this will block the vertical scrolling on a touch-device while on the element
                    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
                    
                    // listen to events...
                    mc.on("swipeleft", function(ev) {
                        
                        if ($('.SB4T2').find(ev.target).length > 0) {
                            return false;
                        } else {
                            //scroll right
                            $('.searchBoostRecWrapper4T').css('left','initial').animate({right: "0px"});
                            setTimeout(function(){ 
                                _4TellBoost.mobileSearchSelected();
                            }, 300);
                        }
                        
                    });
                    mc.on("swiperight", function(ev) {
                        //scroll left
                        
                        if ($('.owl-wrapper-outer').find(ev.target).length === 0){
                            $('.searchBoostRecWrapper4T').animate({left: "0px"}).css('right','initial');
                        } else if ($('.SB4T2').find(ev.target).length > 0) {
                            return false;
                        }else {
                             //need to trigger this on owl swipe
                            setTimeout(function(){ 
                                _4TellBoost.mobileSearchSelected();
                            }, 300);
                        }
                    });
                }
            } else {
                _4TellBoost.searchStartCatelog();
                $('.tout1_searchBoost_4T').css('width','100%');
            }
            
        }
    }
    
    //self explainitory, this code allows for the middle search result to be selected when on mobile
    _4TellBoost.mobileSearchSelected = function () {
    
        $('.product4T').removeClass('selected');
        
        //add selected class to product4t 
        $(".SB4T .owl-item.active").each(function () {
            var currentItem = $(this);
            if (currentItem.next().hasClass('active') && currentItem.prev().hasClass('active')) {
                currentItem.find('.product4T').addClass('selected');
            }
        })
        
        $('.SB4T2').remove();
        setTimeout(function () {
            
            //make the call to our service again

            _4TellBoost.Service.called = false;
            _4TellBoost.Service.lastDivIDs = [];
            _4TellBoost.Touts = [];
            _4TellBoost.setPageType("SearchBoostCatProd2Only");
            _4TellBoost.getRecommendations("SearchBoostCatProd2Only", "");

        }, 100);
    };   
    
    _4TellBoost.CatelogSearchPostDisplay = function() {
        
        $('.noResults').hide();
        
        if($(window).width() <= 1025){
            $('.searchBoostRecWrapper4T').animate({right: "0px"});
            $('.searchBoostRecWrapper4T').css('left','initial');
        }
        
        if ($('.SB4T').length > 1) {
            $('.SB4T:last').remove();
        }
        
        if ($('.categoryListWrapper ul li').length === 0) {
            $('.categoryListWrapper').hide();
        }
        
        $('.product4T.special').remove();
        
         //remove all onclicks
        $('.tout1_searchBoost_4T .product4T a').attr('onclick','');
        
        
        $('.SB4T.catalog .product4T').click(function(){
            
            var id = $(this).find('.prodInfo4T').attr('prodid');
            var pagelink = $(this).find('.prodInfo4T').attr('pagelink');
            
            _4TellBoost.TrackGA(5,'InlineSearch',1, id,'1',pagelink);
            return false;

        });
        
        /*$('.SB4T .product4T').each(function() {
           
           // get the page link 
           var pageLink = $(this).find('a').attr('href');
           
           //get the product ID
           var productId = $(this).find('.prodInfo4T').attr('prodid');
           
           //turn on the view product button
           //check
           //create the view similar button                    
           var similarButton = $('<input type="button" id="' + productId + '" value="Similar Products" class="btn atc similar">');
           
           //append the similar button to the prod wrapper
           $(this).find('.productBuy').append(similarButton);
           //hide both
           $(this).find('.productBuy').hide();
           similarButton.hide();
           //may be done in css?
           //remove all other page links on the product4t
           //$(this).find('a').attr('href','#').attr('onclick','');
           
           
        });*/

        //desktop mode
        if($(window).width() >= 1025){
            
            $('.SB4T .product4T:first').addClass('selected');
            
            $('.SB4T .product4T').hover(function () {
                
                if ($(this).hasClass('selected')) {
                    return;
                    
                }

                $('.product4T').removeClass('selected');
                //add selected class to product4t 
                $(this).addClass('selected');
        
                $('.SB4T2').remove();
        
                setTimeout(function () {
                    
                    //make the call to our service again

                    _4TellBoost.Service.called = false;
                    _4TellBoost.Service.lastDivIDs = [];
                    _4TellBoost.Touts = [];
                    //_4TellBoost.setPageType("SearchBoostCatProd2Only");
                    _4TellBoost.getRecommendations("SearchBoostCatProd2Only", "");

                }, 100);
                
            });
        }else {
            
            //manually add the action buttons
            var backButton = $('<div class="product4T product4THome special"><span class="centerMe">Search Again</span></div>');
            var nextButton = $('<div class="product4T product4THome special"><span class="centerMe">View More</span></div>');
            
            //give them functionality
            backButton.click(function(){
                $('.searchBoost4T').focus();
                return false;
            });
            nextButton.click(function() {
                _4TellBoost.CONFIG.SiteInfo.searchFormSubmit.submit();
            });
            
            //append them to the wrapper 
            var wrapper = $('.SB4T').find('#SearchBoostProdItemWrapper1');
            wrapper.prepend(backButton).append(nextButton);
            
            //add selected class to product4t 
            $(".SB4T .product4T:first").next().addClass('selected');
        }
        
        _4TellBoost.Service.called = false;
        _4TellBoost.Service.lastDivIDs = [];
        _4TellBoost.Touts = [];
        _4TellBoost.setPageType("SearchBoostCatProd2Only");
        _4TellBoost.getRecommendations("SearchBoostCatProd2Only", "");

    };
    
    _4TellBoost.CategorySearchPostDisplay = function() {
        
        $('.noResults').hide();
                        
        if ($('.SB4T').length > 1) {
            $('.SB4T:first').remove();
        }
        
        //remove all onclicks
        $('.tout1_searchBoost_4T .product4T a').attr('onclick','');
        
        $('.SB4T.category .product4T').click(function(){
            
            var id = $(this).find('.prodInfo4T').attr('prodid');
            var pagelink = $(this).find('.prodInfo4T').attr('pagelink');
            
            _4TellBoost.TrackGA(5,'InlineSearch',7,id,'1',pagelink);
            return false;

        });

        //desktop mode
        if($(window).width() >= 1025){
            
            $('.SB4T .product4T:first').addClass('selected');
            
            //$('.SB4T .product4T').hover(function () {
            $('.SB4T .product4T').on("mouseover", function () {   
                if ($(this).hasClass('selected')) {
                    return;
                    
                }

                $('.product4T').removeClass('selected');
                //add selected class to product4t 
                $(this).addClass('selected');
        
                $('.SB4T2').remove();
        
                setTimeout(function () {
                    
                    //make the call to our service again

                    _4TellBoost.Service.called = false;
                    _4TellBoost.Service.lastDivIDs = [];
                    _4TellBoost.Touts = [];
                    _4TellBoost.setPageType("SearchBoostCatProd2Only");
                    _4TellBoost.getRecommendations("SearchBoostCatProd2Only", "");

                }, 100);
                
            });

            $('.searchCategory4T').on( "click", function() {
                
                //get the name 
                var name = $(this).attr('name');
                //add it to the input box
                $('.searchBoost4T').val(name);
                //submit the search box
                
                var id = $(this).attr('id');
                //send events when some one types in the input
                
                //TODO Send GA EVENT FOR THIS USING TRACKGA
                _4TellBoost.forceCatelog = true;
                _4TellBoost.submitAfterSuccess = true;
                _4TellBoost.doneTyping();
                return false;
                
            });
            
            $('.searchCategory4T').hover(function () {
                if ($(this).hasClass('selected')) {
                    return;
                    
                }
                var li = $(this);
                var id = $(this).attr('id');
                $('.searchCategory4T').removeClass('selected');
                $(this).addClass('selected');
                
                //$('.SB4T').remove();
                $('.SB4T2').remove();
                //wait a second and see if the user is still hovering on this
                //should help with the rapid scrolling bug
                setTimeout(function () {
                    if (li.hasClass('selected')) {
                        
                        //get some tracking on the hover
                        _4TellBoost.TrackGA(4,'InlineSearch','5',id,'0');
                        //make the call to our service again
                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
                        _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchBoostCategory");
                        _4TellBoost.getRecommendations("SearchBoostCategory", "");
                    }
                }, 150);
               
            });
        //mobile mode
        }else {
            
            //manually add the action buttons
            var backButton = $('<div class="product4T product4THome special"><span class="centerMe">Return to Categories List</span></div>');
            var nextButton = $('<div class="product4T product4THome special"><span class="centerMe">View More</span></div>');
            
            //give them functionality
            backButton.click(function(){
                $('.searchBoostRecWrapper4T').animate({left: "0px"});
                $('.searchBoostRecWrapper4T').css('right','initial');
                return false;
            });
            nextButton.click(function() {
                $('.searchBoost4T').val($('.searchCategory4T.selected').attr('name'));
                _4TellBoost.CONFIG.SiteInfo.searchFormSubmit.submit();
            });
            
            //append them to the wrapper 
            var wrapper = $('.SB4T').find('.FourTellContainer').children('div:last');
            wrapper.prepend(backButton).append(nextButton);
            
            //add selected class to product4t 
            $(".SB4T .product4T:first").next().addClass('selected');

            $('.searchCategory4T').click(function() {
               
                if ($(this).hasClass('selected')) {
                    return;
                    
                }
                var li = $(this);
                var id = $(this).attr('id');
                $('.searchCategory4T').removeClass('selected');
                $(this).addClass('selected');
                
                $('.SB4T').remove();
                $('.SB4T2').remove();
                
                //get some tracking on the hover
                _4TellBoost.TrackGA(4,'InlineSearch','5',id,'0');
                //make the call to our service again
                _4TellBoost.Service.called = false;
                _4TellBoost.Service.lastDivIDs = [];
                _4TellBoost.Touts = [];
                _4TellBoost.setPageType("SearchBoostCategory");
                _4TellBoost.getRecommendations("SearchBoostCategory", "");
            });
        
        }
      
        setTimeout(function () {
            //make the call to our service again

            _4TellBoost.Service.called = false;
            _4TellBoost.Service.lastDivIDs = [];
            _4TellBoost.Touts = [];
            _4TellBoost.setPageType("SearchBoostCatProd2Only");
            _4TellBoost.getRecommendations("SearchBoostCatProd2Only", "");

        }, 300);
    }
    
    _4TellBoost.SimilarSearchPostDisplay = function () {
        if ($('.SB4T2').length > 1) {
            $('.SB4T2:first').remove();
        }   
        
        //remove all onclicks
        $('.tout1_searchBoost_4T .product4T a').attr('onclick','');
        
        $('.SB4T2.similar .product4T').click(function(){
            
            var id = $(this).find('.prodInfo4T').attr('prodid');
            var pagelink = $(this).find('.prodInfo4T').attr('pagelink');
            
            _4TellBoost.TrackGA(5,'InlineSearch',2, id,'1',pagelink);
            return false;

        });
    }
    
    //search results page begining function
    //this function mostly just creates wrappers and variables
    _4TellBoost.searchResultsPageFull = function () {
        
        //check for the toggle
        if (_4TellBoost.CONFIG.SiteInfo.searchResultsBoostEnable === true) {

            //load the cookie
            _4TellBoost.UserData.load();
            //check that the token exists before we delete all their recs. 
            if (_4TellBoost.UserData.session.searchToken === null || _4TellBoost.UserData.session.searchToken === undefined || _4TellBoost.UserData.session.searchToken === '') {
                console.log('Search Token is MIA should try and run start again?');
                //run the resultsfull error code
                _4TellBoost.noResultsFullError();
            } else {
                //start making our variables
                var noResults = $('<span class="noResults">No results found. Check the spelling, try a more general term or look up a specific product or designer.</span>');
                var productListWrapper = $('<div class="fullProductListWrapper"></div>');
                var productListLi = $('<ul display="none" class="productIdList"></ul>');
                var divSelect = $('<div class="tout1_searchResults_4T"></div>');
                var loadingGIF = $('<img class="loading4T" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>');
                var caption = $('<label class="searchCaption">SEARCH RESULTS</label>');
                var facetWrapper = $('<div class="facetWrapper4T"></div>');
                var statsWrapper = $('<div class="statsWrapper4T"><div>');
                var refineResultsButton = $('<div class="refineResults4T mobileOnly">Refine Results</div>');

                productListLi.hide();
                noResults.hide();
                caption.hide();
                productListWrapper.append(productListLi, caption, divSelect, loadingGIF, noResults);
                $('.loading4T').hide();

                //THIS IS THE WRAPPER WE APPEND OUR STATS TO, MAY BE THE SAME AS ABOVE.
                $('#wrapper').append(statsWrapper);
                
                //THIS IS THE WRAPPER WE APPEND OUR FACETS TO, MAY BE THE SAME AS ABOVE.
                $('#wrapper').append(refineResultsButton, facetWrapper);

                //THIS IS THE ID FOR THE WRAPPER WE APPEND OUR RESULTS TO
                $('#wrapper').append(productListWrapper);

                $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');

                //show the loading gif
                $('.loading4T').show();

                //make the full call initially
                _4TellBoost.getSearchResultsFull();

            }
        }
    };
    
    _4TellBoost.getSearchResultsFull = function () {
        //use getResultsfull
        var JsonPreString = {
            ResultPage: 1,
            ResultsPerPage: 30,
            SortOrder: "Relevancy",
            IgnoreZeroFacets: true,
        };
        var myJSON = JSON.stringify(JsonPreString);
        myJSON = JSON.stringify(myJSON);
        $.ajax({
            url: "//" + _4TellBoost.Service.address + "rest/Search/GetResults/full?clientAlias=" + _4TellBoost.SiteInfo.alias + "&token=" + _4TellBoost.UserData.session.searchToken,
            type: "POST",
            xhrFields: {
                withCredentials: false
            },
            data: myJSON,
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.Stats.Completed === true) {
                    _4TellBoost.searchBoostResultsPageData = data;
                    _4TellBoost.UserData.session.mostRecentSortOrder = "Relevancy";
                    _4TellBoost.searchBoostResultsPageDisplay();
                    _4TellBoost.Service.called = false;
                    _4TellBoost.Service.lastDivIDs = [];
                    _4TellBoost.Touts = [];
                    _4TellBoost.setPageType("SearchResultsPage");
                    _4TellBoost.getPageSettings("SearchResultsPage")
                    //_4TellBoost.getRecommendations("SearchResultsPage", "");
                    data.Results.splice(0, 1);
                    _4TellBoost.displayCombinedTouts([data.Results]);
                } else {
                    setTimeout(_4TellBoost.getSearchResultsFull(), 200);
                }

            },
            error: function () {
                console.log('failure at search/getResults/full');
                errorCounter = errorCounter + 1;
                errorCountCheck();
                if (_4TellBoost.searchErrorContinue === true) {
                    //_4TellBoost.UserData.session.searchToken = null;
                    //_4TellBoost.UserData.save();
                    noResults.show();
                }
            },
            timeout: _4TellBoost.SiteInfo.timeOut
        });
    };

    _4TellBoost.updateGetSearchResultsFull = function () {
    //use getResultsfull
        //need a delay to allow the elements to change from their onclicks
        setTimeout(function(){
            
            //hide all the old things to allow for the loading gif, 
            //but dont remove them, we need them to scrape the values off the page for the call
            $('.statsWrapper4T').hide();
            $('.pageNumberWrapper4T').hide();
            $('.facetWrapper4T').hide();
            $('.tout1_searchResults_4T').hide();
            $('.loading4T').show();
            
            //get your variables
            
            //get the desired page 
            
            //first check to see if either of the arrows have a clicked class
            var nextArrow = $('.nextArrow.click4T.clicked');
            var prevArrow = $('.prevArrow.click4T.clicked');
            var desiredPage = '1';
            if (nextArrow && nextArrow.length) {
                
                //next arrow has been clicked, get the current page and add 1 to it
                currentPage = parseInt($('.pageNumberWrapper4T .currentNum4T').html());
                
                //need to check if the currentPage is the first page, cant go back anymore. 
                //get the total pages available
                var totalPages = parseInt($('.pageNumberWrapper4T .totalNum4T').html());
                if (currentPage === totalPages) {
                    desiredPage = totalPages;
                } else {
                    //set this as the desired page
                   desiredPage = currentPage + 1;
                }
            } else if (prevArrow && prevArrow.length) {
                //prev arrow has been clicked, get the current page and minus 1 to it
                currentPage = parseInt($('.pageNumberWrapper4T .currentNum4T').html());
                
                //need to check if the currentPage is the first page, cant go back anymore. 
                if (currentPage === 1) {
                    desiredPage = 1;
                    
                } else {
                    //set this as the desired page
                    desiredPage = currentPage - 1;
                }
            }else {
                //if not, the desired page should be page 1
                desiredPage = 1
            }
             
            
            //get the number of results
            var resultsPerPage = parseInt($('select.showResults4T').val());
            
            //get the sort order
            var sortOrder = $('select.sortBy4T').val();
            
            //get the selected facets and add them in an array.
            //demo [{\"Options\":[\"less than $100\"],\"Name\":\"Price Range\"}]}"
            //first create the array.
            var selectedFacets = [];
            
            //check for each selected  
            $('.singleFacetWrapper4T').each(function() {
                var name = $(this).find('span.facetName').html();
                var optionArray = [];
                
                if ( $(this).find('.facetCheckBox4T:checkbox:checked').length > 0) {
                    
                    $(this).find('.facetCheckBox4T:checkbox:checked').each(function() {
                        var OptionName =  $(this).siblings('span.facetOptionName').attr('value');
                        optionArray.push(OptionName);
                    });
                    
                }
                if (optionArray.length > 0){
                    
                    var pushMe = {
                        Options: optionArray,
                        Name: name
                    };
                    //var pushMeString = "Options:[" + optionArray + "],Name:" + name ;
                    //pushMe.push(pushMeString);
                    selectedFacets.push(pushMe);
                }
                
            });

            var JsonPreString = {
                ResultPage: desiredPage,
                ResultsPerPage: resultsPerPage,
                SortOrder: sortOrder,
                SelectedFacets: selectedFacets,
                IgnoreZeroFacets: true,
            };
            var myJSON = JSON.stringify(JsonPreString);
            myJSON = JSON.stringify(myJSON);
            myJSON = myJSON.replace(/\\\\\\/g, '\\');
            $.ajax({
                url: "//" + _4TellBoost.Service.address + "rest/Search/GetResults/full?clientAlias=" + _4TellBoost.SiteInfo.alias + "&token=" + _4TellBoost.UserData.session.searchToken,
                type: "POST",
                xhrFields: {
                    withCredentials: false
                },
                data: myJSON,
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.Stats.Completed === true) {
                        $('.statsWrapper4T').empty();
                        $('.facetWrapper4T').empty();
                        $('.pageNumberWrapper4T').remove();
                        $('.tout1_searchResults_4T').empty();
                        $('.statsWrapper4T').show();
                        $('.facetWrapper4T').show();
                        $('.tout1_searchResults_4T').show();
                        
                        $('.loading4T').hide();
                        _4TellBoost.UserData.session.mostRecentSortOrder = sortOrder;
                        _4TellBoost.searchBoostResultsPageData = data;
                        _4TellBoost.searchBoostResultsPageDisplay();
                        
                        _4TellBoost.Service.called = false;
                        _4TellBoost.Service.lastDivIDs = [];
                        _4TellBoost.Touts = [];
                        _4TellBoost.setPageType("SearchResultsPage");
                        _4TellBoost.getPageSettings("SearchResultsPage")
                        //_4TellBoost.getRecommendations("SearchResultsPage", "");
                        data.Results.splice(0, 1);
                        _4TellBoost.displayCombinedTouts([data.Results]);
                    } else {
                        setTimeout(_4TellBoost.getSearchResultsFull(), 200);
                    }
    
                },
                error: function () {
                    console.log('failure at search/UpdateGetResults/full');
                    
                    errorCounter = errorCounter + 1;
                    
                    //run the resultsfull error code
                    _4TellBoost.noResultsFullError();
                    errorCountCheck();
                    if (_4TellBoost.searchErrorContinue === true) {
                        //_4TellBoost.UserData.session.searchToken = null;
                        //_4TellBoost.UserData.save();
                        noResults.show();
                    }
                },
                timeout: _4TellBoost.SiteInfo.timeOut
            });
        }, 200);
    };
    
    _4TellBoost.noResultsFullError = function () {
        //oops something went wrong
        //hide the loading gif
        $('.loading4T').hide();
        //create a error message
        var errorMessage = $('<div class="error4T">This Search Session has Expired. Please try searching for another term or click <a href="/index.html">here</a> to return to Home.</div>')
        //append it to the wrapper
        $('.fullProductListWrapper').append(errorMessage);
    };
    
    _4TellBoost.searchBoostResultsPageDisplay = function () {
        if (_4TellBoost.searchBoostResultsPageData && _4TellBoost.searchBoostResultsPageData) {
            
            //stats code goes here 
            var title = $('<h1 class="searchTitle">Search Results</h1>');
            var searchTerm = _4TellBoost.UserData.session.mostRecentSearchTerm;
            var totalResults = _4TellBoost.searchBoostResultsPageData.Stats.ResultsAvailable.toString();
            var stats = $('<span class="stats">' + totalResults + ' Results for \'' + searchTerm + '\'</span>');
            var clearAllFacets = $('<span class="clearAll4T">Clear All Selected</div>');
            $('.statsWrapper4T').append(title, stats);
            
            //sort by code here
            if (_4TellBoost.searchBoostResultsPageData.Stats.SortOptions && _4TellBoost.searchBoostResultsPageData.Stats.SortOptions.length) {
                var selectDiv = $('<div class="sortByWrapper4T"></div>');
                var selectPrefix = $('<span class="sortByPrefix4T">Sort By: </span>');
                var select = $('<select onChange="_4TellBoost.updateGetSearchResultsFull();" class="sortBy4T"></select>');
                selectDiv.append(selectPrefix, select);
                $('.facetWrapper4T').append(selectDiv);
                
                var sortOptions = _4TellBoost.searchBoostResultsPageData.Stats.SortOptions;
                var oLength = sortOptions.length;
                for (var i = 0; i < oLength; i++) {
                    var optionValue = sortOptions[i];
                    //console.log(option);
                    var option = $('<option>' + optionValue + '</option>');
                    
                    if (optionValue === _4TellBoost.UserData.session.mostRecentSortOrder){
                        option.attr('selected','selected');
                    }
                    select.append(option);
                    
                }
                
                //number of results code here
                var showResultsDiv = $('<div class="showResultsWrapper4T"></div>');
                var showSelectPrefix = $('<span class="showResultsPrefix4T">Show: </span>');
                var showSelect = $('<select onChange="_4TellBoost.updateGetSearchResultsFull();" class="showResults4T"></select>');
                showResultsDiv.append(showSelectPrefix, showSelect);
                $('.facetWrapper4T').append(showResultsDiv);
                
                var showOptions = ["10","20","30","50","75","100"];
                var currentResult = _4TellBoost.searchBoostResultsPageData.Stats.ResultsPerPage;
                var oLength = showOptions.length;
                for (var i = 0; i < oLength; i++) {
                    var optionValue = showOptions[i];
                    var option = $('<option>' + optionValue + '</option>');
                    
                    if (optionValue === currentResult.toString()){
                        option.attr('selected','selected');
                    }
                    showSelect.append(option);
                    
                }
                
                //facets here
                //are facets turned on?
                if (_4TellBoost.CONFIG.SiteInfo.searchResultsFacetsEnable === true) {
                    
                    //do we have facets in the data?
                    if (_4TellBoost.searchBoostResultsPageData.Stats.Facets && _4TellBoost.searchBoostResultsPageData.Stats.Facets.length) {

                        //create some wrappers and variables
                        var facetDiv = $('<div class="facetSubWrapper4T"></div>');
                        var facetTitle = $('<span class="facetTitle4T">Filter by: </span>');
                        
                        //add them to the main wrapper
                        facetDiv.append(clearAllFacets, facetTitle);
                        $('.facetWrapper4T').append(facetDiv);
                        
                        //set up the clear all facets button
                        //run it on click
                        clearAllFacets.click(function() {
                            
                            //first deselect all of the facets,
                            $('input.facetCheckBox4T:checkbox').removeAttr('checked');
                            
                            //now run the update function
                            _4TellBoost.updateGetSearchResultsFull();
                            
                        });
                        
                        //how many facets do we have?
                        var facetList = _4TellBoost.searchBoostResultsPageData.Stats.Facets;
                        var fLength = facetList.length;
                        for (var i = 0; i < fLength; i++) {
                            //before we do anything, does this facet even have options? 
                            if (_4TellBoost.searchBoostResultsPageData.Stats.Facets[i].Options.length < 1) {
                                continue;
                            }
                            
                            if (i === 0) {
                                //set up the title and wrapper for each facet
                                //also add a selected class to the first name 
                                var facetName =  $('<span class="facetName selected">'+ facetList[i].Name +'</span>');
                            } else {
                              
                                var facetName =  $('<span class="facetName">'+ facetList[i].Name +'</span>');
                            }
                            
                            var singleFacetWrapper = $('<div class="singleFacetWrapper4T"></div>');
                            singleFacetWrapper.append(facetName);
                            facetDiv.append(singleFacetWrapper);
                            
                            //set up the options for each facet
                            //create the optionList
                            var facetUl = $('<ul class="facetOptionList"></ul>');
                            
                            //set up an option counter to limit facets with thousands of options
                            var optionCounter = 0
                            
                            //how many options are there?
                            var facetOptionList = _4TellBoost.searchBoostResultsPageData.Stats.Facets[i].Options;
                            var fOLength = facetOptionList.length;
                            for (var o = 0; o < fOLength; o++) {
                                
                                optionCounter = optionCounter + 1;
                                
                                if (optionCounter > _4TellBoost.CONFIG.SiteInfo.optionCutOff) {
                                    break;
                                }
                                //if there are no products in this facet why even show it?
                                if (facetOptionList[o].MatchCount === 0) {
                                    continue;
                                }
                                //get the option name
                                var optionName =  $('<span class="facetOptionName" value="' + facetOptionList[o].Label + '"> '+ facetOptionList[o].Label.replace(/-/g, ' ') + ' (' + facetOptionList[o].MatchCount + ')' +'</span>');
                                ///give it a checkbox
                                var checkbox = $('<input type="checkbox" class="facetCheckBox4T" onChange="_4TellBoost.updateGetSearchResultsFull();"/>').prop('checked', facetOptionList[o].Selected);
                                //create an li to append to
                                var optionLi = $('<li class="facetOptionLi"></li>');
                                
                                //append the the li and then the ul and then the main wrapper
                                optionLi.append(checkbox, optionName);
                                facetUl.append(optionLi);
                                singleFacetWrapper.append(facetUl)
                                
                            }
   
                        }
                    } 
                }
                
                
                //Facet Accordian here 
                //is this a feature we want?
                if (_4TellBoost.CONFIG.SiteInfo.facetAccordianEnable === true ) {
                    
                    //find all the facet wrappers
                    $('.singleFacetWrapper4T').each(function() {
                        var parentWrapper = $(this);
                        //check if the facet is the selected facet 
                        if ($(this).find(".facetName.selected").length < 1 ){
                            parentWrapper.find('.facetOptionList').slideUp(1);
                        }
                    }); 
                    //on click roll up the selected, and roll down the new
                    $('.facetName').click(function() {
                        var newFacet = $(this);
                        
                        //check to see if it has the selected class
                        if (newFacet.hasClass('selected')){
                            
                            //if yes, just slide it up, they clearly dont want it open
                            newFacet.parents('.singleFacetWrapper4T').find('.facetOptionList').slideUp();
                            
                            //make sure to remove the selected class as well
                            newFacet.removeClass('selected');
                        } else {
      
                            //roll up all of them in case we get out of sync
                            $('.facetOptionList').slideUp();
                           
                            //find the option list and roll it down.
                            newFacet.parents('.singleFacetWrapper4T').find('.facetOptionList').slideDown();
                        
                            //also add the selected class for tracking
                            newFacet.addClass('selected');
                        }
                    });
                    
                    //for mobile we need to hide the facets
                    //and show them only when the refine button is clicked
                    //first step is determining if we are on mobile
                    var currentWidth = $(window).width();
                    //whats classified as mobile?
                    if (currentWidth < 700) {
                        //facet wrappers roll up initially
                        $('.facetWrapper4T').slideUp(1);
                        
                        //on click of the refine button, toggle the facet slides
                        $('.refineResults4T.mobileOnly').unbind("click").click(function() {
                           //$( '.facetWrapper4T' ).slideToggle(); 
                           //slide toggle seems buggy
                           //try adding selected class names
                           if ($('.facetWrapper4T').hasClass('open')) {
                               $('.facetWrapper4T').slideUp().removeClass('open');
                           }else {
                               $('.facetWrapper4T').slideDown().addClass('open');
                           }
                           
                        });
                    }
                } else {
                    //remove the refine button for good so it doesnt show on mobile
                }
                
                //page number here
                //create some variables
                var pageNumberWrapper = $('<div class="pageNumberWrapper4T"></div>');
                var borderBottom4T = $('<div class="borderBottom4T"></div>');
                //get the current page number
                var currentPage = _4TellBoost.searchBoostResultsPageData.Stats.ResultPage;

                //do the math to find out the total number of pages available
                var totalPages = _4TellBoost.searchBoostResultsPageData.Stats.ResultsAvailable / _4TellBoost.searchBoostResultsPageData.Stats.ResultsPerPage; 
                //round down
                totalPages = parseInt(totalPages);
                //check to make sure the round down didnt set it to 0
                if (totalPages === 0) {
                    totalPages = 1;
                }
                var currentNumber = $('<div class="currentNum4T">' + currentPage + '</div>');
                var totalNumber = $('<div class="totalNum4T">' + totalPages + '</div>');
                
                
                
                //create arrows 
                var nextArrow = $('<div class="nextArrow click4T">></div>');
                var prevArrow = $('<div class="prevArrow click4T"><</div>');
                
                //append everything to the wrapper, make the wrapper append to productList
                pageNumberWrapper.append(prevArrow, currentNumber, borderBottom4T, totalNumber, nextArrow);
                $('.fullProductListWrapper').append(pageNumberWrapper);
                
                //make them go forward or back a page. 
                $('.click4T').click(function() {
                    $(this).addClass('clicked');
                    _4TellBoost.updateGetSearchResultsFull();
                });
            }
        } else {
            console.log('no data in searchBoostResultsPageDisplay function');
        }
        
    };
    
    _4TellBoost.getProdImg = function (tout, itemdata) {
        var frameTarget = "";
        if (tout.inFrame) {
            frameTarget = "target='_parent' "
        }
        var itemType = _4TellBoost.resultTypes[itemdata.resultType] || itemdata.resultType;
        var trackFunc = itemdata.trackFunc || 'onclick="_4TellBoost.TrackGA(' + "'0','" + _4TellBoost.Service.pageType + "-" + itemType + "','" + itemdata.productID +
                          "','" + itemdata.pageLink + "');return false;" + '"';
        var pageLink = "";
        if (_4TellBoost.SiteInfo.includeBase) {
            pageLink = "http://" + _4TellBoost.SiteInfo.baseURL
        }
        pageLink += itemdata.pageLink;
        var prodImage = $("<div class='" + tout.productImageStyle + "' />");
        var imgClass = _4TellBoost.CONFIG.SiteInfo.lazyOwl ? "lazyOwl" : "productImageImg";
        var img = $('<img class="' + imgClass + '" onerror="_4TellBoost.ImgError(this);"/>');
        img.attr("src", _4TellBoost.SiteInfo.emptyImage);
        if (itemdata.altImage) {
            img.attr("data-src", itemdata.altImage);
        }else {
            img.attr("data-src", itemdata.imageLink.replace('.jpg','_340x510_crop_center.jpg'));
        }
        img.attr("alt", itemdata.title);
        img.appendTo(prodImage);
        img.wrap("<a href='" + pageLink + "' " + frameTarget + trackFunc + " ></a>");
        
        var prodInfo = $('<div class="prodInfo4T" prodId="' + itemdata.productID + '" brand="' + itemdata.brand + '"></div>');
        prodImage.append(prodInfo);
        
        
        return prodImage
    };
    
    _4TellBoost.detectCartPage = function () {

        //product detail page
        var shibboleth = $(".template-product, #tout1_pdp_4Tell, .product_name, div.product_slider, #productImage, #product, #product-photos, .product-thumbnails, .product-big-image");
        if (shibboleth && shibboleth.length) {
            _4TellBoost.setPageType("ProductDetail");
            var id = __st.rid.toString();
            if (id && id.length) {
                _4TellBoost.addProductID(id); 
                
            }
            
            $('#AddToCart').click(function() {
                _4TellBoost.addCartItem(id); 
            }); 
            return;
        }
        //view-cart page
        shibboleth = $("#your-shopping-cart, #shopping-cart-table, .continue_shopping, #cartform, .cart-products, #cart_form, .cart-products-div1");
        if (shibboleth && shibboleth.length) {
            _4TellBoost.setPageType("AddToCart");
            //all handled via the atc button on the pdp
            return;
        }
        //home page
        shibboleth = $("#tout1_hm_4Tell, .homepage_content, .homepage-container, #home-promos, #homepage_slider, #homePagePromo");
        if (shibboleth && shibboleth.length) {
            _4TellBoost.setPageType("Home");
            return;
        }
        //category page
        shibboleth = jQuery("#tout1_cat_4Tell");
        if (shibboleth && shibboleth.length) {
            _4TellBoost.setPageType("Category");
            var CATID = __st.rid.toString();
            _4TellBoost.setCatId(CATID);
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
                        _4TellBoost.addProductID(id)
                    }
                });
                $("p.sku").each(function () {
                    console.log($(this).text().match(/(?:\s+)(\w+)/));
                })
                return
            }
        }
        _4TellBoost.setPageType("Auto");
        return
    };
    
    _4TellBoost.detectCustomRecs = function (){
        
        //Check for Custom Recs
        var customPage = $('.tout1_landing_4Tell,.tout2_landing_4Tell,.tout3_landing_4Tell, .tout4_landing_4Tell');
        if (customPage && customPage.length) {
            _4TellBoost.Service.called = false;
            _4TellBoost.Service.lastDivIDs = [];
            _4TellBoost.Touts = [];
            //_4TellBoost.setPageType("CustomPage");
            _4TellBoost.getRecommendations("CustomPage", "");
            return;
        }
        
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