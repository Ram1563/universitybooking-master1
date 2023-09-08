 
 

const { Op } = require('sequelize');
const Session = require('../models/sessionModel');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.viewSessions = async (req, res) => {
  try {
    // Fetch and return available sessions from the database
    const sessions = await Session.findAll({ where: { isApproved: true } });
    res.json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};

exports.bookSession = async (req, res) => {
    try {
      // Get the student's ID from the decoded JWT token
      const studentId = req.user.id;
  
      // Parse session data from the request body
      const { deanId, startTime, endTime, topic, location } = req.body;
  
      // Check if the session slot is available (not already booked)
      const isSlotAvailable = await Session.findOne({
        where: {
          deanId,
          startTime,
          endTime,
          isApproved: false, // Ensure the session is not already approved/booked
        },
      });
  
      if (!isSlotAvailable) {
        return res.status(400).json({ message: 'Session slot is not available' });
      }
  
      // Create a new session entry in the database
      await Session.create({
        deanId,
        studentId,
        startTime,
        endTime,
        topic,
        location,
        isApproved: false, // Set to false initially, as it's pending approval
      });
  
      res.status(201).json({ message: 'Session booked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Session booking failed' });
    }
  };
  


   

  exports.viewPendingSessions = async (req, res) => {
    try {
      // Fetch and return pending sessions for the dean
      const deanId = req.user.id; // Get dean's ID from the decoded JWT token
      const now = new Date();
  
      const pendingSessions = await Session.findAll({
        where: {
          deanId,
          isApproved: false,
          startTime: {
            [Op.gt]: now, // Filter for sessions with startTime greater than the current time
          },
        },
      });
  
      res.json({ pendingSessions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch pending sessions' });
    }
  };
  
  
