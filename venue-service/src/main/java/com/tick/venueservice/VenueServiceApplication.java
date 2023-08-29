package com.tick.venueservice;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.tick.venueservice.model.EventDate;
import com.tick.venueservice.repository.EventDateRepository;

@SpringBootApplication
public class VenueServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(VenueServiceApplication.class, args);
	}

	/* @Bean
	CommandLineRunner runner(EventDateRepository repository) {
		return args -> {
			Map<String, Integer> rowsMap1 = new HashMap<String, Integer>();
			rowsMap1.put("A", 30);
			rowsMap1.put("B", 30);
			rowsMap1.put("C", 30);
			rowsMap1.put("D", 30);
			rowsMap1.put("E", 30);
			rowsMap1.put("F", 30);
			rowsMap1.put("G", 30);

			Map<String, Map<String, Integer>> sectionMap1 = new HashMap<String, Map<String, Integer>>();
			for (int i = 134; i <= 139; i++) {
				sectionMap1.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 112; i <= 117; i++) {
				sectionMap1.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 1; i <= 7; i++) {
				sectionMap1.put("PF" + i, rowsMap1);
			}
			for (int i = 1; i <= 4; i++) {
				sectionMap1.put("PB" + i, rowsMap1);
			}
			for (int i = 1; i <= 4; i++) {
				sectionMap1.put("PC" + i, rowsMap1);
			}
			for (int i = 1; i <= 4; i++) {
				sectionMap1.put("PD" + i, rowsMap1);
			}
			sectionMap1.put("PE2", rowsMap1);
			sectionMap1.put("PE3", rowsMap1);
			sectionMap1.put("PA1", rowsMap1);
			sectionMap1.put("PA4", rowsMap1);


			Map<String, Map<String, Integer>> sectionMap2 = new HashMap<String, Map<String, Integer>>();
			for (int i = 109; i <= 111; i++) {
				sectionMap2.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 140; i <= 142; i++) {
				sectionMap2.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 2; i <= 6; i++) {
				sectionMap2.put("PG" + i, rowsMap1);
			}
			
			sectionMap2.put("PH2", rowsMap1);
			sectionMap2.put("PH3", rowsMap1);
			sectionMap2.put("PH5", rowsMap1);
			sectionMap2.put("PH6", rowsMap1);
			sectionMap2.put("144A", rowsMap1);
			sectionMap2.put("144B", rowsMap1);
			sectionMap2.put("107A", rowsMap1);
			sectionMap2.put("107B", rowsMap1);

			Map<String, Map<String, Integer>> sectionMap3 = new HashMap<String, Map<String, Integer>>();
			for (int i = 411; i <= 417; i++) {
				sectionMap3.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 434; i <= 440; i++) {
				sectionMap3.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 101; i <= 106; i++) {
				sectionMap3.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 145; i <= 150; i++) {
				sectionMap3.put(Integer.toString(i), rowsMap1);
			}

			Map<String, Map<String, Integer>> sectionMap4 = new HashMap<String, Map<String, Integer>>();
			for (int i = 441; i <= 446; i++) {
				sectionMap4.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 405; i <= 410; i++) {
				sectionMap4.put(Integer.toString(i), rowsMap1);
			}


			Map<String, Map<String, Integer>> sectionMap5 = new HashMap<String, Map<String, Integer>>();
			for (int i = 611; i <= 617; i++) {
				sectionMap5.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 634; i <= 640; i++) {
				sectionMap5.put(Integer.toString(i), rowsMap1);
			}


			Map<String, Map<String, Integer>> sectionMap6 = new HashMap<String, Map<String, Integer>>();
			for (int i = 641; i <= 645; i++) {
				sectionMap6.put(Integer.toString(i), rowsMap1);
			}
			for (int i = 606; i <= 610; i++) {
				sectionMap6.put(Integer.toString(i), rowsMap1);
			}

			Map<String, Map<String, Map<String, Integer>>> categoryMap = new HashMap<String, Map<String, Map<String, Integer>>>();
			categoryMap.put("CAT1", sectionMap1);
			categoryMap.put("CAT2", sectionMap2);
			categoryMap.put("CAT3", sectionMap3);
			categoryMap.put("CAT4", sectionMap4);
			categoryMap.put("CAT5", sectionMap5);
			categoryMap.put("CAT6", sectionMap6);

			EventDate ed = new EventDate("eventID1", "64ecb4ad17d89d593f3c5f2f", LocalDateTime.now(), categoryMap);
			repository.insert(ed);
		};
	} */
}
