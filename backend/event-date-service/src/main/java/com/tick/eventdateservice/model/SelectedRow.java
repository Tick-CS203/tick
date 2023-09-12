package com.tick.eventdateservice.model;

import lombok.Data;

@Data
public class SelectedRow {
    private String category;
    private String section;
    private String row;
    private Integer quantity;
}
