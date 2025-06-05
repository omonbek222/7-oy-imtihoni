import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    return res.status(200).json({ token: 'dummy-jwt-token' });
  }

  return res.status(401).json({ message: 'Login yoki parol noto‘g‘ri!' });
});

export default router;
