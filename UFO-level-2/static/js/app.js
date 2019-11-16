// from data.js
var tableData = data;

// Define the field where data is collected
inputElement = d3.select(".form-group input")
// Define the radio Buttons location
radioButtons = d3.selectAll('.radio-inline input');
// Define field containing the text over the input field
txtPlace = d3.select(".form-group label");
// Define the field containing the Placeholder of the input
placeholderPlace = d3.select(".form-control");
// Define the search button
button = d3.select("button");

// If the user presses the "Enter" key
// The program behaves like if the search button is pressed
inputElement.on("keypress", function () {
  if (d3.event.keyCode === 13) {
    // Prevents the default behavior of "Enter" Key
    event.preventDefault()
    // Clicks on the search button
    button.dispatch('click');
  }
});

// When firt loaded the page has the date radio button pressed by default 
// these are the default values if no radio button is pressed
{
  // Define the field of the data to search for
  attribute = "datetime"
  // Assigns the text over the input field              
  txtPlace.text("Type the date you want to look for:")
  // Assigns the text of the search button
  button.text("Search Date")
  // Assigns the text to the placeholder in the input field
  placeholderPlace.attr("placeholder", "1/1/2010")
};

// Define the actions when the radio buttons are selected
radioButtons.on('change', function () {
  var selection = this.value
  console.log(' Radio button changed to ' + selection);
  // Deletes any previous value in the input field
  placeholderPlace.property("value", "");
  // Clears any previous table with results
  var tbody = d3.select("tbody");
  tbody.html("");
  if (selection == 'date') {
    // Define the field of the data to search for
    attribute = "datetime"
    // Assigns the text over the input field           
    txtPlace.text("Type the date you want to look for:")
    // Assigns the text of the search button
    button.text("Search Date")
    // Assigns the text to the placeholder in the input field
    placeholderPlace.attr("placeholder", "1/1/2010")
  } else if (selection == 'city') {
    // Define the field of the data to search for
    attribute = "city"
    // Assigns the text over the input field           
    txtPlace.text("Type the City you want to look for:")
    // Assigns the text of the search button
    button.text("Search City")
    // Assigns the text to the placeholder in the input field
    placeholderPlace.attr("placeholder", "san diego")
  } else if (selection == 'state') {
    // Define the field of the data to search for
    attribute = "state"
    // Assigns the text over the input field           
    txtPlace.text("Type the State you want to look for:")
    // Assigns the text of the search button
    button.text("Search State")
    // Assigns the text to the placeholder in the input field
    placeholderPlace.attr("placeholder", "fl")
  } else if (selection == 'country') {
    // Define the field of the data to search for
    attribute = "country"
    // Assigns the text over the input field       
    txtPlace.text("Type the Country you want to look for:")
    // Assigns the text of the search button
    button.text("Search Country")
    // Assigns the text to the placeholder in the input field
    placeholderPlace.attr("placeholder", "ca")
  } else if (selection == 'shape') {
    // Define the field of the data to search for
    attribute = "shape"
    // Assigns the text over the input field        
    txtPlace.text("Type the Shape you want to look for:")
    // Assigns the text of the search button
    button.text("Search Shape")
    // Assigns the text to the placeholder in the input field
    placeholderPlace.attr("placeholder", "triangle")
  } else if (selection == 'all') {
    // Brings all the data to a table with no filters
    tableData.forEach(UFOsight => {
      var row = tbody.append("tr");
      Object.entries(UFOsight).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
  }
});

// Define actions when the search button is pressed
button.on("click", function () {
  // Get the value property of the input element
  var inputValue = inputElement.property("value").toLowerCase();

  console.log(inputValue);
  console.log(tableData);

  // Creates a variable with the filtered data 
  var filteredData = tableData.filter(UFOShighting => UFOShighting[attribute] === inputValue);

  // Validates if the input field has no values and 
  // Validates if the search returns no data
  if (inputValue == "") {
    alert("Please input a value to search");
  } else if (filteredData == "") {
    alert("Your search did not return any data \n Please try again or press 'All Data' ");
    placeholderPlace.property("value", "");
  };

  console.log(filteredData);

  // Then, select the unordered table element
  var tbody = d3.select("tbody");

  // remove any children from the table
  tbody.html("");

  // Bring the filtered data to a table in html
  filteredData.forEach(UFOsight => {
    var row = tbody.append("tr");
    Object.entries(UFOsight).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
});