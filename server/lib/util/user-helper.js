"use strict";

const Chance = require("chance");
const chance = new Chance();

const md5 = require('md5');

module.exports = {

  generateRandomUser: () => {
    const gender    = chance.gender();
    const firstName = chance.first({gender: gender});
    const lastName  = chance.animal({type: 'pet'})
    const userName  = firstName + " " + lastName;

    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix    = chance.prefix({gender: gender});
      prefix = prefix.replace(".", "");
      userHandle += prefix
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }

    const avatarUrlPrefix = `https://api.adorable.io/avatars/285/${md5(userHandle)}@adorable.io`
    ;
    const avatars = {
      small:   `${avatarUrlPrefix}.png`,
      regular: `${avatarUrlPrefix}.png`,
      large:   `${avatarUrlPrefix}.png`
    }

    return {
      name: userName,
      handle: userHandle,
      avatars: avatars
    };
  }
};
