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
            SearchBoostCat: [{
                enable: true,
                resultType: 5,
                numItems: 12,
                caption: "Top Sellers",
                fillMode: 'none',
                productStyle: "product4T product4TCat",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
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
                showBuyButton: false,
                showRatings: false,
                showPrice: false,
                wrapper: "<table width='100%' class='SB4T cat'><tr></tr></table>",
                rawJS: {
                   
                   postDisplay: function() {
                        if ($('.SB4T').length > 1) {
                            $('.SB4T:last').remove();
                        }  
                        $('.SB4T.cat .product4T').click(function(){
                            
                            var id = $(this).attr('id');
                            var index = $(this).parent().index();
                            
                            //send events when some one types in the input
                            ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName , 'SearchResult-CategoryTopSellers', id, index);
                        });
                        
                        $(window).keyup(function (e)  {
                            if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
                                _4TellBoost.UserData.session.recentSearchId = $('ul.categoryList li.selected').attr('id'); //increment the value
                                _4TellBoost.UserData.session.recentSearchActive = true;
                                _4TellBoost.UserData.save(); //save the new value to the cookie
                    
                                $( ".expandSearch" ).click();
                            }
                        });
                   },
                   preInit: function(tout) {
                       tout.columns.custom.description = "at1";
                       $('.SB4T').remove();
                       tout.catId = $('.categoryList .category4T.selected').attr('id');
                       tout.caption = 'Most Relevant In ' + $('.categoryList .category4T.selected').html();
                   },
                },
                inCart: false
            }],
            SearchBoostProd: [{
                enable: true,
                resultType: 12,
                caption: "Selected",
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                carousel: {
                    itemsCustom: [[0,1]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showPrice: false,
                showBuyButton: false,
                maxImageHeight: 150,
                wrapper: "<div class='SB4T selected'></div>",
                rawJS: {
                    postDisplay: function() {
                        if ($('.SB4T').length > 1) {
                            $('.SB4T:last').remove();
                        }
                        
                        $('.selected .product4T').click(function(){
                            
                            var id = $(this).attr('id');
                            
                            //send events when some one types in the input
                            ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName , 'SearchResult-Product', id, 1);
                        });
                    
                    },
                    preInit: function(tout) {
                        tout.columns.custom.description = "at1";
                        var prodID = $('.searchProduct4T.selected').attr('id');
                        
                        tout.viewedIDs = prodID;
                    }
                },
                inCart: false
            },
            {
                enable: true,
                resultType: 3,
                numItems: 18,
                fillmode: "all",
                caption: "Similar Items",
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                itemsPerGroup: 2,
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true

                },
                showRatings: false,
                showPrice: false,
                showBuyButton: false,
                maxImageHeight: 150,
                wrapper: "<div class='SB4T2'></div>",
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