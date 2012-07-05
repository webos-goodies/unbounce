var tableEl = document.getElementById('disabled-domains');

tableEl.addEventListener('click', function(e) {
  var el  = e.target;
  var key = el.dataset.key;
  localStorage.removeItem(key);
  var trEl = el.parentNode.parentNode;
  trEl.parentNode.removeChild(trEl);
}, false);

var numDomains = 0;
for(var i = 0 ; i < localStorage.length ; i++) {
  var key   = localStorage.key(i);
  var match = /^domain_(.+)/.exec(key);
  if(match) {
    var trEl   = document.createElement('tr');
    var col1El = document.createElement('td');
    var col2El = document.createElement('td');
    var btnEl  = document.createElement('input');
    col1El.textContent = match[1];
    btnEl.type  = 'button';
    btnEl.value = 'Delete';
    btnEl.dataset.key = key;
    col2El.appendChild(btnEl);
    trEl.appendChild(col1El);
    trEl.appendChild(col2El);
    tableEl.appendChild(trEl);
    numDomains += 1;
  }
}
if(numDomains == 0) {
  var trEl   = document.createElement('tr');
  var col1El = document.createElement('td');
  col1El.textContent = 'No disabled domains.';
  trEl.appendChild(col1El);
  tableEl.appendChild(trEl);
}
