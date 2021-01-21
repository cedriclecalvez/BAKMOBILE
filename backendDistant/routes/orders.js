var express = require('express');
var router = express.Router();
var orderModel = require('../models/orders');
var articleModel = require('../models/articles');
var userModel = require('../models/users');

const bodyParser = require('body-parser');


router.post('/validate-order', async function(req, res, next) {
    
    console.log('route validate order req.body:',req.body)

    let newOrder = new orderModel

       ({
         
         articleId:req.body.articleId,
         clientId:req.body.clientToken,
         orderState:'En cours',
         orderDate:new Date()
         
       })
    
    let result = false;
    var saveOrder = await newOrder.save()

    let findArticle= await articleModel.updateOne(
    { _id: req.body.articleId},
    { isVisible:false }
    );

    console.log(findArticle);

    if(saveOrder&&findArticle){
     result = true
    }

   res.json({result,saveOrder,findArticle})

});

router.get('/receive-order', async function(req, res, next) {
  
  var today= new Date()
  function formatDate(date){
    var newDate = new Date(date);
    var finalFormat = newDate.getDate()+"/"+(newDate.getMonth()+1)+"/"+newDate.getFullYear();
    return finalFormat;
  }
  
  //updating the status of the order
  let order = await orderModel.updateOne(
    
    {articleId:req.query.idArticle},
    {orderState:`validé le ${(formatDate(today))}`} )
    
  //getting the seller current wallet and incrementing with bought product price
  let findWallet = await userModel.findOne({token:req.query.sellerToken})
  let currentWallet = findWallet.moneyWallet
  let updatedWallet = parseInt(currentWallet) + parseInt(req.query.productPrice)

  //updating the seller wallet after customer bought the product
    console.log("le prix de l'article est,", req.query.productPrice)
     let moneyWallet = await userModel.updateOne(
    {token:req.query.sellerToken},
    {moneyWallet:updatedWallet}
    )
  

  res.json(order)
  
})


module.exports = router;