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
// Define header of table
headerTable = d3.select("thead")

// When firt loaded the page has the date radio button pressed by default 
// these are the default values if no radio button is pressed
{
  // Hide header table
  headerTable.style("opacity", 0)
  // Define the field of the data to search for
  attribute = "datetime"
  // Assigns the text over the input field              
  txtPlace.text("Select the date you want to look for:")
  // Assigns the text of the search button
  button.text("Search Date")
  // Assigns the text to the placeholder in the input field
  placeholderPlace.attr("placeholder", "1/1/2010")

  // Group by attribute and count the total of them
  plotData = tableData.reduce((x, y) => { if (x[y[attribute]]) { x[y[attribute]]++; return x; } else { var z = {}; z[y[attribute]] = 1; return Object.assign(x, z); } }, {});
  // Returns an array with the keys of the previous array
  xVal = Object.keys(plotData);
  // Returns an array with the values of the previous array
  yVal = Object.values(plotData);
  // Calls the function to plot the bar chart
  plotBar(xVal, yVal, attribute);
  // Then, select the dropdown menu
  var dropDown = d3.select("#sel1");
  // remove any children from the Dropdown menu
  dropDown.html("");
  // Add every option in the array to the dropdown menu
  for (var i = 0; i < xVal.length; ++i) {
    addOption(sel1, xVal[i].toUpperCase(), xVal[i])
  };
  inputValue = d3.select('#sel1').property('value')
  CreateTable(inputValue)
};

// If the user presses the "Enter" key
inputElement.on("keypress", function () {
  if (d3.event.keyCode === 13) {
    // Prevents the default behavior of "Enter" Key
    event.preventDefault()
  }
});

// Listen the selection with the dropdown menu
var dDown = d3.select('#sel1');
dDown.on("change", function () {
  inputValue = d3.select(this).property('value')
  console.log(inputValue)
  // Creates a table with the defaul value in the dropdown menu
  CreateTable(inputValue)
});

// Define the actions when the radio buttons are selected
radioButtons.on('change', function () {
  var selection = this.value
  console.log(' Radio button changed to ' + selection);
  // Clears any previous table with results
  var tbody = d3.select("tbody");
  tbody.html("");
  // Hide header table
  headerTable.style("opacity", 0)
  if (selection == 'date') {
    // Define the field of the data to search for
    attribute = "datetime"
    // Assigns the text over the input field           
    txtPlace.text("Select the date you want to look for:")
  } else if (selection == 'city') {
    // Define the field of the data to search for
    attribute = "city"
    // Assigns the text over the input field           
    txtPlace.text("Select the City you want to look for:")
  } else if (selection == 'state') {
    // Define the field of the data to search for
    attribute = "state"
    // Assigns the text over the input field           
    txtPlace.text("Select the State you want to look for:")
  } else if (selection == 'country') {
    // Define the field of the data to search for
    attribute = "country"
    // Assigns the text over the input field       
    txtPlace.text("Select the Country you want to look for:")
  } else if (selection == 'shape') {
    // Define the field of the data to search for
    attribute = "shape"
    // Assigns the text over the input field        
    txtPlace.text("Select the Shape you want to look for:")
  } else if (selection == 'all') {
    // Assigns the text over the input field        
    txtPlace.text("All UFO Sighting Data with no filters")

  };
  console.log(attribute);
  // categories = [...new Set(tableData.map(ufo => ufo[attribute]))];
  // console.log(categories);
  // categories = tableData.map(ufo => ufo[attribute]);
  // console.log(categories);

  // Group by attribute and count the total of them
  plotData = tableData.reduce((x, y) => { if (x[y[attribute]]) { x[y[attribute]]++; return x; } else { var z = {}; z[y[attribute]] = 1; return Object.assign(x, z); } }, {});
  // Returns an array with the keys of the previous array
  xVal = Object.keys(plotData);
  // Returns an array with the values of the previous array
  yVal = Object.values(plotData);
  // Calls the function to plot the bar chart
  plotBar(xVal, yVal, attribute);
  // Then, select the dropdown menu
  var dropDown = d3.select("#sel1");
  // remove any children from the Dropdown menu
  dropDown.html("");
  // Enable dropdown after been disabled by All data Selection
  dropDown.property("disabled", false)
  for (var i = 0; i < xVal.length; ++i) {
    addOption(sel1, xVal[i].toUpperCase(), xVal[i])
  };
  // Listen the selection of the first elment of he dropdown
  inputValue = d3.select('#sel1').property('value')
  // Creates de table with the first element of the dropdown
  CreateTable(inputValue)
  // If the selection is all include the "all data" option and 
  // Disable the dropdown
  if (selection == 'all') {
    var dropDown = d3.select("#sel1");
    dropDown.html("");
    addOption(sel1, "All Data", "All Data");
    dropDown.property("disabled", true)
    headerTable.style("opacity", 1)
    // Then, select the unordered table element
    var tbody = d3.select("tbody");
    // remove any children from the table
    tbody.html("");
    // Brings all the data to a table with no filters
    tableData.forEach(UFOsight => {
      var row = tbody.append("tr");
      Object.entries(UFOsight).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
  };

});


// Define actions for creating the table
function CreateTable(inputValue) {
  console.log(inputValue);
  console.log(tableData);

  // Creates a variable with the filtered data 
  var filteredData = tableData.filter(UFOShighting => UFOShighting[attribute] === inputValue);

  // show header
  headerTable.style("opacity", 1)

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
};

// Funcion to plot the bar chart
function plotBar(xAxis, yAxis, attrib) {
  var trace1 = {
    x: xAxis,
    y: yAxis,
    type: "bar"
  };

  var data = [trace1];

  var layout = {
    title: `Number of UFO Sights by ${attrib}`
  };

  Plotly.newPlot("plot", data, layout, { responsive: true });
};

// Function to add new option to the dropdown menu
function addOption(selectbox, text, value) {
  var optn = document.createElement("OPTION");
  optn.text = text;
  optn.value = value;
  selectbox.options.add(optn);
};
