fetch('/js/texto.html')
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/);
    document.getElementById("pruecarga").innerHTML=lines;
    lines.forEach(line => console.log(line));
  });