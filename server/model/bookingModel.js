const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    sitterId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  }
  )

  module.exports = mongoose.model('bookings',bookingSchema)