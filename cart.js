document.addEventListener("DOMContentLoaded", function() {
    // Search Bar functionality
    const searchBar = document.getElementById('search-bar');

    // Handle focus event - placeholder will disappear when user starts typing
    searchBar.addEventListener('focus', function() {
        if (!searchBar.value) {
            searchBar.placeholder = '';
        }
    });

    // Handle blur event - placeholder will reappear if input is empty
    searchBar.addEventListener('blur', function() {
        if (!searchBar.value) {
            searchBar.placeholder = 'Search Item here';
        }
    });

    // Optional: Handle if user clears the search bar
    searchBar.addEventListener('input', function() {
        if (!searchBar.value) {
            searchBar.placeholder = 'Search Item here';
        }
    });

    // UCS Section: See More / Back button functionality
    const seeMoreUcsBtn = document.getElementById('see-more-ucs-btn');
    const backUcsBtn = document.getElementById('back-ucs-btn');
    const hiddenUcsItems = document.querySelectorAll('.hidden-item'); // Adjust this to target UCS hidden items
    const ucsItemList = document.querySelector('.ucs-item-list');

    seeMoreUcsBtn.addEventListener('click', () => {
        hiddenUcsItems.forEach(item => {
            item.style.display = 'block'; // Show hidden UCS items
        });
        seeMoreUcsBtn.style.display = 'none'; // Hide "See More" button for UCS
        backUcsBtn.style.display = 'inline-flex'; // Show "Back" button for UCS
        ucsItemList.style.height = 'auto'; // Adjust the height to fit new UCS items
    });

    backUcsBtn.addEventListener('click', () => {
        hiddenUcsItems.forEach(item => {
            item.style.display = 'none'; // Hide UCS items again
        });
        seeMoreUcsBtn.style.display = 'inline-flex'; // Show "See More" button for UCS again
        backUcsBtn.style.display = 'none'; // Hide "Back" button for UCS
        ucsItemList.style.height = ''; // Reset height for UCS
    });

    // SCEA Section: See More / Back button functionality
    const seeMoreSceaBtn = document.getElementById('see-more-scea-btn');
    const backSceaBtn = document.getElementById('back-scea-btn');
    const hiddenSceaItems = document.querySelectorAll('.hidden-scea-item'); // Adjust this to target SCEA hidden items
    const sceaItemList = document.querySelector('.scea-item-list');

    seeMoreSceaBtn.addEventListener('click', () => {
        hiddenSceaItems.forEach(item => {
            item.style.display = 'block'; // Show hidden SCEA items
        });
        seeMoreSceaBtn.style.display = 'none'; // Hide "See More" button for SCEA
        backSceaBtn.style.display = 'inline-flex'; // Show "Back" button for SCEA
        sceaItemList.style.height = 'auto'; // Adjust the height to fit new SCEA items
    });

    backSceaBtn.addEventListener('click', () => {
        hiddenSceaItems.forEach(item => {
            item.style.display = 'none'; // Hide SCEA items again
        });
        seeMoreSceaBtn.style.display = 'inline-flex'; // Show "See More" button for SCEA again
        backSceaBtn.style.display = 'none'; // Hide "Back" button for SCEA
        sceaItemList.style.height = ''; // Reset height for SCEA
    
    });

    // Set Items Section: See More / Back button functionality
    // ----------------------------------------------------------
    const seeMoreSetBtn = document.getElementById('see-more-set-btn'); // Set "See More" button
    const backSetBtn = document.getElementById('back-set-btn'); // Set "Back" button
    const hiddenSetItems = document.querySelectorAll('.hidden-set-item'); // Adjust this to target hidden Set Items
    const setItemList = document.querySelector('.set-item-list'); // Target the Set Item list

    // Handle "See More" button for Set Items
    seeMoreSetBtn.addEventListener('click', () => {
        hiddenSetItems.forEach(item => {
            item.style.display = 'block'; // Show hidden Set Items
        });
        seeMoreSetBtn.style.display = 'none'; // Hide "See More" button for Set Items
        backSetBtn.style.display = 'inline-flex'; // Show "Back" button for Set Items
        setItemList.style.height = 'auto'; // Adjust the height to fit new Set Items
    });

    // Handle "Back" button for Set Items
    backSetBtn.addEventListener('click', () => {
        hiddenSetItems.forEach(item => {
            item.style.display = 'none'; // Hide Set Items again
        });
        seeMoreSetBtn.style.display = 'inline-flex'; // Show "See More" button for Set Items again
        backSetBtn.style.display = 'none'; // Hide "Back" button for Set Items
        setItemList.style.height = ''; // Reset height for Set Items
    });
    // ----------------------------------------------------------

});