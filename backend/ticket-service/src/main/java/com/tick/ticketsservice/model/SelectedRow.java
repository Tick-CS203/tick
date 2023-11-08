package com.tick.ticketsservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SelectedRow {
    private String category;
    private String section;
    private String row;
    private Integer quantity;
}
