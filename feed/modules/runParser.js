const { readdir, createWriteStream } = require('fs');
const xmlBeautifier = require('xml-beautifier');

const {
    MD_FOLDER,
    TPL_FOLDER,
    XML_ITEM_TPL,
    XML_WRAPPER_TPL
} = require('./constants');
const prepareTemplate = require('./prepareTemplate');


readdir(MD_FOLDER, (err, files) => {
    if (err) {
        console.error(err);
        return process.exit(1);
    }

    const isEpisode = (filename) => {
        return !isNaN(+filename.split('-')[1].split('.md')[0])
    }
    const episodes = files.filter(filename => isEpisode(filename));

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

            createWriteStream(`${__dirname}/../${TPL_FOLDER}/index.xml`)
                .once('open', function (err) {
                    const content = XML_WRAPPER_TPL.replace('{% items %}', XML_ITEMS_ARRAY.join('\n'));
                    this.write(xmlBeautifier(content));
                    this.end();
                })
                .on('close', () => console.log(`Succesfully written file '${__dirname}/index.xml'`))
                .on('error', () => console.error('Something wrong try again'));
        })
        .catch(err => console.error(err));

    // TODO remove before production, denug only
    /* prepareTemplate(episodes[94])
        .then(res => console.log(res))
        .catch(err => console.error(err)); */
})
