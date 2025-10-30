/**
 * SEO helper for Gatsby's Head API.
 * Pulls site metadata once via useStaticQuery so individual pages can remain lean.
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description, pathname, image, children }) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          siteLanguage
          keywords
          social {
            twitter
          }
        }
      }
    }
  `);

  const {
    title: defaultTitle,
    titleTemplate,
    description: defaultDescription,
    siteUrl,
    siteLanguage,
    keywords,
    social,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
  };

  const fullTitle = title
    ? (titleTemplate?.replace(`%s`, title) ?? `${title} | ${defaultTitle}`)
    : defaultTitle;
  const url = pathname ? new URL(pathname, siteUrl).href : siteUrl;
  const imageUrl = image ? new URL(image, siteUrl).href : undefined;

  return (
    <>
      <html lang={siteLanguage || `en`} />
      <title>{fullTitle}</title>
      <meta name="description" content={seo.description} />
      {keywords?.length && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta
        name="twitter:card"
        content={imageUrl ? `summary_large_image` : `summary`}
      />
      <meta
        name="twitter:creator"
        content={social?.twitter ? `@${social.twitter}` : ``}
      />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <link rel="canonical" href={url} />
      {children}
    </>
  );
};

export default Seo;
