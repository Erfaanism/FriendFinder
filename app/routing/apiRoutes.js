const fs = require('fs');
const path = require('path');
const friends = path.join(__dirname, '../data/friends.js');

let allFriends = [];
let compareFriends = [];

let bestFriend = userData => {
    let userScores = userData.scores;
    allFriends.map((friendInfo, friendId) => {
        let difference = 0;
        friendInfo.scores.map((scoreValue, scoreIndex) => {
            difference += Math.abs(userScores[scoreIndex] - scoreValue);
        });
        compareFriends.push({
            friendId,
            difference
        });
    });
    let sortedCompareFriends = compareFriends.sort((a, b) => {
        return a.difference - b.difference;
    });
    let theOne = sortedCompareFriends[0].friendId;
    allFriends.push(userData);
    fs.writeFileSync(friends, JSON.stringify(allFriends));
    return allFriends[theOne];
};

let router = app => {

    // error handling in case '../data/friends.js' does not exist
    try {
        allFriends = JSON.parse(fs.readFileSync(friends, 'utf8'));
    } catch (e) {
        console.log(e);
        allFriends = [];
    };

    app.get('/api/friends', (req, res) => {
        res.send(allFriends);
    });

    app.post('/api/friends', (req, res) => {
        res.send(bestFriend(req.body));
    });
};

module.exports = router;