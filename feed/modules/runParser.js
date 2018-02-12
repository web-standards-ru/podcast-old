const { readdir, createWriteStream } = require('fs');
const prettyData = require('pretty-data').pd;

const {
    MD_FOLDER,
    TPL_FOLDER,
    XML_ITEM_TPL,
    XML_WRAPPER_TPL,
    IS_PRODUCTION,
} = require('./constants');
const prepareTemplate = require('./prepareTemplate');


readdir(MD_FOLDER, (err, files) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    const isEpisode = (filename) => {
        return !isNaN(+filename.split('-')[1].split('.md')[0])
    }
    const episodes = files
        .filter(filename => isEpisode(filename))
        .sort((prev, next) => {
            const episodeRe = /episode-([0-9]+)\.md/;
            return prev.match(episodeRe)[1] - next.match(episodeRe)[1];
        });

    Promise.all(episodes.map(episode => prepareTemplate(episode)))
        .then(res => {
            const XML_ITEMS_ARRAY = [];

            // Run foreach cycle to prepare XML array
            res.forEach((episode) => {
                let raw = XML_ITEM_TPL;

                Object.keys(episode).forEach(key => {
                    raw = raw.replace(`{% ${key} %}`, episode[key]);
                })

                XML_ITEMS_ARRAY.push(raw);
            })

            createWriteStream('index.xml')
                .once('open', function (err) {
                    const content = XML_WRAPPER_TPL.replace('{% items %}', XML_ITEMS_ARRAY.join('\n'));
                    // Minify result on production
                    if (IS_PRODUCTION) {
                        this.write(
                            prettyData.xmlmin(content, [, true]));
                    } else {
                        this.write(
                            prettyData.xml(content));
                    }
                    this.end();
                })
                .on('close', () => console.log(`Succesfully written file index.xml`))
                .on('error', () => console.error('Something’s wrong try again'));
        })
        .catch(err => console.error(err));

    // TODO remove before production, denug only
    /* prepareTemplate(episodes[94])
        .then(res => console.log(res))
        .catch(err => console.error(err)); */
})
