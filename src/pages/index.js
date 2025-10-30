import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Container, Row, Col } from "react-bootstrap";

import Layout from "../components/layout";
import Seo from "../components/seo";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Container fluid>
        <Row>
          {posts.map((post) => {
            const title = post.frontmatter.title || post.fields.slug;
            const image = getImage(post.frontmatter?.headerImage);
            const slugId =
              post.fields.slug
                .replace(/^\/+|\/+$/g, "")
                .replace(/[^A-Za-z0-9_-]/g, "-") || "post";

            return (
              <Col
                key={post.fields.slug}
                lg={4}
                md={6}
                sm={12}
                className="mb-4"
              >
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                  aria-labelledby={`${slugId}-title`}
                >
                  <header>
                    <Link
                      to={post.fields.slug}
                      itemProp="url"
                      className="post-link"
                    >
                      {image && (
                        <GatsbyImage
                          image={image}
                          alt={title}
                          className="post-list-image"
                        />
                      )}
                      <h2 id={`${slugId}-title`}>
                        <span itemProp="headline">{title}</span>
                      </h2>
                    </Link>
                    <p className="post-meta">
                      <time dateTime={post.frontmatter.dateISO}>
                        {post.frontmatter.date}
                      </time>
                    </p>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          dateISO: date
          title
          description
          headerImage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 900
                quality: 90
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`;

export const Head = ({ location, data }) => (
  <Seo
    title="Puffs of Smoke - A blog by Jon Kohlmeier"
    description={data.site.siteMetadata.description}
    pathname={location.pathname}
  />
);
