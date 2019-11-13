$(function () {
  
  
    /*-------------------------------------
      </> mmenu
     ------------------------------------*/
    var $menu = $('#res_menu').mmenu( {
        extensions: [
            'pagedim-black',
            'border-offset',
            'fx-menu-slide',
            'fx-panels-none'
        ],
        navbar: {
            add: false,
            title: 'منو',
            titleLink: 'parent'
        },
        slidingSubmenus: false,
        offCanvas: {
            position: 'right',
            zposition: 'back'
        },
        keyboardNavigation: {
            enable: 'default',
            enhance: true
        },
        lazySubmenus: {
            load: true
        },
        setSelected: {
            current: 'detect',
            hover: true,
            parent: true
        }
    }, {
        transitionDuration: 500,
        offCanvas: {
            pageSelector: '#main-page'
        },
        screenReader: {
            text: {
                closeMenu: 'بستن منو',
                closeSubmenu: 'بستن زیر منو',
                openSubmenu: 'بازکردن زیر منو',
                toggleSubmenu: 'باز و بسته کردن منو'
            }
        }
    });
    var API = $menu.data('mmenu');
    $('#navbar-toggler').on('click', function () {
        API.open();
    });
    $('#menu .menu-item-has-children').on('click', function () {
        $(this).find('> div.mm-panel.mm-vertical').slideToggle();
        $(this).toggleClass('active');
    });
});

/**
 * ticker typing
 * @param {int} [typeSpeed] - Speed of typing.
 * @param {int} [delay] - delay in typing.
 */
$.fn.tickerTyping = function () {
    var typeSpeed = 30,
        delay = 2000,
        $this = $(this),
        $children = $this.children(),
        texts = $children.map(function () {
            return $(this).text();
        }).get();
    var i = 0,
        s = 0;
    var step = function () {
        var $current = $children.eq(i),
            $a = $current.find('a:first');
        $children.hide();
        $current.show();
        $a.text(texts[i].substr(0, s));
        if (s == texts[i].length) {
            s = 0;
            if (i == $children.length - 1) {
                i = 0;
            } else {
                i++;
            }
            setTimeout(step, delay);
        } else {
            setTimeout(step, typeSpeed);
        }
        s++;
    };
    step();
};

/**
 * generate tab
 * @param {string} [tabIndex] - The tabIndex is value of data-tabindex in parent tab.
 */
function tabInit(tabIndex) {
    if (typeof tabIndex === "undefined" || tabIndex === null) {
        $('[data-tabindex]').each(function () {
            let ele = $(this),
                dataTabindex = ele.attr('data-tabindex'),
                hasTrueTab = false;
            ele.find(' .tab-content [data-tabc][data-parent="' + dataTabindex + '"]').hide();
            ele.find(' .tab-title  [data-tab][data-parent="' + dataTabindex + '"]').each(function () {
                let i;
                if ($(this).hasClass('active')) {
                    i = $(this).attr('data-tab');
                    ele.find('.tab-content [data-tabc="' + i + '"][data-parent="' + dataTabindex + '"]').addClass('active').show();
                    hasTrueTab = true;
                }
                if (hasTrueTab !== true) {
                    ele.find('.tab-content [data-tabc="' + i + '"][data-parent="' + dataTabindex + '"]:first-of-type').show();
                    ele.find('.tab-title [data-tab="' + i + '"][data-parent="' + dataTabindex + '"]:first-of-type').addClass('active');
                }
            });
            ele.find(' .tab-title [data-tab][data-parent="' + dataTabindex + '"]').click(function () {
                if (!$(this).hasClass('active')) {
                    let t = $(this).attr('data-tab'),
                        oldActiveTab = ele.find(' .tab-title  [data-tab][data-parent="' + dataTabindex + '"].active').attr('data-tab');
                    ele.find(' .tab-title  [data-tab=' + oldActiveTab + '][data-parent="' + dataTabindex + '"]').removeClass('active');
                    ele.find(' .tab-content  [data-tabc=' + oldActiveTab + '][data-parent="' + dataTabindex + '"]').removeClass('active').hide();
                    $(this).addClass('active');
                    ele.find(' .tab-content  [data-tabc="' + t + '"][data-parent="' + dataTabindex + '"]').show();
                }
            });
        });
    } else {
        let dataTabindex = tabIndex;
        tabIndex = '[data-tabindex=' + tabIndex + ']';
        $(tabIndex).find(' .tab-content [data-tabc][data-parent="' + dataTabindex + '"]').hide();
        $(tabIndex).find(' .tab-title [data-tab][data-parent="' + dataTabindex + '"]').each(function () {
            var i;
            if ($(this).hasClass('active')) {
                i = $(this).attr('data-tab');
                $(tabIndex).find(' .tab-content  [data-tabc="' + i + '"][data-parent="' + dataTabindex + '"]').addClass('active').show();
            }
        });
        $(tabIndex).find(' .tab-title  [data-tab][data-parent="' + dataTabindex + '"]').click(function () {
            if (!$(this).hasClass('active')) {
                let t = $(this).attr('data-tab'),
                    oldActiveTab = $(tabIndex).find(' .tab-title  [data-tab][data-parent="' + dataTabindex + '"].active').attr('data-tab');
                $(tabIndex).find(' .tab-title  [data-tab=' + oldActiveTab + '][data-parent="' + dataTabindex + '"]').removeClass('active');
                $(tabIndex).find(' .tab-content  [data-tabc=' + oldActiveTab + '][data-parent="' + dataTabindex + '"]').removeClass('active').hide();
                $(this).addClass('active');
                $(tabIndex).find(' .tab-content  [data-tabc="' + t + '"][data-parent="' + dataTabindex + '"]').show();
            }
        });
    }
    $('body').on('click', '[data-tabindex-current]', function () {
        let dataTabindex = $(this).attr('data-tabindex-current'),
            ele = $('[data-tabindex="' + dataTabindex + '"]'),
            tabCurrent = $(this).attr('data-tab-current');
        ele.find('.tab-title  [data-tab][data-parent="' + dataTabindex + '"]').removeClass('active');
        ele.find('.tab-content  [data-tabc][data-parent="' + dataTabindex + '"]').hide();
        ele.find('.tab-title  [data-tab="' + tabCurrent + '"][data-parent="' + dataTabindex + '"]').addClass('active');
        ele.find('.tab-content  [data-tabc="' + tabCurrent + '"][data-parent="' + dataTabindex + '"]').fadeIn();
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 *  block loader
 */
function blockLoader(status, element, title) {
    let loaderDom;
    if (typeof status === "undefined" || status === null) {
        status = 'show';
    }
    if (typeof element === "undefined" || element === null) {
        element = 'body';
    }
    if (typeof title === "undefined" || title === null) {
        title = 'در حال بارگذاری ...';
    }
    loaderDom = '<div class="loader-overly"><div class="loader"><div class="spinner"><div></div><div></div><div></div><div></div></div>' + title + '</div>';
    let elementName = element;
    if (typeof element == 'string') {
        element = $(element);
    }
    if (status == 'show') {
        element.append(loaderDom);
        element.find('.loader-overly').show();
        if (elementName == 'body') {
            element.addClass('loader-locked');
            element.find('.loader-overly').addClass('loader-overly_fixed');
        }
    } else {
        element.find('.loader-overly').hide();
        element.find('.loader-overly').remove();
        if (elementName == 'body') {
            element.removeClass('loader-locked');
        }
    }
}

$.fn.extend({
    donetyping: function (callback, timeout) {
        timeout = timeout || 1e3; // 1 second default timeout
        var timeoutReference,
            doneTyping = function (el) {
                if (!timeoutReference) return;
                timeoutReference = null;
                callback.call(el);
            };
        return this.each(function (i, el) {
            var $el = $(el);
            // Chrome Fix (Use keyup over keypress to detect backspace)
            // thank you @palerdot
            $el.is(':input') && $el.on('keyup keypress paste', function (e) {
                // This catches the backspace button in chrome, but also prevents
                // the event from triggering too preemptively. Without this line,
                // using tab/shift+tab will make the focused element fire the callback.
                if (e.type == 'keyup' && e.keyCode != 8) return;

                // Check if timeout has been set. If it has, "reset" the clock and
                // start over again.
                if (timeoutReference) clearTimeout(timeoutReference);
                timeoutReference = setTimeout(function () {
                    // if we made it here, our timeout has elapsed. Fire the
                    // callback
                    doneTyping(el);
                }, timeout);
            }).on('blur', function () {
                // If we can, fire the event since we're leaving the field
                doneTyping(el);
            });
        });
    }
});

/* serialize object */
$.fn.serializeObject = function () {
    "use strict";
    var a = {}, b = function (b, c) {
        var d = a[c.name];
        "undefined" != typeof d && d !== null ? $.isArray(d) ? d.push(c.value) : a[c.name] = [d, c.value] : a[c.name] = c.value
    };
    return $.each(this.serializeArray(), b), a
};
