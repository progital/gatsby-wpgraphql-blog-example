import React from "react"
import { graphql } from "gatsby"
import { Row, Col, Divider } from "antd"
import SiteLayout from "../components/SiteLayout"
import CategoriesWidget from "../components/CategoriesWidget"
import RecentCommentsWidget from "../components/RecentCommentsWidget"
import RecentPostsWidget from "../components/RecentPostsWidget"
import Seo from "../components/Seo"
import contentParser from "gatsby-wpgraphql-inline-images"

const Page = props => {
  const {
    location,
    data: {
      wpgraphql: { page },
    },
    pageContext: {
      pluginOptions: { wordPressUrl, uploadsUrl },
    },
  } = props
  const { title, content } = page
  return (
    <SiteLayout location={location}>
      <Seo title={`${page.title}`} />
      <Row type="flex" gutter={24}>
        <Col xs={24} md={16}>
          <h1>{title}</h1>
          <Divider />
          <Row type="flex" justify="space-around" gutter={24}>
            <Col xs={24}>
              <div>
                {contentParser({ content }, { wordPressUrl, uploadsUrl })}
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={8}>
          <RecentPostsWidget />
          <CategoriesWidget />
          <RecentCommentsWidget />
        </Col>
      </Row>
    </SiteLayout>
  )
}

export default Page

export const pageQuery = graphql`
  query GET_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`
