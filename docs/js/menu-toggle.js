$(document).ready(function() {
    var menuCloseNav = $('.main-nav__menu-close'),
        menuCloseHeader = $('.main-header__menu-close'),
        menuToggleNav = $('.main-nav__menu-toggle'),
        menuToggleHeader = $('.main-header__menu-toggle'),
        mainNavigation = $('.main-nav__main-navigation'),
        menuList = $('.main-header__menu-list');

    menuToggleNav.click(function() {
        mainNavigation.show('slow');
        menuToggleNav.hide('slow');
        menuCloseNav.show('slow');
    });

    menuCloseNav.click(function() {
        menuCloseNav.hide('slow');
        mainNavigation.hide('slow');
        menuToggleNav.show('slow');
    });

    menuToggleHeader.click(function() {
        menuList.show('slow');
        menuToggleHeader.hide('slow');
        menuCloseHeader.show('slow');
    });

    menuCloseHeader.click(function() {
        menuCloseHeader.hide('slow');
        menuList.hide('slow');
        menuToggleHeader.show('slow');
    });

});