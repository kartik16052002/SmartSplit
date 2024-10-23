const groupMembersModel = require("../models/groupMembersModel");
const groupModel = require("../models/groupModel");
const purchasesModel = require("../models/purchasesModel");
const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");
const mongoose=  require("mongoose");
// Crate Group controller
const createGroupController = async (req,res)=>{
    try {
        // console.log(req);

        const group =await groupModel.findOne({groupName:req.body.groupName});
        if(group){
            return res.status(400).json({
                success: false,
                message: "Group already exists",
            })
        }
        const newGroup = new groupModel(req.body);
        await newGroup.save();

        const user = await userModel.findOne({_id:req.body.userId});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        const newMember = new groupMembersModel({
            name:user.name,
            memberId:user._id,
            groupId:newGroup._id,
        });

        await newMember.save();

        if(!newMember){
            // **************************Need to be Replared ***************************
            const deletedDocument = await groupModel.findByIdAndDelete(newGroup._id);
            if(!deletedDocument){
                return res.status(400).send({
                    success: false,
                    message: "Error while adding member to the created group",
                })
            }
            return res.status(400).send({
                success: false,
                message: "Error while adding member to the created group",
            })
        }

        return res.status(200).send({
            success: true,
            message:"Group created successfully",
            group:newGroup,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success:false,
            message:"Error while creating group",
            error,
        })
    }
}


// Add member to group controller
const addMemberController = async (req,res)=>{
    try {
        const group = await groupModel.findOne({_id:req.body.groupId});
        // console.log(group);
        if(!group){
            return res.status(400).json({
                success: false,
                message: "Group not found",
            })
        }

        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        const groupMember= await groupMembersModel.findOne({$and:[{email:user.email},{groupId:group._id}]});
        // console.log(groupMember);
        if(groupMember){
            return res.status(400).json({
                success: false,
                message: "User already exists in the group",
            })
        }
        

        req.body.memberId=user._id;
        const newMember = await groupMembersModel(req.body);
        await newMember.save();
        return res.status(200).send({
            success: true,
            message:"Member added successfully",
            member:newMember,
        })
    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success:false,
            message:"Error while adding member",
            error,
        })
    }
}

// Get all groups
const getAllGroupsController = async (req,res)=>{
    try {
        // console.log(req.body);
        const groups = await groupMembersModel.distinct('groupId', { memberId: req.body.userId });
        if(!groups){
            return res.status(400).send({
                success: false,
                message: "No groups found",
            })
        }
        return res.status(200).send({
            success: true,
            message:"All groups fetched successfully",
            groups,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getting all groups controller",
            error,
        })
    }
}


// get Group Details
const getGroupDetailsController= async(req,res)=>{
    try {
        const group = await groupModel.findOne({_id:req.params.id});
        if(!group){
            return res.status(400).send({
                success: false,
                message: "Group not found",
            })
        }
        return res.status(200).send({
            success: true,
            message:"Group Member details fetched successfully",
            group,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getting group details controller",
            error,
        })
    }
}

// get Group Member's Id  Controller
const getGroupMembersController= async(req,res)=>{
    try {
        const group = await groupModel.findOne({_id:req.params.groupId});
        if(!group){
            return res.status(400).send({
                success: false,
                message: "Group not found",
            })
        }
        const members = await groupMembersModel.distinct('memberId', {groupId:req.params.groupId });
        // console.log("members",members);
        if(!members){
            return res.status(400).send({
                success: false,
                message: "No members found in the group",
            })
        }

        // console.log(details);
        return res.status(200).send({
            success: true,
            message:"Group Member details fetched successfully",
            members,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getting group members controller",
            error,
        })
    }
}


// Get members Information controller
const getMemberDetailsController=async(req,res)=>{
    try {
        const member= await userModel.findById(req.params.memberId);
        if(!member){
            return res.status(400).send({
                success: false,
                message: "Error while finding details about the members",
            })
        }
        return res.status(200).send({
            success: true,
            message:"Member details fetched successfully",
            member,
        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in getting member details controller",
            error,
        })
    }
}

// Create Purchase Record

const createPurchaseRecordController=async(req,res)=>{
    try {
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }
        const group = await groupModel.findOne({_id:req.body.groupId});
        if(!group){
            return res.status(400).send({
                success: false,
                message: "Group not found",
            })
        }
        req.body.payer=user._id;
        const newRecord = await purchasesModel(req.body);
        await newRecord.save();
        return res.status(200).send({
            success: true,
            message:"Purchase record created successfully",
            record:newRecord,
        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in creating purchase record",
            error,
        })
    }
}


// Get all the purchasers
const getAllPurchases=async(req,res)=>{
    try {
        const purchases = await purchasesModel.find({groupId:req.params.groupId});
        if(!purchases){
            return res.status(400).send({
                success: false,
                message: "No purchasers found",
            })
        }
        return res.status(200).send({
            success: true,
            message:"All purchasers fetched successfully",
            purchases,
        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in getting all purchasers",
            error,
        })
    }
}

// *************************************settle Bills Conrtoller ******************************************

function findMax(amount) {
    let ind = -1;
    let n = amount.length;
    let maxVal = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        if (maxVal < amount[i]) {
            maxVal = amount[i];
            ind = i;
        }
    }
    return ind;
}

function findMin(amount) {
    let ind = -1;
    let n = amount.length;
    let minVal = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        if (minVal > amount[i]) {
            minVal = amount[i];
            ind = i;
        }
    }
    return ind;
}

function solve(amount, minFlow) {
    let maxD = findMin(amount);
    let maxC = findMax(amount);

    if (amount[maxD] === 0 && amount[maxC] === 0) return;

    let trans = Math.min(-amount[maxD], amount[maxC]);

    amount[maxC] -= trans;
    amount[maxD] += trans;

    minFlow[maxD][maxC] = trans;
    solve(amount, minFlow);
}

function print(vec) {
    for (let i = 0; i < vec.length; i++) {
        let line = "";
        for (let j = 0; j < vec[i].length; j++) {
            line += vec[i][j] + " ";
        }
        console.log(line);
    }
}

function minCashFlow(transaction, n) {
    let amount = new Array(n).fill(0);
    let minFlow = new Array(n).fill().map(() => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            amount[i] += (transaction[j][i] - transaction[i][j]);
        }
    }

    solve(amount, minFlow);
    print(minFlow);
    return minFlow;
}


const settleBillsController=async(req,res)=>{
    try {
        const group = await groupModel.findOne({_id:req.body.groupId});
        if(!group){
            return res.status(400).send({
                success: false,
                message: "Group not found",
            })
        }

        // find total purchases by the group members
        let purchases = await purchasesModel.find({groupId:req.body.groupId},'cost payer');
        if(!purchases){
            return res.status(400).send({
                success: false,
                message: "No purchasers found",
            })
        }
        console.log("purchases",purchases);

        // find the members of the group 
        const members = await groupMembersModel.distinct('memberId', {groupId:req.body.groupId });
        // console.log("members",members);
        if(!members){
            return res.status(400).send({
                success: false,
                message: "No members found in the group",
            })
        }
        console.log("members",members);


        // adding members to purchases who have not purchased anything for the group 
        const payersSet = new Set(purchases.map(purchase => purchase.payer.toString()));
        console.log("payersSet",payersSet);
        members.forEach(member => {

            if (!payersSet.has(member.toString())) {
              purchases.push({ payer: new Object(member), cost: 0 });
            }
        });
        console.log("newPurchases",purchases);

        // mapping payer to an index and revermapping index to a payer
        let reverseMapping = {};
        const mapping = members.reduce((acc, payer, index) => {
            acc[payer] = index;
            reverseMapping[index] = payer;
            return acc;
          }, {});
        console.log("mapping",mapping);


        //   calculating total many spent by the group and finding the per member spent or expenditure
        const totalSpending = purchases.reduce((sum, purchase) => sum + purchase.cost, 0);
        const perMemberShare = totalSpending / members.length;  
        console.log("perMemberShare",perMemberShare);


        // converting the purchases to a matrix 
        const numMembers = members.length;
        let debtMatrix = Array(numMembers).fill().map(() => Array(numMembers).fill(0));
        purchases.forEach((purchase) => {
            const payerIndex = mapping[purchase.payer];
            const contribution = purchase.cost;
            // console.log("purchases for each ",payerIndex," ",contribution);
            members.forEach((member) => {
                // console.log("membe   r",member);
              if (mapping[member] !== payerIndex) {
                debtMatrix[payerIndex][mapping[member]] += (perMemberShare - (contribution / numMembers)).toFixed(2);
              }
            });
        });
        console.log("debtMatrix",debtMatrix);
        const minCashFlowMatrix = minCashFlow(debtMatrix, numMembers);
        console.log("minCashFlowMatrix",minCashFlowMatrix);

        const completedGroup=await groupModel.findOneAndUpdate({_id:req.body.groupId},{"settlementCompleted":true});
        if(!completedGroup){
            throw new Error("group Not Found!!!");
        }

        for(let i=0;i<numMembers;i++) {
            for(let j=0;j<numMembers;j++){
                if(minCashFlowMatrix[i][j]!==0){
                    const newTransaction = await transactionModel({
                        payer:reverseMapping[i],
                        amount:minCashFlowMatrix[i][j],
                        payee:reverseMapping[j],
                        groupId:req.body.groupId,
                    })
                    await newTransaction.save();
                }
            }
        }

        return res.status(200).send({
            success: true,
            message:"Bills settled successfully",
            minCashFlow,
        })


        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in settling bills",
            error,
        });
    }
}


// delete Group Information

const deleteGroupController=async(req,res)=>{
    try {
        const group = await groupModel.findOneAndDelete({_id:req.params.groupId});
        if(!group){
            return res.status(400).send({
                success: false,
                message: "Group not found",
            })
        }
        const members= await groupMembersModel.deleteMany({groupId:req.params.groupId});
        const purchases= await purchasesModel.deleteMany({groupId:req.params.groupId});
        const transactions= await transactionModel.deleteMany({groupId:req.params.groupId});
        return res.status(200).send({
            success: true,
            message:"Group deleted successfully",
            group,
            members,
            purchases,
            transactions,
        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in deleting group",
            error,
        })
    }
}


// Get all transaction Controller
const getTransactionsController= async(req,res)=>{
    try {
        // console.log(req.params)
        const transactions = await transactionModel.find({payer:req.params.payerId});
        if(!transactions){
            return res.status(400).send({
                success: false,
                message: "transactions not found",
            })
        }
        return res.status(200).send({
            success: true,
            message:" Transactions details fetched successfully",
            transactions
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getting group Transactions Controller ",
            error,
        })
    }
}




module.exports = {createGroupController,addMemberController,getAllGroupsController,getGroupDetailsController,getGroupMembersController,getMemberDetailsController,createPurchaseRecordController,getAllPurchases,settleBillsController,deleteGroupController,getTransactionsController};