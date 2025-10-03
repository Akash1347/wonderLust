const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const mapboxClient = require("@mapbox/mapbox-sdk/services/geocoding");
require('dotenv').config({ path: '../.env' });

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
const mongoUrl = process.env.ATLASDB_URL;
const geocodingClient = mapboxClient({ accessToken: process.env.MAP_TOKEN });

async function main() {
  try {
    await mongoose.connect(mongoUrl);
    await Listing.deleteMany({});

    for (const obj of initData.data) {
      const listingData = { ...obj, owner: "68da6758cfd7bbba78b99068" };

      if (!listingData.geometry) {
        try {
          const response = await geocodingClient
            .forwardGeocode({
              query: `${listingData.location}, ${listingData.country}`,
              limit: 1,
            })
            .send();

          const feature = response.body.features[0];
          if (feature) listingData.geometry = feature.geometry;
        } catch {}
      }

      await new Listing(listingData).save();
    }

    mongoose.connection.close();
  } catch {}
}

main();
