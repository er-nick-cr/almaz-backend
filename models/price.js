const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  banner300: {
    type: Number,
  },
  banner440: {
    type: Number,
  },
  banner510: {
    type: Number,
  },
  banner510Lit: {
    type: Number,
  },
  bannerBlackOut: {
    type: Number,
  },
  bannerGrid: {
    type: Number,
  },
  bannerBacklit: {
    type: Number,
  },
  posterPaper: {
    type: Number,
  },
  scrollerPaper: {
    type: Number,
  },
  filmWhite: {
    type: Number,
  },
  filmTransparent: {
    type: Number,
  },
  filmTranslucent: {
    type: Number,
  },
  filmBlackOut: {
    type: Number,
  },
  filmOrajet: {
    type: Number,
  },
  filmOrajetTransparent: {
    type: Number,
  },
  filmPerforated: {
    type: Number,
  },
  filmOracal641: {
    type: Number,
  },
  canvas: {
    type: Number,
  },
  wallpaper: {
    type: Number,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
});
