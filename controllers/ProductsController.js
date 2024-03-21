import Product from "../models/ProductsModel";

export const addConference = async (req, res) => {
    console.log("something");
    try {
      const connectorData = {
        eventName: req.body.eventName,
        website: req.body.website,
        facebook: req.body.facebook,
        linkedin: req.body.linkedin,
        instagram: req.body.instagram,
        organizer: req.body.organizer,
        description: req.body.description,
        contactNum: req.body.num,
        location:req.body.location,
        date: req.body.date,
        isApproved: false,
      };

      // Create the connector in the connector collection
      const newConnector = await Conference.create(connectorData);
  
      res.json(newConnector);
      console.log("Connector requested successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };