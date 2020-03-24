const contentful = require('contentful');
const manifestConfig = require('./manifest-config');
require('dotenv').config();

const { ACCESS_TOKEN, SPACE_ID, ANALYTICS_ID, DETERMINISTIC } = process.env;

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const getAboutEntry = entry => entry.sys.contentType.sys.id === 'about';

const plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-netlify-cms',
  'gatsby-plugin-netlify-identity-widget',
  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: ['Cabin', 'Open Sans'],
      },
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: manifestConfig,
  },
  'gatsby-plugin-styled-components',
  {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    },
  },
  'gatsby-transformer-remark',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: `${__dirname}/src/content`,
    },
  },
  'gatsby-plugin-offline',
];

module.exports = client.getEntries().then(entries => {
  const { mediumUser } = entries.items.find(getAboutEntry).fields;

  plugins.push({
    resolve: 'gatsby-source-medium',
    options: {
      username: mediumUser || '@medium',
    },
  });

  if (ANALYTICS_ID) {
    plugins.push({
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: ANALYTICS_ID,
      },
    });
  }

  return {
    siteMetadata: {
      title: 'Reach4Help',
      description:
        'An app to help people at high risk get help from neighbors and volunteers closest to them. A part of Helpful Engineering.',
      socialLinks: [
        {
          fontAwesomeIcon: 'github',
          id: '1268ee25-408e-5358-b8d4-510ac106e5a0',
          name: 'Github',
          url: 'https://github.com/reach4help/reach4help',
        },
        {
          fontAwesomeIcon: 'envelope',
          id: '265755e6-9146-55ba-9916-5175bfd799b8',
          name: 'Email Us',
          url: 'mailto:info@reach4help.org',
        },
      ],
      profile: {
        appleIcon: {
          src:
            '//images.ctfassets.net/yganfevmefwf/6nf3rNaaVaUqYcoAcciSeC/6d000f6c6ff8cd1af2d1622ae6b9647a/Mate_Logo.png?w=180&fl=progressive&q=50',
        },
        bigIcon: {
          src:
            '//images.ctfassets.net/yganfevmefwf/6nf3rNaaVaUqYcoAcciSeC/6d000f6c6ff8cd1af2d1622ae6b9647a/Mate_Logo.png?w=192&fl=progressive&q=50',
        },
        favicon16: {
          src:
            '//images.ctfassets.net/yganfevmefwf/6nf3rNaaVaUqYcoAcciSeC/6d000f6c6ff8cd1af2d1622ae6b9647a/Mate_Logo.png?w=16&fl=progressive&q=50',
        },
        favicon32: {
          src:
            '//images.ctfassets.net/yganfevmefwf/6nf3rNaaVaUqYcoAcciSeC/6d000f6c6ff8cd1af2d1622ae6b9647a/Mate_Logo.png?w=32&fl=progressive&q=50',
        },
      },
      isMediumUserDefined: !!mediumUser,
      deterministicBehaviour: !!DETERMINISTIC,
    },
    plugins,
  };
});
