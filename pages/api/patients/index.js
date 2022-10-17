import dbConnect from '../../../utils/mongo';
import Patient from '../../../models/Patient';
import cookie from 'cookie';

export default async function handler(req, res) {
  // Establish DB connection
  await dbConnect();

  // Extract request method
  const { method } = req;

  let token = req.headers.cookie

  if (method === 'GET') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated');
    }
    try {
      const patient = await Patient.find();
      res.status(200).json(patient);
    } catch (err) {
      res.status(500).json(err);
    }
    
    
  }
  if (method === 'POST') {
    try {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('submitted', process.env.SUBMITTED, {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        })
      );

      const patient = await Patient.create(req.body);
      // Set up a custom cookie for form submission
      res.status(201).json(patient);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
