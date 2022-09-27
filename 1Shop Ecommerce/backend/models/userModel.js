import mongoose from 'mongoose';

//Models for the database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

/* chartSetting is must be singular version of the name of collection,
In this case the name of collection is 'chartSettings' but the parameter is without s */
// module.exports = mongoose.model('chartSetting', chartSchema);
const User = mongoose.model('User', userSchema);
export default User;
