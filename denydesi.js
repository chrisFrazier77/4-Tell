(function (_4TellBoost, $, undefined) {
    _4TellBoost.CONFIG = {
        SiteInfo: {
            baseURL: "www.denydesigns.com/",
            alias: "denydesi",
            GA_UA: "UA-21715992-1",
            platform: "4TellShp.js",
            addCartBtnAtts: "input type='button' value='View Product' class='btn atc'",
            addCartImage: "",
            spacerImage: "//4tcdn.blob.core.windows.net/4tjs3/images/spacer.gif",
            emptyImage: "//4tcdn.blob.core.windows.net/4tjs3/images/spacer.gif",  
            pricePrefix: "",
            salePricePrefix: "",
            personalRecPageEnable: false,
            personalRecPageButtonSelect: $('body'),
            includeBase: false,
            searchBoostEnable: true,
            searchBoostGAName: '4TellRecsSearch',
            lazyOwl:true,
            custom: true,
            siteEnable: true,
        },
        PageSettings: {
            SearchBoostCat: [{
                enable: false,
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
                   perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                         var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
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
                       tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                       $('.SB4T').remove();
                       tout.catId = $('.categoryList .category4T.selected').attr('id').replace('at:','').replace('ar:','').replace('pro:','');
                       tout.caption = 'Most Relevant In ' + $('.categoryList .category4T.selected').html();
                   },
                },
                inCart: false
            }],
            SearchBoostProd: [{
                enable: true,
                resultType: 12,
                numItems: 8,
                caption: "Search Results",
                showCaption:false,
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                //itemsPerGroup: 2,
                /*carousel: {
                    itemsCustom: [[0,1],[480,2],[768,4]],
                    scrollPerPage: true,
                    navigation: true,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },*/
                showRatings: false,
                showPrice: true,
                showBuyButton: true,
                maxImageHeight: 150,
                wrapper: "<div class='SB4T selected'></div>",
                rawJS: {
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                         var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                    postDisplay: function() {
                        if ($('.SB4T').length > 1) {
                            $('.SB4T:last').remove();
                        }
                        //$('.SB4T .product4T:first').addClass('selected');
                        
                        $('.product4T').click(function(){
                            
                            var id = $(this).attr('id');
                            
                            //send events when some one types in the input
                            ga('send', 'event', _4TellBoost.CONFIG.SiteInfo.searchBoostGAName , 'SearchResult-Product', id, 1);
                        });
                        
                        $('.SB4T .product4T').each(function() {
                           
                           // get the page link 
                           var pageLink = $(this).find('a').attr('href');
                           
                           //get the product ID
                           var productId = $(this).find('.brand4T').attr('prodid');
                           
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
                                //_4TellBoost.UserData.session.recentSearchId = $('ul.categoryList li.selected').attr('id'); //increment the value
                                //_4TellBoost.UserData.session.recentSearchActive = true;
                                //_4TellBoost.UserData.save(); //save the new value to the cookie
                    
                                $( ".expandSearch" ).click();
                            }
                        });
                    },
                    preInit: function(tout) {
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
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
                numItems: 4,
                caption: "Other Suggestions",
                showCaption:false,
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                itemsPerGroup: 2,
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,2]],
                    scrollPerPage: true,
                    navigation: true,
                    //lazyLoad:true,
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
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                         var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                    postDisplay: function() {
                        
                        $('.searchBoostRecWrapper4T .product4T').hover(function(){
                            //$(this).find('.productBuy').fadeIn(200);
                            $(this).addClass('selected');
                            }, function(){
                            //$(this).find('.productBuy').fadeOut(200);
                            $(this).removeClass('selected');
                        });
                        
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
                        
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                        tout.prodIDs = $('.searchProduct4T.selected').attr('id');
                    }
                },
                inCart: false
            }],
            SearchBoostProd2Only: [{
                enable: true,
                resultType: 3,
                numItems: 4,
                caption: "Other Suggestions",
                productStyle: "product4T product4THome",
                divSelect: ".tout1_searchBoost_4T",
                divPosition: "append",
                itemsPerGroup: 2,
                carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,2]],
                    scrollPerPage: true,
                    navigation: true,
                    //lazyLoad:true,
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
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                         var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
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
                        $('.searchBoostRecWrapper4T .expandSearch').css("background-color", $('#top-nav').css("background-color"));
                        
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                        tout.prodIDs = $('.searchProduct4T.selected').attr('id');
                    }
                },
                inCart: false
            }],
            Home: [{
                enable: false,
                resultType: 1,
                numItems: 4,
                caption: "Recommended For You",
                showCaption: false,
                productStyle: "product4T product4TPD1",
                divSelect: ".slideshow",
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
                showRatings: false,
                showBuyButton: false,
                maxImageHeight: 150,
                wrapper: "<table width='100%' class='HOME4T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        if (_4TellBoost.UserData.cart &&_4TellBoost.UserData.cart.length){
                            tout.caption = "Recommended for You";
                            
                        } else if(_4TellBoost.UserData.data.Viewed && _4TellBoost.UserData.data.Viewed.length) {
                            tout.caption = "Recommended for You";
                            
                        }else {
                            tout.caption = "Top Sellers";
                        
                        }
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                        
                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                },
                inCart: false
            }],
            ProductDetail: [{
                enable: true,
                resultType: 5,
                numItems: 4,
                caption: "More from this collection",
                productStyle: "product4T product4TPD1",
                divSelect: '#recently-viewed-products',
                divPosition: "above",
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
                maxImageHeight: 150,
                wrapper: "<table width='100%' class='PD14T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        captionName = $('#product-area h1.title').html().trim();
                        //$('.collapsable-section-product p.brand').html().replace('Art Title: ','at:').trim().replace(/\s+/g, '-').toLowerCase();
                        var catID = 'at:' + $('#product-area h1.title').html().trim().replace(/\s+/g, '-').toLowerCase();
                        tout.catId = catID;
                        
                        tout.caption = 'more from the '+ captionName +' collection';
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";

                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                         var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                    postDisplay: function() {
                        //$('#recently-viewed-products').remove();
                    }
                },
                inCart: false
            }, {
                enable: true,
                resultType: 5,
                numItems: 4,
                caption: "Others from this Artist",
                productStyle: "product4T product4TPD2",
                divSelect: ".PD14T",
                divPosition: "below",
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
                showBuyButton: false,
                showRatings: false,
                wrapper: "<table width='100%' class='PD24T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        var captionName = meta.product.vendor.replace('DENY ','');
                        var catID = meta.product.vendor.replace('DENY ','ar:').trim().replace(/\s+/g, '-').toLowerCase();
                        tout.catId = catID;
                        tout.caption = 'more from '+ captionName;
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                         var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    }
                },
                inCart: false
            },{
                enable: true,
                resultType: 0,
                numItems: 4,
                caption: "Customers Also Bought",
                productStyle: "product4T product4TPD2",
                divSelect: ".PD24T",
                divPosition: "below",
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
                showBuyButton: false,
                showRatings: false,
                wrapper: "<table width='100%' class='PD34T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                         var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
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
                numItems: 9,
                fillMode: 'none',
                caption: "Category Top Sellers",
                showCaption: false,
                productStyle: "product4T product4TPD1",
                divSelect: '.collection-description',
                divPosition: "below",
                //itemsPerGroup: 3,
                /*carousel: {
                    items: 4,
                    itemsCustom: [[0,1],[480,2],[768,3],[992,3],[1200,3],[1400,3]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:false,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },*/
                responsive: {
                    1: {
                        //itemsPerGroup: 3,
                        numItems: 9,
                        rawJS: {
                            postDisplay: function() {
                                //dynamic image sizing 
                                var height = $('.product-inner figure img').height().toString() + 'px';
                                $('.CAT4T .productImage').css('height', height);
                                $('.template-collection .product-list').css('padding','initial').css('margin-top','10px');
                                
                                if ($('.CAT4T .product4T').length != 9) {
                                    $('.CAT4T').hide();
                                }
                                
                            },
                            preInit: function(tout) {
                        if ($('#selected-filters') && $('#selected-filters').length) {
                            tout.enable = false;
                        }
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                        var blockedIdsArray = [];
                        var counter = 0;
                        $('.product-list li').each(function() {
                            counter = counter + 1;
                            if (counter < 20) {
                                var product = $(this);
                                var id = $(this).attr('class').replace(/[^0-9.]/g, '');
                                blockedIdsArray.push(id);
                            }
                        });
                        tout.blockIDs = blockedIdsArray.toString();
                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                        var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                        },
                    },

                    2: {
                        //itemsPerGroup: 2,
                         numItems: 8,
                         rawJS: {
                            postDisplay: function() {
                                //dynamic image sizing 
                                var height = $('.product-inner figure img').height().toString() + 'px';
                                $('.CAT4T .productImage').css('height', height);
                                $('.template-collection .product-list').css('padding','initial').css('margin-top','10px');
                                
                                if ($('.CAT4T .product4T').length != 8) {
                                    $('.CAT4T').hide();
                                }
                                
                            },
                            preInit: function(tout) {
                        if ($('#selected-filters') && $('#selected-filters').length) {
                            tout.enable = false;
                        }
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                        var blockedIdsArray = [];
                        var counter = 0;
                        $('.product-list li').each(function() {
                            counter = counter + 1;
                            if (counter < 20) {
                                var product = $(this);
                                var id = $(this).attr('class').replace(/[^0-9.]/g, '');
                                blockedIdsArray.push(id);
                            }
                        });
                        tout.blockIDs = blockedIdsArray.toString();
                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                        var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                        },
                    },
                    3: {
                        //itemsPerGroup: 2,
                         numItems: 8,
                         rawJS: {
                            postDisplay: function() {
                                //dynamic image sizing 
                                var height = $('.product-inner figure img').height().toString() + 'px';
                                $('.CAT4T .productImage').css('height', height);
                                $('.template-collection .product-list').css('padding','initial').css('margin-top','10px');
                                
                                if ($('.CAT4T .product4T').length != 8) {
                                    $('.CAT4T').hide();
                                }
                                
                            },
                            preInit: function(tout) {
                        if ($('#selected-filters') && $('#selected-filters').length) {
                            tout.enable = false;
                        }
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                        var blockedIdsArray = [];
                        var counter = 0;
                        $('.product-list li').each(function() {
                            counter = counter + 1;
                            if (counter < 20) {
                                var product = $(this);
                                var id = $(this).attr('class').replace(/[^0-9.]/g, '');
                                blockedIdsArray.push(id);
                            }
                        });
                        tout.blockIDs = blockedIdsArray.toString();
                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                        var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                        },
                    },
                    4: {
                        //itemsPerGroup: 2,
                         numItems: 8,
                         rawJS: {
                            postDisplay: function() {
                                //dynamic image sizing 
                                var height = $('.product-inner figure img').height().toString() + 'px';
                                $('.CAT4T .productImage').css('height', height);
                                $('.template-collection .product-list').css('padding','initial').css('margin-top','10px');
                                
                                if ($('.CAT4T .product4T').length != 8) {
                                    $('.CAT4T').hide();
                                }
                                
                            },preInit: function(tout) {
                        if ($('#selected-filters') && $('#selected-filters').length) {
                            tout.enable = false;
                        }
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                        var blockedIdsArray = [];
                        var counter = 0;
                        $('.product-list li').each(function() {
                            counter = counter + 1;
                            if (counter < 20) {
                                var product = $(this);
                                var id = $(this).attr('class').replace(/[^0-9.]/g, '');
                                blockedIdsArray.push(id);
                            }
                        });
                        tout.blockIDs = blockedIdsArray.toString();
                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                        var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                        },
                    },
                    5: {
                        //itemsPerGroup: 2,
                         numItems: 8,
                         rawJS: {
                            postDisplay: function() {
                                //dynamic image sizing 
                                var height = $('.product-inner figure img').height().toString() + 'px';
                                $('.CAT4T .productImage').css('height', height);
                                $('.template-collection .product-list').css('padding','initial').css('margin-top','10px');
                                
                                if ($('.CAT4T .product4T').length != 8) {
                                    $('.CAT4T').hide();
                                }
                                
                            }
                            ,
                            preInit: function(tout) {
                                    if ($('#selected-filters') && $('#selected-filters').length) {
                                        tout.enable = false;
                                    }
                                    $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                                    tout.columns.custom.brand = "a2i";
                                    tout.columns.custom.artTitle = "at6";
                                    tout.columns.custom.productType = "at7";
                                    tout.columns.custom.listPrice = "lp";
                                    tout.columns.custom.altPrice1 = 'ap1';
                                    tout.columns.custom.altPrice2 = 'ap2';
                                    tout.columns.custom.topSale = "tsp";
                                    tout.columns.custom.topPrice = 'tpr';
                                    tout.columns.custom.topList = "tlp";
                                    var blockedIdsArray = [];
                                    var counter = 0;
                                    $('.product-list li').each(function() {
                                        counter = counter + 1;
                                        if (counter < 20) {
                                            var product = $(this);
                                            var id = $(this).attr('class').replace(/[^0-9.]/g, '');
                                            blockedIdsArray.push(id);
                                        }
                                    });
                                    tout.blockIDs = blockedIdsArray.toString();
                                },
                                perProduct: function(itemdata) {
                                    itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                                    
                                    var topPrice = itemdata.topPrice;
                                    var topList = itemdata.topList;
                                    var topSale = itemdata.topSale;
                                    var altp1 = itemdata.altPrice1;
                                    var altp2 = itemdata.altPrice2;
            
                                    var listPrice = itemdata.listPrice;
                                    var price = itemdata.price;
                                    
                                    if(itemdata.productType === 'duvet-covers') {
                                        itemdata.salePrice = '';
                                        itemdata.price =  'From $145.00';
                                    }else {
                                        if (topPrice === ''){
                                            if(listPrice === price ) {
                                                return;
                                            } else {
                                                itemdata.salePrice = price;
                                                itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                            }
                                        } else {
                                            itemdata.price = 'From ' + itemdata.price;
                                        }
                                    }
                                },
                        },
                    },
                },

                showBuyButton: false,
                showRatings: false,
                wrapper: "<table width='100%' class='CAT4T'><tr></tr></table>",
                rawJS: {
                    
                    
                },
                inCart: false
            }],
            AddToCart: [{
                enable: true,
                resultType: 0,
                numItems: 10,
                caption: "You May Also Like",
                productStyle: "product4T product4TVC",
                divSelect: "#recently-viewed-products",
                divPosition: "above",
                itemsPerGroup: 2,
                carousel: {
                    items: 4,
                    itemsCustom: [[0,3],[480,3],[768,3],[992,4],[1200,5],[1400,5]],
                    scrollPerPage: true,
                    navigation: true,
                    lazyLoad:false,
                    navigationText: false,
                    pagination: false,
                    addClassActive: true
                },
                responsive: {
                    1: {
                        itemsPerGroup: 2,
                    },

                    2: {
                       itemsPerGroup: 1,
                    },

                    3: {
                       itemsPerGroup: 1,
                    },

                    4: {
                       itemsPerGroup: 1,
                    }
                },

                showRatings: false,
                showBuyButton:false,
                wrapper: "<table width='100%' class='VC4T'><tr></tr></table>",
                rawJS: {
                    preInit: function(tout) {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                        tout.columns.custom.brand = "a2i";
                        tout.columns.custom.artTitle = "at6";
                        tout.columns.custom.productType = "at7";
                        tout.columns.custom.listPrice = "lp";
                        tout.columns.custom.altPrice1 = 'ap1';
                        tout.columns.custom.altPrice2 = 'ap2';
                        tout.columns.custom.topSale = "tsp";
                        tout.columns.custom.topPrice = 'tpr';
                        tout.columns.custom.topList = "tlp";
                    },
                    perProduct: function(itemdata) {
                        itemdata.title = itemdata.artTitle.replace(/-/g, ' ');
                        
                         var topPrice = itemdata.topPrice;
                        var topList = itemdata.topList;
                        var topSale = itemdata.topSale;
                        var altp1 = itemdata.altPrice1;
                        var altp2 = itemdata.altPrice2;

                        var listPrice = itemdata.listPrice;
                        var price = itemdata.price;
                        
                        if(itemdata.productType === 'duvet-covers') {
                            itemdata.salePrice = '';
                            itemdata.price =  'From $145.00';
                        }else {
                            if (topPrice === ''){
                                if(listPrice === price ) {
                                    return;
                                } else {
                                    itemdata.salePrice = price;
                                    itemdata.price = '<span class="label">On sale</span>' + listPrice;
                                }
                            } else {
                                itemdata.price = 'From ' + itemdata.price;
                            }
                        }
                    },
                    postDisplay: function() {
                        $('#recently-viewed-products').remove();
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
                showRatings: false,
                showPrice: true,
                wrapper: "<table width='100%' class='EP4T'><tr></tr></table>",
                rawJS: {
                    preInit: function() {
                        $('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">');
                    }
                },
                inCart: false
            }],
        }
    };
}(window._4TellBoost = window._4TellBoost || {}, jQuery));