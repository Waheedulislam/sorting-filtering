const filterBtn = document.getElementById("filterToggle");
const sortBtn = document.getElementById("sortToggle");
const filterDropdown = document.getElementById("filterOptions");
const sortDropdown = document.getElementById("sortOptions");

filterBtn.onclick = () => {
    toggleDropdown(filterDropdown, filterBtn);
    sortDropdown.style.display = "none";
    sortBtn.classList.remove("open");
};

sortBtn.onclick = () => {
    toggleDropdown(sortDropdown, sortBtn);
    filterDropdown.style.display = "none";
    filterBtn.classList.remove("open");
};

function toggleDropdown(dropdown, btn) {
    const isOpen = dropdown.style.display === "flex";
    dropdown.style.display = isOpen ? "none" : "flex";
    btn.classList.toggle("open", !isOpen);
}

// Filter logic
const checkboxes = document.querySelectorAll("#filterOptions input[type='checkbox']");
checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));

function applyFilters() {
    const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const tags = card.dataset.tags.split(",");
        const match = selected.every(tag => tags.includes(tag));
        card.style.display = selected.length === 0 || match ? "block" : "none";
    });
}

// Sort checkbox logic
const sortCheckboxes = document.querySelectorAll("#sortOptions input[type='checkbox']");

sortCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        // uncheck all others
        sortCheckboxes.forEach(other => {
            if (other !== cb) other.checked = false;
        });

        const selectedSort = cb.checked ? cb.value : null;
        if (selectedSort) sortCards(selectedSort);
    });
});

function sortCards(type) {
    const cards = Array.from(document.querySelectorAll(".card"));
    const sorted = cards.sort((a, b) => {
        const aVal = parseFloat(a.dataset[type]);
        const bVal = parseFloat(b.dataset[type]);
        return type === "rating" ? bVal - aVal : aVal - bVal;
    });

    const content = document.getElementById("contentArea");
    content.innerHTML = "";
    sorted.forEach(card => content.appendChild(card));
}
