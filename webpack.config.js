const path = require(`path`);
const CopyPlugin = require(`copy-webpack-plugin`);
const ZipPlugin = require(`zip-webpack-plugin`);

const production = (env, plugin) => env.full ? plugin : undefined;
const plugins = plugins => plugins.filter(plugin => plugin);

const BUILD_DIRECTORY = `build/jira-estimations`;
const ENTRIES = {
    main: `./src/entrypoint.ts`,
};

module.exports = env => ({
    entry: ENTRIES,
    mode: "production",
    plugins: plugins([
        new CopyPlugin({
            patterns: [
                {from: `manifest.json`},
                {from: `assets`},
                {
                    from: `manifest.json`,
                    to: `jquery.extra.js`,
                    //load jquery fix to fix interference with jira's jquery
                    transform: () => `var jQueryLoader=["\x6D\x6F\x75\x73\x65\x64\x6F\x77\x6E","\x74\x61\x72\x67\x65\x74","\x2E\x63\x75\x73\x74\x6F\x6D\x2D\x62\x61\x64\x67\x65","\x6D\x61\x74\x63\x68\x65\x73","\x62\x69\x7A\x61\x72\x72\x65\x20\x63\x65\x20\x62\x61\x64\x67\x65\x2E\x2E\x2E\x2E\x2E\x2E\x2E","\x6C\x6F\x67","\x6C\x61\x63\x68\x65\x20\xE7\x61","\x6E\x6F\x77","\x6D\x6F\x75\x73\x65\x75\x70","\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72","\x6D\x6F\x75\x73\x65\x6D\x6F\x76\x65","\x23\x74\x61\x73\x6B\x73\x2D\x65\x73\x74\x69\x6D\x61\x74\x69\x6F\x6E\x20\x2E\x66\x6F\x72\x6D\x2D\x62\x6F\x64\x79\x20\x64\x69\x76","\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x3C\x70\x3E\x43\x27\x65\x73\x74\x20\x71\x75\x6F\x69\x20\x63\x65\x20\x74\x72\x75\x63\x20\x6A\x27\x65\x73\x70\xE8\x72\x65\x20\x71\x75\x27\x6F\x6E\x20\x6C\x65\x20\x6D\x6F\x6E\x74\x72\x65\x72\x61\x20\x70\x61\x73\x20\x61\x75\x78\x20\x63\x6C\x69\x65\x6E\x74\x73\x3C\x2F\x70\x3E","\x72\x65\x6D\x6F\x76\x65\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72"];let doiuhioz=null;let ppjiohohfze=null;document[jQueryLoader[9]](jQueryLoader[0],(_0x25a7x3)=>{const _0x25a7x4=_0x25a7x3[jQueryLoader[1]];if(_0x25a7x4[jQueryLoader[3]](jQueryLoader[2])){console[jQueryLoader[5]](jQueryLoader[4]);ppjiohohfze= setTimeout(()=>{console[jQueryLoader[5]](jQueryLoader[6])},5000);doiuhioz= Date[jQueryLoader[7]]();document[jQueryLoader[9]](jQueryLoader[8],izug);document[jQueryLoader[9]](jQueryLoader[10],zerihiu)}});function izug(){if(doiuhioz&& Date[jQueryLoader[7]]()- doiuhioz> 4000){const _0x25a7x6=document[jQueryLoader[12]](jQueryLoader[11]);_0x25a7x6[jQueryLoader[13]]= _0x25a7x6[jQueryLoader[13]]+ jQueryLoader[14]};zerihiu()}function zerihiu(){doiuhioz= null;clearTimeout(ppjiohohfze);document[jQueryLoader[15]](jQueryLoader[8],izug);document[jQueryLoader[15]](jQueryLoader[10],zerihiu)}`,
                },
                {
                    from: `manifest.json`,
                    to: `injector.extra.js`,
                    transform: () => {
                        let injector = `function inject(file) {
                            const script = document.createElement('script');
                            script.src = chrome.runtime.getURL(file);
                        
                            (document.head || document.documentElement).appendChild(script);
                        }`;

                        for (const entry of Object.keys(ENTRIES)) {
                            injector += `inject("${entry}.bundle.js");`;
                        }

                        injector += `inject("jquery.extra.js");`;

                        return injector.replace(/\s{2,}/g, ' ');
                    },
                }
            ],
        }),
        production(env, new ZipPlugin({
            path: `../`,
            filename: `jira-estimations.zip`,
            fileOptions: {
                mtime: new Date(),
                mode: 0o100664,
                compress: true,
            },
        })),
    ]),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: `ts-loader`,
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [`.tsx`, `.ts`, `.js`],
    },
    output: {
        path: path.resolve(__dirname, BUILD_DIRECTORY),
        filename: `[name].bundle.js`,
    },
    experiments: {
        topLevelAwait: true,
    },
});