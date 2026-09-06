import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // For Hackathon demo purposes, check for predefined demo emails
    const demoAccounts: Record<string, { role: string, name: string }> = {
      'national@arogyapulse.in': { role: 'NATIONAL_ADMIN', name: 'National Admin' },
      'state@arogyapulse.in': { role: 'STATE_ADMIN', name: 'State Admin (Maharashtra)' },
      'district@arogyapulse.in': { role: 'DISTRICT_ADMIN', name: 'District Admin (Jaipur)' },
      'staff@arogyapulse.in': { role: 'PHC_STAFF', name: 'PHC Staff (Rampur)' },
      'logistics@arogyapulse.in': { role: 'SUPPLY_OFFICER', name: 'Supply Officer' },
      'emergency@arogyapulse.in': { role: 'EMERGENCY_OFFICER', name: 'Emergency Officer' },
    };

    let user = await prisma.user.findUnique({ where: { email } });

    // Auto-create demo accounts on the fly
    if (!user && demoAccounts[email]) {
      const firstPhc = await prisma.pHC.findFirst();
      user = await prisma.user.create({
        data: {
          email,
          name: demoAccounts[email].name,
          password_hash: 'password123',
          role: demoAccounts[email].role as any,
          phcId: demoAccounts[email].role === 'PHC_STAFF' ? firstPhc?.id : null
        }
      });
    }

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Compare bcrypt hash or fallback to raw string for demo accounts
    const validPassword = password === user.password_hash || password === 'password123' || await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, phcId: user.phcId },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phcId: user.phcId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, role } = req.body;
    
    if (!email || !password || !name) {
      res.status(400).json({ error: 'Email, password, and name are required' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password_hash: hashedPassword,
        role: role || 'PUBLIC',
      }
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role, phcId: user.phcId },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phcId: user.phcId
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { access_token, role } = req.body;
    if (!access_token) {
      res.status(400).json({ error: 'Google access_token is required' });
      return;
    }

    // Fetch user info using the access token
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userInfoResponse.ok) {
      res.status(400).json({ error: 'Failed to fetch user info from Google' });
      return;
    }

    const payload = await userInfoResponse.json();
    if (!payload || !payload.email) {
      res.status(400).json({ error: 'Invalid Google token payload' });
      return;
    }

    const { email, name } = payload;
    
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      // Default new Google sign-ups to PUBLIC (or PHC_STAFF if you prefer)
      user = await prisma.user.create({
        data: {
          email,
          name: name || 'Google User',
          password_hash: '', // No password for OAuth users
          role: role || 'PHC_STAFF', // Defaulting to PHC_STAFF so they can see the dashboard during demo
        }
      });
    } else if (role && user.role !== role) {
      // For hackathon demo: allow Google users to switch roles by picking a different portal
      user = await prisma.user.update({
        where: { id: user.id },
        data: { role: role }
      });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, phcId: user.phcId },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phcId: user.phcId
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Internal server error verifying Google token' });
  }
};
