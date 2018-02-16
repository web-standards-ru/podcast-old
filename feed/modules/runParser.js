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
const collectEpisodes = require('./collectEpisodes');

collectEpisodes
    .then(episodes => {
        return Promise.all(episodes.map(episode => prepareTemplate(episode)))
        .then(res => {
            const XML_ITEMS_ARRAY = [];

            // Run foreach cycle to prepare XML array
            res.forEach((episode) => {
                let raw = XML_ITEM_TPL;

                Object.keys(episode).forEach(key => {
                    raw = raw.replace(new RegExp(`{% ${key} %}`, 'g'), episode[key]);
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
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
})
