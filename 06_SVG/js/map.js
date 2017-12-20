const regions = [...document.querySelectorAll('.land')];

let selectedRegions = []

regions.forEach(region => {
    region.addEventListener('mouseenter', (e) => {
        if (!isInSelectedRegions(region)) {
            region.style.fill = 'lightsteelblue';
        }
    });
    region.addEventListener('mouseleave', (e) => {
        if (!isInSelectedRegions(region)) {
            region.style.fill = '#ccc';
        }
    });
    region.addEventListener('click', (e) => {
        if (isInSelectedRegions(region)) {
            region.style.fill = 'lightsteelblue';
            removeFromSelectedRegions(region)
        } else {
            region.style.fill = 'lightcoral';
            selectedRegions.push(region)
        }
    });
})

function isInSelectedRegions(land) {
    return selectedRegions.find(element => {
        return element == land
    })
}

function removeFromSelectedRegions(land) {
    const index = selectedRegions.indexOf(land);
    if (index !== -1) {
        selectedRegions.splice(index, 1);
    }
}
