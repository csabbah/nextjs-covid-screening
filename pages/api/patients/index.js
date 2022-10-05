import dbConnect from '../../../utils/mongo';
import Patient from '../../../models/Patient';

export default async function handler(req, res) {
  // Establish DB connection
  await dbConnect();

  // Extract request method
  const { method, cookies } = req;

  const token = cookies.token;

  if (method === 'GET') {
    try {
      const patient = await Patient.find();
      res.status(200).json(patient);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    // if (!token || token !== process.env.TOKEN) {
    //   return res.status(401).json('Not authenticated');
    // }
    try {
      const patient = await Patient.create(req.body);
      res.status(201).json(patient);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
