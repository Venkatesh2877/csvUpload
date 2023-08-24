const searchIcon = document.getElementById('searchIcon');

document.addEventListener('DOMContentLoaded', function() {
    searchIcon.addEventListener('click', myFunction)
});

function myFunction() {
  const input=document.getElementById('search-box');
  console.log(input.value);
  var filter, table, tr, td, i, txtValue;
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

