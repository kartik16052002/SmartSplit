const express = require('express');
const { createGroupController, addMemberController, getAllGroupsController,getGroupDetailsController, getGroupMembersController, getMemberDetailsController, createPurchaseRecordController, getAllPurchases, settleBillsController, deleteGroupController, getTransactionsController } = require('../controller/groupController');
const authMiddleware = require('../middlewares/authMiddleware');

const router =express.Router();


// Creating Group Route
router.post('/create-group',authMiddleware,createGroupController);

// add Group member route 
router.post('/add-member',authMiddleware,addMemberController);

// get groups route
router.get('/get-groups',authMiddleware,getAllGroupsController);

// get group Details
router.get('/get-group-details/:id',authMiddleware,getGroupDetailsController);

// get group members
router.get('/get-members/:groupId',authMiddleware,getGroupMembersController);

// get Member Details
router.get('/get-member-details/:memberId',authMiddleware,getMemberDetailsController);

// Creating purchase Route
router.post('/purchase',authMiddleware,createPurchaseRecordController);

// get all purchasers Route
router.get('/get-purchases/:groupId',authMiddleware,getAllPurchases);

// get all purchasers Route
router.post('/settleBill',authMiddleware,settleBillsController);

// get all purchasers Route
router.delete('/delete-group/:groupId',authMiddleware,deleteGroupController);

// get all transactions Route
router.get('/get-transactions/:payerId',authMiddleware,getTransactionsController);


module.exports=router;