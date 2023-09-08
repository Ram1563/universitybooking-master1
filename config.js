module.exports = {
    database: {
      url:  ' postgresql://ram123q:SEEE0j4B_572mmxikRfrFA@simple-markhor-6153.8nk.cockroachlabs.cloud:26257/Bookingdb?sslmode=verify-full'  },
    server: {
      port: process.env.PORT || 3000,
    },
    
  jwtSecret: 'your-secret-key', // Replace with a strong secret key for JWT

    // Add other configurations as needed
  };
  