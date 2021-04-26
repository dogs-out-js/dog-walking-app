const mongoose = require('mongoose');
const { getMaxListeners } = require('./app');
const Owner = require('./models/Owner');
const Walker = require('./models/Walker');

mongoose.connect('mongodb://localhost/dogs-out', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const owners = [
    {
        username: 'Jenna',
        email: 'jenna@gmail.com',
        password: 'jennajenna',
        dogBreed: 'labrador',
        dogAge: 6,
        dogSize: 'big doggo',
        dogsSpecialNeeds: "Don't let her to eat trash",
        ownerImg: 'https://wyspapupila.pl/upload/wyspapupila/blog//labrador-retriever-wszystko-co-warto-wiedziec-o-tej-rasie_570x342_al16.jpg',
    },
    {
        username: 'Ralph',
        email: 'ralph@gmail.com',
        password: 'ralphralph',
        dogBreed: 'welsh corgi pembroke',
        dogAge: 3,
        dogSize: 'medium doggo',
        dogsSpecialNeeds: "Needs to be trained and taught new commands (sit, stay, come, drop it)",
        ownerImg: 'https://i.pinimg.com/originals/51/03/d8/5103d8dcf3285e7e73b142049d252558.jpg'
    },
    {
        username: 'Mary',
        email: 'mary@gmail.com',
        password: 'marymary',
        dogBreed: 'shiba inu',
        dogAge: 7,
        dogSize: 'big doggo',
        dogsSpecialNeeds: "Very friendly, loves being in the dogs park",
        ownerImg: 'https://i.pinimg.com/originals/52/84/cc/5284cc96fecfeb9dc6e88818136f6b15.jpg'
    }
];

Owner.insertMany(owners)
  .then(owners => {
    console.log(`Success! Added ${owners.length} owners to the database`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err)
  })

const walkers = [
    {
        username: 'Olivia',
        email: 'olivia@gmail.com',
        password: 'oliviaolivia',
        walkerExperience: '2 years of experience as dog walker and trainer.',
        walkerImg: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        price: '$6 per hour'
    },
    {
        username: 'Mark',
        email: 'mark@gmail.com',
        password: 'markmark',
        walkerExperience: 'I have my own doggo and can take yours for a walk together.',
        walkerImg: 'https://images.unsplash.com/photo-1528900403525-dc523d4f18d6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8eW91bmclMjBtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
        price: '$5 per hour'
    },
    {
        username: 'Peter',
        email: 'peter@gmail.com',
        password: 'peterpeter',
        walkerExperience: 'Certified dog trainer, can also dogsit your doggo.',
        walkerImg: 'https://media.istockphoto.com/photos/portrait-of-handsome-smiling-young-man-with-crossed-arms-picture-id1200677760?k=6&m=1200677760&s=612x612&w=0&h=IXURU5rnCRyN5h5ebeDLQcVv0lNs0ZLgE98fPioSMnQ=',
        price: '$10 per hour with training, $6 per hour of walking only'
    }
]

Walker.insertMany(walkers)
  .then(walkers => {
    console.log(`Success! Added ${walkers.length} walkers to the database`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err)
  })

  module.exports = mongoose;