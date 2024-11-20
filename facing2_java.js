// Selectors for SCEA items
const seeMoreScea = document.getElementById('see-more-scea');
const backScea = document.getElementById('back-scea');
const sceaAdditionalItems = document.getElementById('scea-additional-items');
const sceaProjector = document.getElementById('scea-item-projector');

// Selectors for UCS items
const seeMoreUcs = document.getElementById('see-more-ucs');
const backUcs = document.getElementById('back-ucs');
const ucsAdditionalItems = document.getElementById('ucs-additional-items');

// Selectors for Set items
const seeMoreSet = document.getElementById('see-more-set');
const backSet = document.getElementById('back-set');
const setAdditionalItems = document.getElementById('set-additional-items');

// SCEA Items functionality
seeMoreScea.addEventListener('click', () => {
    sceaProjector.style.display = 'none'; // Hide projector
    sceaAdditionalItems.style.display = 'block'; // Show additional items
    seeMoreScea.style.display = 'none'; // Hide "See More" button
    backScea.style.display = 'inline'; // Show "Back" button
});

backScea.addEventListener('click', () => {
    sceaProjector.style.display = 'block'; // Show projector
    sceaAdditionalItems.style.display = 'none'; // Hide additional items
    seeMoreScea.style.display = 'inline'; // Show "See More" button
    backScea.style.display = 'none'; // Hide "Back" button
});

// UCS Items functionality
seeMoreUcs.addEventListener('click', () => {
    ucsAdditionalItems.style.display = 'block'; // Show additional items
    seeMoreUcs.style.display = 'none'; // Hide "See More" button
    backUcs.style.display = 'inline'; // Show "Back" button
});

// UCS Items functionality (continued)
backUcs.addEventListener('click', () => {
    ucsAdditionalItems.style.display = 'none'; // Hide additional items
    seeMoreUcs.style.display = 'inline'; // Show "See More" button
    backUcs.style.display = 'none'; // Hide "Back" button
});

// Set Items functionality
seeMoreSet.addEventListener('click', () => {
    setAdditionalItems.style.display = 'block'; // Show additional items
    seeMoreSet.style.display = 'none'; // Hide "See More" button
    backSet.style.display = 'inline'; // Show "Back" button
});

backSet.addEventListener('click', () => {
    setAdditionalItems.style.display = 'none'; // Hide additional items
    seeMoreSet.style.display = 'inline'; // Show "See More" button
    backSet.style.display = 'none'; // Hide "Back" button
});
