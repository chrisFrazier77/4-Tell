(function (_4TellBoost, $, undefined) {
    _4TellBoost.CONFIG = {
        SiteInfo: {
            baseURL: "http://www.easternleaf.com/",
            alias: "eastleaf",
            GA_UA: "UA-325354-1",
            platform: "4TellVs.js",
            addCartBtnAtts: "input type='button' value='Choose Options' class='btn atc'",
            addCartImage: "",
            spacerImage: "//4tcdn.blob.core.windows.net/4tjs3/images/spacer.gif",
            emptyImage: "//4tcdn.blob.core.windows.net/4tjs3/images/nophoto.gif",   
            pricePrefix: "Price ",
            salePricePrefix: "Sale Price: ",
            includeBase: false,
            searchBoostEnable: true,
            searchBoostGAName: '4TellRecsSearch',
            lazyOwl:true,
            custom: true,
            siteEnable: true,
        },
        PageSettings: {
            SearchBoostProd: [{
                enable: true,
                resultType: 12,
                numItems: 6,
                caption: "Search Results",
                showCaption:true,
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                showPrice: true,
                showBuyButton: true,
                maxImageHeight: 150,
                wrapper: "<div class='SB4T selected'></div>",
                
                rawJS: {

                    postDisplay: function() {
                        
                        $('.noResults').hide();
                        
                        
                        if ($('.SB4T').length > 1) {
                            $('.SB4T:last').remove();
                        }
                        
                        
                        $('.product4T').click(function(){
                            
                            var id = $(this).attr('id');
                            
                            //send events when some one types in the input
                            ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName , 'SearchResult-Product', id, 1);
                        });
                        
                        $('.SB4T .product4T').each(function() {
                           
                           // get the page link 
                           var pageLink = $(this).find('a').attr('href');
                           
                           //get the product ID
                           var productId = $(this).find('.description').attr('prodid');
                           
                           //turn on the view product button
                           //check
                           //create the view similar button                    
                           var similarButton = $('<input type="button" id="' + productId + '" value="Similar Products" class="btn atc similar">');
                           
                           //append the similar button to the prod wrapper
                           $(this).find('.productBuy').append(similarButton);
                           //hide both
                           $(this).find('.productBuy').hide();
                           
                           //may be done in css?
                           //remove all other page links on the product4t
                           //$(this).find('a').attr('href','#').attr('onclick','');
                           
                           
                        });
                        //
                        //
                        //VERSION CONTROL
                        //
                        //
                        //WHAT VERSION SEARCH ARE WE USING? IF V2 (sessiontest 0)DO THIS
                        //if (_4TellBoost.UserData.session.sessionTest === 0) {
                            
                            $('.SB4T .product4T:first').addClass('selected');
                            
                            $('.SB4T .product4T').hover(function () {
                                $(this).find('.productBuy').fadeIn(200);
                            }, function () {
                                $(this).find('.productBuy').fadeOut(200);
                            });
                        //}
                        
                            
                            
                        $('.SB4T .product4T').click(function (e) {
                            //get id from button
                            var clickId = $(this).find('input.similar').attr('id');
                            
                            //get the onlick
                            var onclick = $(this).find('a').attr('href','#').attr('onclick');
                            $('.product4T').removeClass('selected');
                            //add selected class to product4t 
                            $(this).addClass('selected');
                            
                            var clicked = '.' + e.target.className;
                            
                            if(clicked === ".btn atc similar") {
                                
                                //look to see if the button id matches any in the prod list
                                $('.searchBoostRecWrapper4T .productList li').each(function() {
                                    var liId = $(this).attr('id');
                                    if (liId === clickId) {
                                        $(this).click();
                                    }
                                });
                                return;
                            } else if (clicked === ".productBuy") {
                                $(this).children('.productBuy').children('input:first').click();
                                return;
                            } else {
                                
                            }
                            
                        });
                       
                        
                        $('input.similar').click(function() {
                            //get id from button
                            var clickId = $(this).attr('id');
                            
                            $('.product4T').removeClass('selected');
                            
                            //add selected class to product4t 
                            $(this).parents('.product4T').addClass('selected');
                            
                            //look to see if the button id matches any in the prod list
                            $('.searchBoostRecWrapper4T .productList li').each(function() {
                                var liId = $(this).attr('id');
                                if (liId === clickId) {
                                    $(this).click();
                                }
                            });
                        });
                        $(window).keyup(function (e)  {
                            if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
                                $( ".expandSearch" ).click();
                            }
                        });
                    },
                    preInit: function(tout) {
                        tout.columns.custom.description = "at1";
                        var prodID = $('.searchProduct4T');
                        
                        newString = '';
                        
                        prodID.each( function() {
                            var id = $(this).attr('id');
                            newString = newString + ',' + id;
                        }); 
                        tout.viewedIDs = newString;
                    }
                },
                inCart: false
            },
            {
                enable: true,
                resultType: 3,
                numItems: 6,
                caption: "Similar Products",
                showCaption:true,
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                //itemsPerGroup: 2,
                carousel: {
                    items: 6,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,6]],
                    scrollPerPage: true,
                    navigation: true,
                    
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showPrice: true,
                showBuyButton: false,
                maxImageHeight: 150,
                wrapper: "<div class='SB4T2'></div>",
                
                rawJS: {
                    
                    postDisplay: function() {
                        //
                        //
                        //VERSION CONTROL
                        //
                        //
                        //WHAT VERSION SEARCH ARE WE USING? IF V3 (sessiontest 1)DO THIS
                        //if (_4TellBoost.UserData.session.sessionTest === 1) {
                            
                           // $('.searchBoostRecWrapper4T .product4T').hover(function(){
                            //    $(this).addClass('selected');
                            //    }, function(){
                             //   $(this).removeClass('selected');
                            //});
                        //}
                        
                        
                        if ($('.SB4T2').length > 1) {
                            $('.SB4T2:last').remove();
                        }   
                        $('.SB4T2 .product4T').click(function(){
                            
                            var id = $(this).attr('id');
                            var index = $(this).parent().index();
                            
                            //send events when some one types in the input
                            ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName , 'SearchResult-Similar', id, index);
                            
                        });
                    },
                    preInit: function(tout) {
                        //$('.searchBoostRecWrapper4T .expandSearch').css("background-color", $('#top-nav').css("background-color"));
                        tout.columns.custom.description = "at1";
                        tout.prodIDs = $('.searchProduct4T.selected').attr('id');
                    }
                },
                inCart: false
            }],
            SearchBoostProd2Only: [{
                enable: true,
                resultType: 3,
                numItems: 6,
                caption: "Similar Products",
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                //itemsPerGroup: 2,
                carousel: {
                    items: 6,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,6]],
                    scrollPerPage: true,
                    navigation: true,
                   
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showPrice: true,
                showBuyButton: false,
                maxImageHeight: 150,
                wrapper: "<div class='SB4T2'></div>",
                //searchVersion:3,
                /*testGroup: {
                    0: {
                        //DENY INLINE SEARCH W/ SIMILAR BUTTONS
                        searchVersion:2,
                        showCaption:true,
                        
                    },
                    1: {
                        //DENY INLINE SEARCH W/OUT SIMILAR BUTTONS
                        searchVersion:3,
                        showCaption:false,
                        
                    }
                },*/
                rawJS: {
                    
                    postDisplay: function() {
                        if ($('.SB4T2').length > 1) {
                            $('.SB4T2:last').remove();
                        }   
                        $('.SB4T2 .product4T').click(function(){
                            
                            var id = $(this).attr('id');
                            var index = $(this).parent().index();
                            
                            //send events when some one types in the input
                            ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName , 'SearchResult-Similar', id, index);
                            
                        });
                    },
                    preInit: function(tout) {
                        tout.columns.custom.description = "at1";
                        //$('.searchBoostRecWrapper4T .expandSearch').css("background-color", $('#top-nav').css("background-color"));
                        tout.prodIDs = $('.searchProduct4T.selected').attr('id');
                    }
                },
                inCart: false
            }],
            Home: [{
                enable: true,
                resultType: 1,
                numItems: 12,
                caption: "Recommended For You",
                productStyle: "product4T product4TPD1",
                divSelect: ".cat-wrapper",
                divPosition: "below",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,6]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showBuyButton:false,
                maxImageHeight: 150,
                wrapper: "<table width='100%' class='HOME4T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        tout.columns.custom.description = "at1";
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    },
                    postDsiplay:function() {
                        $('.v65-productDisplay').remove();
                    }
                },
                inCart: false
            }],
            ProductDetail: [{
                enable: true,
                resultType: 0,
                numItems: 12,
                caption: "Customers Also Bought",
                productStyle: "product4T product4TPD1",
                divSelect: "#v65-product-parent",
                divPosition: "below",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showBuyButton: false,
                maxImageHeight: 150,
                wrapper: "<table width='100%' class='PD14T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.description = "at1";
                        
                    }
                },
                inCart: false
            }, {
                enable: true,
                resultType: 3,
                numItems: 10,
                caption: "Customers Also Viewed",
                productStyle: "product4T product4TPD2",
                divSelect: '#v65-product-history-header',
                divPosition: "above",
                carousel: {
                    items: 6,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showBuyButton: false,
                wrapper: "<table width='100%' class='PD24T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        tout.columns.custom.description = "at1";
                        
                    },
                    
                },
                inCart: false
            }],
            Search: [{
                enable: false
            }],
            Category: [{
                enable: false,
                resultType: 5,
                numItems: 12,
                fillMode: "none",
                caption: "Category Top Sellers",
                productStyle: "product4T product4TCat",
                divSelect: "#CategoryHeading",
                divPosition: "below",
                carousel: {
                    items: 4,
                    itemsCustom: [[1605,5],[1868,6]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                wrapper: "<table width='98%' class='CAT4T'><tr></tr></table>",
                rawJS: {
                    preInit: function() {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    },
                    postDisplay: function(tout) {
                        if ($('ul.ProductList li').length < 20) {
                            $('.CAT4T').css('display','none');
                        }
                    }
                },
                inCart: false
            }],
            AddToCart: [{
                enable: true,
                resultType: 0,
                numItems: 12,
                caption: "You May Also Like",
                productStyle: "product4T product4TVC",
                divSelect: "#v65-cart-table-container",
                divPosition: "below",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showBuyButton: false,
                showRatings: false,
                wrapper: "<table width='100%' class='VC4T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.description = "at1";
                    }
                },
                inCart: true
            }],
            SearchResults: [{
                enable: true,
                resultType: 5,
                numItems: 20,
                caption: "No Results But Here Are More Ideas",
                showCaption: false,
                productStyle: "product4T product4THome",
                divSelect: "#content_area",
                divPosition: "append",
                itemsPerGroup: 5,
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,4],[1400,4]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showBuyButton: false,
                showPrice: true,
                wrapper: "<table width='100%' class='SR4T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.description = "at1";

                    },
                    postDisplay: function() {
                        
                        var results = $('#div_articleid_60').html();
                        if (results && results.length) {
                            if($('#div_articleid_60').html().trim() === "No products match your search criteria, please try again.") {
                                $('#div_articleid_60').remove();
                            }
                        }
                        if ($('.v-product-grid .v-product').length > 1) {
                            $('.SR4T').remove();
                        }
                    }
                },
                inCart: false
            }],
            E404: [{
                enable: false,
                resultType: 1,
                numItems: 12,
                caption: "More Ideas",
                productStyle: "product4T product4THome",
                divSelect: ".BlockContent.full-width",
                divPosition: "below",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,6]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showPrice: true,
                wrapper: "<table width='100%' class='EP4T'><tr></tr></table>",
                rawJS: {
                    preInit: function() {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    }
                },
                inCart: false
            }]
        }
    };
}(window._4TellBoost = window._4TellBoost || {}, jQuery));