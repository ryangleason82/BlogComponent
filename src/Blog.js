import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col
} from "reactstrap";
var moment = require("moment");

const Blog = () => {
  const [mediumData, setMediumData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ryangleason82`
    )
      .then(res => res.json())
      .then(response => {
        setMediumData(response.items);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const newArray = mediumData.slice(0, 6);

  return (
    <div id="blog" className="container mt-3">
      <h3 className="ui horizontal header divider mt-5">
        <p>Blog</p>
      </h3>
      {isLoading && <p>Fetching data from Medium!</p>}

      <Row>
        {newArray.map(article => (
          <Col md="4" className="mb-3" key={article.guid}>
            <div>
              <Card>
                <CardImg top width="100%" src={article.thumbnail} alt="img" />
                <CardBody>
                  <CardTitle>
                    <a href={article.link}>{article.title}</a>
                  </CardTitle>
                  <CardSubtitle>
                    Published:{" "}
                    {moment(article.pubDate).format("dddd, MMMM Do YYYY")}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Blog;
