const siteUrl = `https://jonkohlmeier.com`;

module.exports = {
  siteMetadata: {
    title: `Puffs of Smoke`,
    titleTemplate: `%s | Puffs of Smoke`,
    author: {
      name: `Jonathan Kohlmeier`,
      summary: `a technologist living in Cedar Rapids, IA, often found with a pipe between his teeth.`,
    },
    description: `Thoughts and dreams from behind a tobacco pipe.`,
    keywords: [`technology`, `blog`, `pipe`, `leadership`, `philosophy`],
    siteLanguage: `en-US`,
    siteUrl,
    social: {
      twitter: `jonkohlmeier`,
      instagram: `jon.kohlmeier`,
      linkedin: `jonkohlmeier`,
    },
  },
  trailingSlash: `never`,
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
              quality: 90,
              withWebp: true,
              loading: `lazy`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.5rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-380877742`],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
        gtagConfig: {
          anonymize_ip: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            title: `Puffs of Smoke RSS Feed`,
            output: `/rss.xml`,
            match: `^/`,
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map((node) => {
                const url = `${site.siteMetadata.siteUrl}${node.fields.slug}`;
                return {
                  title: node.frontmatter.title,
                  description: node.frontmatter.description || node.excerpt,
                  date: node.frontmatter.date,
                  url,
                  guid: url,
                };
              }),
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC } }
                ) {
                  nodes {
                    excerpt
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      description
                    }
                  }
                }
              }
            `,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Puffs of Smoke`,
        short_name: `PuffsOfSmoke`,
        start_url: `/`,
        background_color: `#0d0d0d`,
        theme_color: `#7f4b2a`,
        display: `standalone`,
        icon: `static/favicon.ico`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/dev-404-page/`],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap/sitemap-index.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
  ],
};
