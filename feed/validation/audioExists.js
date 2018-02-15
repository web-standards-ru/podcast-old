const getFile = require('../modules/getFileHeaders');
const collectEpisodes = require('../modules/collectEpisodes');

const {
    WS_SITE
} = require('../modules/constants')

collectEpisodes
    .then(episodes => {
        const matcher = (name) => +name.match(/\d+/)[0];
        const audio = episodes.map(episode => `${matcher(episode)}.mp3`);
        const promises = audio.map(file => getFile(file));

        Promise.all(promises)
        .then(res => console.log(`Available ${res.length} episodes on server`))
        .catch(err => {
            console.error(err);
            process.exit(1);
        })
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })

