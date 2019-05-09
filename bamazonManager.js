var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connection successful");
  queryBamazon();
});

function queryBamazon() {
    console.log(`
      ____  ___    __  ______ _____   ____  _   __
     / __ )/   |  /  |/  /   /__  /  / __ \/ | / /
    / __  / /| | / /|_/ / /| | / /  / / / /  |/ /
   / /_/ / ___ |/ /  / / ___ |/ /__/ /_/ / /|  /
  /_____/_/  |_/_/  /_/_/  |_/____/\____/_/ |_/
  `);
    console.log("Welcome to BAMAZON!");
    console.log("------------------");
    console.log("This is the Manager's Menu");
    managerOptions();
};

var managerOptions = function(){
    inquirer.prompt([
      {
        type: 'list',
        name: 'options',
        message: 'Please make a choice below',
        choices: [
        'View Products', 
        'View Low Inventory',
        'Add Inventory',
        'Add New Product',
        'Disconnect from Bamazon']
      }
    ]).then(answer => {
      var choice = answer.options
      switch (choice) {
        case 'View Products':
          viewProducts()
          break
        case 'View Low Inventory':
          viewLowInv()
          break
        case 'Add Inventory':
          addInventory()
          break
        case 'Add New Product':
          addProduct()
          break
        case 'Disconnect from Bamazon':
          disconnect()
          break
      }
    })
};

var viewProducts = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log('\n');
    console.table(res);
    managerOptions();
  });
};

function lowInv (answer) {
    console.log('Checking items with low inventory levels \n');
    var sql = 'SELECT * FROM products WHERE stockquantity <= ?';
    connection.query(sql, [parseInt(answer)], function(err, res) {
      if (err) throw err;
      console.table(res);
      managerOptions();
    });
  };

function viewLowInv() { 
  inquirer
  .prompt({
    name: "invlvl",
    number: "input",
    message: "What level for low inventory would you like to set? [Quit with Q]",
    validate: function(val){
      return !isNaN(val) || val.toLowerCase() === "q"
    }
  })
  .then (function (answer) {
    invNumber = parseInt(answer.invlvl);
    lowInv(parseInt(invNumber));
  })
}
   
var addInventory = function(data){
  inquirer
  .prompt([
    {
      type: "input",
      name: "invupdate",
      message: "What item ID would you like to edit? [Quit with Q]",
      validate: function(val) {
        return !isNaN(val) || val.toLowerCase() === "q"
      }
    }
  ])
  .then(function(answer) {
    var item = GetItem(data, parseInt(answer.invupdate));
    console.log(item);
    !isNaN(answer.invupdate) ? updateInventory(item) : connection.end()
  });

  function GetItem(data, itemid) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      if (data[i].itemid === itemid) {
        return data[i];
      }
    }
    return null;
  }

  function updateInventory (item) {
    inquirer
    .prompt({
      type: "input",
      name: "quantity",
      message: "What quantity would you like to add?",
      validate: function(value){
        return !isNaN(value);
      }
    })
    .then(function(answer) {
      var updatedQty = item.stockquantity + answer.quantity;
      console.log(`Quantity Added to ${item.productname} and has been updated\n`);
      updateItem(item, updatedQty)

    })

  }

  function updateItem (item, updatedQty) {
    var sqlQuery = `UPDATE products
                    SET stockquantity = stockquantity + ?
                    WHERE productname = ?`
    connection.query(sqlQuery, [ parseInt(updatedQty), item.productname ], function (err, res) {
      viewProducts()
    })

  }


}



