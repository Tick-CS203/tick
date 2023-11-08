import { useQuery } from "@tanstack/react-query";
import {
  getEvent,
  getEvents,
  getFilteredEvents,
  getEventsByName,
  getRecommendedEvents,
} from "../service/events.service";

export const useEventQuery = (event_id) => {
  return useQuery({
    queryKey: ["event", event_id],
    queryFn: () => getEvent(event_id),
  });
};

export const useEventsQuery = () => {
  return useQuery({
    queryKey: ["event"],
    queryFn: () => getEvents(),
  });
};

export const useFilteredEventsQuery = (
  category,
  maxPrice,
  eventStartDate,
  eventEndDate
) => {
  return useQuery({
    queryKey: ["event", category, maxPrice, eventStartDate, eventEndDate],
    queryFn: () =>
      getFilteredEvents(category, maxPrice, eventStartDate, eventEndDate),
  });
};

export const useRecommendedEventsQuery = (artist_name) => {
  return useQuery({
    queryKey: ["recommended"],
    queryFn: () => getRecommendedEvents(artist_name),
    enabled: !!artist_name,
  });
};
