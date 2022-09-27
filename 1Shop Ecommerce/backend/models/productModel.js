import mongoose from 'mongoose';

//Models for the database
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  { timestamps: true }
);

/* chartSetting is must be singular version of the name of collection,
In this case the name of collection is 'chartSettings' but the parameter is without s */
// module.exports = mongoose.model('chartSetting', chartSchema);
const Product = mongoose.model('Product', productSchema);
export default Product;
