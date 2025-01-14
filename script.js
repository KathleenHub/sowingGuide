async function showCrops() {
    const month = document.getElementById('month').value;
    const response = await fetch('data.json');
    const data = await response.json();

    const crops = data.find(item => item.month === month)?.crops || [];
    const cropList = document.getElementById('crop-list');
    cropList.innerHTML = crops.map(crop => `<li>${crop}</li>`).join('');
}
