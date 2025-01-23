const axios = require("axios");
const { AUTH_SERVICE_URL } = require("../config/config");

class AuthenticationService {
  static async validateUser(userId) {
    try {
      const response = await axios.post(`${AUTH_SERVICE_URL}/validate`, { userId });
      if (response.data && response.data.isValid) {
        console.log(`User ${userId} validated successfully.`);
        return true;
      } else {
        console.warn(`User ${userId} validation failed.`);
        return false;
      }
    } catch (error) {
      console.error(`Error validating user ${userId}:`, error.message);
      return false;
    }
  }
}

module.exports = AuthenticationService;
