const express = require("express");
const router = express.Router();
const jwtVerify = require("../middleware/authMiddleware");
// const MusicArtItem = require("../models/musicArtItem");
const musicArtItem = require("../models/musicArtItem");
const { ObjectId } = require("mongodb");

router.post("/create",  async (req, res) => {
    try {
        const { displayName,type, price, colour, description,company,aboutItem,isAvailable, displayImageList } = req.body;
        if (!displayName || !type || !price || !colour || !description ||!company|| !aboutItem  || !displayImageList) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }
     //    const createdBy =req.body.userId;

        musicArtItemDetails = new musicArtItem({ 
          displayName,
          type,
          price,
          colour, 
          description,
          company,
          aboutItem,
          isAvailable ,
          displayImageList
          // refUserId: req.body.userId,
        });

        await musicArtItemDetails.save();

        res.json({ message: "New MusicItem created successfully" });
    } catch (error) {
        console.log(error);
    }
});


router.get("/item/:itemid",jwtVerify, async (req, res) => {
     try {          
        const userID = req.body.userId || "";
        const musicArtItemID = (req.params.itemid).substring(7);
        
        const musicArtItemList =  await musicArtItem.findById(musicArtItemID);
        
        res.json({ status : 500 , data: musicArtItemList });
       } catch (error) {
         console.log(error);
     }
 });

 router.get("/all",jwtVerify, async (req, res) => {
     try {          
        const userID = req.body.userId || "";
        
        const musicArtItemList =  await musicArtItem.find();
        
        res.json({ status : 500 , data: musicArtItemList });
       } catch (error) {
         console.log(error);
     }
 });

 router.post("/filter",jwtVerify, async (req, res) => {
     try {          
          const query = {};
        const userID = req.body.userId || "";
        const filters = (req.body);
        const pipeline = [
          {
            $match: {
              $and: filters.map(filter => ({ [filter.filterItem]: filter.filterValue }))
            }
          }
        ];
        const musicArtItemList =  await musicArtItem.aggregate(pipeline);
        if(musicArtItemList.length<0)
        {
          res.json({ status : 204 , data: null });
        }
        else{
          res.json({ status : 200 , data: musicArtItemList });
        }
       } catch (error) {
         console.log(error);
         res.json({ status : 404 , data: "Not Found" });
     }
 });


router.delete("/task/:taskId",jwtVerify, async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const title = req.query.title || "";
        const taskList = await task.deleteOne({_id:taskId});
        res.json({ data: taskList });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;