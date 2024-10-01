function updateSearchResults(searchValue, rows) {
	for (let i = 1; i < rows.length; i++) {
		const cells = rows[i].getElementsByTagName('td');
		let match = false;
		for (let j = 0; j < cells.length; j++) {
			if (cells[j].textContent.toLowerCase().includes(searchValue)) {
				match = true;
				break;
			}
		}
		rows[i].style.display = match ? '' : 'none';
	}
}

function getSearchParameter() {
	const params = new URLSearchParams(window.location.search);
	return params.get('search') || '';
}

function setSearchParameter(value) {
	const params = new URLSearchParams(window.location.search);
	if (value) {
		params.set('search', value);
	} else {
		params.delete('search');
	}
	window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
}

document.addEventListener('DOMContentLoaded', function () {
	const searchInput = document.getElementById('searchInput');
	const collectionTable = document.getElementById('collectionTable');
	const rows = collectionTable.getElementsByTagName('tr');

	const searchValue = getSearchParameter();
	searchInput.value = searchValue;
	updateSearchResults(searchValue, rows);

	searchInput.addEventListener('input', function () {
		const searchValue = searchInput.value.toLowerCase();
		setSearchParameter(searchValue);
		updateSearchResults(searchValue, rows);
	});
});
