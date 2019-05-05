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
  makeTable();
});

function queryBamazon() {
    console.log(`
      ____  ___    __  ______ _____   ____  _   __
     / __ )/   |  /  |/  /   /__  /  / __ \/ | / /
    / __  / /| | / /|_/ / /| | / /  / / / /  |/ /
   / /_/ / ___ |/ /  / / ___ |/ /__/ /_/ / /|  /
  /_____/_/  |_/_/  /_/_/  |_/____/\____/_/ |_/
  `);
    console.log("Items up for sale");
    console.log("------------------");
};



var makeTable = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.table(res);
    promptCustomer(res);
  });
};

var promptCustomer = function(data) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What item ID would like to purchase? [Quit with Q]",
        validate: function(val){
            return !isNaN(val) || val.toLowerCase() === "q"
        }
      }
    ])
    .then(function(answer) {
      var item = GetItem(data, parseInt(answer.choice));


      !isNaN(answer.choice) ? PromptQuantity(item) : connection.end() //This is a ternary function....

    });

  function GetItem(data, itemid) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].itemid === itemid) {
        return data[i];
      }
    }
    return null;
  }

  function PromptQuantity(item) {
    inquirer
      .prompt({
        type: "input",
        name: "quantity",
        message: "How many of these items would you like to buy?",
        validate: function(value) {
          return !isNaN(value);
        }
      })
      .then(function(answer) {
        if (item.stockquantity - answer.quantity > 0) {
          console.log("ITEM SOLD! THANK YOU FOR SHOPPING BAMAZON!");
          console.log(`Your order for ${answer.quantity} units of ${item.productname} has been placed`);
          console.log(`Still working this out! Will be making the $$ calculate the total cost of the order`)
          UpdateInventory(item, answer.quantity)
        
        } else {
          console.log("Not a valid selection!");
    
        }
      });
  }

  function UpdateInventory(item, quantity){
    //   console.log(item.productname, quantity)
      var sqlQuery = `UPDATE products
                    SET stockquantity = stockquantity - ?
                    WHERE productname = ?`
      connection.query(sqlQuery, [ parseInt(quantity), item.productname ], function(err, res){
          makeTable()
      })
  }
};
