/*
 * jQuery scrollbarWidth - v0.2 - 2/11/2009
 * http://benalman.com/projects/jquery-misc-plugins/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,b,a){$.scrollbarWidth=function(){var c,d;if(a===b){c=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body");d=c.children();a=d.innerWidth()-d.height(99).innerWidth();c.remove()}return a}})(jQuery);

// Get parameter from URL
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

// jQuery.browser.mobile (http://detectmobilebrowser.com/)
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

/*
 * functions.js - Jesus Perez (@tx2z)
 */
var comicReader = ( function() {

    // Initial variables
    var $main = $( '#pt-main' ),
        readerOptions,
        animcursor = 1,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation' : 'webkitAnimationEnd',
            'OAnimation' : 'oAnimationEnd',
            'msAnimation' : 'MSAnimationEnd',
            'animation' : 'animationend'
        },
        // animation end event name
        animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
        // support css animations
        support = Modernizr.cssanimations,

        // Zoom variable
        percentResponsive,

        //Comic JSON file
        comicFolder = '_comics/' + getURLParameter( 'p' ) + '/',
        comicJson = comicFolder + 'content.json',
        //comicXml = comicFolder + 'content.xml',
        comicPages = new Array();

    // Get ComicReader general options using local Storage or load a new options set
    if ( Modernizr.localstorage && localStorage.getItem( 'readerOptionsStored' ) ) {
        // Localstorage detected - Load setings
        readerOptions = JSON.parse( localStorage.getItem( 'readerOptionsStored' ) );
    } else {
        // No localstorage settings detected (first time or no local storage avaible) - Create new profile
        if (jQuery.browser.mobile) { // Default for mobiles / tablets etc
            readerOptions = {
                'zoom': true,
                'fitwidth': true,
                'rememberpage': false,
                'offline': false,
                'tour': false
            };
        } else { // Default for desktop
            readerOptions = {
                'zoom': true,
                'fitwidth': false,
                'rememberpage': false,
                'offline': false,
                'tour': false
            };
        }
        // Save in local storage if avaible
        if ( Modernizr.localstorage ) {
            localStorage.setItem( 'readerOptionsStored', JSON.stringify( readerOptions ) );
        }
    }

    function init() {

        // Load comic json file and charge first configurations
        $.getJSON( comicJson, function( data ) {

            comicTitle = data.comic.title,
            comicDesc = data.comic.desc,
            comicPages = data.comic.images;
            comicPagesTotal = data.comic.images.length -1;
            comicId = data.comic.id;

            $( '#comic_sidebar_title' ).html( comicTitle );
            $( '#comic_sidebar_desc' ).html( comicDesc );

            // Comic values
            if ( Modernizr.localstorage && localStorage.getItem( 'comicStored' + comicId ) ) {
                // Localstorage detected - Load previous comic values
                comicOptions = JSON.parse( localStorage.getItem( 'comicStored' + comicId ) );
            } else {
                // No localstorage settings detected (first time or no local storage avaible) - Create new profile
                comicOptions = {
                    lastpage: 0
                };
                // Save in local storage if avaible
                if ( Modernizr.localstorage ) {
                    localStorage.setItem( 'comicStored' + comicId, JSON.stringify( comicOptions ) );
                }
            }

            // Using hast or locale storage to load the current page, if not load the first page
            if ( window.location.hash ) {
                var hash =  parseInt( window.location.hash.substr( 1 ) );
                current = hash;
                $( '#page_number' ).val( hash );
            } else if ( readerOptions.rememberpage && comicOptions.lastpage != 0 ) {
                window.location.hash = comicOptions.lastpage;
                current = 0;
                $( '#page_number' ).val( '0' );
            } else {
                current = 0;
                $( '#page_number' ).val( '0' );
            }

            // Change title of the page with the comic title
            document.title = comicTitle;

            // Change total pages in menu
            $( '#page_number_total' ).html( comicPagesTotal );

            //Add pages to #pt-main
            $.each( comicPages, function( index, value ) {
                $( '#pt-main' ).append( '<div id="pt-page-' + index + '" class="pt-page pt-page-' + index + '"></div>' );
            });

            // Add images to current page
            loadImages( current, true );

            // Add first page properties
            $pages = $main.children( 'div.pt-page' ),
            pagesCount = $pages.length;
            $pages.each( function() {
                var $page = $( this );
                $page.data( 'originalClassList', $page.attr( 'class' ) );
            } );
            $pages.eq( current ).addClass( 'pt-page-current' );

            // Add pagination links
            var nextPageNumber = current + 1,
                prevPageNumber = current - 1;
            $( '#next_page' ).data( 'page', nextPageNumber );
            $( '#prev_page' ).data( 'page', prevPageNumber );

            // Deactive prev_page if we are in the first page
            if( current == 0 ) {
                $( '#prev_page' ).addClass( 'disabled' );
            }

            // Visualization options for first page
            // ------------------------------------

            // Wait to images to load
            $pages.eq( current ).find( 'img' ).load(function() {

                // Visualization options
                loadImageVisualization( $pages.eq( current ) );

                // Remove loading div
                $( '#loading' ).fadeOut( 'slow', function() {
                    $( '#loading' ).remove();
                } );
            } );

        } );

        // Lateral menu
        // ------------
        $( '#menu' ).sidr();

        $.sidr('open');
        setTimeout(function() {
            $.sidr('close');
        },3000);


        $( 'input[type=radio]' ).each( function() {
            var option = $( this ).attr( 'name' ),
                value = $( this ).val();

            if ( readerOptions[option] && value == 1 ) {
                $( this ).prop( 'checked', true );
            } else if ( !readerOptions[option] && value == 0 ) {
                $( this ).prop( 'checked', true );
            }

        } );


        // EVENTS
        // ------

        // Disabling Browser zoom
        $(document).keydown( function( event ) {
            if ( event.ctrlKey==true && ( event.which == '107' || event.which == '109' || event.which == '187' || event.which == '189'  ) ) {
                alert( 'Zoom del navegador desactivado, por favor, utiliza el zoom de la aplicación.' );
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
            }
        });

        /* Pagination */
        $toTheNext = $( '#next_page' ).Touchable();
        $toThePrev = $( '#prev_page' ).Touchable();

        // Click / swipe to next page
        $toTheNext.on('touchableend', function(){
            if ( !$toTheNext.hasClass( 'disabled' ) ) {
                changePage( $toTheNext.data( 'page' ) );
            }
        } );

        // Click / swipe to prev page
        $toThePrev.on('touchableend', function( event ){
            if ( !$toThePrev.hasClass( 'disabled' ) ) {
                changePage( $toThePrev.data( 'page' ) );
            }
        } );

        // Keyboard Navigation
        $(document.documentElement).keyup(function (event) {
            // handle cursor keys
            if (event.keyCode == 37) { // Left
                if ( !$toThePrev.hasClass( 'disabled' ) ) {
                    changePage( $toThePrev.data( 'page' ) );
                }
            } else if (event.keyCode == 39) { // Right
                if ( !$toTheNext.hasClass( 'disabled' ) ) {
                    changePage( $toTheNext.data( 'page' ) );
                }
            }

        });

        $(document.documentElement).keypress(function (event) {
            // handle cursor keys
            if (event.keyCode == 38) { // Up
                $pages.eq( current ).scrollTop( $pages.eq( current ).scrollTop() - 150 );
            } else if (event.keyCode == 40) { // Down
                $pages.eq( current ).scrollTop( $pages.eq( current ).scrollTop() + 150 );
            }
        });

        // Changes in hash to navigate through the pages
        $( window ).on( 'hashchange', function() {
            if ( window.location.hash ) {
                var hash =  parseInt( window.location.hash.substr( 1 ) );
                changePage( hash );
            } else {
                changePage( 0 );
            }
        } );

        // Changes in Page input go to page
        // Select input content on focus
        $( '#page_number' ).on( 'click', function() {
           $( '#page_number' ).select();
        } );
        // Only allow numbers in input
        $( '#page_number' ).keydown(function(event) {
            // Allow: backspace, delete, tab, escape, and enter
            if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                 // Allow: Ctrl+A
                ( event.keyCode == 65 && event.ctrlKey === true ) ||
                 // Allow: home, end, left, right
                ( event.keyCode >= 35 && event.keyCode <= 39 ) ) {
                     // let it happen, don't do anything
                     return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                    event.preventDefault();
                }
            }
        });
        // Go to page if press GO button
        $( '#page_number_change' ).on('click', function(event) {
            event.preventDefault();
            if ( $( '#page_number' ).val() < comicPagesTotal ) {
                window.location.hash = $( '#page_number' ).val();
            } else {
                window.location.hash = comicPagesTotal;
            }
        } );
        // Go to page if press enter button
        $('#page_number').keypress(function (event) {
            if ( event.which == 13 ) {
                event.preventDefault();
                if ( $( '#page_number' ).val() < comicPagesTotal ) {
                    window.location.hash = $( '#page_number' ).val();
                } else {
                    window.location.hash = comicPagesTotal;
                }
            }
        });

        // Options radio buttons
        $( 'input[type=radio]' ).change( function() {
            var option = $( this ).attr( 'name' ),
                value = $( this ).val();

            readerOptions[option] = ( value == 1 ) ? true : false;

            // Save value in local storage
            if ( Modernizr.localstorage ) {
                localStorage.setItem( 'readerOptionsStored', JSON.stringify( readerOptions ) );
            }

            changePage( current );

        } );

    }

    // changePage() Navigate through the pages
    // goToNext = number(go to number page)
    function changePage( goToNext ) {

        if ( isAnimating ) {
            return false;
        }

        isAnimating = true;

        window.location.hash = goToNext;
        $( '#page_number' ).val( goToNext );

        var currPageNumber = current,
            $currPage = $pages.eq( currPageNumber ),
            $nextPage;

        current = goToNext,
        nextPageNumber = current + 1,
        prevPageNumber = current - 1;

        // load images if needed
        loadImages( current, true );

        // Re-enable pagination links
        $( '#next_page' ).removeClass( 'disabled' ).data( 'page', nextPageNumber );
        $( '#prev_page' ).removeClass( 'disabled' ).data( 'page', prevPageNumber );

        $nextPage = $pages.eq( current ).addClass( 'pt-page-current' );

        // Add change page effects
        if ( currPageNumber == current ) { // To same page
            outClass = 'pt-page-scaleDownUp';
            inClass = 'pt-page-scaleUp pt-page-delay300';
        } else if ( currPageNumber < current ) { // To next page
            outClass = 'pt-page-rotateRightSideFirst',
            inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
        } else { // To prev page
            outClass = 'pt-page-rotateLeftSideFirst',
            inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
        }

        if ( current == pagesCount -1 ) {
            $( '#next_page' ).addClass( 'disabled' );
        }

        if ( current == 0 ) {
            $( '#prev_page' ).addClass( 'disabled' );
        }

        $currPage.addClass( outClass ).on( animEndEventName, function() {
            $currPage.off( animEndEventName );
            endCurrPage = true;
            if( endNextPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );

        $nextPage.addClass( inClass ).on( animEndEventName, function() {
            $nextPage.off( animEndEventName );
            endNextPage = true;
            if( endCurrPage ) {
                onEndAnimation( $currPage, $nextPage );
            }
        } );

        if ( !support ) {
            onEndAnimation( $currPage, $nextPage );
        }

        // Load Visualization options
        loadImageVisualization( $nextPage, $currPage );

        // Save page in localStorage
        if ( readerOptions.rememberpage && Modernizr.localstorage) {
            comicOptions.lastpage = goToNext;
            localStorage.setItem( 'comicStored' + comicId, JSON.stringify( comicOptions ) );
        }

        // Load next and prev page images
        loadImages( current, false );
    }

    function onEndAnimation( $outpage, $inpage ) {
        endCurrPage = false;
        endNextPage = false;
        resetPage( $outpage, $inpage );
        isAnimating = false;
    }

    function resetPage( $outpage, $inpage ) {
        $outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
        $inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
    }

    function imageFitWidth( $targetPage ) {
        $targetPage.find( 'img' ).removeAttr( 'style' )
                                 .width( $targetPage.width() );
        if (!jQuery.browser.mobile) {
            $targetPage.css( { overflow : 'auto' , width : $targetPage.width() + $.scrollbarWidth() } );
        } else {
            $targetPage.css( { overflow : 'auto' , width : $targetPage.width() } );
        }
    }

    function imageFitHeight( $targetPage ) {
        $targetPage.find( 'img' ).removeAttr( 'style' )
                   .height( $targetPage.height() );
    }

    // Load previous and next images and first image if need
    function loadImages( currPage, isInit ) {

        function loadPrevNext( loadInPage ) {
            loadNextPageImage = comicPages[loadInPage],
            loadNextPageFind = $( '.pt-page-' + loadInPage ).find("img").length;

            if ( loadNextPageImage && loadNextPageFind == 0 ) {
                var npi = loadNextPageImage.indexOf('http') != -1 ? loadNextPageImage : comicFolder + loadNextPageImage ;
                $( '.pt-page-' + loadInPage ).append( '<img src="' + npi + '" alt="img-page-' + loadInPage + '" id="img-page-' + loadInPage + '" />' );
            }
        }

        if ( isInit ) {
            loadPrevNext( currPage );
        }
        loadPrevNext( currPage + 1 );
        loadPrevNext( currPage - 1 );

    }

    // Destroy smoothZoom
    function destroyZoom( $img ) {
        $img.smoothZoom( 'destroy' )
            .removeClass('image-zoom')
            .attr('style', '');
    }

    // Load options for image visualization
    function loadImageVisualization( $pageToLoad, $pagePrevious ) {

        // Reset and Destroy zoom in previous image
        if ( $pagePrevious && $pagePrevious.find( 'img' ).hasClass('image-zoom') ) {
            if ( $pagePrevious.attr( 'id' ) == $pageToLoad.attr( 'id' ) ) {
                destroyZoom( $pagePrevious.find( 'img' ) );
            } else {
                setTimeout(function() {
                    destroyZoom( $pagePrevious.find( 'img' ) );
                },600);
            }
        }

        if ( readerOptions.zoom ) {
        // Zoom ON

            if ( readerOptions.fitwidth ) {
                //Fit width option
                var divSize = $pageToLoad.width(),
                    imgSize = $pageToLoad.find( 'img' ).width();
                percentResponsive = ( divSize*100 )/imgSize;
            } else {
                percentResponsive = '';
            }

            $pageToLoad.find( 'img' ).smoothZoom( {
                zoom_MAX: 300,
                responsive: true,
                background_COLOR: '#000',
                border_SIZE: 0,
                zoom_BUTTONS_SHOW: false,
                pan_BUTTONS_SHOW: false,
                initial_ZOOM: percentResponsive,
                initial_POSITION: '0 0'
            } )
            .addClass('image-zoom');

        } else {
        // Zoom OFF
            if ( readerOptions.fitwidth ) {
                // Fit width option
                imageFitWidth( $pageToLoad );
                if ( $pagePrevious ) {
                    setTimeout( function() {
                        $pagePrevious.scrollTop( 0 );
                    }, 700 );
                }
            } else {
                //Fit height option
                imageFitHeight( $pageToLoad );
            }
        }


    }

    init();

    return { init : init };

} )();