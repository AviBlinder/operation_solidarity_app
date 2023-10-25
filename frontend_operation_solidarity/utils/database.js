import mongoose from 'mongoose';
// In Mongo, configure a user/password + grant 0.0.0.0/0 access under "Network Access"
// Under Database => Connect -> Drivers, pick the Connection String

// [Mongoose Schema Types](https://mongoosejs.com/docs/schematypes.html)
let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

// Sample Mongoose usage:
// const schema = new Schema({
//   name: String,
//   binary: Buffer,
//   living: Boolean,
//   updated: { type: Date, default: Date.now },
//   age: { type: Number, min: 18, max: 65 },
//   mixed: Schema.Types.Mixed,
//   _someId: Schema.Types.ObjectId,
//   decimal: Schema.Types.Decimal128,
//   array: [],
//   ofString: [String],
//   ofNumber: [Number],
//   ofDates: [Date],
//   ofBuffer: [Buffer],
//   ofBoolean: [Boolean],
//   ofMixed: [Schema.Types.Mixed],
//   ofObjectId: [Schema.Types.ObjectId],
//   ofArrays: [[]],
//   ofArrayOfNumbers: [[Number]],
//   nested: {
//     stuff: { type: String, lowercase: true, trim: true },
//   },
//   map: Map,
//   mapOfString: {
//     type: Map,
//     of: String,
//   },
// });

// // example use

// const Thing = mongoose.model('Thing', schema);

// const m = new Thing();
// m.name = 'Statue of Liberty';
// m.age = 125;
// m.updated = new Date();
// m.binary = Buffer.alloc(0);
// m.living = false;
// m.mixed = { any: { thing: 'i want' } };
// m.markModified('mixed');
// m._someId = new mongoose.Types.ObjectId();
// m.array.push(1);
// m.ofString.push('strings!');
// m.ofNumber.unshift(1, 2, 3, 4);
// m.ofDates.addToSet(new Date());
// m.ofBuffer.pop();
// m.ofMixed = [1, [], 'three', { four: 5 }];
// m.nested.stuff = 'good';
// m.map = new Map([['key', 'value']]);
// m.save(callback);
