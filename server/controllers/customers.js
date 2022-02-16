import Customer from "../models/customers.js";
import Vendor from "../models/vendors.js";


export const getCustomer = async (req, res) => {
  const customer = await Customer.find({});
 res.status(200).send(customer);
}


export const createCustomer = async (req, res) => {
    
    try {
    
       
        const newCustomer = new Customer(req.body);
        
        await newCustomer.save();
         res.json(req.body);
       } catch (e) {
        res.status(500).json({message: "Error while creating a customer"});
    }

   
    }
    export const viewCustomer = async(req, res) => {
      try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        await customer.save();
        res.status(200).json(customer);
        
      } catch (e) {
        res.status(500).json({message: "Error in the view customer"});
      }
   

};


export const addVendor = async (req, res) => {
try {
  const { id, venid } = req.params;
  const customer = await Customer.findById(id);
  const vendor = await Vendor.findById(venid);
  

if(!(customer.myVendors.filter(e => e.vendor._id.toString() === venid).length > 0))
{
  customer.myVendors.push({vendor});
  await customer.save();
}

  
} catch (e) {
  res.status(500).json({message: "Error in pushing vendor to customer"});
}
};