async function showCrops() {
    const month = document.getElementById('month').value;
    const response = await fetch('data.json');
    const data = await response.json();

    const monthData = data.find(item => item.month === month);
    const crops = monthData ? monthData.crops : [];

    const cropList = document.getElementById('crop-list');
    cropList.innerHTML = crops.map(crop => `
        <li>
            <strong>${crop.name}</strong><br>
            <em>Tips: </em> ${crop.tips}
        </li>
    `).join('');
}
