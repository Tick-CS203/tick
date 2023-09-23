import ClassicalImage from "../assets/larisa-birta-slbOcNlWNHA-unsplash.jpg";
import TheatreImage from "../assets/kyle-head-p6rNTdAPbuk-unsplash.jpg";
import ConcertImage from "../assets/austin-neill-hgO1wFPXl3I-unsplash.jpg";
import DanceImage from "../assets/ahmad-odeh-TK_WT3dl2tw-unsplash.jpg";
import ComedyImage from "../assets/luis-quintero-jKTCVwtltYQ-unsplash.jpg";
import MusicalImage from "../assets/sudan-ouyang-UQuka_ruWxQ-unsplash.jpg";

import { Category } from "../component/homepage/Category";
import { Event } from "../component/homepage/Event";
import { Carousel } from "../component/homepage/Carousel";
import { useEventQuery } from "../api/events.query";

import React from 'react';

export const Home = () => {
  const { data: events } = useEventQuery();
  const arrayEvents = events.map((event) => (
    <Event
    imageURL={event.banner}
    eventName={event.name}
    eventDate={event.date}
    />
  ));

  const images = [ClassicalImage, TheatreImage, ConcertImage, DanceImage, ComedyImage, MusicalImage];
  return (
    <>
      <></>
      <Carousel images={images} />
      <p className="font-inter font-black text-main-yellow italic text-xl py-5 relative uppercase">
        Your Upcoming Concerts
      </p>
      <p className="font-inter font-black text-main-blue italic text-xl py-5 relative uppercase">
        <img
          className="absolute left-[256px]"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEaUlEQVR4nO2cQahVVRSGT2iZA4kaFBHVICc5CSQaNAgiSgqKJs7CwkGNBBtYr3fXfiekic5qFBg1yYk0UhIaXQeiePe6WimCr0ipePbuWvelkCRmHjk2KEJNO3e9tdbd64M9fez/rHf+y/3vv3dVOScN6eWEvJCQm0ktyHS6h/yCtjZ31P3Td6fMo0kO4+9FP2jrc8cc8usyw/jrLdHW5w5AHkgNJCF9oK3PFTWO1osNI/PFWRw9qK3RFSnTZ4J29am2PlfMfHvuXkC+IDaQo4tPaGt0BSBtE/zs+Epbny+a5o6UeV5uIOMN2hJdAXn0kuDbcaIduLZGVyTkL8U+Owa8WVufK3rDpUcT0mWRYWRebL/5a2t0Rcq8U+ztQE7a+lyxZX5+lVRuBci/v3f4lwe0NboCkN+Q+zDnj7X1uQOkcqtMV2DIj2vrc0Utm1vt09bnjiSYWyWkZ7X1uWJGMLeCTN/EF0FDuRUM6TWZf6NppRHMrTL9XJ9o7tKW6AqQzK0yvaOtzx1JKrfK/Ft96Nx92vpc0ZPMrZA+1NbnjiSWW9HlHi4+pq3PFVtEcyv6QlufO0Awt+oNxk9r63MHCOVW7d/V1uaOWjC3msPxRm197khCuVVbDa37zUptfa6Yke1bbdXW5w4Qyq0A6fy7uHSPtj5fiOZWvFNbnjukcitA+qPGpUe09blDsG+1W1ubOyRzq9nMT2nrc4dUbgXIB7S1uUM0txrQK9r63CF5TjB1W9+nIT1XlUZCOmLg4Tc3GkpVErNDetLAQ29uaHmZv6tKoj3Lp/3Q001WL9NbVSlInxNM3Ve/qM6W7DlB7mZVyBfq4eLaqhjEzwly11VWMix7TpC7rUyHN+5pVlQlIXlOMHUaBl+sj/K6qiQkc6vUedFMVRqS5wRThwXIx97E5s6qNFKmMwbfjEvFXqfRXgxmcCDbq1Jpr85rGyB2rIqOx7GEDtT9ZuWk4nrI9Gc0GTuScLxhcm8H7+i6n+IBpE8mNIxTbx/6cXXxD9SCXUFrVcPRMzEMM3ZFH8UwrNhVpjPbDtKaGIgFu8p0JW6sNmVXtGtS+yke6G5XC+2vlMU/SCt2BUivxjCM2BVk/jyGYcSuAInqr8/eHwMxYldzca7Qjl1B5r0T3k4A/9OuINOvs8f4oXiCRuwKMm+KYRixK0DaH8MwYleAdL43GD8cAzFiV72SCtIO7KpfVEHasl1BcQVp+3a1VXvfU0u6XbsqsSBt1q5ygQVp23ZF5RWkrdoVlFqQtmhXcO1SmdF67f1ONfXt2FWm97X3O/WkW7WrTCfbKzm09zv1wC3YVRSkjdkVREHajl1BFKTt2BVEQdqaXVEUpM3YVY6CtB27ylGQXna7astsN7GqXcu7o8L5D7taiIK0IbuCKEjbsSuIgrQdu4IoSNuyq7koSC8/7Q9LCYmvY1V7FbYTXM+uIArStuwKoiCtORA++68P8v2K2wkA6ad/DCMK0tqkwfjFNjS8dndW5ue191MZ4SripL01kL62MgAAAABJRU5ErkJggg=="
          alt="lightning"
        />
        Top Picks Of The Month
      </p>

      <div className="flex flex-wrap">
        {arrayEvents}
      </div>

      <p className="font-inter font-black text-main-yellow italic text-xl py-10 uppercase">
        Explore Different Categories
      </p>
      <div className="flex flex-wrap justify-around gap-y-4">
        <Category imageURL={ClassicalImage} categoryName="Classical" />
        <Category imageURL={ComedyImage} categoryName="Comedy" />
        <Category imageURL={DanceImage} categoryName="Dance" />
        <Category imageURL={TheatreImage} categoryName="Theatre" />
        <Category imageURL={ConcertImage} categoryName="Concert" />
        <Category imageURL={MusicalImage} categoryName="Musical" />
      </div>
    </>
  );
};
