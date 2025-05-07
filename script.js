function addCard() {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'جارٍ إضافة الكارت...';

  fetch('/addCard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: '1234567890', units: 100 })
  })
  .then(response => response.text())
  .then(data => {
    resultDiv.innerHTML = data;
  })
  .catch(error => {
    resultDiv.innerHTML = '❌ حدث خطأ!';
  });
}

function showUsers() {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'جارٍ تحميل المستخدمين...';

  fetch('/users')
    .then(response => response.text())
    .then(data => {
      resultDiv.innerHTML = data;
    })
    .catch(error => {
      resultDiv.innerHTML = '❌ حدث خطأ!';
    });
}
