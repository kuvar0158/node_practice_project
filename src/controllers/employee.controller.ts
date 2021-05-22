import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody, 
  RestBindings,
  Response
} from '@loopback/rest';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';
const nodemailer = require("nodemailer");
export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository : EmployeeRepository,
  ) {}

  // save data

  @post('/save/employee')
    async saveEmployee(@requestBody() body: any,
   @inject(RestBindings.Http.RESPONSE) response: Response): Promise<any> {
   try {
    let savedObj : any = {
      name : body.name,
      email : body.email,
      phone : body.phone,
      password : body.password,
      address : body.address
      }
      // if(!savedObj){
      //   return response.status(400).json({message: "required field can not be blank"});
      // }
      if(body.name == ""){
        return response.status(400).json({name: "Name field is required"});
        // return false;
      } 
      if(body.email == "" ){
        return response.status(400).json({qty: "email field is required"});
      }
      if(body.phone == "" ){
        return response.status(400).json({qty: "phone number field is required"});
      }
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.googlemail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "pratap.singh@techvalens.com", // generated ethereal user
      pass: "Kuvar@234", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Register user" <foo@example.com>', // sender address
    to: "singhrec1@gmail.com", // list of receivers
    subject: "Register", // Subject line
    // text: "You account has been succesfully registered.", // plain text body
    html: 
    "<b>You account has been succesfully registered</b><br><table border='2'><thead><tr> <th>header1</th><th>header2</th><th>header3</th></tr></thead><tbody><tr><td>text1.1</td><td>text1.2</td><td>text1.3</td></tr><tr><td>text2.1</td><td>text2.2</td><td>text2.3</td></tr></tbody></table>", // html body
  });
    //  console.log("Data" ,savedObj);
     let demoOb = await this.employeeRepository.create(savedObj);
     if(demoOb){
      // console.log("Data",demoOb);
      return response.status(200).json({message: "data  Save Successfully"});
     }
   } catch (err) {
     return response.status(500).json({message: err.message});
   }
 }
}
