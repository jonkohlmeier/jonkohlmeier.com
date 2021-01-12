import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'

import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import { Container, Row, Col } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Container fluid>
        <Row>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          
          return (
            <Col lg={4} md={4} sm={12}>

            <div key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <Img sizes={post.frontmatter.headerImage.childImageSharp.sizes} />
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
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
              </div>
               </Col>
          )
          
        })}
        </Row>
        </Container>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            description
            headerImage {
              childImageSharp {
                sizes(maxWidth: 1400) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
      }
    }
  }
`
