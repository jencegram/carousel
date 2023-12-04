import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("moves to the previous image when the left arrow is clicked", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // Move forward first to the second image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // Click the left arrow to move back to the first image
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // Check if the first image is displayed again
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});


// Test for Left Arrow Visibility on 1st image
it("hides the left arrow when on the first image", function () {
  const { queryByTestId } = render(<Carousel />);

  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).not.toBeInTheDocument();
});

// Test for Right Arrow Visibility on last image
it("hides the right arrow when on the last image", function () {
  const { queryByTestId } = render(<Carousel />);

  // Move to the last image
  const rightArrow = queryByTestId("right-arrow");
  for (let i = 0; i < Carousel.defaultProps.cardData.length - 1; i++) {
    fireEvent.click(rightArrow);
  }

  // Check if the right arrow is not visible on the last image
  expect(rightArrow).not.toBeInTheDocument();
});


// Smoke Test
it("renders without crashing", () => {
  render(<Carousel />);
})

// Snapshot Test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});