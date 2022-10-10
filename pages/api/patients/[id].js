import dbConnect from '../../../utils/mongo';
import Patient from '../../../models/Patient';

export default async function handler(req, res) {
  // Establish DB connection
  await dbConnect();

  // Extract request method, query returns id 'product/"203faangwoeiwecas"'
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  if (method === 'GET') {
    try {
      const patient = await Patient.findById(id);
      res.status(200).json(patient);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  //   if (method === 'PUT') {
  //     if (!token || token !== process.env.TOKEN) {
  //       return res.status(401).json('Not authenticated');
  //     }

  //     try {
  //       const product = await ExampleModel.findByIdAndUpdate(id);
  //       res.status(201).json(product);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   }

  //   if (method === 'DELETE') {
  //     if (!token || token !== process.env.TOKEN) {
  //       return res.status(401).json('Not authenticated');
  //     }

  //     try {
  //       await ExampleModel.findByIdAndDelete(id);
  //       res.status(201).json('The product has been deleted!');
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   }
}
