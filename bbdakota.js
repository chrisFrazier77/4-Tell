(function (_4TellBoost, $, undefined) {
    _4TellBoost.CONFIG = {
        SiteInfo: {
            baseURL: "www.bbdakota.com/",
            alias: "bbdakota",
            GA_UA: "ua-?",
            platform: "4TellShp.js",
            addCartBtnAtts: "input type='button' value='Choose Options' class='btn atc'",
            addCartImage: "",
            spacerImage: "//4tcdn.blob.core.windows.net/4tjs3/images/spacer.gif",
            emptyImage: "//4tcdn.blob.core.windows.net/4tjs3/images/nophoto.gif",   
            pricePrefix: "",
            salePricePrefix: "",
            personalRecPageEnable: false,
            personalRecPageButtonSelect: $('body'),
            
            //form that we submit when you hit enter
            searchFormSubmit: $('#search_mini_form'),
            //search results page enable
            searchResultsBoostEnable: false,
            //facets on results page enable
            searchResultsFacetsEnable: false,
            //facet option cut off REQUIRED
            //search input that we append our class name to
            searchInput: $('input#search'),
            //search div that we append our rec wrapper to
            searchWrapper: $('.container .actions'),
            optionCutOff: 90,
            //facet accordian enable
            facetAccordianEnable: false,
            //inline search enable
            searchBoostEnable: true,
            searchBoostGAName: '4TellRecsSearch',
            //category results for inline search enable
            searchBoostCategoryResultsEnable: false,
            
            searchColumns: "nm,at1,a2n,a2i",
            resultColumns: "id,pl,rt,pr,sp,il,nm,ail1,a2n",
            //resultColumns: "id,pl,rt,pr,sp,il,nm,at5,at6,at7,lp,ap1,ap2,tsp,tpr,tlp",
            
            resultCategoryColumns: "CategoryID,DisplayName,NumProducts,NumSales,Name",
            searchCategoryColumns: "Name,SearchPath,SearchText,CategoryID",
            
            includeBase: false,
            lazyOwl:true,
            custom: true,
            siteEnable: true,
        },
        PageSettings: {
            Home: [{
                enable: true,
                resultType: 1,
                numItems: 12,
                caption: "Recommended For You",
                productStyle: "product4T product4TPD1",
                divSelect: "#tout1_hm_4Tell",
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
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                maxImageHeight: 150,
                wrapper: "<div class='HOME4T'></div>",
                rawJS: {
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        if (_4TellBoost.UserData.cart &&_4TellBoost.UserData.cart.length){
                            tout.caption = "Recommended for You";
                            
                        } else if(_4TellBoost.UserData.data.Viewed && _4TellBoost.UserData.data.Viewed.length) {
                            tout.caption = "Recommended for You";
                            
                        }else {
                            tout.caption = "Top Sellers";
                        
                        }
                        
                    },
                    postDisplay:function() {
                        $('.product4T').each(function() {
                            var product = $(this);
                            var brand = $(this).find('.prodInfo4T');
                            if (brand && brand.length) {
                                brand = brand.attr('brand');
                                var brandDiv = $('<div class="brand4T">' + brand + '</div>');
                                product.append(brandDiv);
                            }
                        });  
                    }
                },
                inCart: false
            }],
            ProductDetail: [{
                enable: false,
                resultType: 0,
                numItems: 12,
                caption: "Customers Also Bought",
                productStyle: "product4T product4TPD1",
                divSelect: "#tout1_pdp_4Tell",
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
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                maxImageHeight: 150,
                wrapper: "<div class='PD14T'></div>",
                rawJS: {
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    }
                },
                inCart: false
            }, {
                enable: true,
                resultType: 3,
                numItems: 12,
                caption: "Customers Also Viewed",
                productStyle: "product4T product4TPD2",
                //divSelect: "#tout2_pdp_4Tell",
                divSelect: '.related-products',
                divPosition: "append",
                carousel: {
                    items: 6,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,4],[1400,4]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                wrapper: "<div class='PD24T'></div>",
                rawJS: {
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        
                        $('.related-products').empty();
                    },
                    postDisplay:function() {
                        $('.product4T').each(function() {
                            var product = $(this);
                            var brand = $(this).find('.prodInfo4T');
                            if (brand && brand.length) {
                                brand = brand.attr('brand');
                                var brandDiv = $('<div class="brand4T">' + brand + '</div>');
                                product.append(brandDiv);
                            }
                        });  
                    }
                },
                inCart: false
            }],
            Search: [{
                enable: false
            }],
            Category: [{
                enable: true,
                resultType: 5,
                numItems: 12,
                fillMode: "none",
                caption: "Category Top Sellers",
                productStyle: "product4T product4TCat",
                divSelect: "#tout1_cat_4Tell",
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
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                wrapper: "<div class='CAT4T'></div>",
                rawJS: {
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    },
                    postDisplay:function() {
                        $('.product4T').each(function() {
                            var product = $(this);
                            var brand = $(this).find('.prodInfo4T');
                            if (brand && brand.length) {
                                brand = brand.attr('brand');
                                var brandDiv = $('<div class="brand4T">' + brand + '</div>');
                                product.append(brandDiv);
                            }
                        });  
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
                divSelect: ".cart-actions.butter",
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
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                wrapper: "<div class='VC4T'></div>",
                rawJS: {
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    },
                    postDisplay:function() {
                        $('.product4T').each(function() {
                            var product = $(this);
                            var brand = $(this).find('.prodInfo4T');
                            if (brand && brand.length) {
                                brand = brand.attr('brand');
                                var brandDiv = $('<div class="brand4T">' + brand + '</div>');
                                product.append(brandDiv);
                            }
                        });  
                    }
                },
                inCart: true
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
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,4],[1400,4]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                wrapper: "<div class='EP4T'></div>",
                rawJS: {
                    preInit: function() {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    }
                },
                inCart: false
            }],
            CustomPage: [{
                enable: true,
                resultType: 5,
                numItems: 12,
                caption: "Trending Now",
                //fillMode: "none",
                productStyle: "product4T product4TVC",
                divSelect: ".tout1_landing_4Tell",
                divPosition: "append",
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
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                wrapper: "<table width='100%' class='CP4T'><tr></tr></table>",
                rawJS: {
                
                    perProduct: function (itemdata) {
                        itemdata.title = itemdata.title.replace(/\\\/|\/\\/g, "/");  
                    },
                    preInit: function(tout) {
                        tout.columns.custom.imageSet = "is";
                        tout.columns.custom.type = "at1";
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        
                        var currentTout = tout.divSelect;
                        var catID = $(currentTout).attr('data_category');
                        var caption = $(currentTout).attr('data_caption');
                        var product = $(currentTout).attr('data_product');
                        
                        if (product && product.length){
                            tout.prodIDs = product;
                            tout.resultType = 3;
                        }
                        if (catID && catID.length) {
                            tout.catId = catID;
                        }
                        if (caption && caption.length) {
                            tout.caption = caption;
                        }
                    }, 
                    postDisplay: function(){
                        
                        _4TellBoost.PostDisplayAdvancedDisplay();
                    }
                },
                inCart: false
            }],
            PersonalRecPage: [{
                enable: true,
                resultType: 1,
                numItems: 12,
                caption: "Recommended",
                productStyle: "product4T product4THome",
                divSelect: ".subtitle4T",
                divPosition: "below",
                carousel: {
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                imageSize: "&maxx=100&maxy=100",
                maxImageHeight: 150,
                wrapper: "<div class='FPR4T'></div>",
                rawJS: {
                    
                    preInit: function(tout) {
                        tout.columns.custom.brand = "a2n";
                        tout.columns.custom.sale = "a1i";
                        
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        if (_4TellBoost.UserData.cart &&_4TellBoost.UserData.cart.length){
                            tout.caption = "Recommended for You";
                            
                        } else if(_4TellBoost.UserData.data.Viewed && _4TellBoost.UserData.data.Viewed.length) {
                            tout.caption = "Recommended for You";
                            
                        }else {
                            tout.caption = "Here are some Top Sellers";
                        
                        }
                        
                        
                    }
                },
                inCart: false
            },{
                enable: true,
                resultType: 0,
                numItems: 12,
                fillmode: "genomic",
                caption: "Products based on your cart or recently viewed",
                productStyle: "product4T product4THome",
                divSelect: '.FPR4T:last',
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
                showPrice: false,
                showBuyButton:false,
                showRatings: false,
                imageSize: "&maxx=100&maxy=100",
                maxImageHeight: 150,
                wrapper: "<div class='FPR4T'></div>",
                rawJS: {
                    preInit:function(tout) {
                        tout.columns.custom.brand = "a2n";
                        tout.columns.custom.sale = "a1i";

                        if (_4TellBoost.UserData.cart &&_4TellBoost.UserData.cart.length){
                            tout.caption = "Customers like you also bought";
                            tout.prodIDs = _4TellBoost.UserData.cart.join(",");
                        } else if(_4TellBoost.UserData.data.Viewed && _4TellBoost.UserData.data.Viewed.length) {
                            tout.caption = "Customers like you also bought";
                            tout.prodIDs = _4TellBoost.UserData.data.Viewed.join(",");
                        }else {
                            tout.enable = false;
                        }
                    },
                    
                    
                },
                inCart: false
            },{
                enable: true,
                resultType: 3,
                numItems: 12,
                fillmode: "all",
                caption: "Similiar Items",
                productStyle: "product4T product4THome",
                divSelect: '.FPR4T:last',
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
                showPrice: false,
                showBuyButton:false,
                imageSize: "&maxx=100&maxy=100",
                maxImageHeight: 150,
                wrapper: "<div class='FPR4T'></div>",
                rawJS: {
                   
                    preInit: function(tout) {
                        
                        tout.columns.custom.brand = "a2n";
                        tout.columns.custom.sale = "a1i";

                        if(_4TellBoost.UserData.data.Viewed && _4TellBoost.UserData.data.Viewed.length) {
                            tout.prodIDs = _4TellBoost.UserData.data.Viewed.join(",");
                        } else {
                            tout.enable = false;
                        }
                    }
                },
                inCart: false
            },{
                enable: true,
                resultType: 5,
                numItems: 12,
                caption: "Based on your recent category",
                productStyle: "product4T product4THome",
                divSelect: '.FPR4T:last',
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
                imageSize: "&maxx=100&maxy=100",
                showPrice: false,
                showBuyButton:false,
                maxImageHeight: 150,
                wrapper: "<div class='FPR4T'></div>",
                rawJS: {
                    
                    preInit: function(tout) {
                        tout.columns.custom.brand = "a2n";
                        tout.columns.custom.sale = "a1i";

                         if (_4TellBoost.UserData.session.recentCatID === undefined) {
                            tout.enable = false;
                         }
                         if (_4TellBoost.UserData.session.recentCatID === null) {
                            tout.enable = false;
                        }else {
                             tout.catId = _4TellBoost.UserData.session.recentCatID;
                         }
                    }
                },
                inCart: false
            },
            {
                enable: true,
                resultType: 12,
                caption: "Recently Viewed Items",
                productStyle: "product4T product4THome",
                divSelect: '.FPR4T:last',
                divPosition: "below",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: true,
                    navigation: true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true,
                    lazyLoad:true
                },
                showRatings: false,
                imageSize: "&maxx=100&maxy=100",
                showPrice: false,
                showBuyButton:false,
                maxImageHeight: 150,
                wrapper: "<div class='FPR4T'></div>",
                rawJS: {
                    
                    preInit: function(tout) {
                        tout.columns.custom.brand = "a2n";
                        tout.columns.custom.sale = "a1i";
                        
                        tout.numItems = _4TellBoost.UserData.data.Viewed.length; 
                        
                        if(_4TellBoost.UserData.data.Viewed && _4TellBoost.UserData.data.Viewed.length) {
                            //build the tout
                        } else {
                            tout.enable = false;
                        }
                    },
                    
                    
                inCart: false
                },
                
            },
            {
                //For postDisplay rec template changes
                enable: true,
                resultType: 1,
                numResults:1,
                caption: "For postDisplay rec template changes",
                productStyle: "product4T product4THome",
                divSelect: '.FPR4T:last',
                divPosition: "below",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: true,
                    navigation: true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true,
                    lazyLoad:true
                },
                showRatings: false,
                imageSize: "&maxx=100&maxy=100",
                showPrice: false,
                showBuyButton:false,
                maxImageHeight: 150,
                wrapper: "<div class='FPR4T hide'></div>",
                rawJS: {
                    
                    postDisplay: function(){
                        //make post display changes here
                        $('.FPR4T.hide').remove();
                    },
                inCart: false
                },
            }],
            Auto: [{
                enable: true,
                resultType: 1,
                numItems: 12,
                caption: "Trending Now",
                //fillMode: "none",
                productStyle: "product4T product4TVC",
                divSelect: "body",
                divPosition: "append",
                carousel: {
                    items: 4,
                    itemsCustom: [[0,2],[480,2],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showRatings: false,
                showPrice: false,
                showBuyButton:false,
                wrapper: "<table width='100%' class='auto-4T'><tr></tr></table>",
                rawJS: {
                    
                    preInit: function (tout) {
                        tout.columns.custom.altImage = "ail1";
                    },
                    preDisplay: function () {
                        _4TellBoost.detectCustomRecs();
                    },
                    postDisplay: function(){
                        $('.auto-4T').css("display", "none");
                    }
                    
                },
                inCart: true
            }],
            SearchBoostCategory: [{
                enable: true,
                resultType: 5,
                numItems: 4,
                fillMode: 'none',
                caption: "Search Results",
                showCaption:false,
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                carousel: {
                    items: 5,
                    itemsCustom: [[0,3],[480,3],[768,3],[992,4],[1200,4],[1400,4]],
                    scrollPerPage: false,
                    navigation: true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showPrice: false,
                showBuyButton: false,
                maxImageHeight: 150,
                wrapper: "<div class='SB4T selected category'></div>",
                rawJS: {
                    postDisplay: function() {
                        _4TellBoost.CategorySearchPostDisplay();
                        $('.product4T').each(function() {
                            var product = $(this);
                            var brand = $(this).find('.prodInfo4T');
                            var ExistingBrandDiv = $(this).find('.brand4T');
                            if (ExistingBrandDiv.length === 0) {
                                if (brand && brand.length) {
                                    brand = brand.attr('brand');
                                    var brandDiv = $('<div class="brand4T">' + brand + '</div>');
                                    product.append(brandDiv);
                                }
                            }
                        });  
                    },  
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        var catId = $('.searchCategory4T.selected').attr('id');
                        
                        tout.catId = catId;
                        
                    },
                    perProduct: function(itemdata){
                        
                    }
        
                },
                inCart: false
            }], 
            SearchBoostCatProd2Only: [{
                enable: true,
                resultType: 3,
                numItems: 6,
                caption: "Similar Products",
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                carousel: {
                    items: 5,
                    itemsCustom: [[0,3],[480,3],[768,3],[992,4],[1200,5],[1400,6]],
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
                wrapper: "<div class='SB4T2 similar'></div>",
                rawJS: {
                    
                    postDisplay: function() {
                        _4TellBoost.SimilarSearchPostDisplay();
                        $('.product4T').each(function() {
                            var product = $(this);
                            var brand = $(this).find('.prodInfo4T');
                            var ExistingBrandDiv = $(this).find('.brand4T');
                            if (ExistingBrandDiv.length === 0) {
                                if (brand && brand.length) {
                                    brand = brand.attr('brand');
                                    var brandDiv = $('<div class="brand4T">' + brand + '</div>');
                                    product.append(brandDiv);
                                }
                            }
                        }); 
                    },
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        
                        tout.prodIDs = $('.product4T.selected .prodInfo4T').attr('prodid');
                        
                        //blocked ids code
                        var blockedArray = "";
                        $('.SB4T .product4T .prodInfo4T').each(function() {
                            blockedArray = blockedArray + $(this).attr('prodid') + ","; 
                        });
                        tout.blockIDs = blockedArray;
                    },
                   perProduct: function(itemdata){
                        
                    }
                },
                inCart: false
            }],
            SearchBoostProd: [{
                enable: true,
                resultType: 12,
                numItems: 5,
                caption: "Search Results",
                showCaption:false,
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                carousel: {
                    items: 5,
                    itemsCustom: [[0,3],[480,3],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: false,
                    navigation: true,
                    lazyLoad:true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                showPrice: false,
                showBuyButton: false,
                maxImageHeight: 150,
                wrapper: "<div class='SB4T selected catalog'></div>",
                
                rawJS: {

                    postDisplay: function() {
                        _4TellBoost.CatelogSearchPostDisplay();
                        $('.product4T').each(function() {
                            var product = $(this);
                            var brand = $(this).find('.prodInfo4T');
                            var ExistingBrandDiv = $(this).find('.brand4T');
                            if (ExistingBrandDiv.length === 0) {
                                if (brand && brand.length) {
                                    brand = brand.attr('brand');
                                    var brandDiv = $('<div class="brand4T">' + brand + '</div>');
                                    product.append(brandDiv);
                                }
                            }
                        }); 
                    },
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        
                        if (_4TellBoost.newSearchStarted === true) {
                            tout.enable = false;
                        }
                        
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        var prodID = $('.searchProduct4T');
                        
                        newString = '';
                        
                        prodID.each( function() {
                            var id = $(this).attr('id');
                            newString = newString + ',' + id;
                        }); 
                        tout.viewedIDs = newString;
                    },
                    perProduct: function(itemdata){
                        
                    }
                },
                inCart: false
            }],
            SearchResultsPage: [{
                enable: true,
                //resultType: 12,
                numItems: 100,
                caption: "Search Results",
                showCaption:false,
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchResults_4T",
                divPosition: "append",
                showRatings: false,
                showPrice: true,
                showBuyButton: true,
                maxImageHeight: 150,
                wrapper: "<div class='SBR4T'></div>",
                rawJS: {
                    postDisplay: function() {
                        
                        $('.noResults').hide();
                        $('.loading4T').hide();
                        
                        if ($('.SB4T').length > 1) {
                            $('.SB4T:last').remove();
                        }
  
                    },
                    preInit: function(tout) {
                        tout.columns.custom.altImage = "ail1";
                        tout.columns.custom.brand = "a2n";
                        
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        
                        //THIS IS WHERE WE HIDE THE EXISTING SEARCH STUFF
                        $('#wrapper .collection-filter-bar').remove();
                        $('#wrapper .simple-collection').remove();

                    },
                    perProduct: function(itemdata){
                        
                    }
                },
                inCart: false
            }],
        }
    };
}(window._4TellBoost = window._4TellBoost || {}, jQuery));