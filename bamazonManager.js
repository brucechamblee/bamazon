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
    console.table(res);
    managerOptions();
  });
};

function viewLowInv () {
    inquirer
        .prompt({
            name: "invlvl",
            type: "input",
            message: "What Inventory Level would you like me to check for low inventory items on? [Quit with Q]",
            validate: function(val){
                return !isNaN(val) || val.toLowerCase() === "q"
            }
        })
        .then (function(answer) {
            var itemlvl = checkInventory(data, parseInt(answer.invlvl))
            var query = "SELECT itemid, stockquantity FROM products WHERE ?";
            connection.query(query, { stockquantity: answer.stockquantity}, function(err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
            console.log(`Item ID: ${res[i].itemid} || Product Name: ${res[i].productname} || Department: ${res[i].departmentname} || On Hand Inv: ${res[i].stockquantity}`)
            }
            // console.log(lowinventory);
        });
    });
};
    
// var promptCustomer = function(data) {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "choice",
//         message: "What item ID would like to purchase? [Quit with Q]",
//         validate: function(val){
//             return !isNaN(val) || val.toLowerCase() === "q"
//         }
//       }
//     ])
//     .then(function(answer) {
//       var item = GetItem(data, parseInt(answer.choice));


//       !isNaN(answer.choice) ? PromptQuantity(item) : connection.end() //This is a ternary function....

//     });

  function checkInventory(data, stockquantity) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].stockquantity += stockquantity) {
        return data[i];
      }
    }
    return null;
  }

//   function PromptQuantity(item) {
//     inquirer
//       .prompt({
//         type: "input",
//         name: "quantity",
//         message: "How many of these items would you like to buy?",
//         validate: function(value) {
//           return !isNaN(value);
//         }
//       })
//       .then(function(answer) {
//         if (item.stockquantity - answer.quantity > -1) {
//           var numSold = answer.quantity;
//           var totalCost = numSold * parseFloat(item.price);
//           // console.log(totalCost);
//           console.log("ITEM SOLD!\n");
//           console.log(`Your order for ${answer.quantity} units of ${item.productname} has been placed\n`);
//           console.log(`Your total for today will be $${totalCost}\n`);
//           console.log("THANK YOU FOR SHOPPING BAMAZON!\n");
//           UpdateInventory(item, answer.quantity)
        
//         } else {
//           console.log("Insufficient Quantity! Please start over \n");
//           makeTable();   
//         }
//       });
//   }

//   function UpdateInventory(item, quantity){
//     //   console.log(item.productname, quantity)
//       var sqlQuery = `UPDATE products
//                     SET stockquantity = stockquantity - ?
//                     WHERE productname = ?`
//       connection.query(sqlQuery, [ parseInt(quantity), item.productname ], function(err, res){
//           makeTable()
//       })
//   }
// };
