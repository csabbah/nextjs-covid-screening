import dbConnect from '../../../utils/mongo';
import User from '../../../models/User';

export default async function handler(req, res) {
  // Establish DB connection
  await dbConnect();

  // Extract request method
  const { method, cookies } = req;

  const token = cookies.token;

  if (method === 'GET') {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    // if (!token || token !== process.env.TOKEN) {
    //   return res.status(401).json('Not authenticated');
    // }
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
