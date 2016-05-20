'use strict';

const Q = require('q');

const TEAM_IRON_MAN = [
  {
    name: 'Iron Man',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg'
  },
  {
    name: 'Captain America',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087.jpg'
  },
  {
    name: 'War Machine',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/3/80/5239c15d562d6.jpg'
  },
  {
    name: 'Black Widow',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b.jpg'
  },
  {
    name: 'Hawkeye',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/e/90/50fecaf4f101b.jpg',
  },
  {
    name: 'Scarlet Witch',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/6/70/5261a7d7c394b.jpg',
  },
  {
    name: 'Black Panther',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/6/60/5261a80a67e7d.jpg'
  },
  {
    name: 'Spider-Man',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg'
  },
  {
    name: 'Ant-Man',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/9/c0/53176aa9df48d.jpg'
  },
  {
    name: 'Vision',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/9/d0/5111527040594.jpg'
  },
  {
    name: 'Winter Soldier',
    picture: 'http://i.annihil.us/u/prod/marvel/i/mg/d/03/5265478293c1e.jpg'
  }
];

const BACKUP_CHARACTER = {
  name: 'Deadpool',
  picture: 'http://i.annihil.us/u/prod/marvel/i/mg/9/90/5261a86cacb99.jpg'
}

let assigned = {};
let available = TEAM_IRON_MAN;

function get(id) {
  let deferred = Q.defer();
  
  if (!assigned[id]) {
    if (available.length !== 0) {
      let randomPosition = Math.floor(Math.random() * available.length);
      assigned[id] = available.splice(randomPosition, 1)[0];
    } else {
      assigned[id] = BACKUP_CHARACTER;
    }
    deferred.resolve(assigned[id]);
  } else {
    deferred.resolve(assigned[id]);
  }
  
  return deferred.promise;
}

module.exports = { get: get }