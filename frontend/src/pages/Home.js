import ClassicalImage from "../assets/larisa-birta-slbOcNlWNHA-unsplash.jpg";
import TheatreImage from "../assets/kyle-head-p6rNTdAPbuk-unsplash.jpg";
import ConcertImage from "../assets/austin-neill-hgO1wFPXl3I-unsplash.jpg";
import DanceImage from "../assets/ahmad-odeh-TK_WT3dl2tw-unsplash.jpg";
import ComedyImage from "../assets/luis-quintero-jKTCVwtltYQ-unsplash.jpg";
import MusicalImage from "../assets/sudan-ouyang-UQuka_ruWxQ-unsplash.jpg";

import { useState } from "react";
import { Link } from "react-router-dom";

import { Event } from "../component/homepage/Event";
import { useEventSearchQuery, useEventsQuery } from "../api/events.query";
import { Carousel } from "../component/homepage/Carousel";

export const Home = () => {
  const images = [
    ClassicalImage,
    TheatreImage,
    ConcertImage,
    DanceImage,
    ComedyImage,
    MusicalImage,
  ];

  const { data: events } = useEventsQuery();

  const [searchString, setSearchString] = useState("");
  const { data: searchResults } = useEventSearchQuery(searchString);
  console.log(searchResults);

  const onEnterKeyPress = (event) => {
    if (event.keyCode === 13) {
      setSearchString(event.target.value);
    }
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col justify-around items-center py-10">
        <div className="lg:flex lg:flex-row hidden">
          <img
            className="w-[90px] h-[90px]"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADgUlEQVR4nO2ZXYhNURTHd41vSUmePHhAHubJhEE6Oeu/9r0yRLnyne/PCIkRIUqp8UaRKPHgI2lepDx48SAvSgaF8OCj8VEyD8osS/vMjLlzzZ17zr1z7zlX86/9cjqds3577bX22msbM6ABlSxlHqlEkxWYr2lvvKkGaSYzRJlrFViozAuE0aLAUgHOKdCozLNNNUiZa4Xpllp/rjLtEeCkMC4L44kwfgnjs6b8qSbpUmC+MB79Zmi+IUzvTZKlwDZh/A6MBX0X0AMBzqqlzQpsFMaPTpAbJqlSYKuDcEOZDms6PTR43tAwQtmfJ6DWTohmF0cmiVL2t2RBbA+eAesE9DxnSSUYwtLmXAhhOvbXeNDPIHMx7dVMpsYkUQps6obgHdkQLkMp+8tM0qWW1gtIAgiinT0gQO0KLDdVBcG0qzohOoJYnNEKHHDPBiDikDKvzfJEY3V6gv8LCH+ZMzaAYDqYGAglminAKQGuCdMFN9uujMjz7posT+zrZZ9YUnkAa8e4EqHXahT0QZn9Hu8Dq7s94e9PBoTnDRPQwz5La1CbWjsleJ951V+I3BQbF0Ru7VPgnNCcA9GYGAjt8Ma3UCCg9ryBHSeEk9q5s8JAZA93nkhMduqSWx6RIIBDifCELpw1Sq2dqNbWKfsb3JGzaE9UGkKBSQI6I4xXUZdRlieOxAahnjdImJrcT4sFcKMdOBofRF3dYAHulALQmXKvxwbh5MqLUiG6DHftme4UjNumUlJLKyMbDNwU4HhIuC8CvHB9KGF8UmB3/0Ok00MF9CbirLe4eIqyy/ecBGrrfxBgRZGxcKzrG1FhhPGx30EEdKWEwC4KRoDz5QB5GSEmbvYNg/shvvNUPW9sOUBaQ6zpBy4mgn0mD0whj3Q0oXFC6+uH9zuEU5hKNnsvyAfTV2AHAMBoU05JgbuHUmBcUGsqNaGsAF0S4GKEbNMThtFSIBk0mUpJgVTE1BnAhMlSrotYOZBMpkYY7yLBdHZCCoKk/DkVA3Fyp7UoIP8YTDRNmWfkwP7M1xYqq4Rxr2gQ609XoD4nPppNHFLmccJ4HXbWe/NCLlwsIE6uD+Uq1TCz3psXupcVTpu4pUSTw5YteSDuJOZuTz1vrDDdLQLivDtpmqRJg/0Cb0Ok45fKvNgkWZrJ1CizFaZLAnosoK9B/cT0TICrav1Fib3rNlWoP5M4ZDmpNmZkAAAAAElFTkSuQmCC"
            alt="guitar"
          />
          <img
            className="w-[90px] h-[90px]"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEcUlEQVR4nO1aW4hcRRDtYHwQFN+KKFFBEPzQKMYHqETBB+qHKFEQRPTDaNAvH9nMVM+NX0ZU0A9F/fLDD8mHguIbXcUQNVM1O+qKD4TgY5Ps3qq7mxWNhpgrNbOz3Mx2zx1I5j6GOdAsTFfd7XOrurqq+hozwggjjNAnYPvsxZb4C0u8D0i+shhdbYYVY1/vOdkiz1iSODH+DjBaaYYRNeR7u8i2B8pjZhgByE87CZNsMkXG2i3xERZ5syXZaUl2W+Jng/F4eZoekGxxEQbi+02RAcRPORb9TJqeJUG3S4fXmiLDti3btXCeU8v30gNicREOJmbPMUWGXRpp2wtv8AU+nQ0YHe/ev7wv7UXlDov8uXMvYnR37/PXSfgXU3RYkuc9wce7j4H4dreOfGRKe56SfOLT0bPWY+FXTNERUHShO9pyZOJ4mUsHiF9060RjpugIxuPlQLLXRaBK0dkuHUB+z73v5U5TBliUuptAeJtLHkh+cFq4Ea42ZQAQv+oJQk8uEY7jZT6PCHD+FFMGVDF6yG1hfrtbtjLBZ3qC3LwpCyrIV3j25O/dslWMrvIEuaYpCwKcWmGJ97uIbPxy9+lJ2RqF93gs/JYpEwDle2ekRr7hYDkOPO7/nCkTgPh1T+DacLCcvOZJOh42ZQKgPOqx3Bv95N4Wo1t0PpiMj1poDuwElCmttfU3UzRUMbzOE7h+SspZ4t96VVcLzYTugLbZFA3BtrmTLPIBT0BS1/4LiH8F5P/cZ/DUCn1Oy6pLX9rU4v8pkgcA8g4f4bTReUbqfJE8AEjeHDhhR4cFSHblQxjZ9ibG3OplofxxCIR7zmdMOLrVs3+pWg/XJMtFaEQXWeJ3S0244siT9dztBJVgfMcxsD08vxOg9AVY4pdKS1iRCCQHgLi6eGyRrFvsVCL/Y5FrSvgBjI+0yJOlJgwke2skd3UaBBb5Zdcia8T3tXQwWl9awoAybUmuTLRjP/QtEkg+VbkKhZeWlnC1OXuu/tWGOhB/1ytqA/K2BdlVweT0sf0kHmnzucAiX96+Z0o5f5ErnZKxFcU9iYVe5ySe3XM+c9RQ1uo9bxpZte4jP8dHqw4gf9bpjmhEV1JqNVfqmDafKSzJE73y6YRlm2Pfzp3Y0sFofbfFXdD+WKGuUi3JplSi7fFj0Nx1WluH71jaKeF39AZR93QwMXuCrfP1QPxB4qW8r7/pnD4H6nKzlpxZk32wH7JaXATf8FmqUyW5CZD/7fMlpY7MyAYYrexnz2rSH9D0eW2y0TVaLh4uspkStq5yzTECnLmkc+YCyZ7DSTZrws1+FtTqiDTC1QsVU1xewsRzgyBQWMLg+XRhmAlvzZtsti6NvsvtISX8+NbwuL7y5sGO+Tzy5zivoVWZyRrg+bIuE8J53EttbMyfmo9r8/5e34QNFNV6uKbVr8rUneUFkycsyo1AHGZCGOVjbQKavFHBmTOSPedBuLFathBkk6jU+TL9Uk8b8YdaMADKnxqNNUDltmdHGGEEUzT8DyA4/6nO9O/gAAAAAElFTkSuQmCC"
            alt="peace"
          />
          <img
            className="w-[100px] h-[100px]"
            src="data:image/png;base64,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"
            alt="wings"
          />
        </div>

        <div className="text-center flex flex-col items-center">
          <p className="text-white uppercase font-inter text-5xl italic font-black">
            Your{" "}
            <span className="text-main-yellow uppercase font-inter text-5xl italic font-black">
              tick
            </span>
            et
          </p>
          <p className="text-white uppercase font-inter text-xl italic font-black my-2">
            to{" "}
            <span className="text-main-yellow uppercase font-inter text-xl italic font-black">
              unforgettable
            </span>{" "}
            memories at the tip of your fingers
          </p>

          <input
            className="sm:w-full w-fit border-2 border-main-yellow bg-black text-main-yellow p-2 m-2 rounded-xl text-center placeholder-main-yellow placeholder-opacity-50"
            placeholder="Search For Events"
            onKeyDown={onEnterKeyPress}
          ></input>
          <button className="lg:hidden sm:w-full w-fit bg-main-yellow text-black px-3 py-2 rounded-xl font-inter text-sm font-semibold">
            <Link to="/event">Browse All Events</Link>
          </button>
        </div>

        <div className="lg:flex lg:flex-row hidden">
          <img
            className="w-[100px] h-[100px]"
            src="data:image/png;base64,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"
            alt="wings"
          />
          <img
            className="w-[90px] h-[90px]"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEcUlEQVR4nO1aW4hcRRDtYHwQFN+KKFFBEPzQKMYHqETBB+qHKFEQRPTDaNAvH9nMVM+NX0ZU0A9F/fLDD8mHguIbXcUQNVM1O+qKD4TgY5Ps3qq7mxWNhpgrNbOz3Mx2zx1I5j6GOdAsTFfd7XOrurqq+hozwggjjNAnYPvsxZb4C0u8D0i+shhdbYYVY1/vOdkiz1iSODH+DjBaaYYRNeR7u8i2B8pjZhgByE87CZNsMkXG2i3xERZ5syXZaUl2W+Jng/F4eZoekGxxEQbi+02RAcRPORb9TJqeJUG3S4fXmiLDti3btXCeU8v30gNicREOJmbPMUWGXRpp2wtv8AU+nQ0YHe/ev7wv7UXlDov8uXMvYnR37/PXSfgXU3RYkuc9wce7j4H4dreOfGRKe56SfOLT0bPWY+FXTNERUHShO9pyZOJ4mUsHiF9060RjpugIxuPlQLLXRaBK0dkuHUB+z73v5U5TBliUuptAeJtLHkh+cFq4Ea42ZQAQv+oJQk8uEY7jZT6PCHD+FFMGVDF6yG1hfrtbtjLBZ3qC3LwpCyrIV3j25O/dslWMrvIEuaYpCwKcWmGJ97uIbPxy9+lJ2RqF93gs/JYpEwDle2ekRr7hYDkOPO7/nCkTgPh1T+DacLCcvOZJOh42ZQKgPOqx3Bv95N4Wo1t0PpiMj1poDuwElCmttfU3UzRUMbzOE7h+SspZ4t96VVcLzYTugLbZFA3BtrmTLPIBT0BS1/4LiH8F5P/cZ/DUCn1Oy6pLX9rU4v8pkgcA8g4f4bTReUbqfJE8AEjeHDhhR4cFSHblQxjZ9ibG3OplofxxCIR7zmdMOLrVs3+pWg/XJMtFaEQXWeJ3S0244siT9dztBJVgfMcxsD08vxOg9AVY4pdKS1iRCCQHgLi6eGyRrFvsVCL/Y5FrSvgBjI+0yJOlJgwke2skd3UaBBb5Zdcia8T3tXQwWl9awoAybUmuTLRjP/QtEkg+VbkKhZeWlnC1OXuu/tWGOhB/1ytqA/K2BdlVweT0sf0kHmnzucAiX96+Z0o5f5ErnZKxFcU9iYVe5ySe3XM+c9RQ1uo9bxpZte4jP8dHqw4gf9bpjmhEV1JqNVfqmDafKSzJE73y6YRlm2Pfzp3Y0sFofbfFXdD+WKGuUi3JplSi7fFj0Nx1WluH71jaKeF39AZR93QwMXuCrfP1QPxB4qW8r7/pnD4H6nKzlpxZk32wH7JaXATf8FmqUyW5CZD/7fMlpY7MyAYYrexnz2rSH9D0eW2y0TVaLh4uspkStq5yzTECnLmkc+YCyZ7DSTZrws1+FtTqiDTC1QsVU1xewsRzgyBQWMLg+XRhmAlvzZtsti6NvsvtISX8+NbwuL7y5sGO+Tzy5zivoVWZyRrg+bIuE8J53EttbMyfmo9r8/5e34QNFNV6uKbVr8rUneUFkycsyo1AHGZCGOVjbQKavFHBmTOSPedBuLFathBkk6jU+TL9Uk8b8YdaMADKnxqNNUDltmdHGGEEUzT8DyA4/6nO9O/gAAAAAElFTkSuQmCC"
            alt="peace"
          />
          <img
            className="w-[90px] h-[90px]"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADgUlEQVR4nO2ZXYhNURTHd41vSUmePHhAHubJhEE6Oeu/9r0yRLnyne/PCIkRIUqp8UaRKPHgI2lepDx48SAvSgaF8OCj8VEyD8osS/vMjLlzzZ17zr1z7zlX86/9cjqds3577bX22msbM6ABlSxlHqlEkxWYr2lvvKkGaSYzRJlrFViozAuE0aLAUgHOKdCozLNNNUiZa4Xpllp/rjLtEeCkMC4L44kwfgnjs6b8qSbpUmC+MB79Zmi+IUzvTZKlwDZh/A6MBX0X0AMBzqqlzQpsFMaPTpAbJqlSYKuDcEOZDms6PTR43tAwQtmfJ6DWTohmF0cmiVL2t2RBbA+eAesE9DxnSSUYwtLmXAhhOvbXeNDPIHMx7dVMpsYkUQps6obgHdkQLkMp+8tM0qWW1gtIAgiinT0gQO0KLDdVBcG0qzohOoJYnNEKHHDPBiDikDKvzfJEY3V6gv8LCH+ZMzaAYDqYGAglminAKQGuCdMFN9uujMjz7posT+zrZZ9YUnkAa8e4EqHXahT0QZn9Hu8Dq7s94e9PBoTnDRPQwz5La1CbWjsleJ951V+I3BQbF0Ru7VPgnNCcA9GYGAjt8Ma3UCCg9ryBHSeEk9q5s8JAZA93nkhMduqSWx6RIIBDifCELpw1Sq2dqNbWKfsb3JGzaE9UGkKBSQI6I4xXUZdRlieOxAahnjdImJrcT4sFcKMdOBofRF3dYAHulALQmXKvxwbh5MqLUiG6DHftme4UjNumUlJLKyMbDNwU4HhIuC8CvHB9KGF8UmB3/0Ok00MF9CbirLe4eIqyy/ecBGrrfxBgRZGxcKzrG1FhhPGx30EEdKWEwC4KRoDz5QB5GSEmbvYNg/shvvNUPW9sOUBaQ6zpBy4mgn0mD0whj3Q0oXFC6+uH9zuEU5hKNnsvyAfTV2AHAMBoU05JgbuHUmBcUGsqNaGsAF0S4GKEbNMThtFSIBk0mUpJgVTE1BnAhMlSrotYOZBMpkYY7yLBdHZCCoKk/DkVA3Fyp7UoIP8YTDRNmWfkwP7M1xYqq4Rxr2gQ609XoD4nPppNHFLmccJ4HXbWe/NCLlwsIE6uD+Uq1TCz3psXupcVTpu4pUSTw5YteSDuJOZuTz1vrDDdLQLivDtpmqRJg/0Cb0Ok45fKvNgkWZrJ1CizFaZLAnosoK9B/cT0TICrav1Fib3rNlWoP5M4ZDmpNmZkAAAAAElFTkSuQmCC"
            alt="guitar"
          />
        </div>
      </div>

      {searchString.length > 0 &&
        searchResults &&
        searchResults.map((event) => {
          return (
            <Event
              key={event.eventID}
              eventId={event.eventID}
              imageURL={event.banner}
              eventName={event.name}
              eventDates={event.date}
            />
          );
        })}

      <Carousel images={images} />

      <p className="font-inter font-black text-main-blue italic text-xl py-5 relative uppercase">
        <img
          className="absolute left-[256px]"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEaUlEQVR4nO2cQahVVRSGT2iZA4kaFBHVICc5CSQaNAgiSgqKJs7CwkGNBBtYr3fXfiekic5qFBg1yYk0UhIaXQeiePe6WimCr0ipePbuWvelkCRmHjk2KEJNO3e9tdbd64M9fez/rHf+y/3vv3dVOScN6eWEvJCQm0ktyHS6h/yCtjZ31P3Td6fMo0kO4+9FP2jrc8cc8usyw/jrLdHW5w5AHkgNJCF9oK3PFTWO1osNI/PFWRw9qK3RFSnTZ4J29am2PlfMfHvuXkC+IDaQo4tPaGt0BSBtE/zs+Epbny+a5o6UeV5uIOMN2hJdAXn0kuDbcaIduLZGVyTkL8U+Owa8WVufK3rDpUcT0mWRYWRebL/5a2t0Rcq8U+ztQE7a+lyxZX5+lVRuBci/v3f4lwe0NboCkN+Q+zDnj7X1uQOkcqtMV2DIj2vrc0Utm1vt09bnjiSYWyWkZ7X1uWJGMLeCTN/EF0FDuRUM6TWZf6NppRHMrTL9XJ9o7tKW6AqQzK0yvaOtzx1JKrfK/Ft96Nx92vpc0ZPMrZA+1NbnjiSWW9HlHi4+pq3PFVtEcyv6QlufO0Awt+oNxk9r63MHCOVW7d/V1uaOWjC3msPxRm197khCuVVbDa37zUptfa6Yke1bbdXW5w4Qyq0A6fy7uHSPtj5fiOZWvFNbnjukcitA+qPGpUe09blDsG+1W1ubOyRzq9nMT2nrc4dUbgXIB7S1uUM0txrQK9r63CF5TjB1W9+nIT1XlUZCOmLg4Tc3GkpVErNDetLAQ29uaHmZv6tKoj3Lp/3Q001WL9NbVSlInxNM3Ve/qM6W7DlB7mZVyBfq4eLaqhjEzwly11VWMix7TpC7rUyHN+5pVlQlIXlOMHUaBl+sj/K6qiQkc6vUedFMVRqS5wRThwXIx97E5s6qNFKmMwbfjEvFXqfRXgxmcCDbq1Jpr85rGyB2rIqOx7GEDtT9ZuWk4nrI9Gc0GTuScLxhcm8H7+i6n+IBpE8mNIxTbx/6cXXxD9SCXUFrVcPRMzEMM3ZFH8UwrNhVpjPbDtKaGIgFu8p0JW6sNmVXtGtS+yke6G5XC+2vlMU/SCt2BUivxjCM2BVk/jyGYcSuAInqr8/eHwMxYldzca7Qjl1B5r0T3k4A/9OuINOvs8f4oXiCRuwKMm+KYRixK0DaH8MwYleAdL43GD8cAzFiV72SCtIO7KpfVEHasl1BcQVp+3a1VXvfU0u6XbsqsSBt1q5ygQVp23ZF5RWkrdoVlFqQtmhXcO1SmdF67f1ONfXt2FWm97X3O/WkW7WrTCfbKzm09zv1wC3YVRSkjdkVREHajl1BFKTt2BVEQdqaXVEUpM3YVY6CtB27ylGQXna7astsN7GqXcu7o8L5D7taiIK0IbuCKEjbsSuIgrQdu4IoSNuyq7koSC8/7Q9LCYmvY1V7FbYTXM+uIArStuwKoiCtORA++68P8v2K2wkA6ad/DCMK0tqkwfjFNjS8dndW5ue191MZ4SripL01kL62MgAAAABJRU5ErkJggg=="
          alt="lightning"
        />
        Top Picks Of The Month
      </p>

      <div className="flex flex-row gap-4">
        {events &&
          events.map((event) => {
            return (
              <Event
                key={event.eventID}
                eventId={event.eventID}
                imageURL={event.banner}
                eventName={event.name}
                eventDates={event.date}
              />
            );
          })}
      </div>
    </>
  );
};
