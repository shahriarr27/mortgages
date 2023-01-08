$(document).ready(function () {
  $('#state_select').select2();

  $.get("assets/files/data.csv", function (data) {
    // Parse the CSV data
    const parsedData = Papa.parse(data).data;
    //group the data by state
    const groupedData = {};

    parsedData.forEach((row) => {
      const state = row[0];
      if (!groupedData[state]) {
        groupedData[state] = [];
      }
      groupedData[state].push(row.slice(1));
    });

    //extract state names
    var stateNames = Object.keys(groupedData);
    for (let i = 0; i < stateNames.length; i++) {
      if (stateNames[i] === "" || stateNames[i] === 'State') {
        stateNames.splice(i, 1);
      }
    }

    //show state name at dropdown
    const container = document.getElementById("state_select");
    for (var i = 0; i < stateNames.length; i++) {
      container.innerHTML += `
          <option value="${stateNames[i]}">
            ${stateNames[i]}
          </option>
        `;
    }

    // show results for each state in properties

    stateNames.forEach(function (stateName) {
      let refName = stateName;
      let template = "";

      parsedData.forEach(function (element) {

        let stateProperty = [];
        if (refName === element[0]) {
          for (var i = 1; i < element.length; i++) {
            stateProperty.push(element[i]);
          }
          // console.log(stateProperty);
          template += `
              <div class="col-md-6 mb-5">
                <div class="card single-property">
                  <div class="card-header p-0">
                    <img src="assets/images/property1.jpg" class="card-img-top img-fluid" alt="property-img">
                    <h5 class="card-title">${element[2]}</h5>
                  </div>
                  <div class="card-body">
                    <div class="meta-data">
                      <p><strong>Address:</strong> ${element[1]}</p>
                      <p><strong>Loan to Value:</strong> ${element[3]}</p>
                      <p><strong>Interest Rate:</strong> ${element[4]}</p>
                      <p><strong>Loan Type:</strong>  ${element[5]}</p>
                      <p><strong>Est. Monthly Savings:</strong> ${element[6]}</p>
                    </div>
                  </div>
                  <div class="card-footer">
                    <a href="javascript::void(0)"><i class="bi bi-house"></i> Details</a>
                  </div>
                </div>
              </div>
        `;
        }
      })

      let propertyWrapper = document.getElementById('property-wrapper');
      var propertyRow = "";
      propertyRow = `${stateName}-property-row`;
      propertyWrapper.innerHTML += `
        <div id="${stateName}" class="single-property-wrapper">
          <div class="row" id="${propertyRow}">
          </div>
        </div>
        `
      var singlePropertyWrapper = document.getElementById(propertyRow);
      singlePropertyWrapper.innerHTML = template;
      $(".single-property-wrapper").hide();
    })

    $("#"+stateNames[0]).show();

  });


  //listen to dropdown for change
  $("#state_select").change(function () {
    //rehide content on change
    $('.single-property-wrapper').hide();
    //unhides current item
    $('#' + $(this).val()).fadeIn();
  });
});