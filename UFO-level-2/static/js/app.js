// from data.js
var tableData = data;

inputElement = d3.select(".form-group input")
radioButtons = d3.selectAll('.radio-inline input');
txtPlace = d3.select(".form-group label");
placeholderPlace = d3.select(".form-control");
button = d3.select("button");

inputElement.on("keypress", function () {
  if (d3.event.keyCode === 13) {
    event.preventDefault()
  }
});


// The date is the radio button pressed by default and need by default values
placeholderPlace.value = ""
attribute = "datetime"            // data's attribute to search for 
txtPlace.text("Type the date you want to look for:")
button.text("Search Date")
placeholderPlace.attr("placeholder", "1/1/2010")


radioButtons.on('change', function (d) {
  var selection = this.value
  console.log(' Radio button changed to ' + selection);
  placeholderPlace.property("value", "");
  var tbody = d3.select("tbody");
  tbody.html("");

  if (selection == 'date') {
    attribute = "datetime"            // data's attribute to search for 
    txtPlace.text("Type the date you want to look for:")
    button.text("Search Date")
    placeholderPlace.attr("placeholder", "1/1/2010")
  } else if (selection == 'city') {
    attribute = "city"            // data's attribute to search for 
    txtPlace.text("Type the City you want to look for:")
    button.text("Search City")
    placeholderPlace.attr("placeholder", "san diego")
  }
  else if (selection == 'state') {
    attribute = "state"            // data's attribute to search for 
    txtPlace.text("Type the State you want to look for:")
    button.text("Search State")
    placeholderPlace.attr("placeholder", "fl")
  } else if (selection == 'country') {
    attribute = "country"            // data's attribute to search for 
    txtPlace.text("Type the Country you want to look for:")
    button.text("Search Country")
    placeholderPlace.attr("placeholder", "ca")
  } else if (selection == 'shape') {
    attribute = "shape"            // data's attribute to search for 
    txtPlace.text("Type the Shape you want to look for:")
    button.text("Search Shape")
    placeholderPlace.attr("placeholder", "triangle")
  } else if (selection == 'all') {
    tableData.forEach(UFOsight => {
      var row = tbody.append("tr");
      Object.entries(UFOsight).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
  }
});


button.on("click", function () {

  // Select the input element and get the raw HTML node
  // var inputElement = d3.select("#date-form-input");

  // Get the value property of the input element
  var inputValue = inputElement.property("value").toLowerCase();

  console.log(inputValue);
  console.log(tableData);

  var filteredData = tableData.filter(UFOShighting => UFOShighting[attribute] === inputValue);

  console.log(filteredData);

  // Then, select the unordered table element
  var tbody = d3.select("tbody");

  // remove any children from the table to
  tbody.html("");

  filteredData.forEach(UFOsight => {
    var row = tbody.append("tr");
    Object.entries(UFOsight).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

});